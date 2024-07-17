import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { ColumnLayouts } from '../../../../styles/components/cards';
import tableStyles from '../../../../styles/components/table';
import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';
import { primary_color } from '../../../../styles/colors';
import ImageStyle from '../../../../styles/screens/CostEstimate';

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
    setFloorArea(floorArea.toFixed(2));

    const tileArea = tileLength * tileWidth;

    const NumberOfTiles = floorArea / tileArea;

    const waste = wastage / 100;
    const wastePercentTiles = waste * NumberOfTiles;

    const TotalNumberOfTiles = NumberOfTiles + wastePercentTiles;
    setTotalNumberOfTiles(TotalNumberOfTiles.toFixed(0));

    const totalCost = TotalNumberOfTiles * tilePrice;
    setTileCost(totalCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/tiles_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Tiles</Text>

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

        <Line />
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
            title="Price per Tile"
            placeholder="Enter Price"
            style={ColumnLayouts.TwoColumnItem}
            value={tilePrice}
            onChange={(value) => {
              setTilePrice(value);
            }}
          />
        </View>

        <ButtonPrimary title="Calculate Estimate" onPress={CalculateCost} />
        <Line />

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
              <Text style={tableStyles.cell}>Floor Area</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{floorArea}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m²</Text>
            </View>
          </View>

          {/* Row 3 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Tiles</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{totalNumberOfTiles}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Tiles</Text>
            </View>
          </View>

          {/* Row 4 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Tile Cost Area</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{tileCost}</Text>
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

export default Tiles;
