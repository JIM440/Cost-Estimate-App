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

const Block: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [calculating, setCalculating] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [blockLength, setBlockLength] = useState('');
  const [blockWidth, setBlockWidth] = useState('');
  const [blockHeight, setBlockHeight] = useState('');
  const [subtractArea, setSubtractArea] = useState('');
  const [blockPrice, setBlockPrice] = useState('');
  const [cementRatio, setCementRatio] = useState('');
  const [sandRatio, setSandRatio] = useState('');

  const [wallVolume, setWallVolume] = useState('');
  const [numOfBlocks, setNumOfBlocks] = useState('');
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
      blockLength == '' ||
      blockWidth == '' ||
      blockHeight == '' ||
      subtractArea == '' ||
      cementRatio == '' ||
      sandRatio == '' ||
      blockPrice == ''
    ) {
      return;
    }

    // Convert inputs to numbers
    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const wallHeight = parseFloat(height);
    const blockLengthValue = parseFloat(blockLength);
    const blockWidthValue = parseFloat(blockWidth);
    const blockHeightValue = parseFloat(blockHeight);
    const subtractAreaValue = parseFloat(subtractArea);
    const blockPriceValue = parseFloat(blockPrice);
    const SandRatio = parseFloat(sandRatio);
    const CementRatio = parseFloat(cementRatio);

    // Calculate wall volume
    const wallVolumeValue =
      (wallLength * wallHeight - subtractAreaValue) * wallWidth;

    // Calculate number of blocks
    const blockVolume = blockLengthValue * blockWidthValue * blockHeightValue;
    const totalBlockVolume = wallVolumeValue;
    const blockNumber = Math.ceil((1.1 * totalBlockVolume) / blockVolume); //wastage volume

    // Calculate dry mortar volume, assuming standard 1:3 mortar mix
    const dryMortarVol = totalBlockVolume * 1.54;

    const mortarRatio = CementRatio + SandRatio;
    // Calculate sand volume
    const sandVol = (dryMortarVol * SandRatio) / mortarRatio;

    // Calculate cement volume and weight, assuming density of cement as 1440 kg/m³
    const cementVol = (dryMortarVol * CementRatio) / mortarRatio;
    const cementWeightValue = cementVol * 1440;
    // assuming 1 bag =
    const cementBags = Math.ceil(blockNumber / 35);

    // Calculate total cost
    const totalBlockCost = blockNumber * blockPriceValue;

    // Update state with results
    setWallVolume(totalBlockVolume.toFixed(2));
    setNumOfBlocks(String(blockNumber));
    setDryMortarVolume(dryMortarVol.toFixed(2));
    setSandVolume(sandVol.toFixed(2));
    setCementVolume(cementVol.toFixed(2));
    setCementWeight(cementWeightValue.toFixed(2));
    setTotalCost(totalBlockCost.toFixed(2));
    setCementBags(String(cementBags));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/block_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.block')}</Text>
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
            value={blockLength}
            onChange={(text) => setBlockLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('common.heightM')}
            placeholder={t('common.enterHeight')}
            value={blockHeight}
            onChange={(text) => setBlockHeight(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('common.thicknessM')}
            placeholder={t('common.enterThickness')}
            value={blockWidth}
            onChange={(text) => setBlockWidth(text)}
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
            title={t('estimate.pricePerBlock')}
            placeholder={t('common.enterPrice')}
            value={blockPrice}
            onChange={(text) => setBlockPrice(text)}
          />
        </View>

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
              material: t('estimate.table.numOfBlocks'),
              quantity: numOfBlocks || '-',
              unit: t('units.blocks'),
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

export default Block;
