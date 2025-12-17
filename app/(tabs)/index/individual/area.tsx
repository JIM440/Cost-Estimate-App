import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../../../components/ScreenWrapper';

export default function Area() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={[containerStyles.container, wideCardStyles.wideCardContainer]}>
        <Pressable
          onPress={() => router.push('/circle')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/circle.png')}
          />
          <Text style={wideCardStyles.title}>Circle</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/square')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/square.png')}
          />
          <Text style={wideCardStyles.title}>Square</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/triangle')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/triangle.png')}
          />
          <Text style={wideCardStyles.title}>Triangle</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/rectangle')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/rectangle.png')}
          />
          <Text style={wideCardStyles.title}>Rectangle</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/trapezium')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/trapezium.png')}
          />
          <Text style={wideCardStyles.title}>Trapezium</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/ellipse')}
          style={wideCardStyles.wideCardBox}
        >
          <Image
            source={require('../../../../assets/images/area/ellipse.png')}
          />
          <Text style={wideCardStyles.title}>Ellipse</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

