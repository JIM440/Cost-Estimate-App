import { containerStyles, titleStyles } from '../../../../styles/utility';
import React, { useState } from 'react';
import { View, TextInput, Text, Picker } from 'react-native';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';

const Length = () => {
  const [length, setLength] = useState('');
  const [unit, setUnit] = useState('m');

  const convertLength = (toUnit) => {
    if (!length) return '';
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

    // Start from the smaller unit and convert upwards by multiplying
    const unitsOrdered = ['mm', 'cm', 'inch', 'ft', 'yard', 'm', 'km', 'mile'];
    const fromIndex = unitsOrdered.indexOf(unit);
    const toIndex = unitsOrdered.indexOf(toUnit);
    const startIndex = Math.min(fromIndex, toIndex);
    const endIndex = Math.max(fromIndex, toIndex);

    for (let i = startIndex; i < endIndex; i++) {
      const currentUnit = unitsOrdered[i];
      const nextUnit = unitsOrdered[i + 1];
      if (fromUnit === currentUnit) {
        result /= units[currentUnit];
        result *= units[nextUnit];
      } else if (toUnit === currentUnit) {
        result *= units[currentUnit];
        result /= units[nextUnit];
      }
    }

    return result.toFixed(2);
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
        onValueChange={(itemValue) => setUnit(itemValue)}
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
        <Text style={titleStyles.title}>Converted Lengths:</Text>
        <Text>Millimeter (mm): {convertLength('mm')}</Text>
        <Text>Centimeter (cm): {convertLength('cm')}</Text>
        <Text>Inch: {convertLength('inch')}</Text>
        <Text>Foot (ft): {convertLength('ft')}</Text>
        <Text>Yard: {convertLength('yard')}</Text>
        <Text>Meter (m): {convertLength('m')}</Text>
        <Text>Kilometer (km): {convertLength('km')}</Text>
        <Text>Mile: {convertLength('mile')}</Text>
      </View>
    </View>
  );
};

export default Length;
