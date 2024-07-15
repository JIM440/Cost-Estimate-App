import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { inputStyles } from '../../../../styles/components/inputStyles';
import TextInputTitle from '../../../../components/InputTitle';
import ButtonPrimary from '../../../../components/Button';
import tableStyles from '../../../../styles/components/table';
import { primary_color } from '../../../../styles/colors';
import { ColumnLayouts } from '../../../../styles/components/cards';

const Paint = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [subtractArea, setSubtractArea] = useState('');
  const [numCoats, setNumCoats] = useState('');
  const [coveragePerLiter, setCoveragePerLiter] = useState('');
  const [paintPricePerLiter, setPaintPricePerLiter] = useState('');

  const [areaToPaint, setAreaToPaint] = useState('');
  const [totalLiters, setTotalLiters] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculate = () => {
    if (
      length == '' ||
      width == '' ||
      subtractArea == '' ||
      numCoats == '' ||
      coveragePerLiter == '' ||
      paintPricePerLiter == ''
    ) {
      return;
    }

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
    setTotalLiters(litersRequired.toFixed(1));

    // calculate total costs of paint
    const cost = litersRequired * pricePerLiter;
    setTotalCost(cost);
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <Image
        style={style.image}
        source={require('../../../../assets/images/individual_estiamte/painting-estimate-1.jpg')}
      />
      <View style={containerStyles.container}>
        <Text style={titleStyles.boldTitle}>Paint</Text>
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

        <Text style={titleStyles.boldTitle}>Output:</Text>

        <View style={tableStyles.container}>
          {/* Row 1 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeader}>Material</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeader}>Quantity</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.columnHeader}>Unit</Text>
            </View>
          </View>
          {/* Row 2 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Area</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{areaToPaint}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>m²</Text>
            </View>
          </View>
          {/* Row 3 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Number of Liters</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{totalLiters}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>liter</Text>
            </View>
          </View>
          {/* Row 4 */}
          <View style={tableStyles.row}>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>Total Cost</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>{totalCost}</Text>
            </View>
            <View style={tableStyles.column}>
              <Text style={tableStyles.cell}>FCFA</Text>
            </View>
          </View>
        </View>
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
