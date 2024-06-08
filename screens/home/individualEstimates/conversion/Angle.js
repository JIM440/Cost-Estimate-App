import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Angle = () => {
  const [angle, setAngle] = useState('');
  const [targetAngle, setTargetAngle] = useState('');
  const [unit, setUnit] = useState('degree');
  const [targetUnit, setTargetUnit] = useState('degree');

  useEffect(() => {
    convertAngle();
  }, [angle, unit, targetUnit]);

  const convertAngle = () => {
    if (angle === '') {
      setTargetAngle('');
      return;
    }

    const units = {
      degree: 1,
      radian: 0.0174533,
      gradian: 1.11111,
      second: 3600,
      minute: 60,
      dms: 1,
      circle: 0.00277778,
      percentage: 0.00277778,
    };

    let result = parseFloat(angle);
    if (isNaN(result)) {
      setTargetAngle('');
      return;
    }

    if (unit === targetUnit) {
      setTargetAngle(result.toString());
      return;
    }

    // Convert the angle to degrees first
    const angleInDegree = result / units[unit];
    // Then convert degrees to target unit
    const convertedAngle = angleInDegree * units[targetUnit];
    setTargetAngle(Number(convertedAngle.toFixed(5)).toString());
  };

  return (
    <View style={containerStyles.container}>
      <TextInputTitle
        title="Angle"
        placeholder="Enter Angle"
        value={angle}
        onChange={(value) => {
          if (/^-?\d*\.?\d*$/.test(value)) {
            setAngle(value);
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
        <Picker.Item label="Degree (°)" value="degree" />
        <Picker.Item label="Radian (rad)" value="radian" />
        <Picker.Item label="Gradian (grad)" value="gradian" />
        <Picker.Item label="Second (arcsec)" value="second" />
        <Picker.Item label="Minute (arcmin)" value="minute" />
        <Picker.Item label="Degree Minute Second (DMS)" value="dms" />
        <Picker.Item label="Circle (rev)" value="circle" />
        <Picker.Item label="Percentage (%)" value="percentage" />
      </Picker>
      <View style={containerStyles.resultContainer}>
        <Text style={titleStyles.title}>Converted Angle: {targetAngle}</Text>
        <Picker
          selectedValue={targetUnit}
          style={inputStyles.picker}
          onValueChange={(itemValue) => {
            setTargetUnit(itemValue);
          }}
        >
          <Picker.Item label="Degree (°)" value="degree" />
          <Picker.Item label="Radian (rad)" value="radian" />
          <Picker.Item label="Gradian (grad)" value="gradian" />
          <Picker.Item label="Second (arcsec)" value="second" />
          <Picker.Item label="Minute (arcmin)" value="minute" />
          <Picker.Item label="Degree Minute Second (DMS)" value="dms" />
          <Picker.Item label="Circle (rev)" value="circle" />
          <Picker.Item label="Percentage (%)" value="percentage" />
        </Picker>
      </View>
    </View>
  );
};

export default Angle;
