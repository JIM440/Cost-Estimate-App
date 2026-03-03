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

const Rectangle: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [length, width, unit]);

  const calculateArea = () => {
    if (length === '' || width === '') {
      setArea('');
      return;
    }

    const lengthValue = parseFloat(length);
    const widthValue = parseFloat(width);
    if (isNaN(lengthValue) || isNaN(widthValue)) {
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

    const lengthInMeters = lengthValue * conversionFactors[unit];
    const widthInMeters = widthValue * conversionFactors[unit];
    const areaInSquareMeters = lengthInMeters * widthInMeters;
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
          source={require('../../../../assets/images/area/area-rectangle.png')}
          style={Area.img}
        />
      </View>

      <SectionCard title={t('tools.common.dimensions')}>
        <TextInputTitle
          title={t('common.length')}
          placeholder={t('common.enterLength')}
          value={length}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setLength(value);
          }}
        />
        <TextInputTitle
          title={t('common.width')}
          placeholder={t('common.enterWidth')}
          value={width}
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) setWidth(value);
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

export default Rectangle;
