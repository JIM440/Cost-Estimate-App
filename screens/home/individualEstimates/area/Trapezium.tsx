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

const Trapezium: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [base1, setBase1] = useState('');
  const [base2, setBase2] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [base1, base2, height, unit]);

  const calculateArea = () => {
    if (base1 === '' || base2 === '' || height === '') {
      setArea('');
      return;
    }

    const base1Value = parseFloat(base1);
    const base2Value = parseFloat(base2);
    const heightValue = parseFloat(height);
    if (isNaN(base1Value) || isNaN(base2Value) || isNaN(heightValue)) {
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

    const base1InMeters = base1Value * conversionFactors[unit];
    const base2InMeters = base2Value * conversionFactors[unit];
    const heightInMeters = heightValue * conversionFactors[unit];
    const areaInSquareMeters = 0.5 * (base1InMeters + base2InMeters) * heightInMeters;
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
          source={require('../../../../assets/images/area/area-trapezium.png')}
          style={Area.img}
        />
      </View>

      <SectionCard title={t('tools.common.dimensions')}>
        <TextInputTitle
          title={t('common.base1')}
          placeholder={t('common.enterBase1')}
          value={base1}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setBase1(value);
          }}
        />
        <TextInputTitle
          title={t('common.base2')}
          placeholder={t('common.enterBase2')}
          value={base2}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setBase2(value);
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

export default Trapezium;
