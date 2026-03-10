import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@cost_estimate_has_seen_onboarding';

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        setHasSeenOnboarding(value === 'true');
      } catch {
        setHasSeenOnboarding(false);
      }
    })();
  }, []);

  if (hasSeenOnboarding === null) {
    // Do not render anything while we read onboarding state.
    return null;
  }

  if (hasSeenOnboarding) {
    // Go straight to the Home tab route.
    return <Redirect href="/home" />;
  }

  return <Redirect href="/onboarding" />;
}
