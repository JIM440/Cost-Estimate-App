import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import styles from '../../styles/screens/Guides';

const TileCostGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Step-by-Step Guide: Calculating Tile Cost</Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To calculate the cost and quantity of tiles needed for your project, gather the following inputs:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>- Tile Dimensions:</Text>
        <Text style={styles.subBullet}>   - Length (m)</Text>
        <Text style={styles.subBullet}>   - Width (m)</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>- Floor Dimensions:</Text>
        <Text style={styles.subBullet}>   - Length (m)</Text>
        <Text style={styles.subBullet}>   - Width (m)</Text>
      </View>
      <Text style={styles.bullet}>- Wastage Percentage:</Text>
      <Text style={styles.bullet}>- Tile Price:</Text>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding with the calculations.
      </Text>

      {/* Step 3: Calculate Floor Area */}
      <Text style={styles.step}>3. Calculate Floor Area</Text>
      <Text style={styles.text}>
        Calculate the total area of the floor to be tiled using the provided dimensions:
      </Text>
      <Text style={styles.equation}>Floor Area = Floor Length (m) × Floor Width (m)</Text>

      {/* Step 4: Calculate Tile Area */}
      <Text style={styles.step}>4. Calculate Tile Area</Text>
      <Text style={styles.text}>
        Determine the area of one tile based on its dimensions:
      </Text>
      <Text style={styles.equation}>Tile Area = Tile Length (m) × Tile Width (m)</Text>

      {/* Step 5: Determine Number of Tiles Needed */}
      <Text style={styles.step}>5. Determine Number of Tiles Needed</Text>
      <Text style={styles.text}>
        Divide the floor area by the tile area to find the number of tiles required:
      </Text>
      <Text style={styles.equation}>Number of Tiles = Floor Area / Tile Area</Text>

      {/* Step 6: Account for Wastage */}
      <Text style={styles.step}>6. Account for Wastage</Text>
      <Text style={styles.text}>
        Calculate the additional tiles needed to account for wastage:
      </Text>
      <Text style={styles.equation}>
        Waste = (Wastage Percentage / 100) × Number of Tiles
      </Text>
      <Text style={styles.equation}>
        Total Number of Tiles = Number of Tiles + Waste
      </Text>

      {/* Step 7: Calculate Total Cost */}
      <Text style={styles.step}>7. Calculate Total Cost</Text>
      <Text style={styles.text}>
        Multiply the total number of tiles by the price per tile to determine the total cost:
      </Text>
      <Text style={styles.equation}>Total Cost = Total Number of Tiles × Tile Price</Text>
    </ScrollView>
  );
};

export default TileCostGuide;
