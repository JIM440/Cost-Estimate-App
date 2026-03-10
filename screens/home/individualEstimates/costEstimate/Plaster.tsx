import { ScrollView, View, Text } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import { createTableStyles } from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/buttons/Button';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import { estimate_section_spacing } from '../../../../styles/global';

const Plaster: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const tableStyles = React.useMemo(() => createTableStyles(colors), [colors]);
  const [calculating, setCalculating] = useState(false);
  const [plasterPricePerM2, setPlasterPricePerM2] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [openingArea, setOpeningArea] = useState('');
  const [cementRatio, setCementRatio] = useState('');
  const [sandRatio, setSandRatio] = useState('');
  const [dryVolumeConstant, setDryVolumeConstant] = useState('');

  const [dryMortarVolume, setDryMortarVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [area, setArea] = useState('');
  const [cementVolume, setCementVolume] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [bagsOfCement, setBagsOfCement] = useState('');
  const [plasterCost, setPlasterCost] = useState('');
  const [wastage, setWastage] = useState('');

  const calculate = () => {
    if (
      length == '' ||
      width == '' ||
      thickness == '' ||
      openingArea == '' ||
      plasterPricePerM2 == ''
    ) {
      return;
    }
    const pricePerM2 = parseFloat(plasterPricePerM2);
    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const wallThickness = parseFloat(thickness) / 1000;
    const openingAreaValue = parseFloat(openingArea);
    const waste = parseFloat(wastage);

    // Calculate total area of the wall to be plastered
    const totalArea = wallLength * wallWidth - openingAreaValue;

    // Calculate total volume for plastering
    const vol = totalArea * wallThickness;

    // Calculate total volume considering 30% wastage
    const totalVolume = vol * (1 + waste / 100);

    // Calculate dry volume of plaster
    const dryVolume = totalVolume * parseFloat(dryVolumeConstant);

    const CementRatio = parseFloat(cementRatio);
    const SandRatio = parseFloat(sandRatio);

    const MortarRatio = CementRatio + SandRatio;

    // Calculate cement volume and weight
    const cementVol = (dryVolume * CementRatio) / MortarRatio;
    const cementWeightValue = cementVol * 1440;
    const bagsOfCementValue = cementWeightValue / 50;

    // Calculate sand volume
    const sandVol = (dryVolume * SandRatio) / MortarRatio;

    // Calculate plaster cost
    const totalPlasterCost = totalArea * pricePerM2;

    // Update state with results
    setArea(totalArea.toFixed(2));
    setDryMortarVolume(dryVolume.toFixed(2));
    setCementWeight(cementWeightValue.toFixed(2));
    setCementVolume(cementVol.toFixed(2));
    setSandVolume(sandVol.toFixed(2));
    setBagsOfCement(bagsOfCementValue.toFixed(2));
    setPlasterCost(totalPlasterCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/plaster_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.plaster')}</Text>
        <Text style={{ color: colors.heading_text }}>{t('common.wallDimension')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterLength')}
            title={t('common.lengthM')}
            value={length}
            onChange={(value) => setLength(value)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterWidth')}
            title={t('common.width')}
            value={width}
            onChange={(value) => setWidth(value)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('estimate.plaster.thickness')}
            title={t('estimate.plaster.thickness')}
            value={thickness}
            onChange={(value) => setThickness(value)}
          />
        </View>

        <Line />

        <Text style={{ color: colors.heading_text }}>{t('estimate.mixRatio')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('estimate.cementRatio')}
            placeholder={t('common.enterValue')}
            value={cementRatio}
            onChange={(text) => setCementRatio(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title={t('estimate.sandRatio')}
            placeholder={t('common.enterValue')}
            value={sandRatio}
            onChange={(text) => setSandRatio(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.dryVolume')}
            value={dryVolumeConstant}
            title={t('common.dryVolume')}
            onChange={(text) => setDryVolumeConstant(text)}
          />
        </View>

        <Line />

        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.plaster.areaOfOpening')}
            placeholder={t('common.enterArea')}
            value={openingArea}
            onChange={(value) => setOpeningArea(value)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.plaster.percentageWaste')}
            placeholder={t('common.wastage')}
            value={wastage}
            onChange={(value) => setWastage(value)}
          />
        </View>
        <View style={inputStyles.twoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title={t('estimate.plaster.pricePerM2')}
            placeholder={t('common.enterPrice')}
            value={plasterPricePerM2}
            onChange={(value) => setPlasterPricePerM2(value)}
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.plaster.totalArea')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{area}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m²</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.plaster.dryMortarVolume')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{dryMortarVolume}</Text>
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
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{cementVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.cementWeight')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{cementWeight}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>kg</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.table.sandVolume')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{sandVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.plaster.bagsOfCement')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{bagsOfCement}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('units.bags')}</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.plaster.plasterCost')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{plasterCost}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Plaster;
