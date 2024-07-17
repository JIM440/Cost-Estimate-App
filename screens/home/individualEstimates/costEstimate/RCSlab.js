import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { containerStyles, Line, titleStyles } from '../../../../styles/utility';
import ButtonPrimary from '../../../../components/Button';
import tableStyles from '../../../../styles/components/table';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import ImageStyle from '../../../../styles/screens/CostEstimate';

const RCSlab = () => {
  const [RCSLabLength, setRCSLabLength] = useState('');
  const [RCSLabWidth, setRCSLabWidth] = useState('');
  const [RCSLabHeight, setRCSLabHeight] = useState('');
  const [RCSLabRodSpacing, setRCSLabRodSpacing] = useState('');
  const [RCSlabEstimate, setRCSlabEstimate] = useState({
    concreteVolume: '',
    num12mRods: '',
    dryVol: '',
    sandVol: '',
    cementVol: '',
    gravelVol: '',
    numBagsCement: '',
  });

  const RCEstimate = () => {
    const areaOfSlab = parseInt(RCSLabLength) * parseInt(RCSLabWidth);
    const concreteVolume = areaOfSlab * parseFloat(RCSLabHeight);

    const numRodsX = parseFloat(RCSLabLength) / parseFloat(RCSLabRodSpacing);
    const num12mRodsX = (numRodsX * parseFloat(RCSLabWidth)) / 12;

    const numRodsY = parseFloat(RCSLabWidth) / parseFloat(RCSLabRodSpacing);
    const num12mRodsY = (numRodsY * parseFloat(RCSLabWidth)) / 12;

    const num12mRods = num12mRodsX + num12mRodsY;

    const dryVol = concreteVolume * 1.54; // Dry volume of concrete
    const gravelVol = dryVol * 0.5; // Dry volume of gravel
    const cementVol = dryVol * 0.25;
    const sandVol = dryVol * 0.25;

    // Calculate number of bags of cement
    const densityOfCement = 1440; // Density of cement in kg/m³
    const numBagsCement = Math.ceil((cementVol * densityOfCement) / 50); // Assuming 1 bag = 50 kg

    const estimatedData = {
      concreteVolume: concreteVolume.toFixed(2), // Two decimal places
      num12mRods: num12mRods.toFixed(2),
      dryVol: dryVol.toFixed(2),
      sandVol: sandVol.toFixed(2),
      cementVol: cementVol.toFixed(2),
      gravelVol: gravelVol.toFixed(2),
      numBagsCement: numBagsCement,
    };

    setRCSlabEstimate(estimatedData);
  };
  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/rc_slab_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>RC Slab Estimate</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Length"
            value={RCSLabLength}
            title="Length (m)"
            onChange={(text) => setRCSLabLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Width"
            value={RCSLabWidth}
            title="Width (m)"
            onChange={(text) => setRCSLabWidth(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Thickness"
            value={RCSLabHeight}
            title="Thickness (m)"
            onChange={(text) => setRCSLabHeight(text)}
          />
        </View>
        <TextInputTitle
          placeholder="Enter Spacing"
          value={RCSLabRodSpacing}
          title="Spacing (m)"
          onChange={(text) => setRCSLabRodSpacing(text)}
        />

        <ButtonPrimary onPress={RCEstimate} title="Calculate" />
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
              <Text style={tableStyles.cell}>{RCSlabEstimate.dryVol}</Text>
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
              <Text style={tableStyles.cell}>{RCSlabEstimate.sandVol}</Text>
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
              <Text style={tableStyles.cell}>{RCSlabEstimate.cementVol}</Text>
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
              <Text style={tableStyles.cell}>{RCSlabEstimate.gravelVol}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 6: Number of Bags of Cement */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Bags of Cement</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>
                {RCSlabEstimate.numBagsCement}
              </Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Bags</Text>
            </View>
          </View>

          {/* Row 7: Number of Rods */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of 12m Rods</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{RCSlabEstimate.num12mRods}</Text>
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

export default RCSlab;
