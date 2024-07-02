import { ScrollView, View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const SingleHouse = () => {
  const ExportPdf = async () => {
    try {
      const htmlContent = `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid black;
                  padding: 8px;
                  text-align: center;
                }
                th {
                  background-color: #f0f0f0;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              ${await Print.printToFileAsync({
                html: `<div style="margin-top: 20px; border: 1px solid #000;">
        <!-- ======= Foundation ======= -->
        <div style="border-bottom: 1px solid #000;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 10px;">Foundation</div>
        </div>
        <!-- Row 1 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Material</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Quantity</div>
          <div style="flex: 1; padding: 10px;">Unit</div>
        </div>
        <!-- Row 2 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Depth of Foundation</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">10</div>
          <div style="flex: 1; padding: 10px;">m</div>
        </div>
        <!-- Row 3 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Dry Concrete Volume</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">10</div>
          <div style="flex: 1; padding: 10px;">m³</div>
        </div>
        <!-- ======= Elevation ======= -->
        <div style="border-bottom: 1px solid #000; margin-top: 20px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 10px;">Elevation</div>
        </div>
        <!-- Row 1 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Material</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Quantity</div>
          <div style="flex: 1; padding: 10px;">Unit</div>
        </div>
        <!-- Row 2 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Depth of Foundation</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">10</div>
          <div style="flex: 1; padding: 10px;">m</div>
        </div>
        <!-- Row 3 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Dry Concrete Volume</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">10</div>
          <div style="flex: 1; padding: 10px;">m³</div>
        </div>
        <!-- ======= Roofing ======= -->
        <div style="border-bottom: 1px solid #000; margin-top: 20px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 10px;">Roofing</div>
        </div>
        <!-- Row 1 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Material</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Quantity</div>
          <div style="flex: 1; padding: 10px;">Unit</div>
        </div>
        <!-- Row 2 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Depth of Foundation</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">10</div>
          <div style="flex: 1; padding: 10px;">m</div>
        </div>
        <!-- Row 3 -->
        <div style="display: flex; flex-direction: row; border-bottom: 1px solid #000;">
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">Dry Concrete Volume</div>
          <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">10</div>
          <div style="flex: 1; padding: 10px;">m³</div>
        </div>
      </div>`,
              }).uri}
            </body>
          </html>
        `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share this PDF',
        UTI: 'com.adobe.pdf', // iOS only
      });
    } catch (error) {
      console.error('Failed to generate or share PDF', error);
    }
  };
  return (
    <ScrollView style={containerStyles.container}>
      <Text>Foundation</Text>
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Length"
      />
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Width"
      />
      <Line />
      <Text>Elevation</Text>
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Length"
      />
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Width"
      />
      <Line />
      <Text>Roofing</Text>
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Length"
      />
      <TextInputTitle
        style={inputStyles.threeColumnInput}
        placeholder="Enter Value"
        title="Width"
      />
      <ButtonPrimary title="Calculate Estimate" />
      <Line />
      <Text style={titleStyles.boldTitle}>Output:</Text>
      <View style={tableStyles.container}>
        {/* ======= Foundation ======= */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnHeaderSingle}>Foundation</Text>
        </View>
        {/* Row 1 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Material</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Quantity</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Unit</Text>
          </View>
        </View>
        {/* Row 2 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>Depth of Foundation</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>10</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m</Text>
          </View>
        </View>
        {/* Row 3 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>Dry Concrete Volume</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>10</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        {/* ======= Elevation ======= */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnHeaderSingle}>Elevation</Text>
        </View>
        {/* Row 1 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Material</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Quantity</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Unit</Text>
          </View>
        </View>
        {/* Row 2 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>Depth of Foundation</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>10</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m</Text>
          </View>
        </View>
        {/* Row 3 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>Dry Concrete Volume</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>10</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        {/* ======= Roofing ======= */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnHeaderSingle}>Roofing</Text>
        </View>
        {/* Row 1 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Material</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Quantity</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.columnHeader}>Unit</Text>
          </View>
        </View>
        {/* Row 2 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>Depth of Foundation</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>10</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m</Text>
          </View>
        </View>
        {/* Row 3 */}
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>Dry Concrete Volume</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>10</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
      </View>
      <ButtonPrimary title="Export" onPress={ExportPdf} />
    </ScrollView>
  );
};

export default SingleHouse;
