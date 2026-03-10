import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import Image from '../../../../components/Image';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import PickerField from '../../../../components/inputs/PickerField';
import SectionCard from '../../../../components/cards/SectionCard';
import ResultCard from '../../../../components/cards/ResultCard';
import Area from '../../../../styles/screens/Area';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';

const Weight: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [targetUnit, setTargetUnit] = useState('kg');

  useEffect(() => {
    convertWeight();
  }, [weight, unit, targetUnit]);

  const convertWeight = () => {
    if (weight === '') {
      setTargetWeight('');
      return;
    }

    const units: Record<string, number> = {
      kg: 1,
      mg: 1e6,
      g: 1000,
      lb: 2.20462,
      oz: 35.274,
      tonne: 0.001,
      grain: 15432.4,
      ozT: 32.1507,
    };

    let result = parseFloat(weight);
    if (isNaN(result)) {
      setTargetWeight('');
      return;
    }

    if (unit === targetUnit) {
      setTargetWeight(result.toString());
      return;
    }

    const weightInKg = result / units[unit];
    const convertedWeight = weightInKg * units[targetUnit];
    setTargetWeight(Number(convertedWeight.toFixed(5)).toString());
  };

  const unitLabels: Record<string, string> = {
    kg: t('units.kg'),
    mg: t('units.mg'),
    g: t('units.g'),
    lb: t('units.lb'),
    oz: t('units.oz'),
    tonne: t('units.tonne'),
    grain: t('units.grain'),
    ozT: t('units.ozT'),
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16 }}>
      <View style={[Area.imgContainer, { backgroundColor: colors.card }]}>
        <Image
          source={require('../../../../assets/onboarding/onboarding-hero.png')}
          style={Area.img}
        />
      </View>
      <SectionCard title={t('conversion.weight')}>
        <TextInputTitle
          title={t('conversion.weight')}
          placeholder={t('common.enterWeight')}
          value={weight}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) {
              setWeight(value);
            }
          }}
        />
        <PickerField
          label={t('tools.common.unitFrom')}
          selectedValue={unit}
          onValueChange={setUnit}
          options={Object.entries(unitLabels).map(([v, l]) => ({ label: l, value: v }))}
        />
      </SectionCard>

      <SectionCard title={t('conversion.converted.weight')}>
        <ResultCard
          label={t('conversion.converted.weight')}
          value={targetWeight || '—'}
          unit={targetWeight ? unitLabels[targetUnit] : undefined}
          highlight={!!targetWeight}
        />
        <PickerField
          label={t('tools.common.unitTo')}
          selectedValue={targetUnit}
          onValueChange={setTargetUnit}
          options={Object.entries(unitLabels).map(([v, l]) => ({ label: l, value: v }))}
        />
      </SectionCard>
    </ScrollView>
  );
};

export default Weight;
