import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import guides, { type GuideConfig } from '../../screens/guide/Data';
import { containerStyles } from '../../styles/utility';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';
import GuideCard from '../../components/cards/GuideCard';
import TabHeader from '../../components/TabHeader';

function GuideIcon({ icon }: { icon: GuideConfig['iconSource'] }) {
  const { colors } = useTheme();
  if (icon == null) return null;
  if (typeof icon === 'number') {
    return <View style={{ width: 60, height: 60, padding: 10, backgroundColor: colors.borderColor, borderRadius: 10 }}><Image source={icon} style={{ width: 40, height: 40 }} /></View>;
  }
  const IconComponent = icon;
  return (
    <View style={{ width: 60, height: 60, padding: 10, backgroundColor: colors.borderColor, borderRadius: 10 }}>
      <IconComponent width={40} height={40} />
    </View>
  );
}

const routeMap: Record<string, string> = {
  blockGuide: '/guide/block',
  roofingGuide: '/guide/roofing',
  rcslabGuide: '/guide/rcslab',
  hollowblockslabGuide: '/guide/hollowslab',
  rodsGuide: '/guide/rods',
  concreteGuide: '/guide/concrete',
  formworkGuide: '/guide/formwork',
  plasterGuide: '/guide/plaster',
  tilesGuide: '/guide/tiles',
  paintGuide: '/guide/paint',
  foundationGuide: '/guide/foundation',
  excavationGuide: '/guide/excavation',
  fillingGuide: '/guide/filling',
};

const styles = StyleSheet.create({
  intro: {
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 14,
  },
});

export default function Guides() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLocale();
  return (
    <>
   <TabHeader titleKey="tab.guides" />
    <ScreenWrapper>
      <View style={[containerStyles.container, { backgroundColor: colors.screen_background }]}>
        <Text style={[styles.intro, { color: colors.muted_text }]}>
          {t('guides.intro')}
        </Text>
        {guides.map((item: GuideConfig) => (
          <GuideCard
            key={item.id}
            title={String(t(item.titleKey) || '')}
            left={<GuideIcon icon={item.iconSource} />}
            onPress={() => router.push(routeMap[item.route] || '/guides')}
          />
        ))}
      </View>
    </ScreenWrapper>
    </>
  );
}

