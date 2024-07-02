import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';
import { primary_color } from '../../../../styles/colors';
import { ColumnLayouts } from '../../../../styles/components/cards';

const Formwork = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [formWorkPrice, setFormWorkPrice] = useState('');

  const [area, setArea] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const calculate = () => {
    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const pricePerM2 = parseFloat(formWorkPrice);

    const totalArea = wallLength * wallWidth;
    const totalCost = totalArea * pricePerM2;

    setArea(totalArea);
    setTotalCost(totalCost);
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Text>Dimension of Form Work</Text>
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
        title="Form Work Price per m2"
        value={formWorkPrice}
        onChange={(value) => {
          setFormWorkPrice(value);
        }}
      />
      <ButtonPrimary title="Calculate Estimate" onPress={calculate} />
      <Line />
      <Text>Output:</Text>
      <Text>Area: {area} m2</Text>
      <Text>Total Cost: {totalCost} fcfa</Text>
    </ScrollView>
  );
};
{
  /* length
width
form work price */
}

export default Formwork;
