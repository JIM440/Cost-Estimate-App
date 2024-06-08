import { View, Text } from 'react-native';
import React from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Plaster = () => {
  return (
    <View style={containerStyles.container}>
      <Text>Plaster</Text>
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
          placeholder="Thickness"
          title="Thickness (m)"
        />
      </View>
      <TextInputTitle title="Plaster Price Per m2" placeholder="price" />
      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Material Quantity Unit</Text>
      <Text>Mortar: m3</Text>
      <Text>Dry Mortar: m3</Text>
      <Text>Cement Weight: kg</Text>
      <Text>Cement: m3</Text>
      <Text>Sand: m3</Text>
      <Text>Cement Bag: bags</Text>
      <Text>Plaster Cost: fcfa</Text>
    </View>
  );
};

export default Plaster;
