import { ScrollView, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { createTableStyles } from '../../../../styles/components/table';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import ButtonPrimary from '../../../../components/buttons/Button';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';

const Foundation: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const tableStyles = React.useMemo(() => createTableStyles(colors), [colors]);
  const [calculating, setCalculating] = useState(false);
  const [bearingCapacity, setBearingCapacity] = useState('');
  const [densityOfSoil, setDensityOfSoil] = useState('');
  const [angleOfResponse, setAngleOfResponse] = useState('');
  const [depth, setDepth] = useState('');

  const calculate = () => {
    // Calculate depth of foundation
    if (densityOfSoil == '' || bearingCapacity == '' || angleOfResponse == '') {
      return;
    }

    const depthResult =
      (parseFloat(bearingCapacity) / parseFloat(densityOfSoil)) *
      Math.pow(
        (1 - Math.sin((parseFloat(angleOfResponse) * Math.PI) / 180)) /
          (1 + Math.sin((parseFloat(angleOfResponse) * Math.PI) / 180)),
        2
      );
    setDepth(depthResult.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.foundationDepth')}</Text>

        <TextInputTitle
          title={t('estimate.foundation.bearingCapacity')}
          placeholder={t('common.enterValue')}
          value={bearingCapacity}
          onChange={(value) => setBearingCapacity(value)}
        />
        <TextInputTitle
          title={t('estimate.foundation.densityOfSoil')}
          placeholder={t('common.enterDensity')}
          value={densityOfSoil}
          onChange={(value) => setDensityOfSoil(value)}
        />
        <TextInputTitle
          title={t('estimate.foundation.angleOfResponse')}
          placeholder={t('common.enterAngle')}
          value={angleOfResponse}
          onChange={(value) => setAngleOfResponse(value)}
        />

        <ButtonPrimary
          title={t('estimate.calculate')}
          onPress={() => {
            setCalculating(true);
            setTimeout(() => {
              calculate();
              setTimeout(() => setCalculating(false), 400);
            }, 0);
          }}
          loading={calculating}
        />

        <Line />
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('estimate.output')}</Text>

        <View style={tableStyles.container}>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('estimate.table.material')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('estimate.table.quantity')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('estimate.table.unit')}</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.foundation.depthOutput')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{depth}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Foundation;
