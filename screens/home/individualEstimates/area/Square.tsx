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

const Square: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [sideLength, setSideLength] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [sideLength, unit]);

  const calculateArea = () => {
    if (sideLength === '') {
      setArea('');
      return;
    }

    const sideValue = parseFloat(sideLength);
    if (isNaN(sideValue)) {
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

    const sideInMeters = sideValue * conversionFactors[unit];
    const areaInSquareMeters = Math.pow(sideInMeters, 2);
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
          source={require('../../../../assets/images/area/area-square.png')}
          style={Area.img}
        />
      </View>

      <SectionCard title={t('tools.common.dimensions')}>
        <TextInputTitle
          title={t('common.sideLength')}
          placeholder={t('common.enterSideLength')}
          value={sideLength}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setSideLength(value);
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

export default Square;
