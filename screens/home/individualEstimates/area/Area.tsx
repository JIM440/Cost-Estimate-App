import { ScrollView, View, Text, Pressable } from 'react-native';
import Image from '../../../../components/Image';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../../context/ThemeContext';

const routeMap: Record<string, string> = {
  Circle: '/circle', Square: '/square', Triangle: '/triangle', Rectangle: '/rectangle',
  Trapezium: '/trapezium', Ellipse: '/ellipse',
};
const Area: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <ScrollView style={[containerStyles.container, { backgroundColor: colors.screen_background }]}>
      <View style={wideCardStyles.wideCardContainer}>
        <Pressable
          onPress={() => router.push(routeMap.Circle)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/area/circle.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Circle</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Square)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/area/square.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Square</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Triangle)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/area/triangle.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Triangle</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Rectangle)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/area/rectangle.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Rectangle</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Trapezium)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/area/trapezium.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Trapezium</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(routeMap.Ellipse)}
          style={[wideCardStyles.wideCardBox, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../../../assets/images/area/ellipse.png')}
          />
          <Text style={[wideCardStyles.title, { color: colors.heading_text }]}>Ellipse</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Area;
