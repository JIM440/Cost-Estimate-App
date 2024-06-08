import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import Area from '../../../../styles/screens/Area';

const Circle = () => {
  const [radius, setRadius] = useState('');
  const [unit, setUnit] = useState('m');
  const [area, setArea] = useState('');
  const [circumference, setCircumference] = useState('');

  useEffect(() => {
    calculateResults();
  }, [radius, unit]);

  const calculateResults = () => {
    if (radius === '') {
      setArea('');
      setCircumference('');
      return;
    }

    const radiusValue = parseFloat(radius);
    if (isNaN(radiusValue)) {
      setArea('');
      setCircumference('');
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

    const radiusInMeters = radiusValue * conversionFactors[unit];
    const areaInSquareMeters = Math.PI * Math.pow(radiusInMeters, 2);
    const circumferenceInMeters = 2 * Math.PI * radiusInMeters;

    const convertedArea =
      areaInSquareMeters / Math.pow(conversionFactors[unit], 2);
    const convertedCircumference =
      circumferenceInMeters / conversionFactors[unit];

    setArea(convertedArea.toFixed(5));
    setCircumference(convertedCircumference.toFixed(5));
  };

  return (
    <ScrollView style={containerStyles.container}>
      <Image
        source={require('../../../../assets/images/area/area-circle.jpg')}
        style={Area.img}
      />
      <TextInputTitle
        title="Radius (r)"
        placeholder="Enter Radius"
        value={radius}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setRadius(value);
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
        <Text style={Area.resultsText}>
          Circumference: {circumference} {unit}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Circle;
