import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { useLocale } from '../../../context/LocaleContext';
import FeatureCard from '../../../components/cards/FeatureCard';
import IndividualEstimatesSection from '../../../components/home/IndividualEstimatesSection';
import TabHeader from '../../../components/TabHeader';
import { useWalkthrough } from '../../../context/WalkthroughContext';

type HomeTabKey = 'house-category' | 'individual';

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    // paddingBottom: 8,
    // borderBottomWidth: 1,
    paddingVertical: 4,
    paddingTop: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    // paddingHorizontal: 16
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default function HouseCategory() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string | string[] }>();
  const { colors } = useTheme();
  const { t } = useLocale();
  const [active, setActive] = useState<HomeTabKey>('house-category');
  const { status, currentStep, loading, start, setStep } = useWalkthrough();

  const applyRequestedTab = useCallback(() => {
    if (status === 'in_progress') return;
    const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
    if (tab === 'house-category' || tab === 'individual') {
      setActive(tab);
    }
  }, [params.tab, status]);

  useEffect(() => {
    applyRequestedTab();
  }, [applyRequestedTab]);

  useFocusEffect(
    useCallback(() => {
      applyRequestedTab();
      return () => {};
    }, [applyRequestedTab])
  );

  useEffect(() => {
    if (!loading && status === 'pending') {
      start();
    }
  }, [loading, status, start]);

  useEffect(() => {
    if (status !== 'in_progress') return;
    if (currentStep === 'home-house' && active !== 'house-category') {
      setActive('house-category');
    }
    if (currentStep === 'home-individual' && active !== 'individual') {
      setActive('individual');
    }
  }, [status, currentStep, active]);

  return (
    <>
    <TabHeader titleKey="tab.home" />
        <View
          style={[
            styles.tabRow,
            { borderColor: colors.borderColor, backgroundColor: colors.screen_background, paddingHorizontal: 16 },
          ]}
        >
          {[
            { key: 'house-category' as HomeTabKey, label: t('home.tab.houseCategory') },
            { key: 'individual' as HomeTabKey, label: t('home.tab.individual') },
          ].map((tab) => {
            const isActive = active === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  isActive && { borderBottomWidth: 4, borderBottomColor: colors.primary_color },
                ]}
                onPress={() => setActive(tab.key)}
              >
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: colors.heading_text,
                      fontWeight: isActive ? '600' : '500',
                    }
                  ]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ flex: 1, backgroundColor: colors.screen_background, position: 'relative' }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 32,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {active === 'house-category' ? (
              <View style={{ paddingTop: 16 }}>
            <FeatureCard
              image={require('../../../assets/images/full_house/single-storey.png')}
              title={t('home.single.title')}
              description={t('home.single.oneLiner')}
              features={[
                t('home.single.feature.materials'),
                t('home.single.feature.cost'),
                t('home.single.feature.scope'),
              ]}
              accentColor={colors.primary_color}
              variant="section"
              tintColor={colors.light_bg_blue}
              ctaLabel={t('home.cta.startEstimate')}
              onPress={() => router.push('/single-storey')}
            />

            <FeatureCard
              image={require('../../../assets/images/full_house/two-storey.png')}
              title={t('home.two.title')}
              description={t('home.two.oneLiner')}
              features={[
                t('home.single.feature.materials'),
                t('home.single.feature.cost'),
                t('home.single.feature.scope'),
              ]}
              accentColor={colors.primary_color}
              variant="section"
              tintColor={colors.light_bg_blue}
              ctaLabel={t('home.cta.startEstimate')}
              onPress={() => router.push('/two-storey')}
            />

            <FeatureCard
              image={require('../../../assets/images/full_house/three-storey.png')}
              title={t('home.three.title')}
              description={t('home.three.oneLiner')}
              features={[
                t('home.single.feature.materials'),
                t('home.single.feature.cost'),
                t('home.single.feature.scope'),
              ]}
              accentColor={colors.primary_color}
              variant="section"
              tintColor={colors.light_bg_blue}
              ctaLabel={t('home.cta.startEstimate')}
              onPress={() => router.push('/three-storey')}
            />

            <FeatureCard
              image={require('../../../assets/images/full_house/four-storey.png')}
              title={t('home.four.title')}
              description={t('home.four.oneLiner')}
              features={[
                t('home.single.feature.materials'),
                t('home.single.feature.cost'),
                t('home.single.feature.scope'),
              ]}
              accentColor={colors.primary_color}
              variant="section"
              tintColor={colors.light_bg_blue}
              ctaLabel={t('home.cta.startEstimate')}
              onPress={() => router.push('/four-storey')}
            />
              </View>
            ) : (
              <IndividualEstimatesSection />
            )}
          </ScrollView>
        </View>
    </>
  );
}

