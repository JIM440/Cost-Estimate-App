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

const Volume: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [volume, setVolume] = useState('');
  const [targetVolume, setTargetVolume] = useState('');
  const [unit, setUnit] = useState('cubicMeter');
  const [targetUnit, setTargetUnit] = useState('cubicMeter');

  useEffect(() => {
    convertVolume();
  }, [volume, unit, targetUnit]);

  const convertVolume = () => {
    if (volume === '') {
      setTargetVolume('');
      return;
    }

    const units: Record<string, number> = {
      cubicMeter: 1,
      cubicCm: 1000000,
      cubicMm: 1e9,
      litre: 1000,
      cl: 10000,
      ml: 1e6,
      cubicInch: 61023.7,
      cubicFeet: 35.3147,
      cubicYard: 1.30795,
    };

    let result = parseFloat(volume);
    if (isNaN(result)) {
      setTargetVolume('');
      return;
    }

    if (unit === targetUnit) {
      setTargetVolume(result.toString());
      return;
    }

    const volumeInCubicMeters = result / units[unit];
    const convertedVolume = volumeInCubicMeters * units[targetUnit];
    setTargetVolume(Number(convertedVolume.toFixed(5)).toString());
  };

  const unitLabels: Record<string, string> = {
    cubicMeter: t('units.cubicMeter'),
    cubicCm: t('units.cubicCm'),
    cubicMm: t('units.cubicMm'),
    litre: t('units.litre'),
    cl: t('units.cl'),
    ml: t('units.ml'),
    cubicInch: t('units.cubicInch'),
    cubicFeet: t('units.cubicFeet'),
    cubicYard: t('units.cubicYard'),
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16 }}>
      <View style={[Area.imgContainer, { backgroundColor: colors.card }]}>
        <Image
          source={require('../../../../assets/onboarding/onboarding-hero.png')}
          style={Area.img}
        />
      </View>
      <SectionCard title={t('conversion.volume')}>
        <TextInputTitle
          title={t('conversion.volume')}
          placeholder={t('common.enterVolume')}
          value={volume}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) {
              setVolume(value);
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

      <SectionCard title={t('conversion.converted.volume')}>
        <ResultCard
          label={t('conversion.converted.volume')}
          value={targetVolume || '—'}
          unit={targetVolume ? unitLabels[targetUnit] : undefined}
          highlight={!!targetVolume}
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

export default Volume;
