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

const Length: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [length, setLength] = useState('');
  const [targetLength, setTargetLength] = useState('');
  const [unit, setUnit] = useState('mm');
  const [targetUnit, setTargetUnit] = useState('mm');

  useEffect(() => {
    convertLength();
  }, [length, unit, targetUnit]);

  const convertLength = () => {
    if (length === '') {
      setTargetLength('');
      return;
    }

    const units: Record<string, number> = {
      mm: 1000,
      cm: 100,
      inch: 39.3701,
      ft: 3.28084,
      yard: 1.09361,
      m: 1,
      km: 0.001,
      mile: 0.000621371,
    };

    let result = parseFloat(length);
    if (isNaN(result)) {
      setTargetLength('');
      return;
    }

    if (unit === targetUnit) {
      setTargetLength(result.toString());
      return;
    }

    const lengthInMeters = result / units[unit];
    const convertedLength = lengthInMeters * units[targetUnit];
    setTargetLength(Number(convertedLength.toFixed(5)).toString());
  };

  const unitLabels: Record<string, string> = {
    mm: t('units.mm'),
    cm: t('units.cm'),
    inch: t('units.inch'),
    ft: t('units.ft'),
    yard: t('units.yard'),
    m: t('units.m'),
    km: t('units.km'),
    mile: t('units.mile'),
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16 }}>
      <View style={[Area.imgContainer, { backgroundColor: colors.card }]}>
        <Image
          source={require('../../../../assets/onboarding/onboarding-hero.png')}
          style={Area.img}
        />
      </View>
      <SectionCard title={t('conversion.length')}>
        <TextInputTitle
          title={t('conversion.length')}
          placeholder={t('common.enterLength')}
          value={length}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) {
              setLength(value);
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

      <SectionCard title={t('conversion.converted.length')}>
        <ResultCard
          label={t('conversion.converted.length')}
          value={targetLength || '—'}
          unit={targetLength ? unitLabels[targetUnit] : undefined}
          highlight={!!targetLength}
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

export default Length;
