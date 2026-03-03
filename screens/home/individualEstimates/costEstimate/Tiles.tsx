import { View, Text, ScrollView } from 'react-native';
import Image from '../../../../components/Image';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { ColumnLayouts } from '../../../../styles/components/cards';
import { createTableStyles } from '../../../../styles/components/table';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import ButtonPrimary from '../../../../components/buttons/Button';
import ImageStyle from '../../../../styles/screens/CostEstimate';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';

const Tiles: React.FC = () => {
  const { t } = useLocale();
  const { colors } = useTheme();
  const tableStyles = React.useMemo(() => createTableStyles(colors), [colors]);
  const [calculating, setCalculating] = useState(false);
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [floorLength, setFloorLength] = useState('');
  const [floorWidth, setFloorWidth] = useState('');
  const [wastage, setWastage] = useState('');
  const [tilePrice, setTilePrice] = useState('');
  const [floorArea, setFloorArea] = useState('');
  const [totalNumberOfTiles, setTotalNumberOfTiles] = useState('');
  const [tileCost, setTileCost] = useState('');

  const RoundUp = (number: string) => {
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

    const floorArea = parseFloat(floorLength) * parseFloat(floorWidth);
    setFloorArea(floorArea.toFixed(2));

    const TileLength = parseFloat(tileLength) / 100;
    const TileWidth = parseFloat(tileWidth) / 100;
    const tileArea = TileLength * TileWidth;

    const NumberOfTiles = floorArea / tileArea;

    const waste = parseFloat(wastage) / 100;
    const wastePercentTiles = waste * NumberOfTiles;

    const TotalNumberOfTiles = Math.ceil(NumberOfTiles + wastePercentTiles);
    setTotalNumberOfTiles(TotalNumberOfTiles.toFixed(0));

    const totalCost = TotalNumberOfTiles * parseFloat(tilePrice);
    setTileCost(totalCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/tiles_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('items.tiles')}</Text>

        <Text style={[titleStyles.title, { color: colors.heading_text }]}>{t('estimate.tiles.dimensionOfFloor')}</Text>

        <View style={ColumnLayouts.TwoColumn}>
          <TextInputTitle
            title={t('estimate.tiles.floorLength')}
            placeholder={t('common.enterLength')}
            style={ColumnLayouts.TwoColumnItem}
            value={floorLength}
            onChange={(value) => setFloorLength(value)}
          />

          <TextInputTitle
            title={t('estimate.tiles.floorWidth')}
            placeholder={t('common.enterWidth')}
            style={ColumnLayouts.TwoColumnItem}
            value={floorWidth}
            onChange={(value) => setFloorWidth(value)}
          />
        </View>

        <Line />
        <Text style={[titleStyles.title, { color: colors.heading_text }]}>{t('estimate.tiles.dimensionOfTile')}</Text>

        <View style={ColumnLayouts.TwoColumn}>
          <TextInputTitle
            title={t('estimate.tiles.tileLengthCm')}
            placeholder={t('common.enterLength')}
            style={ColumnLayouts.TwoColumnItem}
            value={tileLength}
            onChange={(value) => setTileLength(value)}
          />
          <TextInputTitle
            title={t('estimate.tiles.tileWidthCm')}
            placeholder={t('common.enterWidth')}
            style={ColumnLayouts.TwoColumnItem}
            value={tileWidth}
            onChange={(value) => setTileWidth(value)}
          />
        </View>

        <View style={ColumnLayouts.TwoColumn}>
          <TextInputTitle
            title={t('estimate.tiles.wastagePercent')}
            placeholder={t('common.wastage')}
            style={ColumnLayouts.TwoColumnItem}
            value={wastage}
            onChange={(value) => setWastage(value)}
          />
          <TextInputTitle
            title={t('estimate.tiles.pricePerTile')}
            placeholder={t('common.enterPrice')}
            style={ColumnLayouts.TwoColumnItem}
            value={tilePrice}
            onChange={(value) => setTilePrice(value)}
          />
        </View>

        <ButtonPrimary
          title={t('estimate.calculate')}
          onPress={() => {
            setCalculating(true);
            setTimeout(() => {
              CalculateCost();
              setTimeout(() => setCalculating(false), 400);
            }, 0);
          }}
          loading={calculating}
        />
        <Line />

        <View style={tableStyles.container}>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('estimate.table.material')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('estimate.table.quantity')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('estimate.table.unit')}</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.tiles.floorArea')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{floorArea}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m²</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.tiles.numTiles')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{totalNumberOfTiles}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('units.tiles')}</Text>
            </View>
          </View>

          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{t('estimate.tiles.tileCost')}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>{tileCost}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Tiles;
