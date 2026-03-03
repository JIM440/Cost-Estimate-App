import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useTheme } from '../../../context/ThemeContext';
import { useLocale } from '../../../context/LocaleContext';
import FeatureCard from '../../../components/cards/FeatureCard';
import IndividualEstimatesSection from '../../../components/home/IndividualEstimatesSection';
import TabHeader from '../../../components/TabHeader';

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
  const { colors } = useTheme();
  const { t } = useLocale();
  const [active, setActive] = useState<HomeTabKey>('house-category');

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
    <ScreenWrapper>

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
    </ScreenWrapper>
    </>
  );
}

