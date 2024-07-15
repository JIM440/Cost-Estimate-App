import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
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
    if (length == '' || diameter == '' || pricePerKg == '' || pieces == '') {
      return;
    }
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
    <ScrollView style={containerStyles.scrollContainer}>
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Rods</Text>
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

        <View style={tableStyles.container}>
          {/* Row 1 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeader}>Material</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeader}>Quantity</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeader}>Unit</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Weight</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{weight}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>kg</Text>
            </View>
          </View>

          {/* Row 4 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Volume of 1 piece</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{volume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 3 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Total Cost</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{totalCost}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>FCFA</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Rod;
