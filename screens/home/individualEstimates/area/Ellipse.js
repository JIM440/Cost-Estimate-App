import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import Area from '../../../../styles/screens/Area';

const Ellipse = () => {
  const [majorAxis, setMajorAxis] = useState('');
  const [minorAxis, setMinorAxis] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');

  useEffect(() => {
    calculateArea();
  }, [majorAxis, minorAxis, unit]);

  const calculateArea = () => {
    if (majorAxis === '' || minorAxis === '') {
      setArea('');
      return;
    }

    const majorAxisValue = parseFloat(majorAxis);
    const minorAxisValue = parseFloat(minorAxis);
    if (isNaN(majorAxisValue) || isNaN(minorAxisValue)) {
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

    const majorAxisInMeters = majorAxisValue * conversionFactors[unit];
    const minorAxisInMeters = minorAxisValue * conversionFactors[unit];
    const areaInSquareMeters = Math.PI * majorAxisInMeters * minorAxisInMeters;

    const convertedArea =
      areaInSquareMeters / Math.pow(conversionFactors[unit], 2);

    setArea(convertedArea.toFixed(5));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Image
        source={require('../../../../assets/images/area/area-ellipse.jpg')}
        style={Area.img}
      />
      <TextInputTitle
        title="Major Axis"
        placeholder="Enter Major Axis Length"
        value={majorAxis}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setMajorAxis(value);
          }
        }}
      />
      <TextInputTitle
        title="Minor Axis"
        placeholder="Enter Minor Axis Length"
        value={minorAxis}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setMinorAxis(value);
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

export default Ellipse;
