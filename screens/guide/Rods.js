import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const RodCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Step-by-Step Guide: Estimating Rod Cost
      </Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the cost of rods, gather the following inputs:
      </Text>
      <Text style={styles.bullet}>- Length per rod (m)</Text>
      <Text style={styles.bullet}>- Diameter per rod (m)</Text>
      <Text style={styles.bullet}>- Price per kg (currency)</Text>
      <Text style={styles.bullet}>- Number of rods</Text>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding
        with the calculations.
      </Text>

      {/* Step 3: Calculate Weight of One Rod */}
      <Text style={styles.step}>3. Calculate Weight of One Rod</Text>
      <Text style={styles.text}>
        Calculate the weight of one rod based on its dimensions:
      </Text>
      <Text style={styles.equation}>
        Rod Weight (kg) = (Diameter² × Length) / 162
      </Text>

      {/* Step 4: Calculate Total Weight */}
      <Text style={styles.step}>4. Calculate Total Weight</Text>
      <Text style={styles.text}>Calculate the total weight for all rods:</Text>
      <Text style={styles.equation}>
        Total Weight (kg) = Rod Weight (kg) × Number of Rods
      </Text>

      {/* Step 5: Calculate Total Cost */}
      <Text style={styles.step}>5. Calculate Total Cost</Text>
      <Text style={styles.text}>
        Determine the total cost based on the total weight and price per kg:
      </Text>
      <Text style={styles.equation}>
        Total Cost = Total Weight (kg) × Price per kg
      </Text>

      {/* Step 6: Calculate Volume of One Rod */}
      <Text style={styles.step}>6. Calculate Volume of One Rod</Text>
      <Text style={styles.text}>
        Calculate the volume of one rod assuming it as a cylinder:
      </Text>
      <Text style={styles.equation}>
        Rod Volume (m³) = π × (Diameter/2000)² × Length
      </Text>
    </ScrollView>
  );
};

export default RodCostGuide;
