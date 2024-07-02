import { ScrollView, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';

const Plaster = () => {
  const [plasterPricePerM2, setPlasterPricePerM2] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [openingArea, setOpeningArea] = useState('');

  const [dryMortarVolume, setDryMortarVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [cementVolume, setCementVolume] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [bagsOfCement, setBagsOfCement] = useState('');
  const [plasterCost, setPlasterCost] = useState('');

  const calculate = () => {
    if (
      length == '' ||
      width == '' ||
      thickness == '' ||
      openingArea == '' ||
      plasterPricePerM2 == ''
    ) {
      return;
    }
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
    <ScrollView style={containerStyles.scrollContainer}>
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Plaster</Text>
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

        <Text style={titleStyles.boldTitle}>Output:</Text>

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
              <Text style={tableStyles.cell}>Dry Mortar Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{dryMortarVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>
          {/* Row 3 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{cementVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>
          {/* Row 4 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Weight</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{cementWeight}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>kg</Text>
            </View>
          </View>
          {/* Row 5 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Sand Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{sandVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>
          {/* Row 6 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Bags of Cement</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{bagsOfCement}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}></Text>
            </View>
          </View>
          {/* Row 7 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Plaster Cost</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{plasterCost}</Text>
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

export default Plaster;
