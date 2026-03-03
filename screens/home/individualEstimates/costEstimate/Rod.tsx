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

const Rod: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [calculating, setCalculating] = useState(false);
  const [length, setLength] = useState('');
  const [diameter, setDiameter] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [pieces, setPieces] = useState('');

  const [weight, setWeight] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [volume, setVolume] = useState('');

  const calculate = () => {
    if (length == '' || diameter == '' || pricePerKg == '' || pieces == '') {
      return;
    }
    // Convert inputs to numbers
    const rodLength = parseFloat(length);
    const rodDiameter = parseFloat(diameter);
    const rodPricePerKg = parseFloat(pricePerKg);
    const rodPieces = parseInt(pieces);

    // Calculate weight of one rod in kg
    const rodWeight = (rodDiameter * rodDiameter * rodLength) / 162;

    // Calculate total weight for all pieces
    const totalWeight = rodWeight * rodPieces;

    // Calculate total cost
    const totalRodCost = totalWeight * rodPricePerKg;

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
        source={require('../../../../assets/images/individual_estiamte/rods_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.rods')}</Text>
        <TextInputTitle
          title={t('estimate.rod.diameter')}
          placeholder={t('common.enterDiameter')}
          value={diameter}
          onChange={(value) => setDiameter(value)}
        />
        <TextInputTitle
          title={t('estimate.rod.length')}
          placeholder={t('common.enterLength')}
          value={length}
          onChange={(value) => setLength(value)}
        />

        <TextInputTitle
          title={t('estimate.rod.numPieces')}
          placeholder={t('common.enterPieces')}
          value={pieces}
          onChange={(value) => setPieces(value)}
        />

        <TextInputTitle
          title={t('estimate.rod.pricePerKg')}
          placeholder={t('common.enterPricePerKg')}
          value={pricePerKg}
          onChange={(value) => setPricePerKg(value)}
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
