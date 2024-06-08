import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Length = () => {
  const [length, setLength] = useState('');
  const [targetLength, setTargetLength] = useState('');
  const [unit, setUnit] = useState('mm');
  const [targetUnit, setTargetUnit] = useState('mm');

  useEffect(() => {
    convertLength();
  }, [length, unit, targetUnit]);

  const convertLength = () => {
    if (length === '') {
      setTargetLength('');
      return;
    }

    const units = {
      mm: 1000,
      cm: 100,
      inch: 39.3701,
      ft: 3.28084,
      yard: 1.09361,
      m: 1,
      km: 0.001,
      mile: 0.000621371,
    };

    let result = parseFloat(length);
    if (isNaN(result)) {
      setTargetLength('');
      return;
    }

    if (unit === targetUnit) {
      setTargetLength(result.toString());
      return;
    }

    // Convert the length to meters first
    const lengthInMeters = result / units[unit];
    // Then convert meters to target unit
    const convertedLength = lengthInMeters * units[targetUnit];
    setTargetLength(Number(convertedLength.toFixed(5)).toString());
  };

  return (
    <View style={containerStyles.container}>
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
        <Picker.Item label="Mile" value="mile" />
      </Picker>
      <View style={containerStyles.resultContainer}>
        <Text style={titleStyles.title}>Converted Length: {targetLength}</Text>
        <Picker
          selectedValue={targetUnit}
          style={inputStyles.picker}
          onValueChange={(itemValue) => {
            setTargetUnit(itemValue);
          }}
        >
          <Picker.Item label="Millimeter (mm)" value="mm" />
          <Picker.Item label="Centimeter (cm)" value="cm" />
          <Picker.Item label="Inch" value="inch" />
          <Picker.Item label="Foot (ft)" value="ft" />
          <Picker.Item label="Yard" value="yard" />
          <Picker.Item label="Meter (m)" value="m" />
          <Picker.Item label="Kilometer (km)" value="km" />
          <Picker.Item label="Mile" value="mile" />
        </Picker>
      </View>
    </View>
  );
};

export default Length;
