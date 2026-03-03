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

const Roofing: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [houseLength, setHouseLength] = useState('');
  const [houseWidth, setHouseWidth] = useState('');
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const [span, setSpan] = useState('');
  const [roofingEstimate, setRoofingEstimate] = useState<{
    numberOfCeilingBoards?: number;
    numberOfRoofingSheets?: number;
    numberOfPurlins?: number;
    numberOfBoards?: number;
  }>({});
  const [calculating, setCalculating] = useState(false);

  const calculateRoofingEstimate = () => {
    const L = parseFloat(houseLength);
    const W = parseFloat(houseWidth);
    const R = parseFloat(rise);
    const Ru = parseFloat(run);
    const S = parseFloat(span);

    const rafterLength = Math.sqrt(Math.pow(R, 2) + Math.pow(Ru, 2));
    const pitch = R / Ru;
    const pitchInDegrees = Math.atan(pitch) * (180 / Math.PI);
    const numberOfRafters = Math.ceil(L / S) + 1;
    const totalNumberOfRafters = numberOfRafters * rafterLength * 2;
    const numberOfRisers = Math.ceil(L / S) + 1;
    const totalNumberOfRisers = numberOfRisers * R * 2;
    const chaining = (W * L) / 4;
    const baseArea = W * L;
    const areaOfRoofing = baseArea / Math.cos(pitchInDegrees * (Math.PI / 180));
    const sheet = Math.ceil(areaOfRoofing / 30);
    const ceiling = Math.ceil(baseArea / 32);
    const purlin = Math.ceil((rafterLength * L) / 0.9);
    const boards = Math.ceil(
      totalNumberOfRafters + totalNumberOfRisers + chaining
    );

    setRoofingEstimate({
      numberOfCeilingBoards: ceiling,
      numberOfRoofingSheets: sheet,
      numberOfBoards: boards,
      numberOfPurlins: purlin,
    });
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/roof_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.roofing')}</Text>
        <>
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.roofing.length')}
              placeholder={t('common.enterLength')}
              value={houseLength}
              onChange={(text) => setHouseLength(text)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.roofing.width')}
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
        </>
        <ButtonPrimary
          title={t('estimate.calculate')}
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
              quantity: roofingEstimate.numberOfCeilingBoards ?? '-',
              unit: 'Boards',
            },
            {
              material: t('estimate.roofing.roofingSheets'),
              quantity: roofingEstimate.numberOfRoofingSheets ?? '-',
              unit: 'Sheets',
            },
            {
              material: t('estimate.roofing.purlins'),
              quantity: roofingEstimate.numberOfPurlins ?? '-',
              unit: 'Purlins',
            },
            {
              material: t('estimate.roofing.boards'),
              quantity: roofingEstimate.numberOfBoards ?? '-',
              unit: 'Boards',
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default Roofing;
