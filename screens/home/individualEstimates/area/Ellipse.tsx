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

const Ellipse: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [majorAxis, setMajorAxis] = useState('');
  const [minorAxis, setMinorAxis] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [majorAxis, minorAxis, unit]);

  const calculateArea = () => {
    if (majorAxis === '' || minorAxis === '') {
      setArea('');
      return;
    }

    const majorAxisValue = parseFloat(majorAxis);
    const minorAxisValue = parseFloat(minorAxis);
    if (isNaN(majorAxisValue) || isNaN(minorAxisValue)) {
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

    const majorAxisInMeters = majorAxisValue * conversionFactors[unit];
    const minorAxisInMeters = minorAxisValue * conversionFactors[unit];
    const areaInSquareMeters = Math.PI * majorAxisInMeters * minorAxisInMeters;
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
          source={require('../../../../assets/images/area/area-ellipse.png')}
          style={Area.img}
        />
      </View>

      <SectionCard title={t('tools.common.dimensions')}>
        <TextInputTitle
          title={t('common.majorAxis')}
          placeholder={t('common.enterMajorAxis')}
          value={majorAxis}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setMajorAxis(value);
          }}
        />
        <TextInputTitle
          title={t('common.minorAxis')}
          placeholder={t('common.enterMinorAxis')}
          value={minorAxis}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setMinorAxis(value);
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

export default Ellipse;
