import { ScrollView, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import tableStyles from '../../../../styles/components/table';

import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';

const Foundation = () => {
  const [bearingCapacity, setBearingCapacity] = useState('');
  const [densityOfSoil, setDensityOfSoil] = useState('');
  const [angleOfResponse, setAngleOfResponse] = useState('');
  const [depth, setDepth] = useState('');

  const calculate = () => {
    // Calculate depth of foundation
    if (densityOfSoil == '' || bearingCapacity == '' || angleOfResponse == '') {
      return;
    }

    const depthResult =
      (parseFloat(bearingCapacity) / parseFloat(densityOfSoil)) *
      Math.pow(
        (1 - Math.sin((parseFloat(angleOfResponse) * Math.PI) / 180)) /
          (1 + Math.sin((parseFloat(angleOfResponse) * Math.PI) / 180)),
        2
      );
    setDepth(depthResult.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Depth of Foundation</Text>

        <TextInputTitle
          title="Bearing Capacity of Soil (kg/m²)"
          placeholder="Enter Value"
          value={bearingCapacity}
          onChange={(value) => {
            setBearingCapacity(value);
          }}
        />
        <TextInputTitle
          title="Density of Soil (kg/m³)"
          placeholder="Density"
          value={densityOfSoil}
          onChange={(value) => {
            setDensityOfSoil(value);
          }}
        />
        <TextInputTitle
          title="Angle of Response"
          placeholder="Enter Angle"
          value={angleOfResponse}
          onChange={(value) => {
            setAngleOfResponse(value);
          }}
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
              <Text style={tableStyles.cell}>Depth of Foundation</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{depth}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Foundation;
