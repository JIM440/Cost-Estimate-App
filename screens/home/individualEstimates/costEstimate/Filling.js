import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';

const Filling = () => {
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

    const totalVolume = volume + 0.3 * volume;

    const trips = Math.ceil(totalVolume / 56); // 56m³ per trip

    const totalCost = trips * price;

    setTrips(trips);
    setTotalVolume(totalVolume);
    setTotalCost(totalCost);
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image style={image.image} source={require('../../../../assets/images/individual_estiamte/filling_c.jpg')} />

      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Filling</Text>

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
          title="Filling Price Per m³"
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
              <Text style={tableStyles.cell}>
                Total Volume (plus compaction volume)
              </Text>
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

export default Filling;

const image = StyleSheet.create({
  image: {
    width: '100vw',
    marginBottom: 10
  }
})