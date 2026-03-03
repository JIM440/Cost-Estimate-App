import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import PickerField from '../../../../components/inputs/PickerField';
import SectionCard from '../../../../components/cards/SectionCard';
import ResultCard from '../../../../components/cards/ResultCard';
import { useLocale } from '../../../../context/LocaleContext';

const Temperature: React.FC = () => {
  const { t } = useLocale();
  const [temperature, setTemperature] = useState('');
  const [targetTemperature, setTargetTemperature] = useState('');
  const [unit, setUnit] = useState('C');
  const [targetUnit, setTargetUnit] = useState('C');

  useEffect(() => {
    convertTemperature();
  }, [temperature, unit, targetUnit]);

  const convertTemperature = () => {
    if (temperature === '') {
      setTargetTemperature('');
      return;
    }

    let result = parseFloat(temperature);
    if (isNaN(result)) {
      setTargetTemperature('');
      return;
    }

    if (unit === targetUnit) {
      setTargetTemperature(result.toString());
      return;
    }

    let convertedTemperature = 0;
    if (unit === 'C') {
      if (targetUnit === 'K') convertedTemperature = result + 273.15;
      else if (targetUnit === 'F') convertedTemperature = (result * 9) / 5 + 32;
    } else if (unit === 'K') {
      if (targetUnit === 'C') convertedTemperature = result - 273.15;
      else if (targetUnit === 'F') convertedTemperature = ((result - 273.15) * 9) / 5 + 32;
    } else if (unit === 'F') {
      if (targetUnit === 'C') convertedTemperature = ((result - 32) * 5) / 9;
      else if (targetUnit === 'K') convertedTemperature = ((result - 32) * 5) / 9 + 273.15;
    }

    setTargetTemperature(Number(convertedTemperature.toFixed(5)).toString());
  };

  const unitLabels: Record<string, string> = {
    C: t('units.celsius'),
    K: t('units.kelvin'),
    F: t('units.fahrenheit'),
  };

  return (
    <View style={{ gap: 16 }}>
      <SectionCard title={t('conversion.temperature')}>
        <TextInputTitle
          title={t('conversion.temperature')}
          placeholder={t('common.enterTemperature')}
          value={temperature}
          onChange={(value) => {
            if (/^-?\d*\.?\d*$/.test(value)) {
              setTemperature(value);
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

      <SectionCard title={t('conversion.converted.temperature')}>
        <ResultCard
          label={t('conversion.converted.temperature')}
          value={targetTemperature || '—'}
          unit={targetTemperature ? unitLabels[targetUnit] : undefined}
          highlight={!!targetTemperature}
        />
        <PickerField
          label={t('tools.common.unitTo')}
          selectedValue={targetUnit}
          onValueChange={setTargetUnit}
          options={Object.entries(unitLabels).map(([v, l]) => ({ label: l, value: v }))}
        />
      </SectionCard>
    </View>
  );
};

export default Temperature;
