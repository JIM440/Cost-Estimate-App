import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Image from '../../../../components/Image';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import PickerField from '../../../../components/inputs/PickerField';
import SectionCard from '../../../../components/cards/SectionCard';
import ResultCard from '../../../../components/cards/ResultCard';
import Area from '../../../../styles/screens/Area';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';

const Triangle: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [base, height, unit]);

  const calculateArea = () => {
    if (base === '' || height === '') {
      setArea('');
      return;
    }

    const baseValue = parseFloat(base);
    const heightValue = parseFloat(height);
    if (isNaN(baseValue) || isNaN(heightValue)) {
      setArea('');
      return;
    }

    const conversionFactors: Record<string, number> = {
      mm: 0.001,
      cm: 0.01,
      inch: 0.0254,
      ft: 0.3048,
      yard: 0.9144,
      m: 1,
      km: 1000,
    };

    const baseInMeters = baseValue * conversionFactors[unit];
    const heightInMeters = heightValue * conversionFactors[unit];
    const areaInSquareMeters = 0.5 * baseInMeters * heightInMeters;
    const convertedArea = areaInSquareMeters / Math.pow(conversionFactors[unit], 2);
    setArea(convertedArea.toFixed(5));
  };

  const unitOptions = [
    { label: t('units.mm'), value: 'mm' },
    { label: t('units.cm'), value: 'cm' },
    { label: t('units.inch'), value: 'inch' },
    { label: t('units.ft'), value: 'ft' },
    { label: t('units.yard'), value: 'yard' },
    { label: t('units.m'), value: 'm' },
    { label: t('units.km'), value: 'km' },
  ];

  return (
    <View style={{ gap: 16 }}>
      <View style={[Area.imgContainer, { backgroundColor: colors.card }]}>
        <Image
          source={require('../../../../assets/images/area/area-triangle.png')}
          style={Area.img}
        />
      </View>

      <SectionCard title={t('tools.common.dimensions')}>
        <TextInputTitle
          title={t('common.base')}
          placeholder={t('common.enterBase')}
          value={base}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setBase(value);
          }}
        />
        <TextInputTitle
          title={t('common.height')}
          placeholder={t('common.enterHeight')}
          value={height}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setHeight(value);
          }}
        />
        <PickerField
          label={t('tools.common.unit')}
          selectedValue={unit}
          onValueChange={setUnit}
          options={unitOptions}
        />
      </SectionCard>

      <SectionCard title={t('tools.common.results')}>
        <ResultCard
          label={t('tools.common.area')}
          value={area || '—'}
          unit={area ? `${unit}²` : undefined}
          highlight={!!area}
        />
      </SectionCard>
    </View>
  );
};

export default Triangle;
