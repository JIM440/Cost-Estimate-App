import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useNavigation } from '@react-navigation/native';

const estimates = [
  {
    name: 'Block',
    route: 'Block',
    image: require('../../../../assets/images/individual_estiamte/block.png'),
  },
  {
  name: 'Roofing',
  route: 'Roofing',
  image: require('../../../../assets/images/individual_estiamte/roof.png'),
},
{
  name: 'RC Slab',
  route: 'RCSlab',
  image: require('../../../../assets/images/individual_estiamte/rc_slab.png'),
},
{
  name: 'Hollow Block Slab',
    route: 'HollowSlab',
    image: require('../../../../assets/images/individual_estiamte/hollow_icon.png'),
  },
  {
    name: 'Rods',
    route: 'Rods',
    image: require('../../../../assets/images/individual_estiamte/rod.png'),
  },
  {
    name: 'Column Concrete',
    route: 'Concrete',
    image: require('../../../../assets/images/individual_estiamte/concrete.png'),
  },
  {
    name: 'Formwork',
    route: 'Formwork',
    image: require('../../../../assets/images/individual_estiamte/formwork.png'),
  },
  {
    name: 'Plaster',
    route: 'Plaster',
    image: require('../../../../assets/images/individual_estiamte/plaster.png'),
  },
  {
    name: 'Tiles',
    route: 'Tiles',
    image: require('../../../../assets/images/individual_estiamte/tiles.png'),
  },
  {
    name: 'Paint',
    route: 'Paint',
    image: require('../../../../assets/images/individual_estiamte/paint.png'),
  },
  {
    name: 'Depth of Foundation',
    route: 'Foundation',
    image: require('../../../../assets/images/individual_estiamte/foundation.png'),
  },
  {
    name: 'Excavation',
    route: 'Excavation',
    image: require('../../../../assets/images/individual_estiamte/excavation.png'),
  },
  {
    name: 'Filling',
    route: 'Filling',
    image: require('../../../../assets/images/individual_estiamte/filling.png'),
  },
];

const CostEstimate = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={containerStyles.container}>
      <View style={wideCardStyles.wideCardContainer}>
        {estimates.map((estimate, index) => {
          return (
            <Pressable
              key={index + 1}
              onPress={() => navigation.navigate(estimate.route)}
              style={wideCardStyles.wideCardBox}
            >
              <Image source={estimate.image} />
              <Text style={wideCardStyles.title}>{estimate.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CostEstimate;
