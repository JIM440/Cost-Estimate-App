import { View, Text, StyleSheet } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import ButtonPrimary from '../../../../components/buttons/Button';
import { ScrollView } from 'react-native-gesture-handler';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import Table from '../../../../components/lists/Table';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import { estimate_section_spacing } from '../../../../styles/global';
import PickerField from '../../../../components/inputs/PickerField';

type ConcreteElementType = 'column' | 'footing' | 'beam' | 'wall' | 'slab' | 'circularColumn';

type ConcreteProps = {
  initialType?: ConcreteElementType;
  singleTypeMode?: boolean;
};

const Concrete: React.FC<ConcreteProps> = ({
  initialType = 'column',
  singleTypeMode = false,
}) => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const [calculating, setCalculating] = useState(false);

  const [type, setType] = useState<ConcreteElementType>(initialType);

  // Geometry
  const [sideA, setSideA] = useState(''); // length / side A / wall length / slab length
  const [sideB, setSideB] = useState(''); // width / thickness (for wall) / slab width
  const [height, setHeight] = useState(''); // height or thickness / slab thickness

  // Rods: for column/footing/beam/circular use count + rodsPer; for wall/slab use spacing
  const [elementCount, setElementCount] = useState(''); // number of columns/footings/beams
  const [rodCount, setRodCount] = useState(''); // rods per column/footing/beam
  const [rodSpacing, setRodSpacing] = useState(''); // spacing for reinforced wall / slab
  const [rodDiameter, setRodDiameter] = useState(''); // optional, for wall/slab rod weight

  // Cost, mix & quantity
  const [pricePerM3, setPricePerM3] = useState('');
  const [cementRatio, setCementRatio] = useState('');
  const [sandRatio, setSandRatio] = useState('');
  const [gravelRatio, setGravelRatio] = useState('');
  const [dryVolumeConstant, setDryVolumeConstant] = useState('1.54');
  const [quantity, setQuantity] = useState('1');

  // Outputs
  const [dryConcreteVolume, setDryConcreteVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [cementBags, setCementBags] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [cementVol, setCementVol] = useState('');
  const [aggregateVolume, setAggregateVolume] = useState('');
  const [concreteCost, setConcreteCost] = useState('');
  const [num12mRods, setNum12mRods] = useState('');

  const calculateEstimate = () => {
    if (!pricePerM3 || !cementRatio || !sandRatio || !gravelRatio) {
      return;
    }

    const CementRatio = parseFloat(cementRatio);
    const SandRatio = parseFloat(sandRatio);
    const GravelRatio = parseFloat(gravelRatio);
    const ConcreteRatio = CementRatio + SandRatio + GravelRatio;
    if (!ConcreteRatio || Number.isNaN(ConcreteRatio)) return;

    let volume = 0;
    let rodsTotal12m = 0;

    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const h = parseFloat(height);

    const count = Math.max(1, parseInt(elementCount) || 1);

    switch (type) {
      case 'column': {
        if (!a || !b || !h) return;
        volume = a * b * h * count;
        const rods = parseFloat(rodCount);
        if (rods && !Number.isNaN(rods)) {
          rodsTotal12m = (count * rods * h) / 12;
        }
        break;
      }
      case 'footing': {
        if (!a || !b || !h) return;
        volume = a * b * h * count;
        const rodsPerFooting = parseFloat(rodCount);
        if (rodsPerFooting && !Number.isNaN(rodsPerFooting)) {
          rodsTotal12m = (count * rodsPerFooting * h) / 12;
        }
        break;
      }
      case 'beam': {
        if (!a || !b || !h) return;
        volume = a * b * h * count;
        const rodsPerBeam = parseFloat(rodCount);
        if (rodsPerBeam && !Number.isNaN(rodsPerBeam)) {
          rodsTotal12m = (count * rodsPerBeam * a) / 12;
        }
        break;
      }
      case 'wall': {
        if (!a || !b || !h) return;
        volume = a * b * h;
        const spacing = parseFloat(rodSpacing);
        if (spacing && !Number.isNaN(spacing)) {
          const numRodsVertical = a / spacing;
          const numRodsHorizontal = h / spacing;
          const verticalLength = numRodsVertical * h;
          const horizontalLength = numRodsHorizontal * a;
          rodsTotal12m = (verticalLength + horizontalLength) / 12;
        }
        break;
      }
      case 'slab': {
        if (!a || !b || !h) return;
        volume = a * b * h;
        const spacing = parseFloat(rodSpacing);
        if (spacing && !Number.isNaN(spacing)) {
          const numRodsX = a / spacing;
          const numRodsY = b / spacing;
          const lengthX = numRodsX * b;
          const lengthY = numRodsY * a;
          rodsTotal12m = (lengthX + lengthY) / 12;
        }
        break;
      }
      case 'circularColumn': {
        if (!sideA || !h) return;
        const diameterMm = parseFloat(sideA);
        if (!diameterMm || Number.isNaN(diameterMm)) return;
        const radiusM = (diameterMm / 1000) / 2;
        volume = Math.PI * radiusM * radiusM * h * count;
        const rods = parseFloat(rodCount);
        if (rods && !Number.isNaN(rods)) {
          rodsTotal12m = (count * rods * h) / 12;
        }
        break;
      }
      default:
        return;
    }

    const qty = Math.max(1, parseFloat(quantity) || 1);
    volume *= qty;
    if (rodsTotal12m) {
      rodsTotal12m *= qty;
    }

    const dryVolume = volume * (parseFloat(dryVolumeConstant) || 1.54);
    const cementVolLocal = (dryVolume * CementRatio) / ConcreteRatio;
    const sandVol = (dryVolume * SandRatio) / ConcreteRatio;
    const gravelVol = (dryVolume * GravelRatio) / ConcreteRatio;

    const weight = cementVolLocal * 1440;
    const bags = Math.ceil(weight / 50); // 50 kg per bag

    setDryConcreteVolume(dryVolume.toFixed(2));
    setCementVol(cementVolLocal.toFixed(2));
    setSandVolume(sandVol.toFixed(2));
    setAggregateVolume(gravelVol.toFixed(2));
    setCementWeight(weight.toFixed(2));
    setCementBags(String(bags));
    setConcreteCost((dryVolume * parseFloat(pricePerM3)).toFixed(2));
    setNum12mRods(rodsTotal12m ? rodsTotal12m.toFixed(2) : '');
  };

  const isCircular = type === 'circularColumn';

  // Labels for rectangular elements
  let labelA = t('estimate.concrete.sideA');
  let labelB = t('estimate.concrete.sideB');
  let labelH = t('common.heightM');

  if (type === 'footing' || type === 'beam') {
    labelA = t('common.lengthM');
    labelB = t('common.widthM');
    labelH = t('common.thicknessM');
  } else if (type === 'wall') {
    labelA = t('common.lengthM');
    labelB = t('common.thicknessM');
    labelH = t('common.heightM');
  } else if (type === 'slab') {
    labelA = t('common.lengthM');
    labelB = t('common.widthM');
    labelH = t('common.thicknessM');
  }

  const typeLabelKeyMap: Record<ConcreteElementType, string> = {
    column: 'estimate.concrete.type.column',
    footing: 'estimate.concrete.type.footing',
    beam: 'estimate.concrete.type.beam',
    wall: 'estimate.concrete.type.wall',
    slab: 'estimate.concrete.type.slab',
    circularColumn: 'estimate.concrete.type.circularColumn',
  };

  const currentTypeLabel = t(typeLabelKeyMap[type]);

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estimate/concrete_c.png')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.columnConcrete')}</Text>
        {singleTypeMode ? (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: colors.muted_text }}>{t('estimate.concrete.type')}</Text>
            <Text style={{ color: colors.heading_text, fontWeight: '600', marginTop: 4 }}>
              {currentTypeLabel}
            </Text>
          </View>
        ) : (
          <PickerField
            label={t('estimate.concrete.type')}
            selectedValue={type}
            onValueChange={(value) => setType(value as ConcreteElementType)}
            options={[
              { label: t('estimate.concrete.type.column'), value: 'column' },
              { label: t('estimate.concrete.type.footing'), value: 'footing' },
              { label: t('estimate.concrete.type.beam'), value: 'beam' },
              { label: t('estimate.concrete.type.wall'), value: 'wall' },
              { label: t('estimate.concrete.type.slab'), value: 'slab' },
              { label: t('estimate.concrete.type.circularColumn'), value: 'circularColumn' },
            ]}
          />
        )}

        <Line />

        {/* Dimensions */}
        {isCircular ? (
          <View style={inputStyles.twoColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              placeholder={t('common.enterDiameter')}
              title={t('common.diameter')}
              value={sideA}
              onChange={(value) => setSideA(value)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              placeholder={t('common.enterHeight')}
              title={t('common.heightM')}
              value={height}
              onChange={(value) => setHeight(value)}
            />
          </View>
        ) : (
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              placeholder={t('common.enterValue')}
              title={labelA}
              value={sideA}
              onChange={(value) => setSideA(value)}
            />
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              placeholder={t('common.enterValue')}
              title={labelB}
              value={sideB}
              onChange={(value) => setSideB(value)}
            />
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              placeholder={t('common.enterHeight')}
              title={labelH}
              value={height}
              onChange={(value) => setHeight(value)}
            />
          </View>
        )}

        {/* Rods - 2 inputs per row */}
        {type === 'column' && (
          <View style={inputStyles.twoColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.concrete.numColumns')}
              placeholder={t('common.enterValue')}
              value={elementCount}
              onChange={(value) => setElementCount(value)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('house.input.numRodsPerColumn')}
              placeholder={t('common.enterValue')}
              value={rodCount}
              onChange={(value) => setRodCount(value)}
            />
          </View>
        )}
        {type === 'circularColumn' && (
          <View style={inputStyles.twoColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.concrete.numColumns')}
              placeholder={t('common.enterValue')}
              value={elementCount}
              onChange={(value) => setElementCount(value)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('house.input.numRodsPerColumn')}
              placeholder={t('common.enterValue')}
              value={rodCount}
              onChange={(value) => setRodCount(value)}
            />
          </View>
        )}
        {type === 'footing' && (
          <View style={inputStyles.twoColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.concrete.numFootings')}
              placeholder={t('common.enterValue')}
              value={elementCount}
              onChange={(value) => setElementCount(value)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('house.input.numRodsPerFooting')}
              placeholder={t('common.enterValue')}
              value={rodCount}
              onChange={(value) => setRodCount(value)}
            />
          </View>
        )}
        {type === 'beam' && (
          <View style={inputStyles.twoColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.concrete.numBeams')}
              placeholder={t('common.enterValue')}
              value={elementCount}
              onChange={(value) => setElementCount(value)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('house.input.numRodsPerBeam')}
              placeholder={t('common.enterValue')}
              value={rodCount}
              onChange={(value) => setRodCount(value)}
            />
          </View>
        )}
        {type === 'wall' && (
          <View style={inputStyles.twoColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.rcslab.rodSpacing')}
              placeholder={t('common.enterSpacing')}
              value={rodSpacing}
              onChange={(value) => setRodSpacing(value)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.rod.diameter')}
              placeholder={t('common.enterDiameter')}
              value={rodDiameter}
              onChange={(value) => setRodDiameter(value)}
            />
          </View>
        )}
        {type === 'slab' && (
          <View style={inputStyles.twoColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.rcslab.rodSpacing')}
              placeholder={t('common.enterSpacing')}
              value={rodSpacing}
              onChange={(value) => setRodSpacing(value)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title={t('estimate.rod.diameter')}
              placeholder={t('common.enterDiameter')}
              value={rodDiameter}
              onChange={(value) => setRodDiameter(value)}
            />
          </View>
        )}

        <Line />

        {/* Mix ratio */}
        <Text style={{ color: colors.heading_text }}>{t('estimate.mixRatio')}</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('estimate.cementRatio')}
            value={cementRatio}
            title={t('estimate.cementRatio')}
            onChange={(text) => setCementRatio(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('estimate.sandRatio')}
            value={sandRatio}
            title={t('estimate.sandRatio')}
            onChange={(text) => setSandRatio(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder={t('common.gravelRatio')}
            value={gravelRatio}
            title={t('common.gravelRatio')}
            onChange={(text) => setGravelRatio(text)}
          />
        </View>

        <Line />

        {/* Price & dry volume constant */}
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.oneColumnInput}
            title={t('common.pricePerM3')}
            placeholder={t('common.enterPrice')}
            value={pricePerM3}
            onChange={(value) => setPricePerM3(value)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.dryVolume')}
            value={dryVolumeConstant}
            title={t('common.dryVolume')}
            onChange={(text) => setDryVolumeConstant(text)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder={t('common.enterQuantity')}
            value={quantity}
            title={t('common.quantity')}
            onChange={(text) => setQuantity(text)}
          />
        </View>

        <ButtonPrimary
          title={t('estimate.calculate')}
          style={{ marginBottom: estimate_section_spacing }}
          onPress={() => {
            setCalculating(true);
            setTimeout(() => {
              calculateEstimate();
              setTimeout(() => setCalculating(false), 400);
            }, 0);
          }}
          loading={calculating}
        />
        <Line />
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('estimate.output')}</Text>

        <Table
          columns={[
            { key: 'material', label: t('estimate.table.material'), align: 'left' },
            { key: 'quantity', label: t('estimate.table.quantity'), align: 'center' },
            { key: 'unit', label: t('estimate.table.unit'), align: 'right' },
          ]}
          data={[
            {
              material: t('estimate.concrete.dryConcreteVolume'),
              quantity: dryConcreteVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.concrete.sandVolume'),
              quantity: sandVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.concrete.gravelVolume'),
              quantity: aggregateVolume || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.concrete.cementVolume'),
              quantity: cementVol || '-',
              unit: 'm³',
            },
            {
              material: t('estimate.concrete.cementWeight'),
              quantity: cementWeight || '-',
              unit: 'kg',
            },
            {
              material: t('estimate.concrete.cementBagsRequired'),
              quantity: cementBags || '-',
              unit: t('units.bags'),
            },
            {
              material: t('estimate.rcslab.num12mRods'),
              quantity: num12mRods || '-',
              unit: '',
            },
            {
              material: t('estimate.concrete.concreteCost'),
              quantity: concreteCost || '-',
              unit: 'FCFA',
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default Concrete;
