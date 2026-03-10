import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import TabHeader from '../../../components/TabHeader';
import Image from '../../../components/Image';
import { useTheme, ThemeMode } from '../../../context/ThemeContext';
import { page_padding, border_radius_8 } from '../../../styles/global';
import { Feather } from '@expo/vector-icons';
import { useLocale } from '../../../context/LocaleContext';
import { useWalkthrough } from '../../../context/WalkthroughContext';

type LanguageCode = 'en-GB' | 'fr';
type Units = 'metric' | 'imperial';
type CurrencyCode = 'xaf';

export default function SettingsTabScreen() {
  const router = useRouter();
  const { colors, theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLocale();
  const { reset } = useWalkthrough();

  const [languageState, setLanguageState] = useState<LanguageCode>(language);
  const [units, setUnits] = useState<Units>('metric');
  const [currency, setCurrency] = useState<CurrencyCode>('xaf');
  const [aboutVisible, setAboutVisible] = useState(false);

  return (
    <>
      <TabHeader titleKey="tab.settings" />
      <View style={{ flex: 1, backgroundColor: colors.screen_background, position: 'relative' }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.screen_background }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 32,
          }}
        >
          {/* GENERAL */}
          <Text style={[styles.sectionLabel, { color: colors.muted_text }]}>
            {t('settings.section.general')}
          </Text>

          {/* Language row (flat with divider and dropdown) */}
          <View style={styles.sectionContainer}>
            <View
              style={[
                styles.row,
                {
                  borderBottomWidth: RNStyleSheet.hairlineWidth,
                  borderBottomColor: colors.borderColor,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.heading_text }]}>
                  {t('settings.language.label')}
                </Text>
                <Text style={[styles.rowValue, { color: colors.muted_text }]}>
                  {languageState === 'en-GB'
                    ? t('settings.language.en')
                    : t('settings.language.fr')}
                </Text>
              </View>
              <Picker
                selectedValue={languageState}
                style={[styles.picker, { color: colors.heading_text, backgroundColor: 'transparent' }]}
                mode="dropdown"
                onValueChange={(value: LanguageCode) => {
                  setLanguageState(value);
                  setLanguage(value);
                }}
              >
                <Picker.Item label={t('settings.language.en')} value="en-GB" />
                <Picker.Item label={t('settings.language.fr')} value="fr" />
              </Picker>
            </View>
          </View>

          {/* THEME – only block inside a card */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.heading_text }]}>
              {t('settings.theme.label')}
            </Text>

            {[
              {
                mode: 'system' as ThemeMode,
                label: t('settings.theme.auto'),
                icon: 'monitor' as const,
              },
              {
                mode: 'light' as ThemeMode,
                label: t('settings.theme.light'),
                icon: 'sun' as const,
              },
              {
                mode: 'dark' as ThemeMode,
                label: t('settings.theme.dark'),
                icon: 'moon' as const,
              },
            ].map((opt, idx) => {
              const active = theme === opt.mode;
              return (
                <Pressable
                  key={opt.mode}
                  style={[
                    styles.themeRow,
                    idx === 0 && { marginTop: 4 },
                  ]}
                  onPress={() => setTheme(opt.mode)}
                >
                  <View style={styles.themeLeft}>
                    <Feather
                      name={opt.icon}
                      size={18}
                      color={colors.heading_text}
                    />
                    <Text
                      style={[
                        styles.rowLabel,
                        { marginLeft: 12, color: colors.heading_text },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioOuter,
                      {
                        borderColor: active
                          ? colors.primary_color
                          : colors.borderColor,
                      },
                    ]}
                  >
                    {active ? (
                      <View
                        style={[
                          styles.radioInner,
                          { backgroundColor: colors.primary_color },
                        ]}
                      />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* ESTIMATION DEFAULTS */}
          <Text style={[styles.sectionLabel, { color: colors.muted_text }]}>
            {t('settings.section.defaults')}
          </Text>

          <View style={styles.sectionContainer}>
            {/* Currency dropdown */}
            <View
              style={[
                styles.row,
                {
                  borderBottomWidth: RNStyleSheet.hairlineWidth,
                  borderBottomColor: colors.borderColor,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.heading_text }]}>
                  {t('settings.currency.label')}
                </Text>
                <Text style={[styles.rowValue, { color: colors.muted_text }]}>
                  {t('settings.currency.value')}
                </Text>
              </View>
              <Picker
                selectedValue={currency}
                style={[styles.picker, { color: colors.heading_text, backgroundColor: 'transparent' }]}
                mode="dropdown"
                onValueChange={(value: CurrencyCode) => setCurrency(value)}
              >
                <Picker.Item
                  label={t('settings.currency.value')}
                  value="xaf"
                />
              </Picker>
            </View>

            {/* Units dropdown */}
            <View
              style={[
                styles.row,
                {
                  borderBottomWidth: RNStyleSheet.hairlineWidth,
                  borderBottomColor: colors.borderColor,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.heading_text }]}>
                  {t('settings.units.label')}
                </Text>
                <Text style={[styles.rowValue, { color: colors.muted_text }]}>
                  {units === 'metric'
                    ? t('settings.units.metric')
                    : t('settings.units.imperial')}
                </Text>
              </View>
              <Picker
                selectedValue={units}
                style={[styles.picker, { color: colors.heading_text, backgroundColor: 'transparent' }]}
                mode="dropdown"
                onValueChange={(value: Units) => setUnits(value)}
              >
                <Picker.Item
                  label={t('settings.units.metric')}
                  value="metric"
                />
                <Picker.Item
                  label={t('settings.units.imperial')}
                  value="imperial"
                />
              </Picker>
            </View>
          </View>

          {/* MORE */}
          <Text style={[styles.sectionLabel, { color: colors.muted_text }]}>
            {t('settings.section.more') ?? 'MORE'}
          </Text>

          <View style={{...styles.sectionContainer, gap: 12}}>
            {/* Support & help – navigates */}
            <Pressable
              style={[
                styles.row,
                {
                  borderBottomWidth: RNStyleSheet.hairlineWidth,
                  borderBottomColor: colors.borderColor,
                },
              ]}
              onPress={() => router.push('/support')}
            >
              <View style={styles.rowLeft}>
                <Feather
                  name="help-circle"
                  size={18}
                  color={colors.muted_text}
                />
                <Text
                  style={[
                    styles.rowLabel,
                    { marginLeft: 12, color: colors.muted_text },
                  ]}
                >
                  {t('support.title')}
                </Text>
              </View>
            </Pressable>

            {/* About – opens modal */}
            <Pressable
              style={[
                styles.row,
                {
                  borderBottomWidth: RNStyleSheet.hairlineWidth,
                  borderBottomColor: colors.borderColor,
                },
              ]}
              onPress={() => setAboutVisible(true)}
            >
              <View style={styles.rowLeft}>
                <Feather name="info" size={18} color={colors.muted_text} />
                <Text
                  style={[
                    styles.rowLabel,
                    { marginLeft: 12, color: colors.muted_text },
                  ]}
                >
                  {t('about.title')}
                </Text>
              </View>
            </Pressable>

            {/* Share – coming soon */}
            <Pressable
              style={[
                styles.row,
                {
                  borderBottomWidth: RNStyleSheet.hairlineWidth,
                  borderBottomColor: colors.borderColor,
                },
              ]}
              onPress={() =>
                Alert.alert(t('share.title'), 'This feature is coming soon.')
              }
            >
              <View style={styles.rowLeft}>
                <Feather
                  name="share-2"
                  size={18}
                  color={colors.muted_text}
                />
                <Text
                  style={[
                    styles.rowLabel,
                    { marginLeft: 12, color: colors.muted_text },
                  ]}
                >
                  {t('share.title')}
                </Text>
              </View>
            </Pressable>

            {/* Rate – coming soon */}
            <Pressable
              style={styles.row}
              onPress={() =>
                Alert.alert(t('rate.title'), 'This feature is coming soon.')
              }
            >
              <View style={styles.rowLeft}>
                <Feather name="star" size={18} color={colors.muted_text} />
                <Text
                  style={[
                    styles.rowLabel,
                    { marginLeft: 12, color: colors.muted_text },
                  ]}
                >
                  {t('rate.title')}
                </Text>
              </View>
            </Pressable>

            {/* Restart walkthrough (helper for user) */}
            <Pressable
              style={styles.row}
              onPress={() => {
                reset();
                router.push({
                  pathname: '/home',
                  params: { tab: 'house-category' },
                });
              }}
            >
              <View style={styles.rowLeft}>
                <Feather name="compass" size={18} color={colors.muted_text} />
                <Text
                  style={[
                    styles.rowLabel,
                    { marginLeft: 12, color: colors.muted_text },
                  ]}
                >
                  {t('walkthrough.start')}
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>

        {/* About modal */}
        <Modal
          visible={aboutVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setAboutVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            {/* Tapping outside card closes modal */}
            <Pressable
              style={RNStyleSheet.absoluteFill}
              onPress={() => setAboutVisible(false)}
            />
            <View
              style={[styles.modalCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.modalHeader}>
                <Image
                  source={require('../../../assets/icons/icon.png')}
                  style={styles.logoImage}
                />
                <View style={{ marginLeft: 12, gap: 4 }}>
                  <Text
                    style={[styles.modalTitle, { color: colors.heading_text }]}
                  >
                    Cost Estimate
                  </Text>
                  <Text
                    style={[
                      styles.modalSubtitle,
                      { color: colors.muted_text },
                    ]}
                  >
                    v1.0.0
                  </Text>
                <Text
                  style={[
                    styles.modalFooterText,
                    { color: colors.muted_text },
                  ]}
                >
                  © {new Date().getFullYear()} Cost Estimate
                </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  card: {
    borderRadius: border_radius_8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 13,
    marginTop: 2,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionContainer: {
    marginBottom: 12,
  },
  picker: {
    width: 200,
    backgroundColor: 'transparent',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    borderRadius: border_radius_8,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: 13,
  },
  modalFooter: {
    marginTop: 8,
  },
  modalFooterText: {
    fontSize: 12,
    textAlign: 'center',
  },
  modalClose: {
    marginTop: 16,
    alignSelf: 'center',
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
