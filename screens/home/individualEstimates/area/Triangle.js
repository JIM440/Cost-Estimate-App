import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import Area from '../../../../styles/screens/Area';

const Triangle = () => {
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [base, height, unit]);

  const calculateArea = () => {
    if (base === '' || height === '') {
      setArea('');
      return;
    }

    const baseValue = parseFloat(base);
    const heightValue = parseFloat(height);
    if (isNaN(baseValue) || isNaN(heightValue)) {
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

    const baseInMeters = baseValue * conversionFactors[unit];
    const heightInMeters = heightValue * conversionFactors[unit];
    const areaInSquareMeters = 0.5 * baseInMeters * heightInMeters;

    const convertedArea =
      areaInSquareMeters / Math.pow(conversionFactors[unit], 2);

    setArea(convertedArea.toFixed(5));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Image
        source={require('../../../../assets/images/area/area-triangle.jpg')}
        style={Area.img}
      />
      <TextInputTitle
        title="Base"
        placeholder="Enter Base Length"
        value={base}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setBase(value);
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
      <Text style={titleStyles.boldTitle}>Results</Text>
      <View>
        <Text style={Area.resultsText}>
          Area: {area} {unit}²
        </Text>
      </View>
    </ScrollView>
  );
};

export default Triangle;
