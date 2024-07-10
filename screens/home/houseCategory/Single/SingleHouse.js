import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import { primary_color } from '../../../../styles/colors';
import ButtonOutlined from '../../../../components/ButtonOutlined';

const SingleHouse = () => {
  const [step, setStep] = useState(1);
  const [outputTab, setOutputTab] = useState('FoundationOutput');
  const [foundationInput, setFoundationInput] = useState('');
  const [elevationInput, setElevationInput] = useState('');
  const [roofingInput, setRoofingInput] = useState('');

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

  const handleNext = () => {
    if (step === 3) {
      calculateEstimates();
    }
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleExport = () => {
    alert(
      `Exporting data:\nFoundation: ${foundationInput}\nElevation: ${elevationInput}\nRoofing: ${roofingInput}`
    );
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
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
            <ButtonPrimary title="Next" onPress={handleNext} />
          </View>
        );
      case 2:
        return (
          <View>
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
            <View style={styles.buttonContainer}>
              <ButtonOutlined title="Previous" onPress={handlePrevious} />
              <ButtonPrimary title="Next" onPress={handleNext} />
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={titleStyles.boldTitle}>Roofing</Text>
            <TextInput
              style={styles.input}
              value={roofingInput}
              onChangeText={setRoofingInput}
              placeholder="Enter roofing details"
            />
            <View style={styles.buttonContainer}>
              <ButtonOutlined title="Previous" onPress={handlePrevious} />
              <ButtonPrimary title="Next" onPress={handleNext} />
            </View>
          </View>
        );
      case 4:
        return (
          <View>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setOutputTab('FoundationOutput')}
              >
                <Text
                  style={
                    outputTab === 'FoundationOutput'
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  Foundation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setOutputTab('ElevationOutput')}
              >
                <Text
                  style={
                    outputTab === 'ElevationOutput'
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  Elevation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setOutputTab('RoofingOutput')}
              >
                <Text
                  style={
                    outputTab === 'RoofingOutput'
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  Roofing
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tableStyles.container}>
              {outputTab === 'FoundationOutput' && (
                /* ======= Foundation ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>
                      Foundation
                    </Text>
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
                        <Text style={tableStyles.cell}>
                          {footingEstimate.volume}
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Sand
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Cement
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {footingEstimate.cementVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Gravel
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Number of 12m rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {footingEstimate.totalRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}></Text>
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
                        <Text style={tableStyles.cell}>
                          {columnEstimate.volume}
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Sand
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Cement
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Gravel
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Number of 12m rods
                        </Text>
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
                        <Text style={tableStyles.cell}>
                          {beamEstimate.volume}
                        </Text>
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
                          {beamEstimate.dryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Sand
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Cement
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Gravel
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Number of 12m rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {beamEstimate.totalRods}
                        </Text>
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
                          Wet Volume of Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {wallEstimate.volume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {wallEstimate.dryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Sand
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Cement
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Number of blocks
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
              )}
              {outputTab === 'ElevationOutput' && (
                /* ======= Elevation ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>
                      Elevation
                    </Text>
                  </View>
                  <Line />

                  <>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Wet Volume of Wall
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Mortar
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Sand
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Cement
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Number of blocks
                        </Text>
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
                        <Text style={tableStyles.cellLeft}>
                          Total Block Cost
                        </Text>
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
              )}
              {outputTab === 'RoofingOutput' && (
                /* ======= Roofing ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>Roofing</Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <ButtonOutlined title="Previous" onPress={handlePrevious} />
              <ButtonPrimary title="Export" onPress={handleExport} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={containerStyles.container}>
      <ProgressBar step={step} steps={4} />
      {renderContent()}
    </ScrollView>
  );
};

const ProgressBar = ({ step, steps }) => {
  const progress = (step / steps) * 100;
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <View style={{ ...styles.progress, width: `${progress}%` }} />
      </View>
      <Text style={styles.progressText}>
        {step} / {steps}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0df',
    borderRadius: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: primary_color,
    borderRadius: 5,
  },
  progressText: {
    marginTop: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
  },
  tabText: {
    color: '#888',
    fontSize: 16,
  },
  activeTabText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SingleHouse;
