import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageStyle,
} from 'react-native';
import React from 'react';
import { containerStyles } from '../../../styles/utility';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../../components/ScreenWrapper';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 'auto',
  },
  flexImage: {
    width: '45%',
    maxWidth: 170,
    borderRadius: 8,
    marginRight: 16,
    objectFit: 'contain' as const,
    height: 170,
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

export default function HouseCategory() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={[containerStyles.container, { marginTop: 30 }]}>
        <View style={styles.flexContainer}>
          <Image
            style={styles.flexImage}
            source={require('../../../assets/images/full_house/roof.jpg')}
          />
          <View style={styles.flexContent}>
            <Text style={styles.header}>Single Storey</Text>
            <Text>
              Calculate the estimate for your single storey building from
              foundation to roofing.
            </Text>

            <TouchableOpacity
              style={styles.link}
              onPress={() => router.push('/single-storey')}
            >
              <Text style={styles.linkText}>Proceed</Text>
              <Image
                style={{ marginTop: 2 } as ImageStyle}
                source={require('../../../assets/images/full_house/ChevronRight.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.flexContainer}>
          <Image
            style={styles.flexImage}
            source={require('../../../assets/images/full_house/multi-storey1.png')}
          />
          <View style={styles.flexContent}>
            <Text style={styles.header}>Multi Storey</Text>
            <Text>
              Calculate the full estimate for your multi storey building and add
              more floors as your project needs.
            </Text>

            <TouchableOpacity
              style={styles.link}
              onPress={() => router.push('/multi-storey')}
            >
              <Text style={styles.linkText}>Proceed</Text>
              <Image
                style={{ marginTop: 2 } as ImageStyle}
                source={require('../../../assets/images/full_house/ChevronRight.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

