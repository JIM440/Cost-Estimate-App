import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import ButtonPrimary from '../../../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

const Concrete = () => {
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
  const [dryConcreteVolume, setDryConcreteVolume] = useState(0);
  const [cementWeight, setCementWeight] = useState(0);
  const [cementBags, setCementBags] = useState(0);
  const [sandVolume, setSandVolume] = useState(0);
  const [aggregateVolume, setAggregateVolume] = useState(0);
  const [concreteCost, setConcreteCost] = useState(0);

  const calculateEstimate = () => {
    const volume = parseFloat(sideA) * parseFloat(sideB) * parseFloat(height);
    setDryConcreteVolume(volume.toFixed(2));

    // Assuming density of concrete is 2400 kg/m³
    const weight = volume * 2400;
    setCementWeight(weight.toFixed(2));

    // Assuming sand is 55% and aggregate is 45% of concrete volume
    setSandVolume((volume * 0.55).toFixed(2));
    setAggregateVolume((volume * 0.45).toFixed(2));

    // Assuming each bag of cement is 50 kg
    const bags = Math.ceil(weight / 50);
    setCementBags(bags);

    // Calculate concrete cost
    setConcreteCost((volume * pricePerM3).toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Text>Square Column Concrete</Text>
      <Text>Image here</Text>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Side a"
          value={sideA}
          onChange={(value) => {
            setSideA(value);
          }}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Side b"
          value={sideB}
          onChange={(value) => {
            setSideB(value);
          }}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Height"
          title="Height"
          value={height}
          onChange={(value) => {
            setHeight(value);
          }}
        />
      </View>
      <TextInputTitle
        title="Price per m3"
        placeholder="Enter price:"
        value={pricePerM3}
        onChange={(value) => {
          setPricePerM3(value);
        }}
      />
      <ButtonPrimary title="Calculate Estimate" onPress={calculateEstimate} />
      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Dry Concrete Volume: {dryConcreteVolume} m³</Text>
      <Text>Cement Weight: {cementWeight} kg</Text>
      <Text>Cement Bags Required: {cementBags}</Text>
      <Text>Sand Volume: {sandVolume} m³</Text>
      <Text>Aggregate Volume: {aggregateVolume} m³</Text>
      <Text>Concrete Cost: {concreteCost} FCFA</Text>
      <Text></Text>
    </ScrollView>
  );
};

export default Concrete;
