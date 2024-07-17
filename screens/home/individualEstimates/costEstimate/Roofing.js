import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import { primary_color } from '../../../../styles/colors';
import ImageStyle from '../../../../styles/screens/CostEstimate';

const Roofing = () => {
  const [houseLength, setHouseLength] = useState('');
  const [houseWidth, setHouseWidth] = useState('');
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const [span, setSpan] = useState('');
  const [roofingEstimate, setRoofingEstimate] = useState({});

  const calculateRoofingEstimate = () => {
    const L = parseFloat(houseLength);
    const W = parseFloat(houseWidth);
    const R = parseFloat(rise);
    const Ru = parseFloat(run);
    const S = parseFloat(span);

    const rafterLength = Math.sqrt(Math.pow(R, 2) + Math.pow(Ru, 2));
    const pitch = R / Ru;
    const pitchInDegrees = Math.atan(pitch) * (180 / Math.PI);
    const numberOfRafters = Math.ceil(L / S) + 1;
    const totalNumberOfRafters = numberOfRafters * rafterLength * 2;
    const numberOfRisers = Math.ceil(L / S) + 1;
    const totalNumberOfRisers = numberOfRisers * R * 2;
    const chaining = (W * L) / 4;
    const baseArea = W * L;
    const areaOfRoofing = baseArea / Math.cos(pitchInDegrees * (Math.PI / 180));
    const sheet = Math.ceil(areaOfRoofing / 30);
    const ceiling = Math.ceil(baseArea / 32);
    const purlin = Math.ceil((rafterLength * L) / 0.9);
    const boards = Math.ceil(
      totalNumberOfRafters + totalNumberOfRisers + chaining
    );

    setRoofingEstimate({
      numberOfCeilingBoards: ceiling,
      numberOfRoofingSheets: sheet,
      numberOfBoards: boards,
      numberOfPurlins: purlin,
    });
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={ImageStyle.image}
        source={require('../../../../assets/images/individual_estiamte/roof_c.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Roofing</Text>
        <>
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title="House Length (m)"
              placeholder="Enter length"
              value={houseLength}
              onChange={(text) => setHouseLength(text)}
            />
            <TextInputTitle
              style={inputStyles.twoColumnInput}
              title="House Width (m)"
              placeholder="Enter width"
              value={houseWidth}
              onChange={(text) => setHouseWidth(text)}
            />
          </View>
          <View style={inputStyles.threeColumn}>
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              title="Rise (m)"
              placeholder="Enter rise"
              value={rise}
              onChange={(text) => setRise(text)}
            />
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              title="Run (m)"
              placeholder="Enter run"
              value={run}
              onChange={(text) => setRun(text)}
            />
            <TextInputTitle
              style={inputStyles.threeColumnInput}
              title="Span (m)"
              placeholder="Enter span"
              value={span}
              onChange={(text) => setSpan(text)}
            />
          </View>
        </>
        <ButtonPrimary title="Calculate" onPress={calculateRoofingEstimate} />
        <Line />
        <Text style={titleStyles.boldTitle}>Output</Text>
        <View style={tableStyles.container}>
          <View style={tableStyles.row}>
            <Text style={tableStyles.columnHeaderSingle}>Roofing</Text>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeaderLeft}>Material</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeader}>Quantity</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeader}>Unit</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cellLeft}>Number of Ceiling Boards</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>
                {roofingEstimate.numberOfCeilingBoards}
              </Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Boards</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cellLeft}>Number of Roofing Sheets</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>
                {roofingEstimate.numberOfRoofingSheets}
              </Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Sheets</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cellLeft}>Number of Purlins</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>
                {roofingEstimate.numberOfPurlins}
              </Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Purlins</Text>
            </View>
          </View>
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cellLeft}>Number of Boards</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>
                {roofingEstimate.numberOfBoards}
              </Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Boards</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Roofing;
