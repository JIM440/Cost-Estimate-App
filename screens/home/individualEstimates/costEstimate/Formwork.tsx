import { ScrollView, View, Text } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import Table from '../../../../components/lists/Table';
import ButtonPrimary from '../../../../components/buttons/Button';
import { ColumnLayouts } from '../../../../styles/components/cards';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import { estimate_section_spacing } from '../../../../styles/global';

const Formwork: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [calculating, setCalculating] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [formWorkPrice, setFormWorkPrice] = useState('');

  const [area, setArea] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculate = () => {
    if (length == '' || width == '' || formWorkPrice == '') {
      return;
    }

    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const pricePerM2 = parseFloat(formWorkPrice);

    const totalArea = wallLength * wallWidth;
    const totalCost = totalArea * pricePerM2;

    setArea(totalArea.toFixed(2));
    setTotalCost(totalCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/formwork_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.formwork')}</Text>
        <View style={ColumnLayouts.TwoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterLength')}
            title={t('common.lengthM')}
            value={length}
            onChange={(value) => setLength(value)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterWidth')}
            title={t('common.width')}
            value={width}
            onChange={(value) => setWidth(value)}
          />
        </View>
        <View style={inputStyles.twoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterPrice')}
            title={t('estimate.formwork.pricePerM2')}
            value={formWorkPrice}
            onChange={(value) => setFormWorkPrice(value)}
          />
        </View>
        <ButtonPrimary
          title={t('estimate.calculate')}
          style={{ marginBottom: estimate_section_spacing }}
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
        <Table
          columns={[
            { key: 'material', label: t('estimate.table.material') },
            { key: 'quantity', label: t('estimate.table.quantity') },
            { key: 'unit', label: t('estimate.table.unit') },
          ]}
          data={[
            { material: t('estimate.formwork.area'), quantity: area || '-', unit: 'm²' },
            { material: t('estimate.table.totalCost'), quantity: totalCost || '-', unit: 'FCFA' },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default Formwork;
