import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import PickerField from '../../../../components/inputs/PickerField';
import SectionCard from '../../../../components/cards/SectionCard';
import ResultCard from '../../../../components/cards/ResultCard';
import { useLocale } from '../../../../context/LocaleContext';

const Angle: React.FC = () => {
  const { t } = useLocale();
  const [angle, setAngle] = useState('');
  const [targetAngle, setTargetAngle] = useState('');
  const [unit, setUnit] = useState('degree');
  const [targetUnit, setTargetUnit] = useState('degree');

  useEffect(() => {
    convertAngle();
  }, [angle, unit, targetUnit]);

  const convertAngle = () => {
    if (angle === '') {
      setTargetAngle('');
      return;
    }

    const units: Record<string, number> = {
      degree: 1,
      radian: 0.0174533,
      gradian: 1.11111,
      second: 3600,
      minute: 60,
      dms: 1,
      circle: 0.00277778,
      percentage: 0.00277778,
    };

    let result = parseFloat(angle);
    if (isNaN(result)) {
      setTargetAngle('');
      return;
    }

    if (unit === targetUnit) {
      setTargetAngle(result.toString());
      return;
    }

    const angleInDegree = result / units[unit];
    const convertedAngle = angleInDegree * units[targetUnit];
    setTargetAngle(Number(convertedAngle.toFixed(5)).toString());
  };

  const unitLabels: Record<string, string> = {
    degree: t('units.degree'),
    radian: t('units.radian'),
    gradian: t('units.gradian'),
    second: t('units.second'),
    minute: t('units.minute'),
    dms: t('units.dms'),
    circle: t('units.circle'),
    percentage: t('units.percentage'),
  };

  return (
    <View style={{ gap: 16 }}>
      <SectionCard title={t('conversion.angle')}>
        <TextInputTitle
          title={t('conversion.angle')}
          placeholder={t('common.enterAngle')}
          value={angle}
          onChange={(value) => {
            if (/^-?\d*\.?\d*$/.test(value)) {
              setAngle(value);
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

      <SectionCard title={t('conversion.converted.angle')}>
        <ResultCard
          label={t('conversion.converted.angle')}
          value={targetAngle || '—'}
          unit={targetAngle ? unitLabels[targetUnit] : undefined}
          highlight={!!targetAngle}
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

export default Angle;
