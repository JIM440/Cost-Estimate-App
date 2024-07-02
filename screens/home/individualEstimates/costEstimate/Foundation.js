import { ScrollView, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import tableStyles from '../../../../styles/components/table';

import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import ButtonPrimary from '../../../../components/Button';

const Foundation = () => {
  const [bearingCapacity, setBearingCapacity] = useState('');
  const [densityOfSoil, setDensityOfSoil] = useState('');
  const [angleOfResponse, setAngleOfResponse] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
  const [depth, setDepth] = useState('');
  const [dryConcreteVolume, setDryConcreteVolume] = useState('');
  const [cementWeight, setCementWeight] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [aggregateVolume, setAggregateVolume] = useState('');
  const [cementBags, setCementBags] = useState('');
  const [concreteCost, setConcreteCost] = useState('');

  const calculate = () => {
    // Calculate depth of foundation
    if (
      length == '' ||
      width == '' ||
      height == '' ||
      pricePerM3 == '' ||
      densityOfSoil == '' ||
      bearingCapacity == '' ||
      angleOfResponse == ''
    ) {
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

    // Calculate dry concrete volume, cement weight, sand volume, aggregate volume, cement bags required, and concrete cost
    const volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
    const dryConcreteVolumeResult = volume * depthResult;
    setDryConcreteVolume(dryConcreteVolumeResult.toFixed(2));

    const cementWeightResult = dryConcreteVolumeResult * 2400; // Assuming density of concrete is 2400 kg/m³
    setCementWeight(cementWeightResult.toFixed(2));

    const sandVolumeResult = dryConcreteVolumeResult * 0.55; // Assuming sand is 55% of concrete volume
    setSandVolume(sandVolumeResult.toFixed(2));

    const aggregateVolumeResult = dryConcreteVolumeResult * 0.45; // Assuming aggregate is 45% of concrete volume
    setAggregateVolume(aggregateVolumeResult.toFixed(2));

    const cementBagsResult = cementWeightResult / 50; // Assuming each bag of cement is 50 kg
    setCementBags(Math.ceil(cementBagsResult));

    const concreteCostResult = dryConcreteVolumeResult * parseFloat(pricePerM3);
    setConcreteCost(concreteCostResult.toFixed(2));
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Depth of Foundation</Text>

        <TextInputTitle
          title="Bearing Capacity of Soil (kg/m2)"
          placeholder="Enter Value"
          value={bearingCapacity}
          onChange={(value) => {
            setBearingCapacity(value);
          }}
        />
        <TextInputTitle
          title="Density of Soil (kg/m3)"
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

        <Text style={titleStyles.title}>Slab Concrete</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Length"
            title="Length (m)"
            value={length}
            onChange={(value) => {
              setLength(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Width"
            title="Width (m)"
            value={width}
            onChange={(value) => {
              setWidth(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Thickness"
            title="Thickness (m)"
            value={height}
            onChange={(value) => {
              setHeight(value);
            }}
          />
        </View>
        <TextInputTitle
          title="Concrete Price per m3"
          placeholder="price"
          value={pricePerM3}
          onChange={(value) => {
            setPricePerM3(value);
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
          {/* Row 3 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Dry Concrete Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{dryConcreteVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>
          {/* Row 4 */}
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
              <Text style={tableStyles.cell}>Aggregate Volume</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{aggregateVolume}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m³</Text>
            </View>
          </View>
          {/* Row 7 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Cement Bags Required</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{cementBags}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}></Text>
            </View>
          </View>
          {/* Row 8 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Concrete Cost</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{concreteCost}</Text>
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

export default Foundation;
