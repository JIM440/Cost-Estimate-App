import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Area = () => {
  const [area, setArea] = useState('');
  const [targetArea, setTargetArea] = useState('');
  const [unit, setUnit] = useState('sqm');
  const [targetUnit, setTargetUnit] = useState('sqm');

  useEffect(() => {
    convertArea();
  }, [area, unit, targetUnit]);

  const convertArea = () => {
    if (area === '') {
      setTargetArea('');
      return;
    }

    const units = {
      sqm: 1,
      sqkm: 0.000001,
      acre: 0.000247105,
      hectare: 0.0001,
      sqin: 1550,
      sqft: 10.7639,
      sqyd: 1.19599,
      sqmi: 3.861e-7,
    };

    let result = parseFloat(area);
    if (isNaN(result)) {
      setTargetArea('');
      return;
    }

    if (unit === targetUnit) {
      setTargetArea(result.toString());
      return;
    }

    // Convert the area to square meters first
    const areaInSquareMeters = result / units[unit];
    // Then convert square meters to target unit
    const convertedArea = areaInSquareMeters * units[targetUnit];
    setTargetArea(Number(convertedArea.toFixed(5)).toString());
  };

  return (
    <View style={containerStyles.container}>
      <TextInputTitle
        title="Area"
        placeholder="Enter Area"
        value={area}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setArea(value);
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
        <Picker.Item label="Square Meter (sqm)" value="sqm" />
        <Picker.Item label="Square Kilometer (sqkm)" value="sqkm" />
        <Picker.Item label="Acre" value="acre" />
        <Picker.Item label="Hectare" value="hectare" />
        <Picker.Item label="Square Inch (sqin)" value="sqin" />
        <Picker.Item label="Square Foot (sqft)" value="sqft" />
        <Picker.Item label="Square Yard (sqyd)" value="sqyd" />
        <Picker.Item label="Square Mile (sqmi)" value="sqmi" />
      </Picker>
      <View style={containerStyles.resultContainer}>
        <Text style={titleStyles.title}>Converted Area: {targetArea}</Text>
        <Picker
          selectedValue={targetUnit}
          style={inputStyles.picker}
          onValueChange={(itemValue) => {
            setTargetUnit(itemValue);
          }}
        >
          <Picker.Item label="Square Meter (sqm)" value="sqm" />
          <Picker.Item label="Square Kilometer (sqkm)" value="sqkm" />
          <Picker.Item label="Acre" value="acre" />
          <Picker.Item label="Hectare" value="hectare" />
          <Picker.Item label="Square Inch (sqin)" value="sqin" />
          <Picker.Item label="Square Foot (sqft)" value="sqft" />
          <Picker.Item label="Square Yard (sqyd)" value="sqyd" />
          <Picker.Item label="Square Mile (sqmi)" value="sqmi" />
        </Picker>
      </View>
    </View>
  );
};

export default Area;
