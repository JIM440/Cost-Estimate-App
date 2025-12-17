import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../../../components/ScreenWrapper';

interface Estimate {
  name: string;
  route: string;
  image: any;
}

const estimates: Estimate[] = [
  {
    name: 'Block',
    route: '/block',
    image: require('../../../../assets/images/individual_estiamte/block.png'),
  },
  {
    name: 'Roofing',
    route: '/roofing',
    image: require('../../../../assets/images/individual_estiamte/roof.png'),
  },
  {
    name: 'RC Slab',
    route: '/rcslab',
    image: require('../../../../assets/images/individual_estiamte/rc_slab.png'),
  },
  {
    name: 'Hollow Block Slab',
    route: '/hollowslab',
    image: require('../../../../assets/images/individual_estiamte/hollow_icon.png'),
  },
  {
    name: 'Rods',
    route: '/rods',
    image: require('../../../../assets/images/individual_estiamte/rod.png'),
  },
  {
    name: 'Column Concrete',
    route: '/concrete',
    image: require('../../../../assets/images/individual_estiamte/concrete.png'),
  },
  {
    name: 'Formwork',
    route: '/formwork',
    image: require('../../../../assets/images/individual_estiamte/formwork.png'),
  },
  {
    name: 'Plaster',
    route: '/plaster',
    image: require('../../../../assets/images/individual_estiamte/plaster.png'),
  },
  {
    name: 'Tiles',
    route: '/tiles',
    image: require('../../../../assets/images/individual_estiamte/tiles.png'),
  },
  {
    name: 'Paint',
    route: '/paint',
    image: require('../../../../assets/images/individual_estiamte/paint.png'),
  },
  {
    name: 'Depth of Foundation',
    route: '/foundation',
    image: require('../../../../assets/images/individual_estiamte/foundation.png'),
  },
  {
    name: 'Excavation',
    route: '/excavation',
    image: require('../../../../assets/images/individual_estiamte/excavation.png'),
  },
  {
    name: 'Filling',
    route: '/filling',
    image: require('../../../../assets/images/individual_estiamte/filling.png'),
  },
];

export default function CostEstimate() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={[containerStyles.container, wideCardStyles.wideCardContainer]}>
        {estimates.map((estimate, index) => {
          return (
            <Pressable
              key={index + 1}
              onPress={() => router.push(estimate.route)}
              style={wideCardStyles.wideCardBox}
            >
              <Image source={estimate.image} />
              <Text style={wideCardStyles.title}>{estimate.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScreenWrapper>
  );
}

