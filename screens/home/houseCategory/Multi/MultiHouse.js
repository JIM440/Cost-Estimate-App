import { View, ScrollView, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { Line, containerStyles } from '../../../../styles/utility';
import { longCardStyles } from '../../../../styles/components/cards';
import ButtonPrimary from '../../../../components/Button';

const MultiHouse = ({ navigation }) => {
  return (
    <ScrollView style={containerStyles.container}>
      <View>
        <Pressable onPress={() => navigation.navigate('Floor')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../../assets/images/full_house/elevation.png')}
            />
            <Text style={longCardStyles.title}>Floor 1</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../../assets/icons/chevron_right.png')}
            />
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Floor')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../../assets/images/full_house/elevation.png')}
            />
            <Text style={longCardStyles.title}>Floor 2</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../../assets/icons/chevron_right.png')}
            />
          </View>
        </Pressable>

        <Line />

        <ButtonPrimary title="Add Floor +" />
      </View>
    </ScrollView>
  );
};

export default MultiHouse;
