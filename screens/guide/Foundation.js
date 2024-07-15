import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../../styles/screens/Guides';

const FoundationCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Step-by-Step Guide: Estimating Foundation Cost</Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the cost of the foundation, gather the following inputs:
      </Text>
      <Text style={styles.bullet}>- Length of Foundation (m)</Text>
      <Text style={styles.bullet}>- Width of Foundation (m)</Text>
      <Text style={styles.bullet}>- Height of Foundation (m)</Text>
      <Text style={styles.bullet}>- Price per m³ of Concrete (currency)</Text>
      <Text style={styles.bullet}>- Density of Soil (kg/m³)</Text>
      <Text style={styles.bullet}>- Bearing Capacity of Soil (kN/m²)</Text>
      <Text style={styles.bullet}>- Angle of Response (degrees)</Text>

      {/* Step 2: Calculate Depth of Foundation */}
      <Text style={styles.step}>2. Calculate Depth of Foundation</Text>
      <Text style={styles.text}>
        Calculate the depth of the foundation required based on soil characteristics:
      </Text>
      <Text style={styles.equation}>Depth of Foundation (m) = (Bearing Capacity / Density of Soil) * [(1 - sin(angleOfResponse)) / (1 + sin(angleOfResponse))]²</Text>
      <Text style={styles.text}>
        Substitute the values for Bearing Capacity, Density of Soil, and Angle of Response into the equation to find the depth required for the foundation.
      </Text>

      {/* Step 3: Calculate Dry Concrete Volume */}
      <Text style={styles.step}>3. Calculate Dry Concrete Volume</Text>
      <Text style={styles.text}>
        Determine the volume of dry concrete needed for the foundation:
      </Text>
      <Text style={styles.equation}>Dry Concrete Volume (m³) = Volume (m³) * Depth of Foundation (m)</Text>
      <Text style={styles.text}>
        Multiply the volume of the foundation (length × width × height) by the calculated depth of foundation to find the total dry concrete volume required.
      </Text>

      {/* Step 4: Calculate Cement Weight */}
      <Text style={styles.step}>4. Calculate Cement Weight</Text>
      <Text style={styles.text}>
        Estimate the weight of cement required based on the dry concrete volume:
      </Text>
      <Text style={styles.equation}>Cement Weight (kg) = Dry Concrete Volume (m³) * 2400 kg/m³</Text>
      <Text style={styles.text}>
        Multiply the dry concrete volume by the density of concrete (assumed here as 2400 kg/m³) to find the total weight of cement required.
      </Text>

      {/* Step 5: Calculate Sand Volume */}
      <Text style={styles.step}>5. Calculate Sand Volume</Text>
      <Text style={styles.text}>
        Determine the volume of sand needed for the foundation:
      </Text>
      <Text style={styles.equation}>Sand Volume (m³) = Dry Concrete Volume (m³) * 0.55</Text>
      <Text style={styles.text}>
        Multiply the dry concrete volume by 0.55 (assuming sand constitutes 55% of concrete volume) to find the total volume of sand required.
      </Text>

      {/* Step 6: Calculate Aggregate Volume */}
      <Text style={styles.step}>6. Calculate Aggregate Volume</Text>
      <Text style={styles.text}>
        Determine the volume of aggregate needed for the foundation:
      </Text>
      <Text style={styles.equation}>Aggregate Volume (m³) = Dry Concrete Volume (m³) * 0.45</Text>
      <Text style={styles.text}>
        Multiply the dry concrete volume by 0.45 (assuming aggregate constitutes 45% of concrete volume) to find the total volume of aggregate required.
      </Text>

      {/* Step 7: Calculate Number of Cement Bags */}
      <Text style={styles.step}>7. Calculate Number of Cement Bags</Text>
      <Text style={styles.text}>
        Determine the number of 50 kg bags of cement required:
      </Text>
      <Text style={styles.equation}>Number of Cement Bags = Ceil(Cement Weight / 50)</Text>
      <Text style={styles.text}>
        Divide the total weight of cement by 50 kg (weight per bag) and round up to the nearest whole number to find the total number of cement bags required.
      </Text>

      {/* Step 8: Calculate Foundation Cost */}
      <Text style={styles.step}>8. Calculate Foundation Cost</Text>
      <Text style={styles.text}>
        Estimate the total cost of the foundation based on concrete volume and price per m³:
      </Text>
      <Text style={styles.equation}>Total Foundation Cost = Dry Concrete Volume (m³) * Price per m³</Text>
      <Text style={styles.text}>
        Multiply the dry concrete volume by the price per m³ of concrete to find the total cost of the foundation.
      </Text>
    </ScrollView>
  );
};

export default FoundationCostGuide;
