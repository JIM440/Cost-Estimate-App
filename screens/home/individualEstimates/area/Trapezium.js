import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import Area from '../../../../styles/screens/Area';

const Trapezium = () => {
  const [base1, setBase1] = useState('');
  const [base2, setBase2] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [base1, base2, height, unit]);

  const calculateArea = () => {
    if (base1 === '' || base2 === '' || height === '') {
      setArea('');
      return;
    }

    const base1Value = parseFloat(base1);
    const base2Value = parseFloat(base2);
    const heightValue = parseFloat(height);
    if (isNaN(base1Value) || isNaN(base2Value) || isNaN(heightValue)) {
      setArea('');
      return;
    }

    const conversionFactors = {
      mm: 0.001,
      cm: 0.01,
      inch: 0.0254,
      ft: 0.3048,
      yard: 0.9144,
      m: 1,
      km: 1000,
    };

    const base1InMeters = base1Value * conversionFactors[unit];
    const base2InMeters = base2Value * conversionFactors[unit];
    const heightInMeters = heightValue * conversionFactors[unit];
    const areaInSquareMeters =
      0.5 * (base1InMeters + base2InMeters) * heightInMeters;

    const convertedArea =
      areaInSquareMeters / Math.pow(conversionFactors[unit], 2);

    setArea(convertedArea.toFixed(5));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Image
        source={require('../../../../assets/images/area/area-trapezium.jpg')}
        style={Area.img}
      />
      <TextInputTitle
        title="Base 1"
        placeholder="Enter Base 1 Length"
        value={base1}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setBase1(value);
          }
        }}
      />
      <TextInputTitle
        title="Base 2"
        placeholder="Enter Base 2 Length"
        value={base2}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setBase2(value);
          }
        }}
      />
      <TextInputTitle
        title="Height"
        placeholder="Enter Height"
        value={height}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setHeight(value);
          }
        }}
      />
      <Picker
        selectedValue={unit}
        style={inputStyles.picker}
        onValueChange={(itemValue) => {
          setUnit(itemValue);
        }}
      >
        <Picker.Item label="Millimeter (mm)" value="mm" />
        <Picker.Item label="Centimeter (cm)" value="cm" />
        <Picker.Item label="Inch" value="inch" />
        <Picker.Item label="Foot (ft)" value="ft" />
        <Picker.Item label="Yard" value="yard" />
        <Picker.Item label="Meter (m)" value="m" />
        <Picker.Item label="Kilometer (km)" value="km" />
      </Picker>
      <Line />
      <Text style={titleStyles.title}>Results:</Text>
      <View>
        <Text style={Area.resultsText}>
          Area: {area} {unit}²
        </Text>
      </View>
    </ScrollView>
  );
};

export default Trapezium;
