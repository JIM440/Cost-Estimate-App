import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ImageStyle,
} from 'react-native';
import guides from '../../screens/guide/Data';
import { longCardStyles } from '../../styles/components/cards';
import { containerStyles } from '../../styles/utility';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';

const routeMap: Record<string, string> = {
  blockGuide: '/guide/block',
  roofingGuide: '/guide/roofing',
  rcslabGuide: '/guide/rcslab',
  hollowblockslabGuide: '/guide/hollowslab',
  rodsGuide: '/guide/rods',
  concreteGuide: '/guide/concrete',
  formworkGuide: '/guide/formwork',
  plasterGuide: '/guide/plaster',
  tilesGuide: '/guide/tiles',
  paintGuide: '/guide/paint',
  foundationGuide: '/guide/foundation',
  excavationGuide: '/guide/excavation',
  fillingGuide: '/guide/filling',
};

export default function Guides() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={containerStyles.container}>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
        The guides below will provide valuable insights to help you create
        accurate estimates for your construction projects.
      </Text>
      {guides.map((item) => {
        return (
          <Pressable
            key={item.id}
            onPress={() => router.push(routeMap[item.route] || '/guides')}
          >
            <View style={longCardStyles.longCardBox}>
              <Image
                source={item.image}
                style={{ width: 50, objectFit: 'contain' } as ImageStyle}
              />
              <Text style={longCardStyles.title}>{item.title}</Text>
              <Image
                style={longCardStyles.chevron_right}
                source={require('../../assets/icons/chevron_right.png')}
              />
            </View>
          </Pressable>
        );
      })}
      </View>
    </ScreenWrapper>
  );
}

