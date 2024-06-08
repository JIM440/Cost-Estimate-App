import { View, Text } from 'react-native';
import React from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';

const Concrete = () => {
  return (
    <View style={containerStyles.container}>
      <Text>Square Column Concrete</Text>
      <Text>Image here</Text>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Side a"
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Side b"
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Height"
          title="Height"
        />
      </View>
      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Dry Concrete Volume</Text>
      <Text>Cement Weight</Text>
      <Text>Cement</Text>
      <Text>Sand</Text>
      <Text>Aggregate</Text>
      <Text>Cement Bags</Text>
      <Text>Concrete Cost</Text>
      <Text></Text>
    </View>
  );
};

export default Concrete;
