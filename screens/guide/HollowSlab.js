import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const HBEstimateGuide = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Step-by-Step Guide: Estimating Hollow Block Slab</Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the materials and quantities for the hollow block slab, you will need the following inputs:
      </Text>
      <Text style={styles.bullet}>- Length of slab (m)</Text>
      <Text style={styles.bullet}>- Width of slab (m)</Text>
      <Text style={styles.bullet}>- Length of block (m)</Text>
      <Text style={styles.bullet}>- Width of block (m)</Text>
      <Text style={styles.bullet}>- Span (m)</Text>

      {/* Step 2: Calculate Area of Slab and Blocks */}
      <Text style={styles.step}>2. Calculate Area of Slab and Blocks</Text>
      <Text style={styles.text}>
        Determine the area of the slab and each block:
      </Text>
      <Text style={styles.equation}>Area of Slab (m²) = Length × Width</Text>
      <Text style={styles.equation}>Area of Block (m²) = Length of Block × Width of Block</Text>

      {/* Step 3: Calculate Number of Blocks */}
      <Text style={styles.step}>3. Calculate Number of Blocks</Text>
      <Text style={styles.text}>
        Determine the number of blocks required to cover the slab area:
      </Text>
      <Text style={styles.equation}>Number of Blocks = Ceiling(Area of Slab / Area of Block)</Text>

      {/* Step 4: Calculate Concrete Volume */}
      <Text style={styles.step}>4. Calculate Concrete Volume</Text>
      <Text style={styles.text}>
        Calculate the volume of concrete needed for the slab:
      </Text>
      <Text style={styles.equation}>Concrete Volume (m³) = Area of Slab (m²) × Thickness (0.004 m)</Text>

      {/* Step 5: Calculate Number of Reinforcement Rods */}
      <Text style={styles.step}>5. Calculate Number of Reinforcement Rods</Text>
      <Text style={styles.text}>
        Determine the number of 12-meter rods required:
      </Text>
      <Text style={styles.equation}>Number of Rods = Ceiling(Span / Width of Block)</Text>
      <Text style={styles.equation}>Number of 12m Rods = Ceiling(Number of Rods × Width of Slab / 12)</Text>

      {/* Step 6: Calculate Dry Volume of Concrete */}
      <Text style={styles.step}>6. Calculate Dry Volume of Concrete</Text>
      <Text style={styles.text}>
        Calculate the dry volume of concrete considering compaction:
      </Text>
      <Text style={styles.equation}>Dry Volume of Concrete = Concrete Volume × 1.54</Text>

      {/* Step 7: Calculate Volume of Gravel, Sand, and Cement */}
      <Text style={styles.step}>7. Calculate Volume of Gravel, Sand, and Cement</Text>
      <Text style={styles.text}>
        Determine the volumes of gravel, sand, and cement based on the ratio 1:1:2 (cement:gravel:sand):
      </Text>
      <Text style={styles.equation}>Volume of Gravel = Dry Volume of Concrete × 0.25</Text>
      <Text style={styles.equation}>Volume of Sand = Volume of Cement × 0.5</Text>
      <Text style={styles.equation}>Volume of Cement = Dry Volume of Concrete × 0.25</Text>

      {/* Step 8: Calculate Number of Cement Bags */}
      <Text style={styles.step}>8. Calculate Number of Cement Bags</Text>
      <Text style={styles.text}>
        Determine the number of 50 kg bags of cement required:
      </Text>
      <Text style={styles.equation}>Number of Bags of Cement = Ceiling((Volume of Cement × Density of Cement) / 50)</Text>
      <Text style={styles.note}>Assuming 1 bag of cement = 50 kg and Density of Cement = 1440 kg/m³</Text>

    </ScrollView>
  );
};

export default HBEstimateGuide;
