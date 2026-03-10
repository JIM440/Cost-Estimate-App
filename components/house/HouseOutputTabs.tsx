import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';

type SingleHouseTabId = 'All' | 'FoundationOutput' | 'ElevationOutput' | 'RoofingOutput';
type MultiHouseTabId = 'All' | 'FoundationOutput' | 'ElevationOutput' | 'DeckingOutput' | 'RoofingOutput';

export type HouseOutputTabId = SingleHouseTabId | MultiHouseTabId;

type HouseOutputTabsProps = {
  current: HouseOutputTabId;
  onChange: (tab: HouseOutputTabId) => void;
  styles: any;
  showDeckingTab?: boolean;
};

const HouseOutputTabs: React.FC<HouseOutputTabsProps> = ({
  current,
  onChange,
  styles,
  showDeckingTab = false,
}) => {
  const { colors } = useTheme();
  const { t } = useLocale();

  const renderTab = (id: HouseOutputTabId, label: string) => (
    <TouchableOpacity style={styles.tab} onPress={() => onChange(id)} key={id}>
      <Text
        style={
          current === id
            ? [styles.activeTabText, { color: colors.heading_text }]
            : [styles.tabText, { color: colors.muted_text }]
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabs}>
      {renderTab('All', t('house.all'))}
      {renderTab('FoundationOutput', t('house.foundation'))}
      {renderTab('ElevationOutput', t('house.elevation'))}
      {showDeckingTab && renderTab('DeckingOutput', t('house.decking'))}
      {renderTab('RoofingOutput', t('house.roofing'))}
    </View>
  );
};

export default HouseOutputTabs;

