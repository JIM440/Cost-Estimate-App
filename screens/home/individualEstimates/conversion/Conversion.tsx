import { ScrollView, View, Text, Pressable } from 'react-native';
import Image from '../../../../components/Image';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../../context/ThemeContext';

const routeMap: Record<string, string> = {
  Length: '/length', Area: '/conversion-area', Volume: '/volume', Weight: '/weight',
  Temperature: '/temperature', Pressure: '/pressure', Angle: '/angle',
};
const Index: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <ScrollView style={[containerStyles.container, { backgroundColor: colors.screen_background }]}>
      <View style={wideCardStyles.wideCardContainer}>
        <Pressable
          onPress={() => router.push(routeMap.Length)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/conversion/length.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Length</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Area)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/conversion/area.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Area</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Volume)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/conversion/volume.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Volume</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Weight)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/conversion/weight.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Weight</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Temperature)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/conversion/temperature.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Temperature</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Pressure)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/conversion/pressure.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Pressure</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Angle)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/conversion/angle.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Angle</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Index;
