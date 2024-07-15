import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/screens/Guides';
import { ScrollView } from 'react-native-gesture-handler';

const RoofingEstimateGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Step-by-Step Guide: Estimating Roofing Materials</Text>

      {/* Step 1: Gather Required Inputs */}
      <Text style={styles.step}>1. Gather Required Inputs</Text>
      <Text style={styles.text}>
        To estimate roofing materials, gather the following inputs:
      </Text>
      <Text style={styles.bullet}>- Length of House (m)</Text>
      <Text style={styles.bullet}>- Width of House (m)</Text>
      <Text style={styles.bullet}>- Rise (m)</Text>
      <Text style={styles.bullet}>- Run (m)</Text>
      <Text style={styles.bullet}>- Span (m)</Text>

      {/* Step 2: Validate Inputs */}
      <Text style={styles.step}>2. Validate Inputs</Text>
      <Text style={styles.text}>
        Ensure all required inputs are provided and are valid before proceeding with the calculations.
      </Text>

      {/* Step 3: Calculate Rafter Length */}
      <Text style={styles.step}>3. Calculate Rafter Length</Text>
      <Text style={styles.text}>
        Calculate the length of each rafter using the Pythagorean theorem:
      </Text>
      <Text style={styles.equation}>Rafter Length = √(Rise² + Run²)</Text>

      {/* Step 4: Calculate Roof Pitch */}
      <Text style={styles.step}>4. Calculate Roof Pitch</Text>
      <Text style={styles.text}>
        Determine the roof pitch ratio and convert it to degrees:
      </Text>
      <Text style={styles.equation}>Roof Pitch Ratio = Rise / Run</Text>
      <Text style={styles.equation}>Roof Pitch (degrees) = arctan(Roof Pitch Ratio) * (180 / π)</Text>

      {/* Step 5: Calculate Number of Rafters */}
      <Text style={styles.step}>5. Calculate Number of Rafters</Text>
      <Text style={styles.text}>
        Estimate the total number of rafters required based on house length and span:
      </Text>
      <Text style={styles.equation}>Number of Rafters = Ceil(Length / Span) + 1</Text>

      {/* Step 6: Calculate Roofing Sheets */}
      <Text style={styles.step}>6. Calculate Roofing Sheets</Text>
      <Text style={styles.text}>
        Determine the number of roofing sheets needed based on the area of the roof:
      </Text>
      <Text style={styles.equation}>Area of Roofing (m²) = (Length × Width) / cos(Roof Pitch)</Text>
      <Text style={styles.equation}>Number of Roofing Sheets = Ceil(Area of Roofing / 30)</Text>

      {/* Step 7: Calculate Ceiling Boards */}
      <Text style={styles.step}>7. Calculate Ceiling Boards</Text>
      <Text style={styles.text}>
        Estimate the number of ceiling boards required based on the area of the house:
      </Text>
      <Text style={styles.equation}>Number of Ceiling Boards = Ceil(Area of House / 32)</Text>

      {/* Step 8: Calculate Purlins */}
      <Text style={styles.step}>8. Calculate Purlins</Text>
      <Text style={styles.text}>
        Determine the number of purlins needed to support the rafters:
      </Text>
      <Text style={styles.equation}>Number of Purlins = Ceil((Rafter Length × Length) / 0.9)</Text>

      {/* Step 9: Calculate Total Number of Boards */}
      <Text style={styles.step}>9. Calculate Total Number of Boards</Text>
      <Text style={styles.text}>
        Estimate the total number of boards required, including rafters, risers, and chaining:
      </Text>
      <Text style={styles.equation}>Total Number of Boards = Ceil(Total Number of Rafters + Total Number of Risers + Chaining)</Text>
    </ScrollView>
  );
};

export default RoofingEstimateGuide;
