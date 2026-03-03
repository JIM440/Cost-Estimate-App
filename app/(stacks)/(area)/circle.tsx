import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import StackHeader from '../../../components/StackHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Image from '../../../components/Image';
import TextInputTitle from '../../../components/inputs/InputTitle';
import PickerField from '../../../components/inputs/PickerField';
import SectionCard from '../../../components/cards/SectionCard';
import ResultCard from '../../../components/cards/ResultCard';
import Area from '../../../styles/screens/Area';
import { useLocale } from '../../../context/LocaleContext';
import { useTheme } from '../../../context/ThemeContext';

const Circle: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [radius, setRadius] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');
  const [circumference, setCircumference] = useState('');

  useEffect(() => {
    calculateResults();
  }, [radius, unit]);

  const calculateResults = () => {
    if (radius === '') {
      setArea('');
      setCircumference('');
      return;
    }

    const radiusValue = parseFloat(radius);
    if (isNaN(radiusValue)) {
      setArea('');
      setCircumference('');
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

    const radiusInMeters = radiusValue * conversionFactors[unit];
    const areaInSquareMeters = Math.PI * Math.pow(radiusInMeters, 2);
    const circumferenceInMeters = 2 * Math.PI * radiusInMeters;
    const convertedArea = areaInSquareMeters / Math.pow(conversionFactors[unit], 2);
    const convertedCircumference = circumferenceInMeters / conversionFactors[unit];
    setArea(convertedArea.toFixed(5));
    setCircumference(convertedCircumference.toFixed(5));
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
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader title={t('tools.circle.title')} />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <View style={{ gap: 16 }}>
          <View style={[Area.imgContainer, { backgroundColor: colors.card }]}>
            <Image
              source={require('../../../assets/images/area/area-circle.png')}
              style={Area.img}
            />
          </View>

          <SectionCard title={t('tools.common.dimensions')}>
            <TextInputTitle
              title={t('tools.circle.radiusLabel')}
              placeholder={t('tools.circle.radiusPlaceholder')}
              value={radius}
              onChange={(value) => {
                if (/^\d*\.?\d*$/.test(value)) setRadius(value);
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
            <ResultCard
              label={t('tools.common.circumference')}
              value={circumference || '—'}
              unit={circumference ? unit : undefined}
              highlight={!!circumference}
            />
          </SectionCard>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default Circle;

