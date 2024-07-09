import { ScrollView, View, Text, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const SingleHouse = () => {
  // //  //  //  //foundation states
  // Footing
  const [footingLength, setFootingLength] = useState('');
  const [footingWidth, setFootingWidth] = useState('');
  const [footingThickness, setFootingThickness] = useState('');
  const [numberFootings, setNumberFootings] = useState('');
  // Column
  const [columnLength, setColumnLength] = useState('');
  const [columnWidth, setColumnWidth] = useState('');
  const [columnHeight, setColumnHeight] = useState('');
  const [numberColumns, setNumberColumns] = useState('');
  // Beam
  const [beamLength, setBeamLength] = useState('');
  const [beamWidth, setBeamWidth] = useState('');
  const [beamHeight, setBeamHeight] = useState('');
  // Wall
  const [wallLength, setWallLength] = useState('');
  const [wallWidth, setWallWidth] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [blockLength, setBlockLength] = useState('');
  const [blockWidth, setBlockWidth] = useState('');
  const [blockHeight, setBlockHeight] = useState('');

  // //  //  //  //elevation states
  // //  //  //  //foundation states

  return (
    <ScrollView style={containerStyles.container}>
      {/* <Text style={titleStyles.boldTitle}>Single Storey Cost Estimate</Text> */}
      <View>
        <Text style={titleStyles.boldTitle}>Foundation</Text>
        <Line />

        <Text style={titleStyles.title}>Footing:</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Length"
            value={footingLength}
            onChange={(value) => {
              setFootingLength(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Width"
            value={footingWidth}
            onChange={(value) => {
              setFootingWidth(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Thickness"
            value={footingThickness}
            onChange={(value) => {
              setFootingThickness(value);
            }}
          />
        </View>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Enter Value"
            title="Number of Footings"
            value={numberFootings}
            onChange={(value) => {
              setNumberFootings(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Enter Value"
            title="Price per meter"
            // value={footingWidth}
            // onChange={(value) => {
            //   setFootingWidth(value);
            // }}
          />
        </View>

        <Line />
        <Text style={titleStyles.title}>Column:</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Length"
            value={columnLength}
            onChange={(value) => {
              setColumnLength(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Width"
            value={columnWidth}
            onChange={(value) => {
              setColumnWidth(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Thickness"
            value={columnHeight}
            onChange={(value) => {
              setColumnHeight(value);
            }}
          />
        </View>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Enter Value"
            title="Number of Columns"
            value={numberColumns}
            onChange={(value) => {
              setNumberColumns(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Enter Value"
            title="Price per meter"
            // value={footingWidth}
            // onChange={(value) => {
            //   setFootingWidth(value);
            // }}
          />
        </View>
        <Line />

        <Text style={titleStyles.title}>Beam:</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Beam Length"
            value={beamLength}
            onChange={(value) => {
              setBeamLength(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Beam Width"
            value={beamWidth}
            onChange={(value) => {
              setBeamWidth(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Beam Height"
            value={beamLength}
            onChange={(value) => {
              setBeamHeight(value);
            }}
          />
        </View>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            placeholder="Enter Value"
            title="Price per meter"
            // value={footingWidth}
            // onChange={(value) => {
            //   setFootingWidth(value);
            // }}
          />
        </View>
        <Line />

        <Text style={titleStyles.title}>Foundation Wall:</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Wall Length"
            value={wallLength}
            onChange={(value) => {
              setWallLength(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Wall Width"
            value={wallWidth}
            onChange={(value) => {
              setWallWidth(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Wall Height"
            value={wallHeight}
            onChange={(value) => {
              setWallHeight(value);
            }}
          />
        </View>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Block Length"
            value={beamLength}
            onChange={(value) => {
              setBlockLength(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Block Width"
            value={blockWidth}
            onChange={(value) => {
              setBlockWidth(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Block Height"
            value={blockLength}
            onChange={(value) => {
              setBlockHeight(value);
            }}
          />
        </View>
      </View>

      <Line />
      <Line />
      <Text style={titleStyles.boldTitle}>Elevation</Text>
      <Line />
      <Line />
      <Text style={titleStyles.boldTitle}>Roofing</Text>
      <Line />
      <ButtonPrimary title="Calculate Estimate" />
      <Line />

      {/* =====================
      =======================
      ======================
      =====================
      OUTPUT
      ===================
      =====================
      =================
      ===================== */}
      <Text style={titleStyles.boldTitle}>Output:</Text>
      <View style={tableStyles.container}>
        {/* ======= Foundation ======= */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnHeaderSingle}>Foundation</Text>
        </View>
        {/* Row 1 */}
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
        {/* /footing */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnSubHeader}>Footing:</Text>
        </View>

        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Wet Volume of Concrete</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Concrete</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Sand</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Cement</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Gravel</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Number of 12m rods</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
        </View>

        {/* columns */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnSubHeader}>Columns:</Text>
        </View>

        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Wet Volume of Concrete</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Concrete</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Sand</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Cement</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Gravel</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Number of 12m rods</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
        </View>

        {/* beam */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnSubHeader}>Beam:</Text>
        </View>

        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Wet Volume of Concrete</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Concrete</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Sand</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Cement</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Gravel</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Number of 12m rods</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
        </View>

        {/* foundation wall */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnSubHeader}>Foundation Wall:</Text>
        </View>

        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Wet Volume of Concrete</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Concrete</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Sand</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Cement</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Dry Volume of Gravel</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Number of blocks</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
        </View>

        {/* total foundation estimate */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnSubHeader}>Total:</Text>
        </View>

        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Total Dry Concrete Volume</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Total Dry Sand Volume</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Total Dry Cement Volume</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Total Dry Gravel Volume</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}>m³</Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Total Number of 12m rods</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
        </View>
        <View style={tableStyles.row}>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cellLeft}>Total Number of blocks</Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
          <View style={tableStyles.column}>
            <Text style={tableStyles.cell}></Text>
          </View>
        </View>
        {/* ======= Elevation ======= */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnHeaderSingle}>Elevation</Text>
        </View>

        {/* ======= Roofing ======= */}
        <View style={tableStyles.row}>
          <Text style={tableStyles.columnHeaderSingle}>Roofing</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleHouse;
