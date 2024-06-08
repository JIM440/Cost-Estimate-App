import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Weight = () => {
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [targetUnit, setTargetUnit] = useState('kg');

  useEffect(() => {
    convertWeight();
  }, [weight, unit, targetUnit]);

  const convertWeight = () => {
    if (weight === '') {
      setTargetWeight('');
      return;
    }

    const units = {
      kg: 1,
      mg: 1e6,
      g: 1000,
      lb: 2.20462,
      oz: 35.274,
      tonne: 0.001,
      grain: 15432.4,
      ozT: 32.1507,
    };

    let result = parseFloat(weight);
    if (isNaN(result)) {
      setTargetWeight('');
      return;
    }

    if (unit === targetUnit) {
      setTargetWeight(result.toString());
      return;
    }

    // Convert the weight to kilograms first
    const weightInKg = result / units[unit];
    // Then convert kilograms to target unit
    const convertedWeight = weightInKg * units[targetUnit];
    setTargetWeight(Number(convertedWeight.toFixed(5)).toString());
  };

  return (
    <View style={containerStyles.container}>
      <TextInputTitle
        title="Weight"
        placeholder="Enter Weight"
        value={weight}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setWeight(value);
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
        <Picker.Item label="Kilogram (kg)" value="kg" />
        <Picker.Item label="Milligram (mg)" value="mg" />
        <Picker.Item label="Gram (g)" value="g" />
        <Picker.Item label="Pound (lb)" value="lb" />
        <Picker.Item label="Ounce (oz)" value="oz" />
        <Picker.Item label="Tonne" value="tonne" />
        <Picker.Item label="Grain" value="grain" />
        <Picker.Item label="Troy Ounce (oz t)" value="ozT" />
      </Picker>
      <View style={containerStyles.resultContainer}>
        <Text style={titleStyles.title}>Converted Weight: {targetWeight}</Text>
        <Picker
          selectedValue={targetUnit}
          style={inputStyles.picker}
          onValueChange={(itemValue) => {
            setTargetUnit(itemValue);
          }}
        >
          <Picker.Item label="Kilogram (kg)" value="kg" />
          <Picker.Item label="Milligram (mg)" value="mg" />
          <Picker.Item label="Gram (g)" value="g" />
          <Picker.Item label="Pound (lb)" value="lb" />
          <Picker.Item label="Ounce (oz)" value="oz" />
          <Picker.Item label="Tonne" value="tonne" />
          <Picker.Item label="Grain" value="grain" />
          <Picker.Item label="Troy Ounce (oz t)" value="ozT" />
        </Picker>
      </View>
    </View>
  );
};

export default Weight;
