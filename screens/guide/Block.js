import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const BlocksCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Step-by-Step Guide: Estimating Block Masonry Cost
      </Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the cost of block masonry, gather the following inputs:
      </Text>
      <Text style={styles.bullet}>- Length of Wall (m)</Text>
      <Text style={styles.bullet}>- Width of Wall (m)</Text>
      <Text style={styles.bullet}>- Height of Wall (m)</Text>
      <Text style={styles.bullet}>- Block Length (m)</Text>
      <Text style={styles.bullet}>- Block Width (m)</Text>
      <Text style={styles.bullet}>- Block Height (m)</Text>
      <Text style={styles.bullet}>- Area to Subtract (if any, m²)</Text>
      <Text style={styles.bullet}>- Mix Ratio (cement : sand)</Text>
      <Text style={styles.bullet}>- Area to Subtract (if any, m²)</Text>
      <Text style={styles.bullet}>- Price per Block (currency)</Text>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding
        with the calculations.
      </Text>

      {/* Step 3: Calculate Wall Volume */}
      <Text style={styles.step}>3. Calculate Wall Volume</Text>
      <Text style={styles.text}>
        Calculate the volume of the wall to be built, considering any subtracted
        areas:
      </Text>
      <Text style={styles.equation}>
        Wall Volume (m³) = (Length × Width - Area to Subtract) × Height
      </Text>

      {/* Step 4: Calculate Number of Blocks */}
      <Text style={styles.step}>4. Calculate Number of Blocks</Text>
      <Text style={styles.text}>
        Determine the total number of blocks needed based on wall volume and
        block dimensions:
      </Text>
      <Text style={styles.equation}>
        Number of Blocks = Ceil(Wall Volume / Block Volume)
      </Text>

      {/* Step 5: Calculate Dry Mortar Volume */}
      <Text style={styles.step}>5. Calculate Dry Mortar Volume</Text>
      <Text style={styles.text}>
        Calculate the volume of dry mortar required for laying the blocks:
      </Text>
      <Text style={styles.equation}>
        Dry Mortar Volume (m³) = Wall Volume × 1.54
      </Text>

      {/* Step 6: Calculate Sand Volume */}
      <Text style={styles.step}>6. Calculate Sand Volume</Text>
      <Text style={styles.text}>
        Calculate the volume of sand required for the mortar mix:
      </Text>
      <Text style={styles.equation}>
        Sand Volume (m³) = (Dry Mortar Volume × sand ratio) / sum of ratio
      </Text>

      {/* Step 7: Calculate Cement Volume and Weight */}
      <Text style={styles.step}>7. Calculate Cement Volume and Weight</Text>
      <Text style={styles.text}>
        Calculate the volume and weight of cement required for the mortar mix
        (assuming density of 1440 kg/m³):
      </Text>
      <Text style={styles.equation}>
        Cement Volume (m³) = (Dry Mortar Volume × cement ratio) / sum of ratio
      </Text>
      <Text style={styles.equation}>
        Cement Weight (kg) = Cement Volume × 1440
      </Text>
      <Text style={styles.equation}>Bags of Cement = Cement Weight / 50</Text>

      {/* Step 8: Calculate Total Cost */}
      <Text style={styles.step}>8. Calculate Total Cost</Text>
      <Text style={styles.text}>
        Determine the total cost of blocks based on the number of blocks and
        price per block:
      </Text>
      <Text style={styles.equation}>
        Total Block Cost = Number of Blocks × Price per Block
      </Text>
    </ScrollView>
  );
};

export default BlocksCostGuide;
