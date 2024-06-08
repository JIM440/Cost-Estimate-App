import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import Area from '../../../../styles/screens/Area';

const Rectangle = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [length, width, unit]);

  const calculateArea = () => {
    if (length === '' || width === '') {
      setArea('');
      return;
    }

    const lengthValue = parseFloat(length);
    const widthValue = parseFloat(width);
    if (isNaN(lengthValue) || isNaN(widthValue)) {
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

    const lengthInMeters = lengthValue * conversionFactors[unit];
    const widthInMeters = widthValue * conversionFactors[unit];
    const areaInSquareMeters = lengthInMeters * widthInMeters;

    const convertedArea =
      areaInSquareMeters / Math.pow(conversionFactors[unit], 2);

    setArea(convertedArea.toFixed(5));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Image
        source={require('../../../../assets/images/area/area-rectangle.jpg')}
        style={Area.img}
      />
      <TextInputTitle
        title="Length"
        placeholder="Enter Length"
        value={length}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setLength(value);
          }
        }}
      />
      <TextInputTitle
        title="Width"
        placeholder="Enter Width"
        value={width}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setWidth(value);
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

export default Rectangle;
