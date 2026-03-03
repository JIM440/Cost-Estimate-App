import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import PickerField from '../../../../components/inputs/PickerField';
import SectionCard from '../../../../components/cards/SectionCard';
import ResultCard from '../../../../components/cards/ResultCard';
import { useLocale } from '../../../../context/LocaleContext';

const Area: React.FC = () => {
  const { t } = useLocale();
  const [area, setArea] = useState('');
  const [targetArea, setTargetArea] = useState('');
  const [unit, setUnit] = useState('sqm');
  const [targetUnit, setTargetUnit] = useState('sqm');

  useEffect(() => {
    convertArea();
  }, [area, unit, targetUnit]);

  const convertArea = () => {
    if (area === '') {
      setTargetArea('');
      return;
    }

    const units: Record<string, number> = {
      sqm: 1,
      sqkm: 0.000001,
      acre: 0.000247105,
      hectare: 0.0001,
      sqin: 1550,
      sqft: 10.7639,
      sqyd: 1.19599,
      sqmi: 3.861e-7,
    };

    let result = parseFloat(area);
    if (isNaN(result)) {
      setTargetArea('');
      return;
    }

    if (unit === targetUnit) {
      setTargetArea(result.toString());
      return;
    }

    const areaInSquareMeters = result / units[unit];
    const convertedArea = areaInSquareMeters * units[targetUnit];
    setTargetArea(Number(convertedArea.toFixed(5)).toString());
  };

  const unitLabels: Record<string, string> = {
    sqm: t('units.sqm'),
    sqkm: t('units.sqkm'),
    acre: t('units.acre'),
    hectare: t('units.hectare'),
    sqin: t('units.sqin'),
    sqft: t('units.sqft'),
    sqyd: t('units.sqyd'),
    sqmi: t('units.sqmi'),
  };

  return (
    <View style={{ gap: 16 }}>
      <SectionCard title={t('conversion.area')}>
        <TextInputTitle
          title={t('conversion.area')}
          placeholder={t('common.enterArea')}
          value={area}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) {
              setArea(value);
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

      <SectionCard title={t('conversion.converted.area')}>
        <ResultCard
          label={t('conversion.converted.area')}
          value={targetArea || '—'}
          unit={targetArea ? unitLabels[targetUnit] : undefined}
          highlight={!!targetArea}
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

export default Area;
