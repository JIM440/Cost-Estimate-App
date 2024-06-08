import { View, Text } from 'react-native';
import React from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Filling = () => {
  return (
    <View style={containerStyles.container}>
      <Text>Filling</Text>
      <Text>Image Here</Text>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Length"
          title="Length (m)"
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Width"
          title="Width (m)"
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Depth"
          title="Depth (m)"
        />
      </View>

      <TextInputTitle title="Filling Price Per m3" placeholder="price" />
      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Volume: m3</Text>
      <Text>Total Trips</Text>
      <Text>Total Cost: fcfa</Text>
    </View>
  );
};

export default Filling;
