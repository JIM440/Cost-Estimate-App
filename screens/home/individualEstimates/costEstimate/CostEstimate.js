import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useNavigation } from '@react-navigation/native';

const estimates = [
  {
    name: 'Concrete',
    image: require('../../../../assets/images/individual_estiamte/concrete.svg'),
  },
  {
    name: 'Block',
    image: require('../../../../assets/images/individual_estiamte/block.svg'),
  },
  {
    name: 'Plaster',
    image: require('../../../../assets/images/individual_estiamte/plaster.svg'),
  },
  {
    name: 'Tiles',
    image: require('../../../../assets/images/individual_estiamte/tiles.svg'),
  },
  {
    name: 'Paint',
    image: require('../../../../assets/images/individual_estiamte/paint.svg'),
  },
  {
    name: 'Foundation',
    image: require('../../../../assets/images/individual_estiamte/foundation.svg'),
  },
  {
    name: 'Excavation',
    image: require('../../../../assets/images/individual_estiamte/excavation.svg'),
  },
  {
    name: 'Filling',
    image: require('../../../../assets/images/individual_estiamte/block.svg'),
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
              key={index}
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
