import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import StackHeader from '../../../../components/StackHeader';
import ScreenWrapper from '../../../../components/ScreenWrapper';
import GuideCard from '../../../../components/cards/GuideCard';
import { containerStyles, titleStyles } from '../../../../styles/utility';
import { useTheme } from '../../../../context/ThemeContext';
import { useLocale } from '../../../../context/LocaleContext';

const ColumnConcreteIcon = require('../../../../assets/images/individual_estimate/column_concrete.png');

export default function ConcreteMenuScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLocale();

  const cards = [
    {
      key: 'column',
      title: t('estimate.concrete.type.column'),
      route: '/concrete/column',
    },
    {
      key: 'footing',
      title: t('estimate.concrete.type.footing'),
      route: '/concrete/footing',
    },
    {
      key: 'beam',
      title: t('estimate.concrete.type.beam'),
      route: '/concrete/beam',
    },
    {
      key: 'wall',
      title: t('estimate.concrete.type.wall'),
      route: '/concrete/wall',
    },
    {
      key: 'slab',
      title: t('estimate.concrete.type.slab'),
      route: '/concrete/slab',
    },
    {
      key: 'circularColumn',
      title: t('estimate.concrete.type.circularColumn'),
      route: '/concrete/circular-column',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader titleKey="items.columnConcrete" />
      <ScreenWrapper>
        <View style={[containerStyles.container, { backgroundColor: colors.screen_background }]}>
          <View style={{marginTop:8}}/>
          {cards.map((card) => (
            <GuideCard
              key={card.key}
              title={String(card.title || '')}
              left={
                <View style={styles.iconWrapper}>
                  <Image source={ColumnConcreteIcon} style={styles.icon} />
                </View>
              }
              onPress={() => router.push(card.route)}
            />
          ))}
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

