import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { longCardStyles } from '../../../styles/components/cards';
import { containerStyles } from '../../../styles/utility';
import { useNavigation } from '@react-navigation/native';

const HouseCategory = () => {
  const navigation = useNavigation();
  return (
    <View style={containerStyles.container}>
      <View style={longCardStyles.longCardContainer}>
        <Pressable onPress={() => navigation.navigate('SingleHouse')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../assets/images/full_house/single-story.svg')}
            />
            <Text style={longCardStyles.title}>Single-Story</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../assets/icons/chevron_right.svg')}
            />
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('MultiHouse')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../assets/images/full_house/multi-story.png')}
            />
            <Text style={longCardStyles.title}>Multi-Story</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../assets/icons/chevron_right.svg')}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default HouseCategory;
