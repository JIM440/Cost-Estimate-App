import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';

const ExcavationCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Step-by-Step Guide: Estimating Excavation Cost
      </Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate the cost of excavation, gather the following inputs:
      </Text>
      <Text style={styles.bullet}>- Length (m)</Text>
      <Text style={styles.bullet}>- Width (m)</Text>
      <Text style={styles.bullet}>- Depth (m)</Text>
      <Text style={styles.bullet}>- Price per Trip</Text>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding
        with the calculations.
      </Text>

      {/* Step 3: Calculate Volume */}
      <Text style={styles.step}>3. Calculate Volume</Text>
      <Text style={styles.text}>
        Calculate the total excavation volume including a 30% safety margin:
      </Text>
      <Text style={styles.equation}>
        Total Volume = Length × Width × Depth + 0.3 × Volume
      </Text>

      {/* Step 4: Determine Number of Trips */}
      <Text style={styles.step}>4. Determine Number of Trips</Text>
      <Text style={styles.text}>
        Calculate the number of trips needed based on a capacity of 56m³ per
        trip:
      </Text>
      <Text style={styles.equation}>
        Number of Trips = Ceil(Total Volume / 56)
      </Text>

      {/* Step 5: Calculate Total Cost */}
      <Text style={styles.step}>5. Calculate Total Cost</Text>
      <Text style={styles.text}>
        Determine the total cost based on the calculated number of trips and
        price per Trip:
      </Text>
      <Text style={styles.equation}>
        Total Cost = Number of Trips × Price per Trip
      </Text>
    </ScrollView>
  );
};

export default ExcavationCostGuide;
