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
  const wrapper = { width: 60, height: 60, padding: 10, backgroundColor: colors.borderColor, borderRadius: 10 };
  if (icon == null) return null;

  // Resolve default export (web bundler often wraps in { default })
  const resolved =
    typeof icon === 'object' && icon !== null && 'default' in icon
      ? (icon as { default: unknown }).default
      : icon;

  // Image: number (RN asset), uri object, or string URL (web)
  const imageSource: number | { uri: string } | null =
    typeof resolved === 'number'
      ? resolved
      : typeof resolved === 'string'
        ? { uri: resolved }
        : resolved &&
          typeof resolved === 'object' &&
          'uri' in (resolved as object)
        ? (resolved as { uri: string })
        : null;
  if (imageSource != null) {
    return (
      <View style={wrapper}>
        <Image source={imageSource} style={{ width: 40, height: 40 }} />
      </View>
    );
  }

  // Component (function or object.default that is a function)
  const IconComponent =
    typeof resolved === 'function'
      ? (resolved as React.ComponentType<{ width?: number; height?: number }>)
      : null;
  if (IconComponent != null) {
    return (
      <View style={wrapper}>
        <IconComponent width={40} height={40} />
      </View>
    );
  }
  return null;
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

