import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import ImageStyle from '../../../../styles/screens/CostEstimate';

const Block = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [blockLength, setBlockLength] = useState('');
  const [blockWidth, setBlockWidth] = useState('');
  const [blockHeight, setBlockHeight] = useState('');
  const [subtractArea, setSubtractArea] = useState('');
  const [blockPrice, setBlockPrice] = useState('');
  const [cementRatio, setCementRatio] = useState('');
  const [sandRatio, setSandRatio] = useState('');

  const [wallVolume, setWallVolume] = useState('');
  const [numOfBlocks, setNumOfBlocks] = useState('');
  const [dryMortarVolume, setDryMortarVolume] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [cementVolume, setCementVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [cementBags, setCementBags] = useState('');

  const calculate = () => {
    if (
      length == '' ||
      width == '' ||
      height == '' ||
      blockLength == '' ||
      blockWidth == '' ||
      blockHeight == '' ||
      subtractArea == '' ||
      cementRatio == '' ||
      sandRatio == '' ||
      blockPrice == ''
    ) {
      return;
    }

    // Convert inputs to numbers
    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const wallHeight = parseFloat(height);
    const blockLengthValue = parseFloat(blockLength);
    const blockWidthValue = parseFloat(blockWidth);
    const blockHeightValue = parseFloat(blockHeight);
    const subtractAreaValue = parseFloat(subtractArea);
    const blockPriceValue = parseFloat(blockPrice);
    const SandRatio = parseFloat(sandRatio);
    const CementRatio = parseFloat(cementRatio);

    // Calculate wall volume
    const wallVolumeValue =
      (wallLength * wallHeight - subtractAreaValue) * wallWidth;

    // Calculate number of blocks
    const blockVolume = blockLengthValue * blockWidthValue * blockHeightValue;
    const totalBlockVolume = wallVolumeValue;
    const blockNumber = Math.ceil((1.1 * totalBlockVolume) / blockVolume); //wastage volume

    // Calculate dry mortar volume, assuming standard 1:3 mortar mix
    const dryMortarVol = totalBlockVolume * 1.54;

    const mortarRatio = CementRatio + SandRatio;
    // Calculate sand volume
    const sandVol = (dryMortarVol * SandRatio) / mortarRatio;

    // Calculate cement volume and weight, assuming density of cement as 1440 kg/m³
    const cementVol = (dryMortarVol * CementRatio) / mortarRatio;
    const cementWeightValue = cementVol * 1440;
    // assuming 1 bag =
    const cementBags = Math.ceil(blockNumber / 35);

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
    setCementBags(cementBags);
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/block_c.jpg')}
      />
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
            title="Height (m)"
            placeholder="Enter height"
            value={height}
            onChange={(text) => setHeight(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Thickness (m)"
            placeholder="Enter Thickness"
            value={width}
            onChange={(text) => setWidth(text)}
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
            title="Height (m)"
            placeholder="Enter height"
            value={blockHeight}
            onChange={(text) => setBlockHeight(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Thickness (m)"
            placeholder="Enter thickness"
            value={blockWidth}
            onChange={(text) => setBlockWidth(text)}
          />
        </View>
        <Line />
        <Text>Mix Ratio</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title="Cement Ratio"
            placeholder="Cement Ratio"
            value={cementRatio}
            onChange={(text) => setCementRatio(text)}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title="Sand Ratio"
            placeholder="Sand Ratio"
            value={sandRatio}
            onChange={(text) => setSandRatio(text)}
          />
        </View>

        <Line />

        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title="Subtract Area (m²)"
            placeholder="Enter area"
            value={subtractArea}
            onChange={(text) => setSubtractArea(text)}
          />

          <TextInputTitle
            style={inputStyles.twoColumnInput}
            title="Price Per Block"
            placeholder="Enter price"
            value={blockPrice}
            onChange={(text) => setBlockPrice(text)}
          />
        </View>

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
              <Text style={tableStyles.cell}>Dry Mortar Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{dryMortarVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>

          {/* Row 4 */}
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

          {/* Row 5 */}
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
          {/* 
          { Row 6 }
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Weight</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{cementWeight}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Kg</Text>
            </View>
          </View> */}

          {/* Row 7 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Bags</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{cementBags}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Bags</Text>
            </View>
          </View>

          {/* Row 8 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Blocks</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{numOfBlocks}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Blocks</Text>
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
