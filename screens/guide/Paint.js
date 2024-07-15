import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const PaintCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Step-by-Step Guide: Calculating Paint Cost</Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To calculate the cost and quantity of paint needed for your project, gather the following inputs:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>- Wall Dimensions:</Text>
        <Text style={styles.subBullet}>   - Length (m)</Text>
        <Text style={styles.subBullet}>   - Width (m)</Text>
      </View>
      <Text style={styles.bullet}>- Area to Subtract:</Text>
      <Text style={styles.bullet}>- Number of Coats:</Text>
      <Text style={styles.bullet}>- Coverage per Liter:</Text>
      <Text style={styles.bullet}>- Paint Price per Liter:</Text>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding with the calculations.
      </Text>

      {/* Step 3: Calculate Area to Paint */}
      <Text style={styles.step}>3. Calculate Area to Paint</Text>
      <Text style={styles.text}>
        Calculate the total area to be painted after subtracting the non-paintable areas:
      </Text>
      <Text style={styles.equation}>Total Area to Paint = Wall Length (m) × Wall Width (m) - Area to Subtract</Text>

      {/* Step 4: Determine Total Liters of Paint Required */}
      <Text style={styles.step}>4. Determine Total Liters of Paint Required</Text>
      <Text style={styles.text}>
        Calculate the total liters of paint needed based on the area to paint and number of coats:
      </Text>
      <Text style={styles.equation}>
        Liters Required = (Total Area to Paint / Coverage per Liter) × Number of Coats
      </Text>

      {/* Step 5: Calculate Total Cost */}
      <Text style={styles.step}>5. Calculate Total Cost</Text>
      <Text style={styles.text}>
        Multiply the total liters of paint required by the price per liter to determine the total cost:
      </Text>
      <Text style={styles.equation}>Total Cost = Liters Required × Paint Price per Liter</Text>
    </ScrollView>
  );
};

export default PaintCostGuide;
