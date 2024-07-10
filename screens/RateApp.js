import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const tableStyles = StyleSheet.create({
  container: { padding: 10 },
  row: { flexDirection: 'row' },
  column: { flex: 1, padding: 5 },
  columnHeaderSingle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  columnHeaderLeft: { fontSize: 14, fontWeight: 'bold' },
  columnHeader: { fontSize: 14, fontWeight: 'bold' },
  columnSubHeader: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  cellLeft: { fontSize: 12 },
  cell: { fontSize: 12 },
});

const App = () => {
  const [footingEstimate, setFootingEstimate] = useState({
    volume: 1.23,
    dryVolume: 1.11,
    sandVolume: 0.56,
    cementVolume: 0.78,
    gravelVolume: 0.67,
    totalRods: 10,
  });

  const generatePdf = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 10px; }
            .container { padding: 10px; }
            .row { display: flex; flex-direction: row; }
            .column { flex: 1; padding: 5px; }
            .columnHeaderSingle { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
            .columnHeaderLeft { font-size: 14px; font-weight: bold; }
            .columnHeader { font-size: 14px; font-weight: bold; }
            .columnSubHeader { font-size: 14px; font-weight: bold; margin-top: 10px; }
            .cellLeft { font-size: 12px; }
            .cell { font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="row">
              <div class="columnHeaderSingle">Foundation</div>
            </div>
            <div class="row">
              <div class="column">
                <div class="columnHeaderLeft">Material</div>
              </div>
              <div class="column">
                <div class="columnHeader">Quantity</div>
              </div>
              <div class="column">
                <div class="columnHeader">Unit</div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="columnHeaderLeft">Material</div>
              </div>
              <div class="column">
                <div class="columnHeader">Quantity</div>
              </div>
              <div class="column">
                <div class="columnHeader">Unit</div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="columnHeaderLeft">Material</div>
              </div>
              <div class="column">
                <div class="columnHeader">Quantity</div>
              </div>
              <div class="column">
                <div class="columnHeader">Unit</div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="columnHeaderLeft">Material</div>
              </div>
              <div class="column">
                <div class="columnHeader">Quantity</div>
              </div>
              <div class="column">
                <div class="columnHeader">Unit</div>
              </div>
            </div>
            <div class="row">
              <div class="columnSubHeader">Footing:</div>
            </div>
            <div class="row">
              <div class="column">
                <div class="cellLeft">Wet Volume of Concrete</div>
              </div>
              <div class="column">
                <div class="cell">${footingEstimate.volume}</div>
              </div>
              <div class="column">
                <div class="cell">m³</div>
              </div>
            </div>
            <!-- Add more rows similarly -->
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    const pdfPath = `${FileSystem.documentDirectory}foundation-estimate.pdf`;

    await FileSystem.moveAsync({
      from: uri,
      to: pdfPath,
    });

    await Sharing.shareAsync(pdfPath);
  };

  return (
    <View style={tableStyles.container}>
      <View style={tableStyles.row}>
        <Text style={tableStyles.columnHeaderSingle}>Foundation</Text>
      </View>
      <View style={tableStyles.row}>
        <View style={tableStyles.column}>
          <Text style={tableStyles.columnHeaderLeft}>Material</Text>
        </View>
        <View style={tableStyles.column}>
          <Text style={tableStyles.columnHeader}>Quantity</Text>
        </View>
        <View style={tableStyles.column}>
          <Text style={tableStyles.columnHeader}>Unit</Text>
        </View>
      </View>
      <View style={tableStyles.row}>
        <Text style={tableStyles.columnSubHeader}>Footing:</Text>
      </View>
      <View style={tableStyles.row}>
        <View style={tableStyles.column}>
          <Text style={tableStyles.cellLeft}>Wet Volume of Concrete</Text>
        </View>
        <View style={tableStyles.column}>
          <Text style={tableStyles.cell}>{footingEstimate.volume}</Text>
        </View>
        <View style={tableStyles.column}>
          <Text style={tableStyles.cell}>m³</Text>
        </View>
      </View>
      {/* Add more rows similarly */}

      <Button title="Export to PDF" onPress={generatePdf} />
    </View>
  );
};

export default App;
