import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Volume = () => {
  const [volume, setVolume] = useState('');
  const [targetVolume, setTargetVolume] = useState('');
  const [unit, setUnit] = useState('cubicMeter');
  const [targetUnit, setTargetUnit] = useState('cubicMeter');

  useEffect(() => {
    convertVolume();
  }, [volume, unit, targetUnit]);

  const convertVolume = () => {
    if (volume === '') {
      setTargetVolume('');
      return;
    }

    const units = {
      cubicMeter: 1,
      cubicCm: 1000000,
      cubicMm: 1e9,
      litre: 1000,
      cl: 10000,
      ml: 1e6,
      cubicInch: 61023.7,
      cubicFeet: 35.3147,
      cubicYard: 1.30795,
    };

    let result = parseFloat(volume);
    if (isNaN(result)) {
      setTargetVolume('');
      return;
    }

    if (unit === targetUnit) {
      setTargetVolume(result.toString());
      return;
    }

    // Convert the volume to cubic meters first
    const volumeInCubicMeters = result / units[unit];
    // Then convert cubic meters to target unit
    const convertedVolume = volumeInCubicMeters * units[targetUnit];
    setTargetVolume(Number(convertedVolume.toFixed(5)).toString());
  };

  return (
    <View style={containerStyles.container}>
      <TextInputTitle
        title="Volume"
        placeholder="Enter Volume"
        value={volume}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setVolume(value);
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
        <Picker.Item label="Cubic Meter" value="cubicMeter" />
        <Picker.Item label="Cubic Centimeter" value="cubicCm" />
        <Picker.Item label="Cubic Millimeter" value="cubicMm" />
        <Picker.Item label="Litre" value="litre" />
        <Picker.Item label="Centilitre" value="cl" />
        <Picker.Item label="Millilitre" value="ml" />
        <Picker.Item label="Cubic Inch" value="cubicInch" />
        <Picker.Item label="Cubic Feet" value="cubicFeet" />
        <Picker.Item label="Cubic Yard" value="cubicYard" />
      </Picker>
      <View style={containerStyles.resultContainer}>
        <Text style={titleStyles.title}>Converted Volume: {targetVolume}</Text>
        <Picker
          selectedValue={targetUnit}
          style={inputStyles.picker}
          onValueChange={(itemValue) => {
            setTargetUnit(itemValue);
          }}
        >
          <Picker.Item label="Cubic Meter" value="cubicMeter" />
          <Picker.Item label="Cubic Centimeter" value="cubicCm" />
          <Picker.Item label="Cubic Millimeter" value="cubicMm" />
          <Picker.Item label="Litre" value="litre" />
          <Picker.Item label="Centilitre" value="cl" />
          <Picker.Item label="Millilitre" value="ml" />
          <Picker.Item label="Cubic Inch" value="cubicInch" />
          <Picker.Item label="Cubic Feet" value="cubicFeet" />
          <Picker.Item label="Cubic Yard" value="cubicYard" />
        </Picker>
      </View>
    </View>
  );
};

export default Volume;
