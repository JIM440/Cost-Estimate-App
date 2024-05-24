import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useNavigation } from '@react-navigation/native';

const Area = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={containerStyles.container}>
      <View style={wideCardStyles.wideCardContainer}>
        <Pressable
          onPress={() => navigation.navigate('Circle')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/circle.svg')}
          />
          <Text style={wideCardStyles.title}>Circle</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Square')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/square.svg')}
          />
          <Text style={wideCardStyles.title}>Square</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Triangle')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/triangle.svg')}
          />
          <Text style={wideCardStyles.title}>Triangle</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Rectangle')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/rectangle.svg')}
          />
          <Text style={wideCardStyles.title}>Rectangle</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Trapezium')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/trapezium.svg')}
          />
          <Text style={wideCardStyles.title}>Trapezium</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Ellipse')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/ellipse.svg')}
          />
          <Text style={wideCardStyles.title}>Ellipse</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Area;
