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
  const [numberRodsPerFooting, setNumberRodsPerFooting] = useState('');
  // Column
  const [columnLength, setColumnLength] = useState('');
  const [columnWidth, setColumnWidth] = useState('');
  const [columnHeight, setColumnHeight] = useState('');
  const [numberColumns, setNumberColumns] = useState('');
  const [numberRodsPerColumn, setNumberRodsPerColumn] = useState('');
  // Beam
  const [beamLength, setBeamLength] = useState('');
  const [beamWidth, setBeamWidth] = useState('');
  const [beamHeight, setBeamHeight] = useState('');
  const [numerRodsPerBeam, setNumerRodsPerBeam] = useState('');
  // Wall
  const [wallLength, setWallLength] = useState('');
  const [wallWidth, setWallWidth] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [blockLength, setBlockLength] = useState('');
  const [blockWidth, setBlockWidth] = useState('');
  const [blockHeight, setBlockHeight] = useState('');

  // output for foundation estimates state
  const [footingEstimate, setFootingEstimate] = useState({});
  const [columnEstimate, setColumnEstimate] = useState({});
  const [beamEstimate, setBeamEstimate] = useState({});
  const [wallEstimate, setWallEstimate] = useState({});
  const [totalFoundationEstimate, setTotalFoundationEstimate] = useState({});

  // //  //  //  //elevation states
  const [elevationEstimate, setElevationEstimate] = useState({});
  const [elevationWallLength, setElevationWallLength] = useState('');
  const [elevationWallWidth, setelevationWallWidth] = useState('');
  const [elevationWallHeight, setelevationWallHeight] = useState('');
  const [elevationWBlockLength, setelevationWallBlockLength] = useState('');
  const [elevationWallBlockWidth, setelevationWallBlockWidth] = useState('');
  const [elevationWallBlockHeight, setelevationWallBlockHeight] = useState('');
  const [elevationWallSubtractArea, setelevationWallSubtractArea] =
    useState('');
  const [blockPrice, setBlockPrice] = useState('');

  // Calculate volumes and quantities for footings
  const calculateFooting = () => {
    const length = parseFloat(footingLength);
    const width = parseFloat(footingWidth);
    const thickness = parseFloat(footingThickness);
    const number = parseInt(numberFootings);

    const volume = length * width * thickness * number; // Wet volume
    const dryVolume = volume * 1.54; // Assuming 54% increase for dry volume
    const sandVolume = dryVolume * (2 / 4); // Assuming 40% sand
    const cementVolume = dryVolume * (1 / 4); // Assuming 30% cement
    const gravelVolume = dryVolume * (1 / 4); // Assuming 30% gravel

    // Assuming number of rods needed per footing
    const rodsPerFooting = parseFloat(numberRodsPerFooting);
    const totalRods = (number * rodsPerFooting * thickness) / 12;

    return {
      volume,
      dryVolume,
      sandVolume,
      cementVolume,
      gravelVolume,
      totalRods,
    };
  };

  // Calculate volumes and quantities for columns
  const calculateColumn = () => {
    const length = parseFloat(columnLength);
    const width = parseFloat(columnWidth);
    const height = parseFloat(columnHeight);
    const number = parseInt(numberColumns);

    const volume = length * width * height * number; // Wet volume
    const dryVolume = volume * 1.54;
    const sandVolume = dryVolume * (2 / 4);
    const cementVolume = dryVolume * (1 / 4);
    const gravelVolume = dryVolume * (1 / 4);

    const rodsPerColumn = parseFloat(numberRodsPerColumn);
    const totalRods = (number * rodsPerColumn * length) / 12;

    return {
      volume,
      dryVolume,
      sandVolume,
      cementVolume,
      gravelVolume,
      totalRods,
    };
  };

  // Calculate volumes and quantities for beams
  const calculateBeam = () => {
    const length = parseFloat(beamLength);
    const width = parseFloat(beamWidth);
    const height = parseFloat(beamHeight);

    const volume = length * width * height; // Wet volume
    const dryVolume = volume * 1.54;
    const sandVolume = dryVolume * (2 / 4);
    const cementVolume = dryVolume * (1 / 4);
    const gravelVolume = dryVolume * (1 / 4);

    // Assuming number of rods needed per beam length
    const rodsPerBeam = parseFloat(numerRodsPerBeam); // Example: 1 rod every 3 meters
    const totalRods = rodsPerBeam * 4; // Example: 4 rods per beam

    return {
      volume,
      dryVolume,
      sandVolume,
      cementVolume,
      gravelVolume,
      totalRods,
    };
  };

  // Calculate volumes and quantities for foundation walls
  const calculateWall = () => {
    const length = parseFloat(wallLength);
    const width = parseFloat(wallWidth);
    const height = parseFloat(wallHeight);
    const blockLen = parseFloat(blockLength);
    const blockWid = parseFloat(blockWidth);
    const blockHei = parseFloat(blockHeight);

    const volume = length * width * height; // Wet volume
    const dryVolume = volume * 1.54;
    const sandVolume = dryVolume * (3 / 4);
    const cementVolume = dryVolume * (1 / 4);

    const blockVolume = blockLen * blockWid * blockHei;
    const numberOfBlocks = volume / blockVolume;

    return {
      volume,
      dryVolume,
      sandVolume,
      cementVolume,
      numberOfBlocks,
    };
  };

  // Calculate All Estimates
  const calculateEstimates = () => {
    const footingEstimate = calculateFooting();
    const columnEstimate = calculateColumn();
    const beamEstimate = calculateBeam();
    const wallEstimate = calculateWall();
    CalculateElevation();

    const totalVolume =
      footingEstimate.dryVolume +
      columnEstimate.dryVolume +
      beamEstimate.dryVolume +
      wallEstimate.dryVolume;
    const totalSandVolume =
      footingEstimate.sandVolume +
      columnEstimate.sandVolume +
      beamEstimate.sandVolume +
      wallEstimate.sandVolume;
    const totalCementVolume =
      footingEstimate.cementVolume +
      columnEstimate.cementVolume +
      beamEstimate.cementVolume +
      wallEstimate.cementVolume;
    const totalGravelVolume =
      footingEstimate.gravelVolume +
      columnEstimate.gravelVolume +
      beamEstimate.gravelVolume;
    const totalRods =
      footingEstimate.totalRods +
      columnEstimate.totalRods +
      beamEstimate.totalRods;

    setTotalFoundationEstimate({
      totalVolume,
      totalCementVolume,
      totalSandVolume,
      totalGravelVolume,
      totalRods,
    });

    setFootingEstimate(footingEstimate);
    setColumnEstimate(columnEstimate);
    setBeamEstimate(beamEstimate);
    setWallEstimate(wallEstimate);
  };

  const CalculateElevation = () => {
    // Convert inputs to numbers
    const wallLength = parseFloat(elevationWallLength);
    const wallWidth = parseFloat(elevationWallWidth);
    const wallHeight = parseFloat(elevationWallHeight);
    const blockLengthValue = parseFloat(elevationWBlockLength);
    const blockWidthValue = parseFloat(elevationWallBlockWidth);
    const blockHeightValue = parseFloat(elevationWallBlockHeight);
    const subtractAreaValue = parseFloat(elevationWallSubtractArea);
    const blockPriceValue = parseFloat(blockPrice);

    // Calculate wall volume
    const wallVolumeValue =
      (wallLength * wallWidth - subtractAreaValue) * wallHeight;

    const blockVolume = blockLengthValue * blockWidthValue * blockHeightValue;
    const totalBlockVolume = wallVolumeValue;
    const blockNumber = Math.ceil(totalBlockVolume / blockVolume);

    // Calculate dry mortar volume, assuming standard 1:6 mortar mix
    const dryMortarVol = totalBlockVolume * 1.54;

    // Calculate sand volume
    const sandVol = (dryMortarVol * 3) / 4;

    // Calculate cement volume and weight, assuming density of cement as 1440 kg/m³
    const cementVol = (dryMortarVol * 1) / 4;
    const cementWeightValue = cementVol * 1440;

    // Calculate total cost
    const totalBlockCost = blockNumber * blockPriceValue;
    const numCementBags = cementWeightValue / 50;

    // Update state with results
    setElevationEstimate({
      blockNumber,
      dryMortarVol,
      sandVol,
      cementVol,
      cementWeightValue,
      totalBlockCost,
      totalBlockVolume,
      numCementBags,
    });
  };
  // //  //  //  //foundation states

  return (
    <ScrollView style={containerStyles.container}>
      {/* <Text style={titleStyles.boldTitle}>Single Storey Cost Estimate</Text> */}
      <>
        <Text style={titleStyles.boldTitle}>Foundation</Text>
        <Line />

        <Text>Footing:</Text>
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
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Number of Footings"
            value={numberFootings}
            onChange={(value) => {
              setNumberFootings(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="# Rods Per Footing"
            value={numberRodsPerFooting}
            onChange={(value) => {
              setNumberRodsPerFooting(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Price per meter"
            // value={footingWidth}
            // onChange={(value) => {
            //   setFootingWidth(value);
            // }}
          />
        </View>

        <Line />
        <Text>Column:</Text>
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
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Number of Columns"
            value={numberColumns}
            onChange={(value) => {
              setNumberColumns(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="# Rods Per Column"
            value={numberRodsPerColumn}
            onChange={(value) => {
              setNumberRodsPerColumn(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Price per meter"
            // value={footingWidth}
            // onChange={(value) => {
            //   setFootingWidth(value);
            // }}
          />
        </View>
        <Line />

        <Text>Beam:</Text>
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
            value={beamHeight}
            onChange={(value) => {
              setBeamHeight(value);
            }}
          />
        </View>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.twoColumnInput}
            placeholder="Enter Value"
            title="# Rods Per Beam"
            value={numerRodsPerBeam}
            onChange={(value) => {
              setNumerRodsPerBeam(value);
            }}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            placeholder="Enter Value"
            title="Price per meter"
            // value={footingWidth}
            // onChange={(value) => {
            //   setFootingWidth(value);
            // }}
          />
        </View>
        <Line />

        <Text>Foundation Wall:</Text>
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
            value={blockLength}
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
            value={blockHeight}
            onChange={(value) => {
              setBlockHeight(value);
            }}
          />
        </View>
      </>

      <Line />
      <Line />
      <Line />
      <>
        <Text style={titleStyles.boldTitle}>Elevation</Text>
        <Line />
        <Text>Dimension of Wall</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Length (m)"
            placeholder="Enter length"
            value={elevationWallLength}
            onChange={(text) => setElevationWallLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Width (m)"
            placeholder="Enter width"
            value={elevationWallWidth}
            onChange={(text) => setelevationWallWidth(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Height (m)"
            placeholder="Enter height"
            value={elevationWallHeight}
            onChange={(text) => setelevationWallHeight(text)}
          />
        </View>
        <Line />
        <Text>Dimension of Block</Text>
        <View style={inputStyles.threeColumn}>
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Length (m)"
            placeholder="Enter length"
            value={elevationWBlockLength}
            onChange={(text) => setelevationWallBlockLength(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Width (m)"
            placeholder="Enter width"
            value={elevationWallBlockWidth}
            onChange={(text) => setelevationWallBlockWidth(text)}
          />
          <TextInputTitle
            style={inputStyles.threeColumnInput}
            title="Height (m)"
            placeholder="Enter height"
            value={elevationWallBlockHeight}
            onChange={(text) => setelevationWallBlockHeight(text)}
          />
        </View>
        <Line />

        <TextInputTitle
          title="Subtract Area (m²)"
          placeholder="Enter area"
          value={elevationWallSubtractArea}
          onChange={(text) => setelevationWallSubtractArea(text)}
        />

        <TextInputTitle
          title="Price Per Block"
          placeholder="Enter price"
          value={blockPrice}
          onChange={(text) => setBlockPrice(text)}
        />
      </>
      <Line />
      <Line />
      <Line />
      <Text style={titleStyles.boldTitle}>Roofing</Text>
      <Line />
      <ButtonPrimary title="Calculate Estimate" onPress={calculateEstimates} />
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
      <View>
        <View style={tableStyles.container}>
          {/* ======= Foundation ======= */}
          <>
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
            <>
              <View style={tableStyles.row}>
                <Text style={tableStyles.columnSubHeader}>Footing:</Text>
              </View>

              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Wet Volume of Concrete
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>{footingEstimate.volume}</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Dry Volume of Concrete
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {footingEstimate.dryVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {footingEstimate.sandVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {footingEstimate.sandVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {footingEstimate.totalRods}
                  </Text>
                </View>
              </View>
            </>

            {/* columns */}
            <>
              <View style={tableStyles.row}>
                <Text style={tableStyles.columnSubHeader}>Columns:</Text>
              </View>

              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Wet Volume of Concrete
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>{columnEstimate.volume}</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Dry Volume of Concrete
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {columnEstimate.dryVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {columnEstimate.sandVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {columnEstimate.cementVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {columnEstimate.gravelVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {columnEstimate.totalRods}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}></Text>
                </View>
              </View>
            </>

            {/* beam */}
            <>
              <View style={tableStyles.row}>
                <Text style={tableStyles.columnSubHeader}>Beam:</Text>
              </View>

              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Wet Volume of Concrete
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>{beamEstimate.volume}</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Dry Volume of Concrete
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>{beamEstimate.dryVolume}</Text>
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
                  <Text style={tableStyles.cell}>
                    {beamEstimate.sandVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {beamEstimate.cementVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {beamEstimate.gravelVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>{beamEstimate.totalRods}</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}></Text>
                </View>
              </View>
            </>

            {/* foundation wall */}
            <>
              <View style={tableStyles.row}>
                <Text style={tableStyles.columnSubHeader}>
                  Foundation Wall:
                </Text>
              </View>

              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Wet Volume of Concrete
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>{wallEstimate.volume}</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Dry Volume of Concrete
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>{wallEstimate.dryVolume}</Text>
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
                  <Text style={tableStyles.cell}>
                    {wallEstimate.sandVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {wallEstimate.cementVolume}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {beamEstimate.numberOfBlocks}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}></Text>
                </View>
              </View>
            </>

            {/* total foundation estimate */}
            <>
              <View style={tableStyles.row}>
                <Text style={tableStyles.columnSubHeader}>Total:</Text>
              </View>

              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Total Dry Concrete Volume
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {totalFoundationEstimate.totalVolume}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Total Dry Sand Volume
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {totalFoundationEstimate.totalSandVolume}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Total Dry Cement Volume
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {totalFoundationEstimate.totalCementVolume}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Total Dry Gravel Volume
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {totalFoundationEstimate.totalGravelVolume}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Total Number of 12m rods
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {totalFoundationEstimate.totalRods}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}></Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Total Number of blocks
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {wallEstimate.numberOfBlocks}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}></Text>
                </View>
              </View>
            </>
          </>
          {/* ======= Elevation ======= */}
          <>
            <View style={tableStyles.row}>
              <Text style={tableStyles.columnHeaderSingle}>Elevation</Text>
            </View>
            <Line />

            <>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>Wet Volume of Wall</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {elevationEstimate.totalBlockVolume}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>Dry Volume of Mortar</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {elevationEstimate.dryMortarVol}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {elevationEstimate.sandVol}
                  </Text>
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
                  <Text style={tableStyles.cell}>
                    {elevationEstimate.cementVol}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>m³</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>Cement Weight</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {elevationEstimate.cementWeightValue}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>Kg</Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>
                    Number of Cement Bags
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {elevationEstimate.numCementBags}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}></Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>Number of blocks</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {elevationEstimate.blockNumber}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}></Text>
                </View>
              </View>
              <View style={tableStyles.row}>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cellLeft}>Total Block Cost</Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>
                    {elevationEstimate.totalBlockCost}
                  </Text>
                </View>
                <View style={tableStyles.column}>
                  <Text style={tableStyles.cell}>FCFA</Text>
                </View>
              </View>
            </>
          </>
          {/* ======= Roofing ======= */}
          <>
            <View style={tableStyles.row}>
              <Text style={tableStyles.columnHeaderSingle}>Roofing</Text>
            </View>
          </>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleHouse;
