import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const ConcreteCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Step-by-Step Guide: Estimating Concrete Cost
      </Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the cost of concrete, gather the following inputs:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>- Length of Base (m)</Text>
        <Text style={styles.bullet}>- Width of Base (m)</Text>
        <Text style={styles.bullet}>- Height of Concrete (m)</Text>
        <Text style={styles.bullet}>- Mix Ratio (cement : sand : gravel)</Text>
        <Text style={styles.bullet}>- Dry Volume Constant</Text>
        <Text style={styles.bullet}>- Price per m³ of Concrete (currency)</Text>
      </View>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding
        with the calculations.
      </Text>

      {/* Step 3: Calculate Total Volume of Concrete */}
      <Text style={styles.step}>3. Calculate Total Volume of Concrete</Text>
      <Text style={styles.text}>
        Calculate the total volume of concrete needed for the structure:
      </Text>
      <Text style={styles.equation}>
        Total Volume of Concrete (m³) = Length × Width × Height
      </Text>

      {/* Step 4: Calculate Dry Volume of Concrete */}
      <Text style={styles.step}>4. Calculate Dry Volume of Concrete</Text>
      <Text style={styles.text}>Calculate the dry volume of concrete:</Text>
      <Text style={styles.equation}>
        Dry Volume of Concrete (m³) = Total Volume of Concrete × Dry Volume
        Constant
      </Text>

      {/* Step 5: Calculate Cement and Aggregate Volumes */}
      <Text style={styles.step}>5. Calculate Cement and Aggregate Volumes</Text>
      <Text style={styles.text}>
        Calculate the volumes of cement, sand, and aggregate required based on
        standard mix proportions:
      </Text>
      <Text style={styles.equation}>
        Cement Volume (m³) = Dry Volume of Concrete × (cement ratio / sum of
        ratio)
      </Text>
      <Text style={styles.equation}>
        Sand Volume (m³) = Dry Volume of Concrete × (sand ratio / sum of ratio)
      </Text>
      <Text style={styles.equation}>
        Aggregate Volume (m³) = Dry Volume of Concrete × (Gravel ratio / sum of
        ratio)
      </Text>

      {/* Step 6: Calculate Number of Cement Bags */}
      <Text style={styles.step}>6. Calculate Number of Cement Bags</Text>
      <Text style={styles.text}>
        Determine the number of 50 kg bags of cement required:
      </Text>
      <Text style={styles.equation}>
        Number of Cement Bags = Ceil(Cement Volume * 1440 / 50)
      </Text>

      {/* Step 7: Calculate Concrete Cost */}
      <Text style={styles.step}>7. Calculate Concrete Cost</Text>
      <Text style={styles.text}>
        Determine the total cost of concrete based on the volume and price per
        m³:
      </Text>
      <Text style={styles.equation}>
        Total Concrete Cost = Dry Volume of Concrete × Price per m³
      </Text>
    </ScrollView>
  );
};

export default ConcreteCostGuide;
