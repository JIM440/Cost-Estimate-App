import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';
import Image from '../components/Image';
import PagerView from 'react-native-pager-view';
import { Feather } from '@expo/vector-icons';
import { border_radius_full, page_padding } from '../styles/global';
import Button from '../components/buttons/Button';

const ONBOARDING_KEY = '@cost_estimate_has_seen_onboarding';

const slides = [
  {
    key: 'welcome',
    titleKey: 'onboarding.slide1.title',
    descKey: 'onboarding.slide1.desc',
    image: require('../assets/onboarding-hero.webp'),
  },
  {
    key: 'full-building',
    titleKey: 'onboarding.slide2.title',
    descKey: 'onboarding.slide2.desc',
    image: require('../assets/onboarding-2.png'),
  },
  {
    key: 'materials',
    titleKey: 'onboarding.slide3.title',
    descKey: 'onboarding.slide3.desc',
    image: require('../assets/onboarding-3.png'),
  },
  {
    key: 'projects',
    titleKey: 'onboarding.slide4.title',
    descKey: 'onboarding.slide4.desc',
    image: require('../assets/onboarding-4.png'),
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const pagerRef = useRef<PagerView | null>(null);
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLocale();

  const goToApp = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch (_) {}
  // After onboarding, go to the Home tab route ("/home").
  router.replace('/home');
  };

  const handleNext = () => {
    if (index < slides.length - 1) {
      const next = index + 1;
      setIndex(next);
      pagerRef.current?.setPage(next);
    } else {
      goToApp();
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      const prev = index - 1;
      setIndex(prev);
      pagerRef.current?.setPage(prev);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.screen_background }]}>
      <View style={[styles.container, { backgroundColor: colors.screen_background }]}>
        <View style={styles.topRow}>
          <View />
          {index < slides.length - 1 && (
            <Pressable hitSlop={10} onPress={goToApp}>
              <View style={styles.skipContent}>
                <Text style={[styles.skipText, { color: colors.muted_text }]}>
                  {t('onboarding.skip')}
                </Text>
                <Feather name="chevron-right" size={16} color={colors.muted_text} />
              </View>
            </Pressable>
          )}
        </View>

        <View style={styles.pagerContainer}>
          <PagerView
            style={styles.pager}
            initialPage={0}
            ref={pagerRef}
            onPageSelected={(e) => setIndex(e.nativeEvent.position)}
          >
            {slides.map((slide) => (
              <View key={slide.key} style={styles.page}>
                <View style={styles.illustrationWrapper}>
                  <Image
                    source={slide.image}
                    style={styles.illustration}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.content}>
                  <Text style={[styles.title, { color: colors.heading_text }]}>
                    {t(slide.titleKey)}
                  </Text>
                  <Text style={[styles.description, { color: colors.muted_text }]}>
                    {t(slide.descKey)}
                  </Text>
                </View>
              </View>
            ))}
          </PagerView>
        </View>

        <View style={styles.dotsRow}>
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <View
                key={slide.key}
                style={[
                  styles.dot,
                  active && { ...styles.dotActive, backgroundColor: colors.primary_color },
                  !active && { backgroundColor: colors.borderColor },
                ]}
              />
            );
          })}
        </View>

        <View style={styles.bottomBar}>
          {index > 0 && (
            <Button
              title={t('onboarding.back')}
              onPress={handlePrev}
              variant="ghost"
              fullRound
              leftIcon={<Feather name="chevron-left" size={16} color={colors.heading_text} />}
              style={styles.bottomButton}
            />
          )}
          <Button
            title={
              index === 0
                ? t('onboarding.getStarted')
                : index === slides.length - 1
                ? t('onboarding.startEstimating')
                : t('onboarding.continue')
            }
            onPress={handleNext}
            variant="primary"
            fullRound
            style={styles.bottomButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  skipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  illustrationWrapper: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
    maxHeight: 400
  },
  content: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
    gap: 8,
  },
  pagerContainer: {
    flex: 5,
    marginTop: 16,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: page_padding,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 18,
  },
  bottomBar: {
    paddingBottom: 28,
    paddingTop: 12,
    paddingHorizontal: page_padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
  },
  bottomButton: {
    flex: 1,
  },
});

