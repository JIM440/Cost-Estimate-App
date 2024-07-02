import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import { ColumnLayouts } from '../../../../styles/components/cards';
import ButtonPrimary from '../../../../components/Button';

const Rod = () => {
  const [length, setLength] = useState('');
  const [diameter, setDiameter] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [pieces, setPieces] = useState('');

  const [weight, setWeight] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [volume, setVolume] = useState('');

  const calculate = () => {
    // Convert inputs to numbers
    const rodLength = parseFloat(length);
    const rodDiameter = parseFloat(diameter);
    const rodPricePerKg = parseFloat(pricePerKg);
    const rodPieces = parseInt(pieces);

    // Calculate weight of one rod in kg
    const rodWeight = (rodDiameter * rodDiameter * rodLength) / 162;

    // Calculate total weight for all pieces
    const totalWeight = rodWeight * rodPieces;

    // Calculate total cost
    const totalRodCost = totalWeight * rodPricePerKg;

    // Calculate volume of one piece assuming rod as a cylinder
    const rodVolume = Math.PI * Math.pow(rodDiameter / 2, 2) * rodLength;

    // Update state with results
    setWeight(rodWeight.toFixed(2)); // Round to 2 decimal places
    setTotalCost(totalRodCost.toFixed(2));
    setVolume(rodVolume.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <View>
        <TextInputTitle
          title="Diameter (mm)"
          placeholder="Enter diameter"
          value={diameter}
          onChange={(value) => setDiameter(value)}
        />
        <TextInputTitle
          title="Length (m)"
          placeholder="Enter length"
          value={length}
          onChange={(value) => setLength(value)}
        />

        <TextInputTitle
          title="Number of pieces"
          placeholder="Enter number of pieces"
          value={pieces}
          onChange={(value) => setPieces(value)}
        />

        <TextInputTitle
          title="Price per kg"
          placeholder="Enter price per kg"
          value={pricePerKg}
          onChange={(value) => setPricePerKg(value)}
        />

        <ButtonPrimary title="Calculate Estimate" onPress={calculate} />
        <Line />

        <Text style={titleStyles.boldTitle}>Output</Text>
        <Text>Weight: {weight} Kg</Text>
        <Text>Total Cost: {totalCost} fcfa</Text>
        <Text>Volume of 1 piece: {volume} m³</Text>
      </View>
    </ScrollView>
  );
};

export default Rod;
