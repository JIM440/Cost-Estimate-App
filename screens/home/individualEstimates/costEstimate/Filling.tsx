import { View, Text, ScrollView } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import { createTableStyles } from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/buttons/Button';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import { estimate_section_spacing } from '../../../../styles/global';

const Filling: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const tableStyles = React.useMemo(() => createTableStyles(colors), [colors]);
  const [calculating, setCalculating] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
  const [trips, setTrips] = useState('');
  const [totalVolume, setTotalVolume] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculateCostEstimate = () => {
    if (length == '' || width == '' || height == '' || pricePerM3 == '') {
      return;
    }
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const price = parseFloat(pricePerM3);

    const volume = l * w * h;

    const totalVolume = volume + 0.3 * volume;

    const trips = Math.ceil(totalVolume / 56); // 56m³ per trip

    const totalCost = trips * price;

    setTrips(trips.toFixed(1));
    setTotalVolume(totalVolume.toFixed(2));
    setTotalCost(totalCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/filling_c.jpg')}
      />

      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.filling')}</Text>

        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterLength')}
            title={t('common.lengthM')}
            value={length}
            onChange={(value) => setLength(value)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterWidth')}
            title={t('common.width')}
            value={width}
            onChange={(value) => setWidth(value)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.depth')}
            title={t('common.depth')}
            value={height}
            onChange={(value) => setHeight(value)}
          />
        </View>

        <View style={inputStyles.twoColumn}>
          <TextInputTitle
            style={inputStyles.oneColumnInput}
            title={t('estimate.filling.pricePerTrip')}
            placeholder={t('common.enterPrice')}
            value={pricePerM3}
            onChange={(value) => setPricePerM3(value)}
          />
        </View>

        <ButtonPrimary
          title={t('estimate.calculate')}
          style={{ marginBottom: estimate_section_spacing }}
          onPress={() => {
            setCalculating(true);
            setTimeout(() => {
              calculateCostEstimate();
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.filling.totalVolume')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{totalVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.filling.trips')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{trips}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.excavation.tripsUnit')}</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.table.totalCost')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{totalCost}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Filling;
