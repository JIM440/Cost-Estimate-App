import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WALKTHROUGH_STATE_KEY = '@cost_estimate_walkthrough_state';
const ONBOARDING_KEY = '@cost_estimate_has_seen_onboarding';

export type WalkthroughStepId = 'home-house' | 'home-individual' | 'guides' | 'settings';

type WalkthroughStatus = 'idle' | 'pending' | 'in_progress' | 'completed';

interface WalkthroughContextValue {
  status: WalkthroughStatus;
  currentStep: WalkthroughStepId | null;
  loading: boolean;
  start: () => void;
  setStep: (step: WalkthroughStepId | null) => void;
  complete: () => void;
  skip: () => void;
  reset: () => void;
}

const WalkthroughContext = createContext<WalkthroughContextValue | undefined>(undefined);

export function WalkthroughProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<WalkthroughStatus>('idle');
  const [currentStep, setCurrentStep] = useState<WalkthroughStepId | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(WALKTHROUGH_STATE_KEY);
        if (stored === 'pending' || stored === 'in_progress' || stored === 'completed') {
          setStatus(stored as WalkthroughStatus);
        } else {
          // If onboarding has already been seen but walkthrough state is missing,
          // treat this as a first-time walkthrough and mark as pending.
          const seenOnboarding = await AsyncStorage.getItem(ONBOARDING_KEY);
          if (seenOnboarding === 'true') {
            setStatus('pending');
            await AsyncStorage.setItem(WALKTHROUGH_STATE_KEY, 'pending');
          } else {
            setStatus('idle');
          }
        }
      } catch {
        setStatus('idle');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persistStatus = useCallback((next: WalkthroughStatus) => {
    setStatus(next);
    AsyncStorage.setItem(WALKTHROUGH_STATE_KEY, next).catch(() => {});
  }, []);

  const start = useCallback(() => {
    // Only auto-start when onboarding has marked the walkthrough as pending.
    if (status !== 'pending') return;
    persistStatus('in_progress');
    setCurrentStep('home-house');
  }, [persistStatus, status]);

  const setStep = useCallback((step: WalkthroughStepId | null) => {
    setCurrentStep(step);
  }, []);

  const complete = useCallback(() => {
    persistStatus('completed');
    setCurrentStep(null);
  }, [persistStatus]);

  const skip = useCallback(() => {
    persistStatus('completed');
    setCurrentStep(null);
  }, [persistStatus]);

  const reset = useCallback(() => {
    persistStatus('pending');
    setCurrentStep(null);
  }, [persistStatus]);

  return (
    <WalkthroughContext.Provider
      value={{
        status,
        currentStep,
        loading,
        start,
        setStep,
        complete,
        skip,
        reset,
      }}
    >
      {children}
    </WalkthroughContext.Provider>
  );
}

export function useWalkthrough() {
  const ctx = useContext(WalkthroughContext);
  if (!ctx) {
    throw new Error('useWalkthrough must be used within WalkthroughProvider');
  }
  return ctx;
}

