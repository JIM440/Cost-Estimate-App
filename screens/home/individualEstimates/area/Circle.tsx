import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Image from '../../../../components/Image';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import PickerField from '../../../../components/inputs/PickerField';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import Area from '../../../../styles/screens/Area';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';

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

    const convertedArea =
      areaInSquareMeters / Math.pow(conversionFactors[unit], 2);
    const convertedCircumference =
      circumferenceInMeters / conversionFactors[unit];

    setArea(convertedArea.toFixed(5));
    setCircumference(convertedCircumference.toFixed(5));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        source={require('../../../../assets/images/area/area-circle.png')}
        style={[Area.img, { borderColor: colors.borderColor }]}
      />
      <View style={containerStyles.container}>
      <TextInputTitle
        title={t('tools.circle.radiusLabel')}
        placeholder={t('tools.circle.radiusPlaceholder')}
        value={radius}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setRadius(value);
          }
        }}
      />
      <PickerField
        label={t('tools.common.unit')}
        selectedValue={unit}
        onValueChange={setUnit}
        options={[
          { label: t('units.mm'), value: 'mm' },
          { label: t('units.cm'), value: 'cm' },
          { label: t('units.inch'), value: 'inch' },
          { label: t('units.ft'), value: 'ft' },
          { label: t('units.yard'), value: 'yard' },
          { label: t('units.m'), value: 'm' },
          { label: t('units.km'), value: 'km' },
        ]}
      />
      <Line />
      <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('tools.common.results')}</Text>
      <View>
        <Text style={[Area.resultsText, { color: colors.heading_text }]}>
          {t('tools.common.area')}: {area} {unit}²
        </Text>
        <Text style={[Area.resultsText, { color: colors.heading_text }]}>
          {t('tools.common.circumference')}: {circumference} {unit}
        </Text>
      </View>
    </View>
    </ScrollView>
  );
};

export default Circle;
