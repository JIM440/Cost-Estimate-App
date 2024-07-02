import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';

const Excavation = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
  const [trips, setTrips] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const calculateCostEstimate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const price = parseFloat(pricePerM3);

    const volume = l * w * h;

    const totalVolume = volume + 0.3 * volume;

    const trips = Math.ceil(totalVolume / 56); // 56m³ per trip

    const totalCost = trips * price;

    setTrips(trips);
    setTotalVolume(totalVolume);
    setTotalCost(totalCost);
  };

  return (
    <View style={containerStyles.container}>
      <Text>Excavation</Text>
      <Text>Image Here</Text>

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
          placeholder="Depth"
          title="Depth (m)"
          value={height}
          onChange={(value) => {
            setHeight(value);
          }}
        />
      </View>

      <TextInputTitle
        title="Excavation Price Per m3"
        placeholder="price"
        value={pricePerM3}
        onChange={(value) => {
          setPricePerM3(value);
        }}
      />

      <ButtonPrimary
        title="Calculate Estimate"
        onPress={calculateCostEstimate}
      />
      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Total volume (plus compaction volume): {totalVolume} m³</Text>
      <Text>Number of trips: {trips}</Text>
      <Text>Total cost: {totalCost} fcfa</Text>
    </View>
  );
};

export default Excavation;
