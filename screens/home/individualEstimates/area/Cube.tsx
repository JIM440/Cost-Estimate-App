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

const CubeShape: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [side, setSide] = useState('');
  const [unit, setUnit] = useState('m');
  const [volume, setVolume] = useState('');
  const [surfaceArea, setSurfaceArea] = useState('');

  useEffect(() => {
    calculate();
  }, [side, unit]);

  const calculate = () => {
    if (!side) {
      setVolume('');
      setSurfaceArea('');
      return;
    }
    const s = parseFloat(side);
    if (Number.isNaN(s)) {
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
    const sM = s * f;

    const volM3 = Math.pow(sM, 3);
    const areaM2 = 6 * sM * sM;

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
          source={require('../../../../assets/images/area/area-square.png')}
          style={Area.img}
        />
      </View>
      <SectionCard title={t('tools.common.dimensions')}>
        <TextInputTitle
          title={t('common.sideLength')}
          placeholder={t('common.enterSideLength')}
          value={side}
          onChange={(v) => {
            if (/^\d*\.?\d*$/.test(v)) setSide(v);
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

export default CubeShape;

