import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageStyle,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Image from '../Image';
import { useTheme } from '../../context/ThemeContext';

export interface FeatureCardProps {
  image: ImageSourcePropType;
  title: string;
  description?: string;
  features?: string[];
  ctaLabel?: string;
  accentColor?: string;
  variant?: 'default' | 'section';
  tintColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  title,
  description,
  features,
  ctaLabel,
  accentColor,
  variant = 'default',
  tintColor,
  onPress,
  style,
}) => {
  const { colors } = useTheme();
  const accent = accentColor ?? colors.primary_color;

  const Container: React.ComponentType<any> = onPress ? Pressable : View;
  const containerProps = onPress
    ? {
        onPress,
        style: ({ pressed }: { pressed: boolean }) => [
          styles.container,
          {
            backgroundColor: colors.card,
            borderColor: colors.borderColor,
            transform: [{ scale: pressed ? 0.99 : 1 }],
            opacity: pressed ? 0.98 : 1,
          },
          style,
        ],
      }
    : {
        style: [
          styles.container,
          {
            backgroundColor:
              variant === 'section' ? tintColor ?? colors.light_bg_blue : colors.card,
            borderColor: colors.borderColor,
          },
          style,
        ],
      };

  return (
    <Container {...containerProps}>
      <View style={[styles.accentStrip, { backgroundColor: accent }]} />

      <View style={[styles.imageWrap, { backgroundColor: colors.light_bg_blue }]}>
        <Image source={image} style={styles.image as ImageStyle} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.heading_text }]}>{title}</Text>

        {description ? (
          <Text
            style={[styles.description, { color: colors.muted_text }]}
            numberOfLines={2}
          >
            {description}
          </Text>
        ) : null}

        {features?.length ? (
          <View style={styles.features}>
            {features.slice(0, 3).map((f) => (
              <View key={f} style={styles.featureRow}>
                <View
                  style={[styles.bulletDot, { backgroundColor: accent }]}
                />
                <Text style={[styles.featureText, { color: colors.muted_text }]}>
                  {f}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {ctaLabel ? (
          <View style={styles.ctaRow}>
            <Text style={[styles.ctaText, { color: accent }]}>{ctaLabel}</Text>
            <Feather
              name="chevron-right"
              size={16}
              color={accent}
              style={styles.ctaIcon}
            />
          </View>
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
  },
  accentStrip: {
    width: 4,
    borderRadius: 999,
    marginRight: 14,
  },
  imageWrap: {
    width: 92,
    height: 92,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  image: {
    width: 78,
    height: 78,
    borderRadius: 14,
    objectFit: 'cover' as const,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    marginBottom: 6,
    fontSize: 17,
  },
  description: {
    fontSize: 13.5,
  },
  features: {
    marginTop: 12,
    gap: 6,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  featureText: {
    fontSize: 12.5,
    flexShrink: 1,
  },
  ctaRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  ctaText: {
    fontWeight: '700',
    fontSize: 13.5,
  },
  ctaIcon: {
    marginLeft: 8,
  },
});

export default FeatureCard;


