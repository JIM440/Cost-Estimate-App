import { ScrollView, View, Text } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { containerStyles, Line, titleStyles } from '../../../../styles/utility';
import ButtonPrimary from '../../../../components/buttons/Button';
import { createTableStyles } from '../../../../styles/components/table';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import { estimate_section_spacing } from '../../../../styles/global';

const RCSlab: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const tableStyles = React.useMemo(() => createTableStyles(colors), [colors]);
  const [calculating, setCalculating] = useState(false);
  const [RCSLabLength, setRCSLabLength] = useState('');
  const [RCSLabWidth, setRCSLabWidth] = useState('');
  const [RCSLabHeight, setRCSLabHeight] = useState('');
  const [RCSLabRodSpacing, setRCSLabRodSpacing] = useState('');
  const [cementRatio, setCementRatio] = useState('');
  const [sandRatio, setSandRatio] = useState('');
  const [gravelRatio, setGravelRatio] = useState('');
  const [dryVolumeConstant, setDryVolumeConstant] = useState('');
  const [RCSlabEstimate, setRCSlabEstimate] = useState({
    concreteVolume: '',
    num12mRods: '',
    dryVol: '',
    sandVol: '',
    cementVol: '',
    gravelVol: '',
    numBagsCement: '',
  });

  const RCEstimate = () => {
    const areaOfSlab = parseInt(RCSLabLength) * parseInt(RCSLabWidth);
    const concreteVolume = areaOfSlab * parseFloat(RCSLabHeight);

    const CementRatio = parseFloat(cementRatio);
    const SandRatio = parseFloat(sandRatio);
    const GravelRatio = parseFloat(gravelRatio);

    const ConcreteRatio = CementRatio + SandRatio + GravelRatio;

    const numRodsX = parseFloat(RCSLabLength) / parseFloat(RCSLabRodSpacing);
    const num12mRodsX = (numRodsX * parseFloat(RCSLabWidth)) / 12;

    const numRodsY = parseFloat(RCSLabWidth) / parseFloat(RCSLabRodSpacing);
    const num12mRodsY = (numRodsY * parseFloat(RCSLabWidth)) / 12;

    const num12mRods = num12mRodsX + num12mRodsY;

    const dryVol = concreteVolume * parseFloat(dryVolumeConstant); // Dry volume of concrete
    const gravelVol = (dryVol * GravelRatio) / ConcreteRatio;
    const cementVol = (dryVol * CementRatio) / ConcreteRatio;
    const sandVol = (dryVol * SandRatio) / ConcreteRatio;

    // Calculate number of bags of cement
    const densityOfCement = 1440; // Density of cement in kg/m³
    const numBagsCement = Math.ceil((cementVol * densityOfCement) / 50); // Assuming 1 bag = 50 kg

    const estimatedData = {
      concreteVolume: concreteVolume.toFixed(2), // Two decimal places
      num12mRods: num12mRods.toFixed(2),
      dryVol: dryVol.toFixed(2),
      sandVol: sandVol.toFixed(2),
      cementVol: cementVol.toFixed(2),
      gravelVol: gravelVol.toFixed(2),
      numBagsCement: String(numBagsCement),
    };

    setRCSlabEstimate(estimatedData);
  };
  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/rc_slab_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('estimate.rcslab.title')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterLength')}
            value={RCSLabLength}
            title={t('estimate.rcslab.length')}
            onChange={(text) => setRCSLabLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterWidth')}
            value={RCSLabWidth}
            title={t('estimate.rcslab.width')}
            onChange={(text) => setRCSLabWidth(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterThickness')}
            value={RCSLabHeight}
            title={t('estimate.rcslab.thickness')}
            onChange={(text) => setRCSLabHeight(text)}
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
            placeholder={t('common.enterSpacing')}
            value={RCSLabRodSpacing}
            title={t('estimate.rcslab.rodSpacing')}
            onChange={(text) => setRCSLabRodSpacing(text)}
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
          onPress={() => {
            setCalculating(true);
            setTimeout(() => {
              RCEstimate();
              setTimeout(() => setCalculating(false), 400);
            }, 0);
          }}
          title={t('estimate.calculate')}
          style={{ marginBottom: estimate_section_spacing }}
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{RCSlabEstimate.dryVol}</Text>
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{RCSlabEstimate.sandVol}</Text>
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{RCSlabEstimate.cementVol}</Text>
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{RCSlabEstimate.gravelVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.rcslab.numBagsCement')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{RCSlabEstimate.numBagsCement}</Text>
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{RCSlabEstimate.num12mRods}</Text>
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

export default RCSlab;
