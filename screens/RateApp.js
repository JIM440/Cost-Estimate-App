import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

const RateApp = () => {
  const [tableData, setTableData] = useState([
    { col1: '', col2: '', col3: '' },
  ]);

  const handleChange = (columnIndex, value) => {
    const updatedData = [...tableData];
    updatedData[0][`col${columnIndex + 1}`] = value;
    setTableData(updatedData);
  };

  const createPDF = async () => {
    try {
      const htmlContent = generateTableHTML(tableData);
      const options = {
        html: htmlContent,
        fileName: 'my_table_pdf.pdf',
      };
      const { uri } = await Print.printToFileAsync(options);

      // Share the generated PDF using Sharing API
      await Sharing.shareAsync(uri);

      // Handle success (e.g., show message)
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const generateTableHTML = (data) => {
    const tableStyle = `
      width: 100%; 
      border-collapse: 'collapse'; /* Set table width to 100% */
    `;

    const columnStyle = `
      padding: 10px;
            border: 1px solid #000;
      text-align: center;
    `;

    const rows = data.map((row) => {
      return `<tr>
        <td style="${columnStyle}">${row.col1}</td>
        <td style="${columnStyle}">${row.col2}</td>
        <td style="${columnStyle}">${row.col3}</td>
      </tr>`;
    });
    return `<table>
      <style>${tableStyle}</style>
      <thead>
        <tr>
          <th style="${columnStyle}">Column 1</th>
          <th style="${columnStyle}">Column 2</th>
          <th style="${columnStyle}">Column 3</th>
        </tr>
      </thead>
      <tbody>${rows.join('')}</tbody>
    </table>`;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      padding: 20,
    },
    textInput: {
      marginBottom: 10,
      padding: 10,
      fontSize: 16,
      borderRadius: 5,
      backgroundColor: '#f0f0f0',
    },
    button: {
      padding: 10,
      backgroundColor: '#4CAF50',
      color: 'white',
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      {/* Input fields for each column */}
      <TextInput
        value={tableData[0].col1}
        onChangeText={(text) => handleChange(0, text)}
        placeholder="Column 1 Data"
        style={styles.textInput}
      />
      <TextInput
        value={tableData[0].col2}
        onChangeText={(text) => handleChange(1, text)}
        placeholder="Column 2 Data"
        style={styles.textInput}
      />
      <TextInput
        value={tableData[0].col3}
        onChangeText={(text) => handleChange(2, text)}
        placeholder="Column 3 Data"
        style={styles.textInput}
      />
      <Button title="Generate PDF" onPress={createPDF} style={styles.button} />
    </View>
  );
};

export default RateApp;
