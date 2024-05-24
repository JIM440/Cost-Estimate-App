// GuideList.js
import React from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import guides from './Data';
// styles
import { longCardStyles } from '../../styles/components/cards';
import { containerStyles } from '../../styles/utility';

const GuideList = ({ navigation }) => {
  return (
    <View style={containerStyles.container}>
      <FlatList
        style={longCardStyles.longCardContainer}
        data={guides}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('GuideContent', item)}>
            <View style={longCardStyles.longCardBox}>
              <Image source={item.image} />
              <Text style={longCardStyles.title}>{item.title}</Text>
              <Image
                style={longCardStyles.chevron_right}
                source={require('../../assets/icons/chevron_right.svg')}
              />
            </View>
          </Pressable>
        )}
        keyExtractor={(guide) => guide.id}
      />
    </View>
  );
};

export default GuideList;
