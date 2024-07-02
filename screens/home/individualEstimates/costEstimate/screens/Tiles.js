import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { ColumnLayouts } from '../../../../styles/components/cards';
import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';

const Tiles = () => {
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [floorLength, setFloorLength] = useState('');
  const [floorWidth, setFloorWidth] = useState('');
  const [wastage, setWastage] = useState('');
  const [tilePrice, setTilePrice] = useState('');
  const [floorArea, setFloorArea] = useState('');
  const [totalNumberOfTiles, setTotalNumberOfTiles] = useState('');
  const [tileCost, setTileCost] = useState('');

  const RoundUp = (number) => {
    if (number === '') {
      return null;
    }
    return Math.ceil(parseFloat(number)).toFixed(0);
  };

  const CalculateCost = () => {
    if (
      tileLength === '' ||
      tileWidth === '' ||
      floorLength === '' ||
      floorWidth === '' ||
      wastage === '' ||
      tilePrice === ''
    ) {
      return;
    }

    const floorArea = floorLength * floorWidth;
    setFloorArea(floorArea);

    const tileArea = tileLength * tileWidth;

    const NumberOfTiles = floorArea / tileArea;

    const waste = wastage / 100;
    const wastePercentTiles = waste * NumberOfTiles;

    const TotalNumberOfTiles = NumberOfTiles + wastePercentTiles;
    setTotalNumberOfTiles(TotalNumberOfTiles);

    const totalCost = TotalNumberOfTiles * tilePrice;
    setTileCost(totalCost);
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
          value={floorLength}
          onChange={(value) => {
            setFloorLength(value);
          }}
        />

        <TextInputTitle
          title="Width(m)"
          placeholder="Width"
          style={ColumnLayouts.TwoColumnItem}
          value={floorWidth}
          onChange={(value) => {
            setFloorWidth(value);
          }}
        />
      </View>

      <Text style={titleStyles.title}>Dimension of Tile</Text>

      <View style={ColumnLayouts.TwoColumn}>
        <TextInputTitle
          title="Length(m)"
          placeholder="Length"
          style={ColumnLayouts.TwoColumnItem}
          value={tileLength}
          onChange={(value) => {
            setTileLength(value);
          }}
        />
        <TextInputTitle
          title="Width(m)"
          placeholder="Width"
          style={ColumnLayouts.TwoColumnItem}
          value={tileWidth}
          onChange={(value) => {
            setTileWidth(value);
          }}
        />
      </View>

      <View style={ColumnLayouts.TwoColumn}>
        <TextInputTitle
          title="Wastage %"
          placeholder="Enter waste %"
          style={ColumnLayouts.TwoColumnItem}
          value={wastage}
          onChange={(value) => {
            setWastage(value);
          }}
        />
        <TextInputTitle
          title="Tile Price per m2"
          placeholder="Tile Price"
          style={ColumnLayouts.TwoColumnItem}
          value={tilePrice}
          onChange={(value) => {
            setTilePrice(value);
          }}
        />
      </View>

      <ButtonPrimary title="Calculate Estimate" onPress={CalculateCost} />
      <Line />
      <Text style={titleStyles.title}>Output:</Text>
      <Text>Floor Area: {RoundUp(floorArea) || ''} m2</Text>
      <Text>Number of Tiles: {RoundUp(totalNumberOfTiles) || ''} Tiles</Text>
      <Text>Tile Cost: {RoundUp(tileCost) || ''} fcfa</Text>
    </ScrollView>
  );
};

export default Tiles;
