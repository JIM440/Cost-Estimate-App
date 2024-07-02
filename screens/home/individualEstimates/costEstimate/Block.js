import { ScrollView, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';

const Block = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [blockLength, setBlockLength] = useState('');
  const [blockWidth, setBlockWidth] = useState('');
  const [blockHeight, setBlockHeight] = useState('');
  const [subtractArea, setSubtractArea] = useState('');
  const [blockPrice, setBlockPrice] = useState('');

  const [wallVolume, setWallVolume] = useState(0);
  const [numOfBlocks, setNumOfBlocks] = useState(0);
  const [dryMortarVolume, setDryMortarVolume] = useState(0);
  const [sandVolume, setSandVolume] = useState(0);
  const [cementVolume, setCementVolume] = useState(0);
  const [cementWeight, setCementWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const calculate = () => {
    // Convert inputs to numbers
    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const wallHeight = parseFloat(height);
    const blockLengthValue = parseFloat(blockLength);
    const blockWidthValue = parseFloat(blockWidth);
    const blockHeightValue = parseFloat(blockHeight);
    const subtractAreaValue = parseFloat(subtractArea);
    const blockPriceValue = parseFloat(blockPrice);

    // Calculate wall volume
    const wallVolumeValue =
      (wallLength * wallWidth - subtractAreaValue) * wallHeight;

    // Calculate number of blocks
    const blockVolume = blockLengthValue * blockWidthValue * blockHeightValue;
    const totalBlockVolume = wallVolumeValue;
    const blockNumber = Math.ceil(totalBlockVolume / blockVolume);

    // Calculate dry mortar volume, assuming standard 1:6 mortar mix
    const dryMortarVol = totalBlockVolume * 1.54;

    // Calculate sand volume
    const sandVol = (dryMortarVol * 3) / 4;

    // Calculate cement volume and weight, assuming density of cement as 1440 kg/m³
    const cementVol = (dryMortarVol * 1) / 4;
    const cementWeightValue = cementVol * 1440;

    // Calculate total cost
    const totalBlockCost = blockNumber * blockPriceValue;

    // Update state with results
    setWallVolume(totalBlockVolume.toFixed(2));
    setNumOfBlocks(blockNumber);
    setDryMortarVolume(dryMortarVol.toFixed(2));
    setSandVolume(sandVol.toFixed(2));
    setCementVolume(cementVol.toFixed(2));
    setCementWeight(cementWeightValue.toFixed(2));
    setTotalCost(totalBlockCost.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Blocks</Text>
        <Text>Dimension of Wall</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Length (m)"
            placeholder="Enter length"
            value={length}
            onChange={(text) => setLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Width (m)"
            placeholder="Enter width"
            value={width}
            onChange={(text) => setWidth(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Height (m)"
            placeholder="Enter height"
            value={height}
            onChange={(text) => setHeight(text)}
          />
        </View>
        <Line />
        <Text>Dimension of Block</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Length (m)"
            placeholder="Enter length"
            value={blockLength}
            onChange={(text) => setBlockLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Width (m)"
            placeholder="Enter width"
            value={blockWidth}
            onChange={(text) => setBlockWidth(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Height (m)"
            placeholder="Enter height"
            value={blockHeight}
            onChange={(text) => setBlockHeight(text)}
          />
        </View>
        <Line />

        <TextInputTitle
          title="Subtract Area (m²)"
          placeholder="Enter area"
          value={subtractArea}
          onChange={(text) => setSubtractArea(text)}
        />

        <TextInputTitle
          title="Price Per Block"
          placeholder="Enter price"
          value={blockPrice}
          onChange={(text) => setBlockPrice(text)}
        />

        <ButtonPrimary title="Calculate Estimate" onPress={calculate} />
        <Line />

        <Text style={titleStyles.boldTitle}>Output:</Text>
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
              <Text style={tableStyles.cell}>Total Wall Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{wallVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 3 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Blocks</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{numOfBlocks}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}></Text>
            </View>
          </View>

          {/* Row 4 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Dry Mortar Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{dryMortarVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 5 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Sand Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{sandVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 6 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{cementVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 7 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Weight Cost</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{cementWeight}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Kg</Text>
            </View>
          </View>

          {/* Row 8 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Bags Cost</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>
                {(cementWeight / 50).toFixed(2)}
              </Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}></Text>
            </View>
          </View>

          {/* Row 9 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Total Cost</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{totalCost}</Text>
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

export default Block;
