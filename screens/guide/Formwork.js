import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const FormworkCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Step-by-Step Guide: Estimating Formwork Cost</Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the cost of formwork, gather the following inputs:
      </Text>
      <Text style={styles.bullet}>- Length of wall (m)</Text>
      <Text style={styles.bullet}>- Width of wall (m)</Text>
      <Text style={styles.bullet}>- Price per m² of formwork (currency)</Text>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding with the calculations.
      </Text>

      {/* Step 3: Calculate Total Area */}
      <Text style={styles.step}>3. Calculate Total Area</Text>
      <Text style={styles.text}>
        Calculate the total area of formwork needed:
      </Text>
      <Text style={styles.equation}>Total Area (m²) = Length × Width</Text>

      {/* Step 4: Calculate Total Cost */}
      <Text style={styles.step}>4. Calculate Total Cost</Text>
      <Text style={styles.text}>
        Determine the total cost based on the calculated area and price per m²:
      </Text>
      <Text style={styles.equation}>Total Cost = Total Area (m²) × Price per m²</Text>
    </ScrollView>
  );
};

export default FormworkCostGuide;
