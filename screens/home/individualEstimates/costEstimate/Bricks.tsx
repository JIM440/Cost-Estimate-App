import { ScrollView, View, Text } from 'react-native';
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

const Bricks: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [calculating, setCalculating] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [brickLength, setBrickLength] = useState('');
  const [brickWidth, setBrickWidth] = useState('');
  const [brickHeight, setBrickHeight] = useState('');
  const [subtractArea, setSubtractArea] = useState('');
  const [brickPrice, setBrickPrice] = useState('');
  const [cementRatio, setCementRatio] = useState('');
  const [sandRatio, setSandRatio] = useState('');

  const [dryVolumeConstant, setDryVolumeConstant] = useState('1.33');
  const [quantity, setQuantity] = useState('1');

  const [wallVolume, setWallVolume] = useState('');
  const [numOfBricks, setNumOfBricks] = useState('');
  const [dryMortarVolume, setDryMortarVolume] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [cementVolume, setCementVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [cementBags, setCementBags] = useState('');

  const calculate = () => {
    if (
      length == '' ||
      width == '' ||
      height == '' ||
      brickLength == '' ||
      brickWidth == '' ||
      brickHeight == '' ||
      subtractArea == '' ||
      cementRatio == '' ||
      sandRatio == '' ||
      brickPrice == ''
    ) {
      return;
    }

    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const wallHeight = parseFloat(height);
    const brickLengthValue = parseFloat(brickLength);
    const brickWidthValue = parseFloat(brickWidth);
    const brickHeightValue = parseFloat(brickHeight);
    const subtractAreaValue = parseFloat(subtractArea);
    const brickPriceValue = parseFloat(brickPrice);
    const SandRatio = parseFloat(sandRatio);
    const CementRatio = parseFloat(cementRatio);

    const qty = Math.max(1, parseFloat(quantity) || 1);
    const wallVolumeValue =
      (wallLength * wallHeight - subtractAreaValue) * wallWidth * qty;

    const brickVolume = brickLengthValue * brickWidthValue * brickHeightValue;
    const totalBrickVolume = wallVolumeValue;
    const brickNumber = Math.ceil((1.1 * totalBrickVolume) / brickVolume);

    const dryMortarVol = totalBrickVolume * (parseFloat(dryVolumeConstant) || 1.33);
    const mortarRatio = CementRatio + SandRatio;
    const sandVol = (dryMortarVol * SandRatio) / mortarRatio;
    const cementVol = (dryMortarVol * CementRatio) / mortarRatio;
    const cementWeightValue = cementVol * 1440;
    const cementBagsCount = Math.ceil(brickNumber / 35);

    const totalBrickCost = brickNumber * brickPriceValue;

    setWallVolume(totalBrickVolume.toFixed(2));
    setNumOfBricks(String(brickNumber));
    setDryMortarVolume(dryMortarVol.toFixed(2));
    setSandVolume(sandVol.toFixed(2));
    setCementVolume(cementVol.toFixed(2));
    setCementWeight(cementWeightValue.toFixed(2));
    setTotalCost(totalBrickCost.toFixed(2));
    setCementBags(String(cementBagsCount));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/block_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.bricks')}</Text>
        <Text style={{ color: colors.heading_text }}>{t('estimate.dimensionOfWall')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('common.lengthM')}
            placeholder={t('common.enterLength')}
            value={length}
            onChange={(text) => setLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('common.heightM')}
            placeholder={t('common.enterHeight')}
            value={height}
            onChange={(text) => setHeight(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('common.thicknessM')}
            placeholder={t('common.enterThickness')}
            value={width}
            onChange={(text) => setWidth(text)}
          />
        </View>
        <Line />
        <Text style={{ color: colors.heading_text }}>{t('estimate.dimensionOfBlock')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('common.lengthM')}
            placeholder={t('common.enterLength')}
            value={brickLength}
            onChange={(text) => setBrickLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('common.heightM')}
            placeholder={t('common.enterHeight')}
            value={brickHeight}
            onChange={(text) => setBrickHeight(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('common.thicknessM')}
            placeholder={t('common.enterThickness')}
            value={brickWidth}
            onChange={(text) => setBrickWidth(text)}
          />
        </View>
        <Line />
        <Text style={{ color: colors.heading_text }}>{t('estimate.mixRatio')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.cementRatio')}
            placeholder={t('estimate.cementRatio')}
            value={cementRatio}
            onChange={(text) => setCementRatio(text)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.sandRatio')}
            placeholder={t('estimate.sandRatio')}
            value={sandRatio}
            onChange={(text) => setSandRatio(text)}
          />
        </View>

        <Line />

        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.subtractArea')}
            placeholder={t('common.enterArea')}
            value={subtractArea}
            onChange={(text) => setSubtractArea(text)}
          />

          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.pricePerBrick')}
            placeholder={t('common.enterPrice')}
            value={brickPrice}
            onChange={(text) => setBrickPrice(text)}
          />
        </View>

        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('common.dryVolume')}
            placeholder={t('common.dryVolume')}
            value={dryVolumeConstant}
            onChange={(text) => setDryVolumeConstant(text)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('common.quantity')}
            placeholder={t('common.enterQuantity')}
            value={quantity}
            onChange={(text) => setQuantity(text)}
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
              material: t('estimate.table.totalWallVolume'),
              quantity: wallVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.table.dryMortarVolume'),
              quantity: dryMortarVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.table.sandVolume'),
              quantity: sandVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.table.cementVolume'),
              quantity: cementVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.table.cementBags'),
              quantity: cementBags || '-',
              unit: t('units.bags'),
            },
            {
              material: t('estimate.table.numOfBricks'),
              quantity: numOfBricks || '-',
              unit: t('units.bricks'),
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

export default Bricks;
