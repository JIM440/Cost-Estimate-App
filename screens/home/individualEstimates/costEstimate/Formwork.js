import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import { ColumnLayouts } from '../../../../styles/components/cards';
import ImageStyle from '../../../../styles/screens/CostEstimate';

const Formwork = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [formWorkPrice, setFormWorkPrice] = useState('');

  const [area, setArea] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculate = () => {
    if (length == '' || width == '' || formWorkPrice == '') {
      return;
    }

    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const pricePerM2 = parseFloat(formWorkPrice);

    const totalArea = wallLength * wallWidth;
    const totalCost = totalArea * pricePerM2;

    setArea(totalArea);
    setTotalCost(totalCost);
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/formwork_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Formwork</Text>
        <View style={ColumnLayouts.TwoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Length"
            title="Length (m)"
            value={length}
            onChange={(value) => {
              setLength(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Width"
            title="Width (m)"
            value={width}
            onChange={(value) => {
              setWidth(value);
            }}
          />
        </View>
        <TextInputTitle
          placeholder="price"
          title="Form Work Price per m²"
          value={formWorkPrice}
          onChange={(value) => {
            setFormWorkPrice(value);
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
              <Text style={tableStyles.cell}>Area</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{area}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m²</Text>
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

export default Formwork;
