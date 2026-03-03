import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Map legacy English labels (from projects saved before translation keys) to translation keys
const LEGACY_LABEL_KEYS: Record<string, string> = {
  'Total Dry Concrete Volume': 'projects.summary.totalDryConcreteVolume',
  'Total Dry Mortar Volume': 'projects.summary.totalDryMortarVolume',
  'Dry Concrete Volume (Foundation + Elevation)': 'projects.summary.dryConcreteFoundationElevation',
  'Dry Mortar Volume': 'projects.summary.dryMortarVolume',
  'Roofing Boards': 'projects.summary.roofingBoards',
};
const LEGACY_UNIT_KEYS: Record<string, string> = {
  Boards: 'projects.summary.unitBoards',
};

function getTranslatedLabel(label: string, t: (k: string) => string): string {
  if (label.startsWith('projects.')) return t(label);
  return LEGACY_LABEL_KEYS[label] ? t(LEGACY_LABEL_KEYS[label]) : label;
}

function getTranslatedUnit(unit: string | undefined, t: (k: string) => string): string {
  if (!unit) return '';
  if (unit.startsWith('projects.')) return t(unit);
  return LEGACY_UNIT_KEYS[unit] ? t(LEGACY_UNIT_KEYS[unit]) : unit;
}

export interface ProjectSummaryItem {
  label: string;
  value: string | number;
  unit?: string;
}

export interface ProjectCardProps {
  title: string;
  createdAt: string | Date;
  summary?: ProjectSummaryItem[];
  onPress?: () => void;
  onExport?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  createdAt,
  summary,
  onPress,
  onExport,
  onEdit,
  onDelete,
}) => {
  const { colors } = useTheme();
  const { t, language } = useLocale();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  const usePressable = !!(onPress || onDelete);
  const Wrapper: React.ComponentType<any> = usePressable ? Pressable : View;
  const wrapperProps: Record<string, any> = {};
  if (onPress) wrapperProps.onPress = onPress;
  if (onDelete) wrapperProps.onLongPress = () => onDelete();

  return (
    <Wrapper
      {...wrapperProps}
      style={[styles.card, { backgroundColor: colors.card }]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <Feather
            name="file-text"
            size={18}
            color={colors.primary_color}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.cardTitle, { color: colors.heading_text }]}>
            {title}
          </Text>
        </View>
        {(onExport || onEdit || onDelete) ? (
          <Pressable hitSlop={8} onPress={() => setMenuVisible(true)}>
            <Feather name="more-vertical" size={18} color={colors.muted_text} />
          </Pressable>
        ) : null}
      </View>
      <Text style={[styles.cardMeta, { color: colors.muted_text }]}>
        {new Date(createdAt).toLocaleString(language)}
      </Text>
      {summary?.slice(0, 3).map((s) => (
        <View key={s.label} style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.muted_text }]}>
            {getTranslatedLabel(s.label, t)}
          </Text>
          <Text style={[styles.summaryValue, { color: colors.heading_text }]}>
            {s.value}
            {s.unit ? ` ${getTranslatedUnit(s.unit, t)}` : ''}
          </Text>
        </View>
      ))}

      <Modal
        transparent
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.menuOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={[StyleSheet.absoluteFill, styles.menuOverlayDim]} />
          <Pressable style={[styles.menuSheet, { backgroundColor: colors.card }]} onPress={() => {}}>
            <View style={[styles.menuHandle, { backgroundColor: colors.muted_text }]} />
            <View
              style={[
                styles.menuContainer,
                { paddingBottom: Math.max(32, insets.bottom + 16) },
              ]}
            >
              {onExport && (
                <TouchableOpacity
                  style={[styles.menuItem, { borderBottomColor: colors.borderColor }]}
                  onPress={() => {
                    setMenuVisible(false);
                    onExport();
                  }}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="file-pdf-box"
                    size={24}
                    color={colors.primary_color}
                    style={styles.menuIcon}
                  />
                  <Text style={[styles.menuLabel, { color: colors.heading_text }]}>
                    {t('projects.card.exportPdf')}
                  </Text>
                  <Feather name="chevron-right" size={18} color={colors.muted_text} />
                </TouchableOpacity>
              )}
              {onEdit && (
                <TouchableOpacity
                  style={[styles.menuItem, { borderBottomColor: colors.borderColor }]}
                  onPress={() => {
                    setMenuVisible(false);
                    onEdit();
                  }}
                  activeOpacity={0.7}
                >
                  <Feather
                    name="edit-2"
                    size={22}
                    color={colors.heading_text}
                    style={styles.menuIcon}
                  />
                  <Text style={[styles.menuLabel, { color: colors.heading_text }]}>{t('projects.card.edit')}</Text>
                  <Feather name="chevron-right" size={18} color={colors.muted_text} />
                </TouchableOpacity>
              )}
              {onDelete && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    onDelete();
                  }}
                  activeOpacity={0.7}
                >
                  <Feather
                    name="trash-2"
                    size={22}
                    color={colors.error_red}
                    style={styles.menuIcon}
                  />
                  <Text style={[styles.menuLabel, { color: colors.error_red }]}>{t('projects.card.delete')}</Text>
                  <Feather name="chevron-right" size={18} color={colors.muted_text} />
                </TouchableOpacity>
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    flexShrink: 1,
  },
  cardMeta: {
    fontSize: 11,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  summaryLabel: {
    fontSize: 13,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  menuOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  menuOverlayDim: {
    backgroundColor: 'rgba(15,23,42,0.5)',
  },
  menuSheet: {
    width: SCREEN_WIDTH,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  menuHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
    opacity: 0.4,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProjectCard;

