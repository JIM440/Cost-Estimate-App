import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import ImageStyle from '../../../../styles/screens/CostEstimate';

const Excavation = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
  const [trips, setTrips] = useState('');
  const [totalVolume, setTotalVolume] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculateCostEstimate = () => {
    if (length == '' || width == '' || height == '' || pricePerM3 == '') {
      return;
    }
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const price = parseFloat(pricePerM3);

    const volume = l * w * h;

    const totalVolume = volume;

    const trips = Math.ceil(totalVolume / 56); // 56m³ per trip

    const totalCost = totalVolume * price;

    setTrips(trips);
    setTotalVolume(totalVolume.toFixed(2));
    setTotalCost(totalCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/excavation2_c.webp')}
      />

      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Excavation</Text>

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
          title="Excavation Price Per m³"
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
              <Text style={tableStyles.cell}>Total Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{totalVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>
          {/* Row 3 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Trips</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{trips}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Trips</Text>
            </View>
          </View>
          {/* Row 4 */}
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

export default Excavation;
