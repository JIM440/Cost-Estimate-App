import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { ColumnLayouts } from '../../../../styles/components/cards';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';

const Tiles = () => {
  return (
    <ScrollView style={containerStyles.container}>
      <Text>Tiles</Text>
      <Text>Image Here</Text>

      <Text style={titleStyles.title}>Dimension of Floor</Text>

      <View style={ColumnLayouts.TwoColumn}>
        <TextInputTitle
          title="Length(m)"
          placeholder="Length"
          style={ColumnLayouts.TwoColumnItem}
        />
        <TextInputTitle
          title="Width(m)"
          placeholder="Width"
          style={ColumnLayouts.TwoColumnItem}
        />
      </View>

      <Text style={titleStyles.title}>Dimension of Tile</Text>

      <View style={ColumnLayouts.TwoColumn}>
        <TextInputTitle
          title="Length(m)"
          placeholder="Length"
          style={ColumnLayouts.TwoColumnItem}
        />
        <TextInputTitle
          title="Width(m)"
          placeholder="Width"
          style={ColumnLayouts.TwoColumnItem}
        />
      </View>

      <View style={ColumnLayouts.TwoColumn}>
        <TextInputTitle
          title="Wastage %"
          placeholder="Enter Value"
          style={ColumnLayouts.TwoColumnItem}
        />
        <TextInputTitle
          title="Tile Price per m2"
          placeholder="Tile Price"
          style={ColumnLayouts.TwoColumnItem}
        />
      </View>

      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Floor Area: m2</Text>
      <Text>Number of Tiles: Tiles</Text>
      <Text>Tile Cost: fcfa</Text>
    </ScrollView>
  );
};

export default Tiles;
