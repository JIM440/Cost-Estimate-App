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
import { computeFullRoofEstimate, DEFAULT_ROOF_MATERIAL_CONFIG } from '../../../../domain/roof/roofing';

const Roofing: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [houseLength, setHouseLength] = useState('');
  const [houseWidth, setHouseWidth] = useState('');
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const [span, setSpan] = useState('');
  const [sheetUnitPrice, setSheetUnitPrice] = useState('');
  const [boardUnitPrice, setBoardUnitPrice] = useState('');
  const [purlinUnitPrice, setPurlinUnitPrice] = useState('');
  const [rafterUnitPrice, setRafterUnitPrice] = useState('');
  const [wastePercent, setWastePercent] = useState('0.05');

  const [roofResult, setRoofResult] = useState<ReturnType<typeof computeFullRoofEstimate> | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculateRoofingEstimate = () => {
    const L = parseFloat(houseLength);
    const W = parseFloat(houseWidth);
    const R = parseFloat(rise);
    const Ru = parseFloat(run);
    const S = parseFloat(span);

    const sheetPrice = parseFloat(sheetUnitPrice);
    const boardPrice = parseFloat(boardUnitPrice);
    const purlinPrice = parseFloat(purlinUnitPrice);
    const rafterPrice = parseFloat(rafterUnitPrice);
    const waste = parseFloat(wastePercent || '0');

    if (!L || !W || !R || !Ru || !S || L <= 0 || W <= 0 || R <= 0 || Ru <= 0 || S <= 0) {
      // Basic validation
      return;
    }

    const result = computeFullRoofEstimate(
      {
        houseLength: L,
        houseWidth: W,
        rise: R,
        run: Ru,
        span: S,
        roofType: 'gable',
      },
      {
        sheetUnitPrice: sheetPrice || 0,
        boardUnitPrice: boardPrice || 0,
        purlinUnitPrice: purlinPrice || 0,
        rafterUnitPrice: rafterPrice || 0,
        wastePercent: Number.isNaN(waste) ? 0 : waste,
      },
      DEFAULT_ROOF_MATERIAL_CONFIG
    );

    setRoofResult(result);
  };

  // Calculate the total cost if roofResult exists - handles undefined gracefully
  const getTotalCost = () => {
    if (!roofResult || !roofResult.costs) return '-';
    const { sheetCost = 0, boardCost = 0, purlinCost = 0, rafterCost = 0 } = roofResult.costs as any;
    const total = [sheetCost, boardCost, purlinCost, rafterCost]
      .map((v) => (typeof v === 'number' && !isNaN(v) ? v : 0))
      .reduce((a, b) => a + b, 0);
    return total.toFixed(2);
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/roof_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.roofing')}</Text>
        <>
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('house.input.houseLengthM')}
              placeholder={t('common.enterLength')}
              value={houseLength}
              onChange={(text) => setHouseLength(text)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('house.input.houseWidthM')}
              placeholder={t('common.enterWidth')}
              value={houseWidth}
              onChange={(text) => setHouseWidth(text)}
            />
          </View>
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              title={t('estimate.roofing.rise')}
              placeholder={t('common.enterRise')}
              value={rise}
              onChange={(text) => setRise(text)}
            />
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              title={t('estimate.roofing.run')}
              placeholder={t('common.enterRun')}
              value={run}
              onChange={(text) => setRun(text)}
            />
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              title={t('estimate.roofing.span')}
              placeholder={t('common.enterSpan')}
              value={span}
              onChange={(text) => setSpan(text)}
            />
          </View>
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.oneColumnInput}
              title={t('estimate.roofing.pricePerSheet')}
              placeholder={t('common.enterPricePerSheet')}
              value={sheetUnitPrice}
              onChange={(text) => setSheetUnitPrice(text)}
            />
            <TextInputTitle
              style={inputStyles.oneColumnInput}
              title="Ceiling board unit price"
              placeholder={t('common.enterPrice')}
              value={boardUnitPrice}
              onChange={(text) => setBoardUnitPrice(text)}
            />
          </View>
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.oneColumnInput}
              title="Purlin unit price"
              placeholder={t('common.enterPrice')}
              value={purlinUnitPrice}
              onChange={(text) => setPurlinUnitPrice(text)}
            />
            <TextInputTitle
              style={inputStyles.oneColumnInput}
              title="Rafter unit price"
              placeholder={t('common.enterPrice')}
              value={rafterUnitPrice}
              onChange={(text) => setRafterUnitPrice(text)}
            />
          </View>
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.oneColumnInput}
              title="Waste factor (%)"
              placeholder="e.g. 0.05 for 5%"
              value={wastePercent}
              onChange={(text) => setWastePercent(text)}
            />
          </View>
        </>
        <ButtonPrimary
          title={t('estimate.calculate')}
          style={{ marginBottom: estimate_section_spacing }}
          onPress={() => {
            setCalculating(true);
            setTimeout(() => {
              calculateRoofingEstimate();
              setTimeout(() => setCalculating(false), 400);
            }, 0);
          }}
          loading={calculating}
        />
        <Line />
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('estimate.roofing.output')}</Text>
        <Table
          columns={[
            { key: 'material', label: t('estimate.table.material'), align: 'left' },
            { key: 'quantity', label: t('estimate.table.quantity'), align: 'center' },
            { key: 'unit', label: t('estimate.table.unit'), align: 'right' },
          ]}
          data={[
            {
              material: t('estimate.roofing.ceilingBoards'),
              quantity: roofResult ? roofResult.materials.numberOfBoards : '-',
              unit: 'Boards',
            },
            {
              material: t('estimate.roofing.ceilingBoardsCost') || 'Ceiling Board Cost',
              quantity:
                roofResult?.costs && typeof roofResult.costs.boardCost === 'number'
                  ? roofResult.costs.boardCost.toFixed(2)
                  : '-',
              unit: 'FCFA',
            },
            {
              material: t('estimate.roofing.roofingSheets'),
              quantity: roofResult ? roofResult.materials.numberOfSheets : '-',
              unit: 'Sheets',
            },
            {
              material: t('estimate.roofing.sheetsCost'),
              quantity: roofResult?.costs ? roofResult.costs.sheetCost.toFixed(2) : '-',
              unit: 'FCFA',
            },
            {
              material: t('estimate.roofing.purlins'),
              quantity: roofResult ? roofResult.materials.numberOfPurlins : '-',
              unit: 'Purlins',
            },
            {
              material: t('estimate.roofing.purlinsCost') || 'Purlin Cost',
              quantity:
                roofResult?.costs && typeof roofResult.costs.purlinCost === 'number'
                  ? roofResult.costs.purlinCost.toFixed(2)
                  : '-',
              unit: 'FCFA',
            },
            {
              material: t('estimate.roofing.rafters'),
              quantity: roofResult ? roofResult.materials.numberOfRafters : '-',
              unit: t('estimate.roofing.raftersUnit'),
            },
            {
              material: t('estimate.roofing.raftersCost') || 'Rafter Cost',
              quantity:
                roofResult?.costs && typeof roofResult.costs.rafterCost === 'number'
                  ? roofResult.costs.rafterCost.toFixed(2)
                  : '-',
              unit: 'FCFA',
            },
            {
              material: t('estimate.roofing.totalCost') || 'Total Cost',
              quantity: getTotalCost(),
              unit: 'FCFA',
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default Roofing;
