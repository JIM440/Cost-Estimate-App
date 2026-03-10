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

const Rod: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [calculating, setCalculating] = useState(false);
  const [length, setLength] = useState('');
  const [diameter, setDiameter] = useState('');
  const [pricePer12m, setPricePer12m] = useState('');
  const [pieces, setPieces] = useState('');

  const [weight, setWeight] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [volume, setVolume] = useState('');

  const calculate = () => {
    if (length == '' || diameter == '' || pricePer12m == '' || pieces == '') {
      return;
    }
    // Convert inputs to numbers
    const rodLength = parseFloat(length);
    const rodDiameter = parseFloat(diameter);
    const rodPricePer12m = parseFloat(pricePer12m);
    const rodPieces = parseInt(pieces);

    // Calculate weight of one rod in kg
    const rodWeight = (rodDiameter * rodDiameter * rodLength) / 162;

    // Calculate total weight for all pieces
    const totalWeight = rodWeight * rodPieces;

    // Total length in m; number of 12 m equivalent rods
    const totalLengthM = rodLength * rodPieces;
    const num12mRods = totalLengthM / 12;
    const totalRodCost = num12mRods * rodPricePer12m;

    // Calculate volume of one piece assuming rod as a cylinder
    const rodVolume = Math.PI * Math.pow(rodDiameter / 2000, 2) * rodLength;

    // Update state with results
    setWeight(totalWeight.toFixed(2)); // Round to 2 decimal places
    setTotalCost(totalRodCost.toFixed(2));
    setVolume(rodVolume.toFixed(3));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/rods_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.rods')}</Text>
        <View style={inputStyles.twoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.rod.diameter')}
            placeholder={t('common.enterDiameter')}
            value={diameter}
            onChange={(value) => setDiameter(value)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.rod.length')}
            placeholder={t('common.enterLength')}
            value={length}
            onChange={(value) => setLength(value)}
          />
        </View>
        <View style={inputStyles.twoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.rod.numPieces')}
            placeholder={t('common.enterPieces')}
            value={pieces}
            onChange={(value) => setPieces(value)}
          />
          <TextInputTitle
             style={inputStyles.oneColumnInput}
            title={t('estimate.rod.pricePer12m')}
            placeholder={t('common.enterPricePer12m')}
            value={pricePer12m}
            onChange={(value) => setPricePer12m(value)}
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
              material: t('estimate.rod.weight'),
              quantity: weight || '-',
              unit: 'kg',
            },
            {
              material: t('estimate.rod.volumeOfPiece'),
              quantity: volume || '-',
              unit: 'm³',
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

export default Rod;
