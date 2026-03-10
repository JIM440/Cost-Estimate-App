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

const RectangularTank: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('m');
  const [volume, setVolume] = useState('');
  const [surfaceArea, setSurfaceArea] = useState('');
  const [capacityLiters, setCapacityLiters] = useState('');

  useEffect(() => {
    calculate();
  }, [length, width, height, unit]);

  const calculate = () => {
    if (!length || !width || !height) {
      setVolume('');
      setSurfaceArea('');
      setCapacityLiters('');
      return;
    }
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(h)) {
      setVolume('');
      setSurfaceArea('');
      setCapacityLiters('');
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
    const lM = l * f;
    const wM = w * f;
    const hM = h * f;

    const volM3 = lM * wM * hM;
    const areaM2 = 2 * (lM * wM + lM * hM + wM * hM);
    const vol = volM3 / (f * f * f);
    const area = areaM2 / (f * f);

    setVolume(vol.toFixed(4));
    setSurfaceArea(area.toFixed(4));
    setCapacityLiters((volM3 * 1000).toFixed(0));
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
          onChange={(v) => {
            if (/^\d*\.?\d*$/.test(v)) setLength(v);
          }}
        />
        <TextInputTitle
          title={t('common.width')}
          placeholder={t('common.enterWidth')}
          value={width}
          onChange={(v) => {
            if (/^\d*\.?\d*$/.test(v)) setWidth(v);
          }}
        />
        <TextInputTitle
          title={t('common.height')}
          placeholder={t('common.enterHeight')}
          value={height}
          onChange={(v) => {
            if (/^\d*\.?\d*$/.test(v)) setHeight(v);
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
        <ResultCard
          label="Capacity"
          value={capacityLiters || '—'}
          unit={capacityLiters ? 'L' : undefined}
          highlight={!!capacityLiters}
        />
      </SectionCard>
    </View>
  );
};

export default RectangularTank;

