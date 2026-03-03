import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { containerStyles, titleStyles } from '../../styles/utility';
import { useTheme } from '../../context/ThemeContext';
import ConversionGrid from '../../components/tools/ConversionGrid';
import AreaGrid from '../../components/tools/AreaGrid';
import TabHeader from '../../components/TabHeader';
import { useLocale } from '../../context/LocaleContext';

export default function ToolsHub() {
  const { colors } = useTheme();
  const { t } = useLocale();
  return (
    <>
      <TabHeader titleKey="tab.tools" />
      <ScreenWrapper>
        <View
          style={[
            containerStyles.container,
            { backgroundColor: colors.screen_background },
          ]}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text
              style={[
                titleStyles.boldTitle,
                styles.sectionTitle,
                { color: colors.heading_text },
              ]}
            >
              {t('tools.section.areaVolume')}
            </Text>
            <AreaGrid />

            <Text
              style={[
                titleStyles.boldTitle,
                styles.sectionTitle,
                { marginTop: 18, color: colors.heading_text },
              ]}
            >
              {t('tools.section.conversions')}
            </Text>
            <ConversionGrid />
          </ScrollView>
        </View>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginBottom: 0,
    fontSize: 16,
  },
});

