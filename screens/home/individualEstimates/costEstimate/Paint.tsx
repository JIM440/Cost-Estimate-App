import { ScrollView, View, Text } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import ButtonPrimary from '../../../../components/buttons/Button';
import { ColumnLayouts } from '../../../../styles/components/cards';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import Table from '../../../../components/lists/Table';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import { estimate_section_spacing } from '../../../../styles/global';

const Paint: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [calculating, setCalculating] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [subtractArea, setSubtractArea] = useState('');
  const [numCoats, setNumCoats] = useState('');
  const [coveragePerLiter, setCoveragePerLiter] = useState('');
  const [paintPricePerLiter, setPaintPricePerLiter] = useState('');

  const [areaToPaint, setAreaToPaint] = useState('');
  const [totalLiters, setTotalLiters] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculate = () => {
    if (
      length == '' ||
      width == '' ||
      subtractArea == '' ||
      numCoats == '' ||
      coveragePerLiter == '' ||
      paintPricePerLiter == ''
    ) {
      return;
    }

    //convert inouts to numbers
    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const areaToSubtract = parseFloat(subtractArea);
    const coats = parseFloat(numCoats);
    const coverage = parseFloat(coveragePerLiter);
    const pricePerLiter = parseFloat(paintPricePerLiter);

    //calculate area to be painted
    const totalArea = wallLength * wallWidth - areaToSubtract;
    setAreaToPaint(totalArea.toFixed(2));

    // calculate total liters of paint required
    const litersRequired = (totalArea / coverage) * coats;
    setTotalLiters(litersRequired.toFixed(1));

    // calculate total costs of paint
    const cost = litersRequired * pricePerLiter;
    setTotalCost(cost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/paint_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.paint')}</Text>
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
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          placeholder={t('estimate.paint.subtractArea')}
          title={t('estimate.subtractArea')}
          value={subtractArea}
          onChange={(value) => setSubtractArea(value)}
        />
        <Line />
        <View style={ColumnLayouts.TwoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterCoats')}
            title={t('estimate.paint.numCoats')}
            value={numCoats}
            onChange={(value) => setNumCoats(value)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterCoverage')}
            title={t('estimate.paint.coveragePerLiter')}
            value={coveragePerLiter}
            onChange={(value) => setCoveragePerLiter(value)}
          />
        </View>
        <View style={inputStyles.twoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterPricePerLiter')}
            title={t('common.pricePerLiter')}
            value={paintPricePerLiter}
            onChange={(value) => {
              setPaintPricePerLiter(value);
            }}
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
            { key: 'material', label: t('estimate.table.material'), align: 'left' },
            { key: 'quantity', label: t('estimate.table.quantity'), align: 'center' },
            { key: 'unit', label: t('estimate.table.unit'), align: 'right' },
          ]}
          data={[
            {
              material: t('estimate.paint.areaToPaint'),
              quantity: areaToPaint || '-',
              unit: 'm²',
            },
            {
              material: t('estimate.paint.numLiters'),
              quantity: totalLiters || '-',
              unit: 'L',
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

export default Paint;
