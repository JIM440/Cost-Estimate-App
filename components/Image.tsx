import React from 'react';
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';
import { ImageStyle, StyleSheet } from 'react-native';

type ResizeMode = 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
type ContentFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

const resizeModeToContentFit: Record<ResizeMode, ContentFit> = {
  cover: 'cover',
  contain: 'contain',
  stretch: 'fill',
  repeat: 'cover',
  center: 'none',
};

export interface ImageProps extends Omit<ExpoImageProps, 'contentFit'> {
  resizeMode?: ResizeMode;
}

/**
 * Reusable Image component using expo-image for better performance and caching.
 * Accepts all props that a normal Image component accepts (source, style, resizeMode, etc.).
 */
const Image = ({ resizeMode, style, ...props }: ImageProps) => {
  const flatStyle = StyleSheet.flatten(style as ImageStyle | undefined) || {};
  const objectFit = (flatStyle as ImageStyle & { objectFit?: string })?.objectFit;
  const contentFit =
    (resizeMode ? resizeModeToContentFit[resizeMode] : undefined) ??
    (objectFit && ['cover', 'contain', 'fill', 'none', 'scale-down'].includes(objectFit)
      ? (objectFit as ContentFit)
      : undefined);

  const hasExplicitSize =
    flatStyle.width != null ||
    flatStyle.height != null;

  const defaultThumbStyle: ImageStyle | undefined = hasExplicitSize
    ? undefined
    : { width: 56, height: 56 };

  return (
    <ExpoImage
      {...props}
      style={defaultThumbStyle ? [defaultThumbStyle, style] : style}
      contentFit={contentFit}
    />
  );
};

export default Image;
