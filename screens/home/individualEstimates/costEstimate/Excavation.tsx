import { View, Text, ScrollView } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import ButtonPrimary from '../../../../components/buttons/Button';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import Table from '../../../../components/lists/Table';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import { estimate_section_spacing } from '../../../../styles/global';

const Excavation: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
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

    const totalVolume = volume;

    const trips = Math.ceil(totalVolume / 56); // 56m³ per trip

    const totalCost = totalVolume * price;

    setTrips(String(trips));
    setTotalVolume(totalVolume.toFixed(2));
    setTotalCost(totalCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/excavation_c.jpg')}
      />

      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.excavation')}</Text>

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
            style={inputStyles.twoColumnInput}
            title={t('estimate.excavation.pricePerM3')}
            placeholder={t('common.enterPrice')}
            value={pricePerM3}
            onChange={(value) => setPricePerM3(value)}
          />
        </View>

        <ButtonPrimary
          title={t('estimate.calculate')}
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
        <Table
          columns={[
            { key: 'material', label: t('estimate.table.material'), align: 'left' },
            { key: 'quantity', label: t('estimate.table.quantity'), align: 'center' },
            { key: 'unit', label: t('estimate.table.unit'), align: 'right' },
          ]}
          data={[
            {
              material: t('estimate.excavation.totalVolume'),
              quantity: totalVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.excavation.trips'),
              quantity: trips || '-',
              unit: t('estimate.excavation.tripsUnit'),
            },
            {
              material: t('estimate.table.totalCost'),
              quantity: totalCost || '-',
              unit: 'FCFA',
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default Excavation;
