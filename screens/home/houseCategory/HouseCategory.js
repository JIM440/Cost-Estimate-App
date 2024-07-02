import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { longCardStyles } from '../../../styles/components/cards';
import { containerStyles } from '../../../styles/utility';
import { useNavigation } from '@react-navigation/native';

const HouseCategory = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={containerStyles.container}>
      {/* <View style={longCardStyles.longCardContainer}>
        <Pressable onPress={() => navigation.navigate('SingleHouse')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../assets/images/full_house/single-story.png')}
            />
            <Text style={longCardStyles.title}>Single-Story</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../assets/icons/chevron_right.svg')}
            />
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('MultiHouse')}>
          <View style={longCardStyles.longCardBox}>
            <Image
              source={require('../../../assets/images/full_house/multi-story.png')}
            />
            <Text style={longCardStyles.title}>Multi-Story</Text>
            <Image
              style={longCardStyles.chevron_right}
              source={require('../../../assets/icons/chevron_right.svg')}
            />
          </View>
        </Pressable>
      </View> */}
      {/* two column flex layout */}
      <View style={{ marginTop: 30 }}>
        <View style={styles.flexContainer}>
          <Image
            style={styles.flexImage}
            source={require('../../../assets/images/full_house/single-storey.jpg')}
          />
          <View style={styles.flexContent}>
            <Text style={styles.header}>Single Storey</Text>
            <Text>
              Calculate the estimate for your single storey building from
              foundation to roofing.
            </Text>

            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate('SingleStack')}
            >
              <Text style={styles.linkText}>Proceed</Text>
              <Image
                style={{ marginTop: 2 }}
                source={require('../../../assets/images/full_house/ChevronRight.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.flexContainer}>
          <Image
            style={styles.flexImage}
            source={require('../../../assets/images/full_house/multi-storey1.jpg')}
          />
          <View style={styles.flexContent}>
            <Text style={styles.header}>Multi Storey</Text>
            <Text>
              Calculate the full estimate for your multi storey building and add
              more floors as your project needs.
            </Text>

            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate('MultiStack')}
            >
              <Text style={styles.linkText}>Proceed</Text>
              <Image
                style={{ marginTop: 2 }}
                source={require('../../../assets/images/full_house/ChevronRight.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 'auto',
  },
  flexImage: {
    width: '45%',
    borderRadius: 8,
    marginRight: 10,
    objectFit: 'cover',
    height: 150,
  },
  flexContent: {
    width: '55%',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#3A3A3A',
    fontWeight: '700',
  },
  header: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 20,
    color: '#3a3a3a',
  },
});

export default HouseCategory;
