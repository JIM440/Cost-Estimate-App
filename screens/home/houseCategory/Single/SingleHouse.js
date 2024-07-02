import { ScrollView, View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { Line, containerStyles } from '../../../../styles/utility';
import { longCardStyles } from '../../../../styles/components/cards';
import ButtonPrimary from '../../../../components/Button';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';

const SingleHouse = ({ navigation }) => {
  return (
    <ScrollView style={containerStyles.container}>
      {/* <View style={longCardStyles.longCardContainer}>
        <Pressable onPress={() => navigation.navigate('SingleHouseFoundation')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../../assets/images/full_house/elevation.png')}
            />
            <Text style={longCardStyles.title}>Foundation</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../../assets/icons/chevron_right.png')}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SingleHouseElevation')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../../assets/images/full_house/elevation.png')}
            />
            <Text style={longCardStyles.title}>Elevation</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../../assets/icons/chevron_right.png')}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SingleHouseRoofing')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../../assets/images/full_house/elevation.png')}
            />
            <Text style={longCardStyles.title}>Roofing</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../../assets/icons/chevron_right.png')}
            />
          </View>
        </Pressable>
      </View> */}

      <Text>Foundation</Text>
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Length"
      />
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Width"
      />
      <Line />
      <Text>Elevation</Text>
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Length"
      />
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Width"
      />
      <Line />
      <Text>Roofing</Text>
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Length"
      />
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Width"
      />
      <ButtonPrimary title="Calculate Estimate" />
      <Line />

      <Text>Table Here:</Text>
      <ButtonPrimary title="Export" />
    </ScrollView>
  );
};

export default SingleHouse;
