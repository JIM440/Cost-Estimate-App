import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../../styles/screens/Guides';

const FoundationCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Step-by-Step Guide: Estimating Foundation Cost
      </Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the Depth of foundation, gather the following inputs:
      </Text>
      <Text style={styles.bullet}>- Density of Soil (kg/m³)</Text>
      <Text style={styles.bullet}>- Bearing Capacity of Soil (kg/m²)</Text>
      <Text style={styles.bullet}>- Angle of Response (degrees)</Text>

      {/* Step 2: Calculate Depth of Foundation */}
      <Text style={styles.step}>2. Calculate Depth of Foundation</Text>
      <Text style={styles.text}>
        Calculate the depth of the foundation required based on soil
        characteristics:
      </Text>
      <Text style={styles.equation}>
        Depth of Foundation (m) = (Bearing Capacity / Density of Soil) * [(1 -
        sin(angleOfResponse)) / (1 + sin(angleOfResponse))]²
      </Text>
      <Text style={styles.text}>
        Substitute the values for Bearing Capacity, Density of Soil, and Angle
        of Response into the equation to find the depth required for the
        foundation.
      </Text>
    </ScrollView>
  );
};

export default FoundationCostGuide;
