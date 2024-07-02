import { ScrollView, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { ColumnLayouts } from '../../../../styles/components/cards';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import ButtonPrimary from '../../../../components/Button';

const Foundation = () => {
  const [bearingCapacity, setBearingCapacity] = useState('');
  const [densityOfSoil, setDensityOfSoil] = useState('');
  const [angleOfResponse, setAngleOfResponse] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
  const [depth, setDepth] = useState('');
  const [dryConcreteVolume, setDryConcreteVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [aggregateVolume, setAggregateVolume] = useState('');
  const [cementBags, setCementBags] = useState('');
  const [concreteCost, setConcreteCost] = useState('');

  const calculate = () => {
    // Calculate depth of foundation
    const depthResult =
      (parseFloat(bearingCapacity) / parseFloat(densityOfSoil)) *
      Math.pow(
        (1 - Math.sin((parseFloat(angleOfResponse) * Math.PI) / 180)) /
          (1 + Math.sin((parseFloat(angleOfResponse) * Math.PI) / 180)),
        2
      );
    setDepth(depthResult.toFixed(2));

    // Calculate dry concrete volume, cement weight, sand volume, aggregate volume, cement bags required, and concrete cost
    const volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
    const dryConcreteVolumeResult = volume * depthResult;
    setDryConcreteVolume(dryConcreteVolumeResult.toFixed(2));

    const cementWeightResult = dryConcreteVolumeResult * 2400; // Assuming density of concrete is 2400 kg/m³
    setCementWeight(cementWeightResult.toFixed(2));

    const sandVolumeResult = dryConcreteVolumeResult * 0.55; // Assuming sand is 55% of concrete volume
    setSandVolume(sandVolumeResult.toFixed(2));

    const aggregateVolumeResult = dryConcreteVolumeResult * 0.45; // Assuming aggregate is 45% of concrete volume
    setAggregateVolume(aggregateVolumeResult.toFixed(2));

    const cementBagsResult = cementWeightResult / 50; // Assuming each bag of cement is 50 kg
    setCementBags(Math.ceil(cementBagsResult));

    const concreteCostResult = dryConcreteVolumeResult * parseFloat(pricePerM3);
    setConcreteCost(concreteCostResult.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Text>Depth of Foundation</Text>
      <Text>Image Here</Text>

      <TextInputTitle
        title="Bearing Capacity of Soil (kg/m2)"
        placeholder="Enter Value"
        value={bearingCapacity}
        onChange={(value) => {
          setBearingCapacity(value);
        }}
      />
      <TextInputTitle
        title="Density of Soil (kg/m3)"
        placeholder="Density"
        value={densityOfSoil}
        onChange={(value) => {
          setDensityOfSoil(value);
        }}
      />
      <TextInputTitle
        title="Angle of Response"
        placeholder="Enter Angle"
        value={angleOfResponse}
        onChange={(value) => {
          setAngleOfResponse(value);
        }}
      />

      <Text style={titleStyles.title}>Slab Concrete</Text>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Length"
          title="Length (m)"
          value={length}
          onChange={(value) => {
            setLength(value);
          }}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Width"
          title="Width (m)"
          value={width}
          onChange={(value) => {
            setWidth(value);
          }}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Thickness"
          title="Thickness (m)"
          value={height}
          onChange={(value) => {
            setHeight(value);
          }}
        />
      </View>
      <TextInputTitle
        title="Concrete Price per m3"
        placeholder="price"
        value={pricePerM3}
        onChange={(value) => {
          setPricePerM3(value);
        }}
      />

      <ButtonPrimary title="Calculate Estimate" onPress={calculate} />

      <Line />
      <Text style={titleStyles.title}>Output:</Text>

      <Text>Depth of Foundation: {depth} m</Text>
      <Text>Dry Concrete Volume: {dryConcreteVolume} m³</Text>
      <Text>Cement Weight: {cementWeight} kg</Text>
      <Text>Sand Volume: {sandVolume} m³</Text>
      <Text>Aggregate Volume: {aggregateVolume} m³</Text>
      <Text>Cement Bags Required: {cementBags}</Text>
      <Text>Concrete Cost: {concreteCost} fcfa</Text>
    </ScrollView>
  );
};

export default Foundation;
