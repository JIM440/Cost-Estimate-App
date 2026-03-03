import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import ListCard from './ListCard';
import { useLocale } from '../../context/LocaleContext';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export interface GuideCardProps {
  title: string;
  left: React.ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const GuideCard: React.FC<GuideCardProps> = ({
  title,
  left,
  onPress,
  containerStyle,
}) => {
  const { t } = useLocale();
  const { colors } = useTheme();
  return (
    <ListCard
      title={typeof title === 'string' ? title : ''}
      meta={String(t('guides.cardSubtitle') || '')}
      left={left}
      right={<Feather name="chevron-right" size={18} color={colors.muted_text} />}
      onPress={onPress}
      containerStyle={containerStyle}
    />
  );
};

export default GuideCard;

