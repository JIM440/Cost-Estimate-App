import { ScrollView, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';

const Plaster = () => {
  const [plasterPricePerM2, setPlasterPricePerM2] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [openingArea, setOpeningArea] = useState('');

  const [dryMortarVolume, setDryMortarVolume] = useState(0);
  const [cementWeight, setCementWeight] = useState(0);
  const [cementVolume, setCementVolume] = useState(0);
  const [sandVolume, setSandVolume] = useState(0);
  const [bagsOfCement, setBagsOfCement] = useState(0);
  const [plasterCost, setPlasterCost] = useState(0);

  const calculate = () => {
    const pricePerM2 = parseFloat(plasterPricePerM2);
    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const wallThickness = parseFloat(thickness);
    const openingAreaValue = parseFloat(openingArea);

    // Calculate total area of the wall to be plastered
    const totalArea = wallLength * wallWidth - openingAreaValue;

    // Calculate total volume for plastering
    const vol = totalArea * wallThickness;

    // Calculate total volume considering 30% wastage
    const totalVolume = vol * (1 + 0.3);

    // Calculate dry volume of plaster
    const dryVolume = totalVolume * 1.54;

    // Calculate cement volume and weight
    const cementVol = dryVolume / 3;
    const cementWeightValue = cementVol * 1440;
    const bagsOfCementValue = cementWeightValue / 50;

    // Calculate sand volume
    const sandVol = (dryVolume * 2) / 3;

    // Calculate plaster cost
    const totalPlasterCost = dryVolume * pricePerM2;

    // Update state with results
    setDryMortarVolume(dryVolume.toFixed(2));
    setCementWeight(cementWeightValue.toFixed(2));
    setCementVolume(cementVol.toFixed(2));
    setSandVolume(sandVol.toFixed(2));
    setBagsOfCement(bagsOfCementValue.toFixed(2));
    setPlasterCost(totalPlasterCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Text>Plaster</Text>
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
          placeholder="Thickness"
          title="Thickness (m)"
          value={thickness}
          onChange={(value) => {
            setThickness(value);
          }}
        />
      </View>
      <TextInputTitle
        title="Area of Opening"
        placeholder="area"
        value={openingArea}
        onChange={(value) => {
          setOpeningArea(value);
        }}
      />
      <TextInputTitle
        title="Plaster Price Per m2"
        placeholder="price"
        value={plasterPricePerM2}
        onChange={(value) => {
          setPlasterPricePerM2(value);
        }}
      />
      <ButtonPrimary title="Calculate Estimate" onPress={calculate} />
      <Line />

      <Text style={titleStyles.title}>Output:</Text>

      <Text>Dry Mortar Volume: {dryMortarVolume} cubic meters</Text>
      <Text>Cement Volume: {cementVolume} cubic meters</Text>
      <Text>Cement Weight: {cementWeight} kg</Text>
      <Text>Sand Volume: {sandVolume} cubic meters</Text>
      <Text>Number of Bags of Cement: {bagsOfCement}</Text>
      <Text>Plaster Cost: {plasterCost}</Text>
    </ScrollView>
  );
};

export default Plaster;
