import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Temperature = () => {
  const [temperature, setTemperature] = useState('');
  const [targetTemperature, setTargetTemperature] = useState('');
  const [unit, setUnit] = useState('C');
  const [targetUnit, setTargetUnit] = useState('C');

  useEffect(() => {
    convertTemperature();
  }, [temperature, unit, targetUnit]);

  const convertTemperature = () => {
    if (temperature === '') {
      setTargetTemperature('');
      return;
    }

    let result = parseFloat(temperature);
    if (isNaN(result)) {
      setTargetTemperature('');
      return;
    }

    if (unit === targetUnit) {
      setTargetTemperature(result.toString());
      return;
    }

    let convertedTemperature;
    if (unit === 'C') {
      if (targetUnit === 'K') {
        convertedTemperature = result + 273.15;
      } else if (targetUnit === 'F') {
        convertedTemperature = (result * 9) / 5 + 32;
      }
    } else if (unit === 'K') {
      if (targetUnit === 'C') {
        convertedTemperature = result - 273.15;
      } else if (targetUnit === 'F') {
        convertedTemperature = ((result - 273.15) * 9) / 5 + 32;
      }
    } else if (unit === 'F') {
      if (targetUnit === 'C') {
        convertedTemperature = ((result - 32) * 5) / 9;
      } else if (targetUnit === 'K') {
        convertedTemperature = ((result - 32) * 5) / 9 + 273.15;
      }
    }

    setTargetTemperature(Number(convertedTemperature.toFixed(5)).toString());
  };

  return (
    <View style={containerStyles.container}>
      <TextInputTitle
        title="Temperature"
        placeholder="Enter Temperature"
        value={temperature}
        onChange={(value) => {
          if (/^-?\d*\.?\d*$/.test(value)) {
            setTemperature(value);
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
        <Picker.Item label="Celsius (°C)" value="C" />
        <Picker.Item label="Kelvin (K)" value="K" />
        <Picker.Item label="Fahrenheit (°F)" value="F" />
      </Picker>
      <View style={containerStyles.resultContainer}>
        <Text style={titleStyles.title}>
          Converted Temperature: {targetTemperature}
        </Text>
        <Picker
          selectedValue={targetUnit}
          style={inputStyles.picker}
          onValueChange={(itemValue) => {
            setTargetUnit(itemValue);
          }}
        >
          <Picker.Item label="Celsius (°C)" value="C" />
          <Picker.Item label="Kelvin (K)" value="K" />
          <Picker.Item label="Fahrenheit (°F)" value="F" />
        </Picker>
      </View>
    </View>
  );
};

export default Temperature;
