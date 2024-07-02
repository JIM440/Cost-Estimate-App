import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useNavigation } from '@react-navigation/native';

const estimates = [
  {
    name: 'Concrete',
    image: require('../../../../assets/images/individual_estiamte/concrete.png'),
  },
  {
    name: 'Block',
    image: require('../../../../assets/images/individual_estiamte/block.png'),
  },
  {
    name: 'Rods',
    image: require('../../../../assets/images/individual_estiamte/rod.png'),
  },
  {
    name: 'Formwork',
    image: require('../../../../assets/images/individual_estiamte/formwork.png'),
  },
  {
    name: 'Plaster',
    image: require('../../../../assets/images/individual_estiamte/plaster.png'),
  },
  {
    name: 'Tiles',
    image: require('../../../../assets/images/individual_estiamte/tiles.png'),
  },
  {
    name: 'Paint',
    image: require('../../../../assets/images/individual_estiamte/paint.png'),
  },
  {
    name: 'Foundation',
    image: require('../../../../assets/images/individual_estiamte/foundation.png'),
  },
  {
    name: 'Excavation',
    image: require('../../../../assets/images/individual_estiamte/excavation.png'),
  },
  {
    name: 'Filling',
    image: require('../../../../assets/images/individual_estiamte/block.png'),
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
              onPress={() => navigation.navigate(estimate.name)}
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
