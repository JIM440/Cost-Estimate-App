import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { ColumnLayouts } from '../../../../styles/components/cards';
import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';

const Tiles = () => {
  const [tileLength, setTileLength] = useState(0);
  const [tileWidth, setTileWidth] = useState(0);
  const [floorLength, setFloorLength] = useState(0);
  const [floorWidth, setFloorWidth] = useState(0);
  const [wastage, setWastage] = useState(0);
  const [tilePrice, setTilePrice] = useState(0);
  const [totalNumberOfTiles, setTotalNumberOfTiles] = useState(0);

  const CalculateCost = () => {
    // const floorLength = 5;
    // const floorWidth = 12;
    // const floorArea = floorLength * floorWidth;

    // const tileLength = 0.3;
    // const tileWidth = 0.3;
    // const tileArea = tileLength * tileWidth;

    // const NumberOfTiles = floorArea / tileArea;

    // const waste = 10 / 100;
    // const wastePercentTiles = waste * NumberOfTiles;

    // const TotalNumberOfTiles = NumberOfTiles + wastePercentTiles;

    console.log(floorLength, floorWidth);

    // return TotalNumberOfTiles;
  };

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
          onChange={(event) => {
            setFloorLength(event.target.value);
          }}
        />

        <TextInputTitle
          title="Width(m)"
          placeholder="Width"
          style={ColumnLayouts.TwoColumnItem}
          onChange={(event) => {
            setFloorWidth(event.target.value);
          }}
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

      <ButtonPrimary title="Calculate Estimate" onPress={CalculateCost} />
      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Floor Area: m2</Text>
      <Text>Number of Tiles: Tiles</Text>
      <Text>Tile Cost: fcfa</Text>
    </ScrollView>
  );
};

export default Tiles;
