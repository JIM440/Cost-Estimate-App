import { ScrollView, View, Text } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { containerStyles, Line, titleStyles } from '../../../../styles/utility';
import ButtonPrimary from '../../../../components/buttons/Button';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import { createTableStyles } from '../../../../styles/components/table';
import { inputStyles } from '../../../../styles/components/inputStyles';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import { estimate_section_spacing } from '../../../../styles/global';

const HollowSlab: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const tableStyles = React.useMemo(() => createTableStyles(colors), [colors]);
  const [calculating, setCalculating] = useState(false);
  const [HBSlabLength, setHBSlabLength] = useState('');
  const [HBSlabWidth, setHBSlabWidth] = useState('');
  const [HBSlabThickness, setHBSlabThickness] = useState('');

  const [cementRatio, setCementRatio] = useState('');
  const [sandRatio, setSandRatio] = useState('');
  const [gravelRatio, setGravelRatio] = useState('');
  const [dryVolumeConstant, setDryVolumeConstant] = useState('');

  const [HBSlabSpan, setHBSlabSpan] = useState('');
  const [HBSlabBlockLength, setHBSlabBlockLength] = useState('');
  const [HBSlabBlockWidth, setHBSlabBlockWidth] = useState('');
  const [HBSlabEstimate, setHBSlabEstimate] = useState({
    concreteVolume: '',
    numBlocks: '',
    num12mRods: '',
    dryVol: '',
    sandVol: '',
    cementVol: '',
    gravelVol: '',
    numBagsCement: '',
  });

  const HBEstimate = () => {
    const areaOfSlab = parseFloat(HBSlabLength) * parseFloat(HBSlabWidth);
    const areaOfBlock =
      parseFloat(HBSlabBlockLength) * parseFloat(HBSlabBlockWidth);

    const CementRatio = parseFloat(cementRatio);
    const SandRatio = parseFloat(sandRatio);
    const GravelRatio = parseFloat(gravelRatio);

    const ConcreteRatio = CementRatio + SandRatio + GravelRatio;

    const numBlocks = Math.ceil(areaOfSlab / areaOfBlock);
    const concreteVolume = areaOfSlab * parseFloat(HBSlabThickness); // Convert to cubic meters (0.4 cm to meters)
    // const concreteVolume = areaOfSlab * 0.004; // Convert to cubic meters (0.4 cm to meters)

    const numRods = parseFloat(HBSlabSpan) / parseFloat(HBSlabBlockWidth);
    const num12mRods = (numRods * parseFloat(HBSlabWidth)) / 12; // Assuming rods are 12 meters long

    const dryVol = concreteVolume * (parseFloat(dryVolumeConstant) || 1.54); // Dry volume of concrete

    const gravelVol = (dryVol * GravelRatio) / ConcreteRatio;

    // Calculate volumes based on ratio
    const cementVol = (dryVol * CementRatio) / ConcreteRatio;
    const sandVol = (dryVol * SandRatio) / ConcreteRatio;

    // Calculate number of bags of cement
    const densityOfCement = 1440; // Density of cement in kg/m³
    const numBagsCement = Math.ceil((cementVol * densityOfCement) / 50); // Assuming 1 bag = 50 kg

    const estimatedData = {
      concreteVolume: concreteVolume.toFixed(2),
      numBlocks: String(numBlocks),
      num12mRods: String(Math.ceil(num12mRods)),
      dryVol: dryVol.toFixed(2),
      sandVol: sandVol.toFixed(2),
      cementVol: cementVol.toFixed(2),
      gravelVol: gravelVol.toFixed(2),
      numBagsCement: String(numBagsCement),
    };

    setHBSlabEstimate(estimatedData);
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/hollow_slab_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('estimate.hollowslab.title')}</Text>
        <Text style={[titleStyles.title, { color: colors.heading_text }]}>{t('estimate.hollowslab.slabDimensions')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterLength')}
            value={HBSlabLength}
            title={t('estimate.hollowslab.length')}
            onChange={(text) => setHBSlabLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterWidth')}
            value={HBSlabWidth}
            title={t('estimate.hollowslab.width')}
            onChange={(text) => setHBSlabWidth(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterThickness')}
            value={HBSlabThickness}
            title={t('estimate.hollowslab.thickness')}
            onChange={(text) => setHBSlabThickness(text)}
          />
        </View>
        <Line />

        <Text style={[titleStyles.title, { color: colors.heading_text }]}>{t('estimate.hollowslab.blockDimensions')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterLength')}
            value={HBSlabBlockLength}
            title={t('estimate.hollowslab.blockLength')}
            onChange={(text) => setHBSlabBlockLength(text)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterWidth')}
            value={HBSlabBlockWidth}
            title={t('estimate.hollowslab.blockWidth')}
            onChange={(text) => setHBSlabBlockWidth(text)}
          />
        </View>

        <Line />

        <Text style={{ color: colors.heading_text }}>{t('estimate.mixRatio')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('estimate.cementRatio')}
            value={cementRatio}
            title={t('estimate.cementRatio')}
            onChange={(text) => setCementRatio(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('estimate.sandRatio')}
            value={sandRatio}
            title={t('estimate.sandRatio')}
            onChange={(text) => setSandRatio(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.gravelRatio')}
            value={gravelRatio}
            title={t('common.gravelRatio')}
            onChange={(text) => setGravelRatio(text)}
          />
        </View>
        <Line />
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterSpan')}
            value={HBSlabSpan}
            title={t('estimate.hollowslab.span')}
            onChange={(text) => setHBSlabSpan(text)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.dryVolume')}
            value={dryVolumeConstant}
            title={t('common.dryVolume')}
            onChange={(text) => setDryVolumeConstant(text)}
          />
        </View>
        <ButtonPrimary
          title={t('estimate.calculate')}
          onPress={() => {
            setCalculating(true);
            setTimeout(() => {
              HBEstimate();
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.rcslab.dryVol')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{HBSlabEstimate.dryVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.table.sandVolume')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{HBSlabEstimate.sandVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.table.cementVolume')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{HBSlabEstimate.cementVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.rcslab.gravelVol')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{HBSlabEstimate.gravelVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.hollowslab.numBlocks')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{HBSlabEstimate.numBlocks}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('units.blocks')}</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.rcslab.numBagsCement')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{HBSlabEstimate.numBagsCement}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('units.bags')}</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.rcslab.num12mRods')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{HBSlabEstimate.num12mRods}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('items.rods')}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HollowSlab;
