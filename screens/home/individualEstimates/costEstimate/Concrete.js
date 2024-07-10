import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { primary_color } from '../../../../styles/colors';

const Concrete = () => {
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
  const [dryConcreteVolume, setDryConcreteVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [cementBags, setCementBags] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [aggregateVolume, setAggregateVolume] = useState('');
  const [concreteCost, setConcreteCost] = useState('');

  const calculateEstimate = () => {
    if (sideA == '' || sideB == '' || height == '' || pricePerM3 == '') {
      return;
    }

    const volume = parseFloat(sideA) * parseFloat(sideB) * parseFloat(height);
    const dryVolume = volume * 1.54;
    setDryConcreteVolume(dryVolume.toFixed(2));

    // Assuming density of concrete is 2400 kg/m³
    const weight = dryVolume * 2400;
    setCementWeight(weight.toFixed(2));

    // Assuming sand is 55% and aggregate is 45% of concrete volume
    setSandVolume((dryVolume * 0.55).toFixed(2));
    setAggregateVolume((dryVolume * 0.45).toFixed(2));

    // Assuming each bag of cement is 50 kg
    const bags = Math.ceil(weight / 50);
    setCementBags(bags);

    // Calculate concrete cost
    setConcreteCost((dryVolume * pricePerM3).toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={style.image}
        source={require('../../../../assets/images/individual_estiamte/concrete_dimension.png')}
      />
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Square Column Concrete</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Side a (m)"
            value={sideA}
            onChange={(value) => {
              setSideA(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Side b (m)"
            value={sideB}
            onChange={(value) => {
              setSideB(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Height"
            title="Height (m)"
            value={height}
            onChange={(value) => {
              setHeight(value);
            }}
          />
        </View>
        <TextInputTitle
          title="Price per m³"
          placeholder="Enter price:"
          value={pricePerM3}
          onChange={(value) => {
            setPricePerM3(value);
          }}
        />
        <ButtonPrimary title="Calculate Estimate" onPress={calculateEstimate} />
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
              <Text style={tableStyles.cell}>Dry Concrete Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{dryConcreteVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 3 */}
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

          {/* Row 4 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Bags Required</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{cementBags}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}></Text>
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
              <Text style={tableStyles.cell}>Aggregate Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{aggregateVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 7 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Concrete Cost</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{concreteCost}</Text>
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

const style = StyleSheet.create({
  image: {
    width: '100%',
    objectFit: 'contain',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: primary_color,
  },
});

export default Concrete;
