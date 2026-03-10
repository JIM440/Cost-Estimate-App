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

const HalfSphere: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [radius, setRadius] = useState('');
  const [unit, setUnit] = useState('m');
  const [volume, setVolume] = useState('');
  const [surfaceArea, setSurfaceArea] = useState('');

  useEffect(() => {
    calculate();
  }, [radius, unit]);

  const calculate = () => {
    if (!radius) {
      setVolume('');
      setSurfaceArea('');
      return;
    }
    const r = parseFloat(radius);
    if (Number.isNaN(r)) {
      setVolume('');
      setSurfaceArea('');
      return;
    }

    const factors: Record<string, number> = {
      mm: 0.001,
      cm: 0.01,
      inch: 0.0254,
      ft: 0.3048,
      yard: 0.9144,
      m: 1,
      km: 1000,
    };

    const f = factors[unit] ?? 1;
    const rM = r * f;

    const fullVolM3 = (4 / 3) * Math.PI * Math.pow(rM, 3);
    const fullAreaM2 = 4 * Math.PI * rM * rM;

    const volM3 = fullVolM3 / 2;
    // curved area (2πr²) + base area (πr²) = 3πr²
    const areaM2 = 3 * Math.PI * rM * rM;

    const vol = volM3 / (f * f * f);
    const area = areaM2 / (f * f);

    setVolume(vol.toFixed(4));
    setSurfaceArea(area.toFixed(4));
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
          source={require('../../../../assets/images/area/area-circle.png')}
          style={Area.img}
        />
      </View>
      <SectionCard title={t('tools.common.dimensions')}>
        <TextInputTitle
          title={t('tools.circle.radiusLabel')}
          placeholder={t('tools.circle.radiusPlaceholder')}
          value={radius}
          onChange={(v) => {
            if (/^\d*\.?\d*$/.test(v)) setRadius(v);
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
          label={t('conversion.volume')}
          value={volume || '—'}
          unit={volume ? `${unit}³` : undefined}
          highlight={!!volume}
        />
        <ResultCard
          label="Surface area"
          value={surfaceArea || '—'}
          unit={surfaceArea ? `${unit}²` : undefined}
          highlight={!!surfaceArea}
        />
      </SectionCard>
    </View>
  );
};

export default HalfSphere;

