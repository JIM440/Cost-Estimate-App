import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../../../components/ScreenWrapper';

export default function Conversion() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={[containerStyles.container, wideCardStyles.wideCardContainer]}>
        <Pressable
          onPress={() => router.push('/length')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/length.png')}
          />
          <Text style={wideCardStyles.title}>Length</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/conversion-area')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/area.png')}
          />
          <Text style={wideCardStyles.title}>Area</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/volume')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/volume.png')}
          />
          <Text style={wideCardStyles.title}>Volume</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/weight')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/weight.png')}
          />
          <Text style={wideCardStyles.title}>Weight</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/temperature')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/temperature.png')}
          />
          <Text style={wideCardStyles.title}>Temperature</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/pressure')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/pressure.png')}
          />
          <Text style={wideCardStyles.title}>Pressure</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/angle')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/conversion/angle.png')}
          />
          <Text style={wideCardStyles.title}>Angle</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

