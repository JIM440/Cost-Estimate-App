import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';
import { primary_color } from '../../../../styles/colors';
import { ColumnLayouts } from '../../../../styles/components/cards';

const Paint = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [subtractArea, setSubtractArea] = useState('');
  const [numCoats, setNumCoats] = useState('');
  const [coveragePerLiter, setCoveragePerLiter] = useState('');
  const [paintPricePerLiter, setPaintPricePerLiter] = useState('');

  const [areaToPaint, setAreaToPaint] = useState(0);
  const [totalLiters, setTotalLiters] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const calculate = () => {
    //convert inouts to numbers
    const wallLength = parseFloat(length);
    const wallWidth = parseFloat(width);
    const areaToSubtract = parseFloat(subtractArea);
    const coats = parseFloat(numCoats);
    const coverage = parseFloat(coveragePerLiter);
    const pricePerLiter = parseFloat(paintPricePerLiter);

    //calculate area to be painted
    const totalArea = wallLength * wallWidth - areaToSubtract;
    setAreaToPaint(totalArea);

    // calculate total liters of paint required
    const litersRequired = (totalArea / coverage) * coats;
    setTotalLiters(litersRequired);

    // calculate total costs of paint
    const cost = litersRequired * pricePerLiter;
    setTotalCost(cost);
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Image
        style={style.image}
        source={require('../../../../assets/images/individual_estiamte/painting-estimate-1.jpg')}
      />
      <View style={containerStyles.container}>
        <View style={ColumnLayouts.TwoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Length"
            title="Length (m)"
            value={length}
            onChange={(value) => {
              setLength(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Width"
            title="Width (m)"
            value={width}
            onChange={(value) => {
              setWidth(value);
            }}
          />
        </View>
        <TextInputTitle
          placeholder="Subtract Area"
          title="Subtract Area (m2)"
          value={subtractArea}
          onChange={(value) => {
            setSubtractArea(value);
          }}
        />
        <Line />
        <View style={ColumnLayouts.TwoColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Number of Cots"
            title="Number of Cots"
            value={numCoats}
            onChange={(value) => {
              setNumCoats(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Area covered per liter"
            title="Area covered (per l)"
            value={coveragePerLiter}
            onChange={(value) => {
              setCoveragePerLiter(value);
            }}
          />
        </View>
        <TextInputTitle
          placeholder="Price per liter"
          title="Paint price (per liter)"
          value={paintPricePerLiter}
          onChange={(value) => {
            setPaintPricePerLiter(value);
          }}
        />
        <ButtonPrimary title="Calculate Estimate" onPress={calculate} />
        <Line />

        <Text>Output:</Text>
        <Text>Area: {areaToPaint} m2</Text>
        <Text>Total Liter: {totalLiters} liter</Text>
        <Text>Cost: {totalCost} fcfa</Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  image: {
    width: '100%',
    objectFit: 'contain',
    borderWidth: 1,
    borderColor: primary_color,
  },
});

export default Paint;
