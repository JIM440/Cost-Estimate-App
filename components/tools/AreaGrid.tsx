import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { containerStyles } from '../../styles/utility';
import { wideCardStyles } from '../../styles/components/cards';
import ToolCard from '../cards/ToolCard';
import { Circle, Square, Triangle, RectangleHorizontal } from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';

type TrapeziumIconProps = {
  size?: number;
  color?: string;
};

const TrapeziumIcon: React.FC<TrapeziumIconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M3 17h18l-3-10H6L3 17z" />
  </Svg>
);

export default function AreaGrid() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { t } = useLocale();
  const iconColor = isDark ? colors.white : colors.heading_text;
  const iconSize = 34;
  return (
    <View style={[containerStyles.container, wideCardStyles.wideCardContainer, { backgroundColor: colors.screen_background}]}>
      <ToolCard
        title={t('tools.area.circle')}
        iconNode={<Circle color={iconColor} size={iconSize} />}
        onPress={() => router.push('/circle')}
      />
      <ToolCard
        title={t('tools.area.square')}
        iconNode={<Square color={iconColor} size={iconSize} />}
        onPress={() => router.push('/square')}
      />
      <ToolCard
        title={t('tools.area.triangle')}
        iconNode={<Triangle color={iconColor} size={iconSize} />}
        onPress={() => router.push('/triangle')}
      />
      <ToolCard
        title={t('tools.area.rectangle')}
        iconNode={<RectangleHorizontal color={iconColor} size={iconSize} />}
        onPress={() => router.push('/rectangle')}
      />
      <ToolCard
        title={t('tools.area.trapezium')}
        iconNode={<TrapeziumIcon color={iconColor} size={iconSize} />}
        onPress={() => router.push('/trapezium')}
      />
      <ToolCard
        title={t('tools.area.ellipse')}
        iconNode={<MaterialCommunityIcons name="ellipse-outline" size={iconSize} color={iconColor} />}
        onPress={() => router.push('/ellipse')}
      />
    </View>
  );
}
