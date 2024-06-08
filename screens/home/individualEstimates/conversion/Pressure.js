import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Pressure = () => {
  const [pressure, setPressure] = useState('');
  const [targetPressure, setTargetPressure] = useState('');
  const [unit, setUnit] = useState('bar');
  const [targetUnit, setTargetUnit] = useState('bar');

  useEffect(() => {
    convertPressure();
  }, [pressure, unit, targetUnit]);

  const convertPressure = () => {
    if (pressure === '') {
      setTargetPressure('');
      return;
    }

    const units = {
      bar: 1,
      atm: 0.986923,
      Pa: 100000,
      hPa: 1000,
      kPa: 100,
      MPa: 0.1,
      Torr: 750.062,
      mmHg: 750.062,
      cmHg: 75.0062,
    };

    let result = parseFloat(pressure);
    if (isNaN(result)) {
      setTargetPressure('');
      return;
    }

    if (unit === targetUnit) {
      setTargetPressure(result.toString());
      return;
    }

    // Convert the pressure to bars first
    const pressureInBar = result / units[unit];
    // Then convert bars to target unit
    const convertedPressure = pressureInBar * units[targetUnit];
    setTargetPressure(Number(convertedPressure.toFixed(5)).toString());
  };

  return (
    <View style={containerStyles.container}>
      <TextInputTitle
        title="Pressure"
        placeholder="Enter Pressure"
        value={pressure}
        onChange={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setPressure(value);
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
        <Picker.Item label="Bar" value="bar" />
        <Picker.Item label="Atmosphere (atm)" value="atm" />
        <Picker.Item label="Pascal (Pa)" value="Pa" />
        <Picker.Item label="Hectopascal (hPa)" value="hPa" />
        <Picker.Item label="Kilopascal (kPa)" value="kPa" />
        <Picker.Item label="Megapascal (MPa)" value="MPa" />
        <Picker.Item label="Torr" value="Torr" />
        <Picker.Item label="Millimeter of Mercury (mmHg)" value="mmHg" />
        <Picker.Item label="Centimeter of Mercury (cmHg)" value="cmHg" />
      </Picker>
      <View style={containerStyles.resultContainer}>
        <Text style={titleStyles.title}>
          Converted Pressure: {targetPressure}
        </Text>
        <Picker
          selectedValue={targetUnit}
          style={inputStyles.picker}
          onValueChange={(itemValue) => {
            setTargetUnit(itemValue);
          }}
        >
          <Picker.Item label="Bar" value="bar" />
          <Picker.Item label="Atmosphere (atm)" value="atm" />
          <Picker.Item label="Pascal (Pa)" value="Pa" />
          <Picker.Item label="Hectopascal (hPa)" value="hPa" />
          <Picker.Item label="Kilopascal (kPa)" value="kPa" />
          <Picker.Item label="Megapascal (MPa)" value="MPa" />
          <Picker.Item label="Torr" value="Torr" />
          <Picker.Item label="Millimeter of Mercury (mmHg)" value="mmHg" />
          <Picker.Item label="Centimeter of Mercury (cmHg)" value="cmHg" />
        </Picker>
      </View>
    </View>
  );
};

export default Pressure;
