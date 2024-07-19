import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const PlasteringCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Step-by-Step Guide: Estimating Plastering Cost
      </Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the cost of plastering, gather the following inputs:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>- Length of wall (m)</Text>
        <Text style={styles.bullet}>- Width of wall (m)</Text>
        <Text style={styles.bullet}>- Thickness of plaster (m)</Text>
        <Text style={styles.bullet}>- Opening area (if any, m²)</Text>
        <Text style={styles.bullet}>- Mix Ratio (cement : sand)</Text>
        <Text style={styles.bullet}>- Dry Volume Constant</Text>
        <Text style={styles.bullet}>- Percentage Waste</Text>
        <Text style={styles.bullet}>- Price per m² of plaster (currency)</Text>
      </View>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding
        with the calculations.
      </Text>

      {/* Step 3: Calculate Total Area */}
      <Text style={styles.step}>3. Calculate Total Area</Text>
      <Text style={styles.text}>
        Calculate the total area of the wall to be plastered:
      </Text>
      <Text style={styles.equation}>
        Total Area (m²) = Length × Width - Opening Area
      </Text>

      {/* Step 4: Calculate Total Volume for Plastering */}
      <Text style={styles.step}>4. Calculate Total Volume for Plastering</Text>
      <Text style={styles.text}>
        Calculate the total volume required for plastering, considering wastage:
      </Text>
      <Text style={styles.equation}>Waste Value = Percentage Waste / 100</Text>
      <Text style={styles.equation}>
        Total Volume (m³) = Total Area × Thickness × (1 + Waste Value)
      </Text>

      {/* Step 5: Calculate Dry Volume of Plaster */}
      <Text style={styles.step}>5. Calculate Dry Volume of Plaster</Text>
      <Text style={styles.text}>
        Calculate the dry volume of plaster required:
      </Text>
      <Text style={styles.equation}>
        Dry Volume (m³) = Total Volume × Dry Volume Constant
      </Text>

      {/* Step 6: Calculate Cement Volume and Weight */}
      <Text style={styles.step}>6. Calculate Cement Volume and Weight</Text>
      <Text style={styles.text}>
        Calculate the volume and weight of cement required:
      </Text>
      <Text style={styles.equation}>
        Cement Volume (m³) = (Dry Volume * Cement Ratio) / Sum of Ratio
      </Text>
      <Text style={styles.equation}>
        Cement Weight (kg) = Cement Volume × 1440
      </Text>
      <Text style={styles.equation}>Bags of Cement = Cement Weight / 50</Text>

      {/* Step 7: Calculate Sand Volume */}
      <Text style={styles.step}>7. Calculate Sand Volume</Text>
      <Text style={styles.text}>Calculate the volume of sand required:</Text>
      <Text style={styles.equation}>
        Sand Volume (m³) = (Dry Volume × Sand Ratio) / Sum of Ratio
      </Text>

      {/* Step 8: Calculate Plaster Cost */}
      <Text style={styles.step}>8. Calculate Plaster Cost</Text>
      <Text style={styles.text}>
        Determine the total cost of plastering based on the calculated dry
        volume and price per m²:
      </Text>
      <Text style={styles.equation}>
        Total Plaster Cost = Dry Volume × Price per m²
      </Text>
    </ScrollView>
  );
};

export default PlasteringCostGuide;
