import { View, Text, StyleSheet } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import ButtonPrimary from '../../../../components/buttons/Button';
import { ScrollView } from 'react-native-gesture-handler';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import Table from '../../../../components/lists/Table';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';

const Concrete: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [calculating, setCalculating] = useState(false);
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
  const [dryConcreteVolume, setDryConcreteVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [cementBags, setCementBags] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [cementVol, setCementVol] = useState('');
  const [aggregateVolume, setAggregateVolume] = useState('');
  const [concreteCost, setConcreteCost] = useState('');

  const [cementRatio, setCementRatio] = useState('');
  const [sandRatio, setSandRatio] = useState('');
  const [gravelRatio, setGravelRatio] = useState('');
  const [dryVolumeConstant, setDryVolumeConstant] = useState('');

  const calculateEstimate = () => {
    if (sideA == '' || sideB == '' || height == '' || pricePerM3 == '') {
      return;
    }

    const CementRatio = parseFloat(cementRatio);
    const SandRatio = parseFloat(sandRatio);
    const GravelRatio = parseFloat(gravelRatio);

    const ConcreteRatio = CementRatio + SandRatio + GravelRatio;

    const volume = parseFloat(sideA) * parseFloat(sideB) * parseFloat(height);
    const dryVolume = volume * (parseFloat(dryVolumeConstant) || 1.54);
    const cementVol = (dryVolume * CementRatio) / ConcreteRatio;
    const sandVol = (dryVolume * SandRatio) / ConcreteRatio;
    const gravelVol = (dryVolume * GravelRatio) / ConcreteRatio;

    const weight = cementVol * 1440;
    setCementWeight(weight.toFixed(2));
    setCementVol(cementVol.toFixed(2));

    // Assuming sand is 55% and aggregate is 45% of concrete volume
    setSandVolume(sandVol.toFixed(2));
    setAggregateVolume(gravelVol.toFixed(2));

    // Assuming each bag of cement is 50 kg
    const bags = Math.ceil(weight / 50);
    setCementBags(String(bags));

    // Calculate concrete cost
    setDryConcreteVolume(dryVolume.toFixed(2));
    setConcreteCost((dryVolume * parseFloat(pricePerM3)).toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/concrete_c.png')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.columnConcrete')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterValue')}
            title={t('common.sideA')}
            value={sideA}
            onChange={(value) => setSideA(value)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterValue')}
            title={t('common.sideB')}
            value={sideB}
            onChange={(value) => setSideB(value)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.enterHeight')}
            title={t('common.heightM')}
            value={height}
            onChange={(value) => setHeight(value)}
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
            style={inputStyles.threeColumnInput}
            title={t('common.pricePerM3')}
            placeholder={t('common.enterPrice')}
            value={pricePerM3}
            onChange={(value) => setPricePerM3(value)}
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
              calculateEstimate();
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
              material: t('estimate.concrete.dryConcreteVolume'),
              quantity: dryConcreteVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.concrete.sandVolume'),
              quantity: sandVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.concrete.gravelVolume'),
              quantity: aggregateVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.concrete.cementVolume'),
              quantity: cementVol || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.concrete.cementWeight'),
              quantity: cementWeight || '-',
              unit: 'kg',
            },
            {
              material: t('estimate.concrete.cementBagsRequired'),
              quantity: cementBags || '-',
              unit: t('units.bags'),
            },
            {
              material: t('estimate.concrete.concreteCost'),
              quantity: concreteCost || '-',
              unit: 'FCFA',
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default Concrete;
