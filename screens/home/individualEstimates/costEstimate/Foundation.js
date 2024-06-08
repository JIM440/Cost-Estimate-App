import { ScrollView, View, Text } from 'react-native';
import React from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { ColumnLayouts } from '../../../../styles/components/cards';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';

const Foundation = () => {
  return (
    <ScrollView style={containerStyles.container}>
      <Text>Depth of Foundation</Text>
      <Text>Image Here</Text>

      <TextInputTitle
        title="Bearing Capacity of Soil (kg/m2)"
        placeholder="Enter Value"
      />
      <TextInputTitle title="Density of Soil (kg/m3)" placeholder="Density" />
      <TextInputTitle title="Angle of Response" placeholder="Enter Angle" />

      <Text style={titleStyles.title}>Slab Concrete</Text>
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
      <TextInputTitle title="Concrete Price per m3" placeholder="price" />

      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Dry Concrete Volume: m3</Text>
      <Text>Cement Weight: kg</Text>
      <Text>Sand: m3</Text>
      <Text>Aggregate: m3</Text>
      <Text>Cement Bags: bags</Text>
      <Text>Concrete Cost: fcfa</Text>
    </ScrollView>
  );
};

export default Foundation;
