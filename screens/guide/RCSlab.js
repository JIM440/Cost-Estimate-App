import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const RCEstimateGuide = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Step-by-Step Guide: Estimating RC Slab</Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the materials and quantities for the RC slab, you will need the following inputs:
      </Text>
      <Text style={styles.bullet}>- Length of slab (m)</Text>
      <Text style={styles.bullet}>- Width of slab (m)</Text>
      <Text style={styles.bullet}>- Thickness of slab (m)</Text>
      <Text style={styles.bullet}>- Rod spacing (m)</Text>

      {/* Step 2: Calculate Area of Slab */}
      <Text style={styles.step}>2. Calculate Area of Slab</Text>
      <Text style={styles.text}>
        Determine the area of the RC slab:
      </Text>
      <Text style={styles.equation}>Area of Slab (m²) = Length × Width</Text>

      {/* Step 3: Calculate Concrete Volume */}
      <Text style={styles.step}>3. Calculate Concrete Volume</Text>
      <Text style={styles.text}>
        Calculate the volume of concrete needed for the slab:
      </Text>
      <Text style={styles.equation}>Concrete Volume (m³) = Area of Slab (m²) × Thickness of Slab (m)</Text>

      {/* Step 4: Calculate Number of Reinforcement Rods */}
      <Text style={styles.step}>4. Calculate Number of Reinforcement Rods</Text>
      <Text style={styles.text}>
        Determine the number of 12-meter rods required:
      </Text>
      <Text style={styles.equation}>Number of 12m Rods = (Rods in X-direction × Width of Slab / 12) + (Rods in Y-direction × Length of Slab / 12)</Text>

      {/* Step 5: Calculate Dry Volume of Concrete */}
      <Text style={styles.step}>5. Calculate Dry Volume of Concrete</Text>
      <Text style={styles.text}>
        Calculate the dry volume of concrete considering compaction:
      </Text>
      <Text style={styles.equation}>Dry Volume of Concrete = Concrete Volume × 1.54</Text>

      {/* Step 6: Calculate Volume of Gravel, Sand, and Cement */}
      <Text style={styles.step}>6. Calculate Volume of Gravel, Sand, and Cement</Text>
      <Text style={styles.text}>
        Determine the volumes of gravel, sand, and cement based on the ratio 1:1:2 (cement:gravel:sand):
      </Text>
      <Text style={styles.equation}>Volume of Gravel = Dry Volume of Concrete × 0.25</Text>
      <Text style={styles.equation}>Volume of Sand = Volume of Cement × 0.5</Text>
      <Text style={styles.equation}>Volume of Cement = Dry Volume of Concrete × 0.25</Text>

      {/* Step 7: Calculate Number of Cement Bags */}
      <Text style={styles.step}>7. Calculate Number of Cement Bags</Text>
      <Text style={styles.text}>
        Determine the number of 50 kg bags of cement required:
      </Text>
      <Text style={styles.equation}>Number of Bags of Cement = Ceiling((Volume of Cement × Density of Cement) / 50)</Text>
      <Text style={styles.note}>Assuming 1 bag of cement = 50 kg and Density of Cement = 1440 kg/m³</Text>

    </ScrollView>
  );
};

export default RCEstimateGuide;
