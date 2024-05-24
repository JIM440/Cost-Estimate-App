import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={containerStyles.container}>
      <View style={wideCardStyles.wideCardContainer}>
        <Pressable
          onPress={() => navigation.navigate('Length')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/length.svg')}
          />
          <Text style={wideCardStyles.title}>Length</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Area')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/area.svg')}
          />
          <Text style={wideCardStyles.title}>Area</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Volume')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/volume.svg')}
          />
          <Text style={wideCardStyles.title}>Volume</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Weight')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/weight.svg')}
          />
          <Text style={wideCardStyles.title}>Weight</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Temperature')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/temperature.svg')}
          />
          <Text style={wideCardStyles.title}>Temperature</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Pressure')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/pressure.svg')}
          />
          <Text style={wideCardStyles.title}>Pressure</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Angle')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/angle.svg')}
          />
          <Text style={wideCardStyles.title}>Angle</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Index;
