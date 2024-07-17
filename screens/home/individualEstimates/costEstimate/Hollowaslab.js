import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { containerStyles, Line, titleStyles } from '../../../../styles/utility';
import ButtonPrimary from '../../../../components/Button';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
import { inputStyles } from '../../../../styles/components/inputStyles';
import ImageStyle from '../../../../styles/screens/CostEstimate';

const HollowSlab = () => {
  const [HBSlabLength, setHBSlabLength] = useState('');
  const [HBSlabWidth, setHBSlabWidth] = useState('');
  const [HBSlabThickness, setHBSlabThickness] = useState('');
  const [HBSlabSpan, setHBSlabSpan] = useState('');
  const [HBSlabBlockLength, setHBSlabBlockLength] = useState('');
  const [HBSlabBlockWidth, setHBSlabBlockWidth] = useState('');
  const [HBSlabEstimate, setHBSlabEstimate] = useState({
    concreteVolume: '',
    numBlocks: '',
    num12mRods: '',
    dryVol: '',
    sandVol: '',
    cementVol: '',
    gravelVol: '',
    numBagsCement: '',
  });

  const HBEstimate = () => {
    const areaOfSlab = parseFloat(HBSlabLength) * parseFloat(HBSlabWidth);
    const areaOfBlock =
      parseFloat(HBSlabBlockLength) * parseFloat(HBSlabBlockWidth);

    const numBlocks = Math.ceil(areaOfSlab / areaOfBlock);
    const concreteVolume = areaOfSlab * parseFloat(HBSlabThickness); // Convert to cubic meters (0.4 cm to meters)
    // const concreteVolume = areaOfSlab * 0.004; // Convert to cubic meters (0.4 cm to meters)

    const numRods = parseFloat(HBSlabSpan) / parseFloat(HBSlabBlockWidth);
    const num12mRods = (numRods * parseFloat(HBSlabWidth)) / 12; // Assuming rods are 12 meters long

    const dryVol = concreteVolume * 1.54; // Dry volume of concrete
    const gravelVol = dryVol * 0.5; // Dry volume of gravel

    // Calculate volumes based on ratio 1:1:2 (cement:gravel:sand)
    const cementVol = dryVol * 0.25;
    const sandVol = cementVol * 0.25;

    // Calculate number of bags of cement
    const densityOfCement = 1440; // Density of cement in kg/m³
    const numBagsCement = Math.ceil((cementVol * densityOfCement) / 50); // Assuming 1 bag = 50 kg

    const estimatedData = {
      concreteVolume: concreteVolume.toFixed(2), // Two decimal places
      numRods: numRods,
      num12mRods: Math.ceil(num12mRods),
      numBlocks: numBlocks,
      dryVol: dryVol.toFixed(2),
      sandVol: sandVol.toFixed(2),
      cementVol: cementVol.toFixed(2),
      gravelVol: gravelVol.toFixed(2),
      numBagsCement: numBagsCement,
    };

    setHBSlabEstimate(estimatedData);
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/hollow_slab_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Hollow Block Slab Estimate</Text>
        <Text style={titleStyles.title}>Slab Dimensions</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Length"
            value={HBSlabLength}
            title="Length (m)"
            onChange={(text) => setHBSlabLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Width"
            value={HBSlabWidth}
            title="Width (m)"
            onChange={(text) => setHBSlabWidth(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Thickness"
            value={HBSlabThickness}
            title="Thickness (m)"
            onChange={(text) => setHBSlabThickness(text)}
          />
        </View>
        <Line />

        <Text style={titleStyles.title}>Block Dimensions</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Enter Length"
            value={HBSlabBlockLength}
            title="Length of Block (m)"
            onChange={(text) => setHBSlabBlockLength(text)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Enter Width"
            value={HBSlabBlockWidth}
            title="Width of Block (m)"
            onChange={(text) => setHBSlabBlockWidth(text)}
          />
        </View>
        <TextInputTitle
          placeholder="Enter Span"
          value={HBSlabSpan}
          title="Span between Blocks (m)"
          onChange={(text) => setHBSlabSpan(text)}
        />
        <ButtonPrimary title="Calculate" onPress={HBEstimate} />
        <Line />
        <Text style={titleStyles.boldTitle}>Output:</Text>
        <View style={tableStyles.container}>
          {/* Row 1: Material */}
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

          {/* Row 2: Dry Volume of Concrete */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Dry Volume of Concrete</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{HBSlabEstimate.dryVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 3: Dry Volume of Sand */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Volume of Sand</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{HBSlabEstimate.sandVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 4: Dry Volume of Cement */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Volume of Cement</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{HBSlabEstimate.cementVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 5: Dry Volume of Gravel */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Volume of Gravel</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{HBSlabEstimate.gravelVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 7: Number of Bags of Cement */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Bags of Cement</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{HBSlabEstimate.numBlocks}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Bags</Text>
            </View>
          </View>

          {/* Row 8: Number of Rods */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Rods</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{HBSlabEstimate.num12mRods}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Rods</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HollowSlab;
