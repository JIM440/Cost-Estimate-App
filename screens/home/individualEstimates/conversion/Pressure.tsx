import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import PickerField from '../../../../components/inputs/PickerField';
import SectionCard from '../../../../components/cards/SectionCard';
import ResultCard from '../../../../components/cards/ResultCard';
import { useLocale } from '../../../../context/LocaleContext';

const Pressure: React.FC = () => {
  const { t } = useLocale();
  const [pressure, setPressure] = useState('');
  const [targetPressure, setTargetPressure] = useState('');
  const [unit, setUnit] = useState('bar');
  const [targetUnit, setTargetUnit] = useState('bar');

  useEffect(() => {
    convertPressure();
  }, [pressure, unit, targetUnit]);

  const convertPressure = () => {
    if (pressure === '') {
      setTargetPressure('');
      return;
    }

    const units: Record<string, number> = {
      bar: 1,
      atm: 0.986923,
      Pa: 100000,
      hPa: 1000,
      kPa: 100,
      MPa: 0.1,
      Torr: 750.062,
      mmHg: 750.062,
      cmHg: 75.0062,
    };

    let result = parseFloat(pressure);
    if (isNaN(result)) {
      setTargetPressure('');
      return;
    }

    if (unit === targetUnit) {
      setTargetPressure(result.toString());
      return;
    }

    const pressureInBar = result / units[unit];
    const convertedPressure = pressureInBar * units[targetUnit];
    setTargetPressure(Number(convertedPressure.toFixed(5)).toString());
  };

  const unitLabels: Record<string, string> = {
    bar: t('units.bar'),
    atm: t('units.atm'),
    Pa: t('units.Pa'),
    hPa: t('units.hPa'),
    kPa: t('units.kPa'),
    MPa: t('units.MPa'),
    Torr: t('units.Torr'),
    mmHg: t('units.mmHg'),
    cmHg: t('units.cmHg'),
  };

  return (
    <View style={{ gap: 16 }}>
      <SectionCard title={t('conversion.pressure')}>
        <TextInputTitle
          title={t('conversion.pressure')}
          placeholder={t('common.enterPressure')}
          value={pressure}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) {
              setPressure(value);
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

      <SectionCard title={t('conversion.converted.pressure')}>
        <ResultCard
          label={t('conversion.converted.pressure')}
          value={targetPressure || '—'}
          unit={targetPressure ? unitLabels[targetUnit] : undefined}
          highlight={!!targetPressure}
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

export default Pressure;
