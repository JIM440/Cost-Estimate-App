import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { containerStyles } from '../../styles/utility';
import { wideCardStyles } from '../../styles/components/cards';
import { useLocale } from '../../context/LocaleContext';
import ToolCard from '../cards/ToolCard';
import { useTheme } from '../../context/ThemeContext';
import {
  DraftingCompass,
  Thermometer,
  Scale,
  Cuboid,
  Square,
  PencilRuler,
  CircleGauge,
} from 'lucide-react-native';

export default function ConversionGrid() {
  const router = useRouter();
  const { t } = useLocale();
  const { colors, isDark } = useTheme();
  const iconColor = isDark ? colors.white : colors.heading_text;
  const iconSize = 34;
  return (
    <View style={[containerStyles.container, wideCardStyles.wideCardContainer, { backgroundColor: colors.screen_background}]}>
      <ToolCard
        title={t('conversion.length')}
        iconNode={<PencilRuler color={iconColor} size={iconSize} />}
        onPress={() => router.push('/length')}
      />
      <ToolCard
        title={t('conversion.area')}
        iconNode={<Square color={iconColor} size={iconSize} />}
        onPress={() => router.push('/conversion-area')}
      />
      <ToolCard
        title={t('conversion.volume')}
        iconNode={<Cuboid color={iconColor} size={iconSize} />}
        onPress={() => router.push('/volume')}
      />
      <ToolCard
        title={t('conversion.weight')}
        iconNode={<Scale color={iconColor} size={iconSize} />}
        onPress={() => router.push('/weight')}
      />
      <ToolCard
        title={t('conversion.temperature')}
        iconNode={<Thermometer color={iconColor} size={iconSize} />}
        onPress={() => router.push('/temperature')}
      />
      <ToolCard
        title={t('conversion.pressure')}
        iconNode={<CircleGauge color={iconColor} size={iconSize} />}
        onPress={() => router.push('/pressure')}
      />
      <ToolCard
        title={t('conversion.angle')}
        iconNode={<DraftingCompass color={iconColor} size={iconSize} />}
        onPress={() => router.push('/angle')}
      />
    </View>
  );
}
