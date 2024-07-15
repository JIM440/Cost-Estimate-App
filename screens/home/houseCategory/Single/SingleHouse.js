import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Print from "expo-print";
import { WebView } from "react-native-webview";

import { Line, containerStyles, titleStyles } from "../../../../styles/utility";
import tableStyles from "../../../../styles/components/table";
import ButtonPrimary from "../../../../components/Button";
import TextInputTitle from "../../../../components/InputTitle";
import { inputStyles } from "../../../../styles/components/inputStyles";
import { primary_color } from "../../../../styles/colors";
import ButtonOutlined from "../../../../components/ButtonOutlined";

const SingleHouse = () => {
  const [step, setStep] = useState(1);
  const [outputTab, setOutputTab] = useState("All");

  // //  //  //  //foundation states
  // Footing
  const [footingLength, setFootingLength] = useState("");
  const [footingWidth, setFootingWidth] = useState("");
  const [footingThickness, setFootingThickness] = useState("");
  const [numberFootings, setNumberFootings] = useState("");
  const [numberRodsPerFooting, setNumberRodsPerFooting] = useState("");
  // Column
  const [columnLength, setColumnLength] = useState("");
  const [columnWidth, setColumnWidth] = useState("");
  const [columnHeight, setColumnHeight] = useState("");
  const [numberColumns, setNumberColumns] = useState("");
  const [numberRodsPerColumn, setNumberRodsPerColumn] = useState("");
  // Beam
  const [beamLength, setBeamLength] = useState("");
  const [beamWidth, setBeamWidth] = useState("");
  const [beamHeight, setBeamHeight] = useState("");
  const [numerRodsPerBeam, setNumerRodsPerBeam] = useState("");
  // Wall
  const [wallLength, setWallLength] = useState("");
  const [wallWidth, setWallWidth] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [blockLength, setBlockLength] = useState("");
  const [blockWidth, setBlockWidth] = useState("");
  const [blockHeight, setBlockHeight] = useState("");

  // output for foundation estimates state
  const [footingEstimate, setFootingEstimate] = useState({});
  const [columnEstimate, setColumnEstimate] = useState({});
  const [beamEstimate, setBeamEstimate] = useState({});
  const [wallEstimate, setWallEstimate] = useState({});
  const [totalFoundationEstimate, setTotalFoundationEstimate] = useState({});

  // //  //  //  //elevation states
  const [elevationEstimate, setElevationEstimate] = useState({});
  const [elevationWallLength, setElevationWallLength] = useState("");
  const [elevationWallWidth, setelevationWallWidth] = useState("");
  const [elevationWallHeight, setelevationWallHeight] = useState("");
  const [elevationWBlockLength, setelevationWallBlockLength] = useState("");
  const [elevationWallBlockWidth, setelevationWallBlockWidth] = useState("");
  const [elevationWallBlockHeight, setelevationWallBlockHeight] = useState("");
  const [elevationWallSubtractArea, setelevationWallSubtractArea] =
    useState("");
  const [blockPrice, setBlockPrice] = useState("");
  const [elevationBeamLength, setElevationBeamLength] = useState("");
  const [elevationBeamWidth, setelevationBeamWidth] = useState("");
  const [elevationBeamHeight, setelevationBeamHeight] = useState("");
  const [elevationNumRodsPerBeam, setelevationNumberRodsPerBeam] = useState("");
  // Beam
  const [elevationColumnLength, setElevationColumnLength] = useState("");
  const [elevationColumnWidth, setelevationColumnWidth] = useState("");
  const [elevationColumnHeight, setelevationColumnHeight] = useState("");
  const [elevationNumberRodsPerColumn, setelevationNumberRodsPerColumn] =
    useState("");
  const [elevationColumnNumber, setelevationColumnNumber] = useState("");

  // // // // // // // Roofing States
  const [houseLength, setHouseLength] = useState("");
  const [houseWidth, setHouseWidth] = useState("");
  const [rise, setRise] = useState("");
  const [run, setRun] = useState("");
  const [span, setSpan] = useState("");
  const [roofingEstimate, setRoofingEstimate] = useState(null);

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

    // number 12m rods needed per beam length
    const totalRods = (parseFloat(numerRodsPerBeam) * length) / 12;

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
    calculateRoofingEstimate();

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
    // elevation colums
    const columnlength = parseFloat(elevationColumnLength);
    const columnwidth = parseFloat(elevationColumnWidth);
    const columnheight = parseFloat(elevationColumnHeight);
    const columnnumber = parseInt(elevationColumnNumber);

    const columnvolume =
      columnlength * columnwidth * columnheight * columnnumber; // Wet volume
    const columndryVolume = columnvolume * 1.54;
    const columnsandVolume = columndryVolume * (2 / 4);
    const columncementVolume = columndryVolume * (1 / 4);
    const columngravelVolume = columndryVolume * (1 / 4);

    const rodsPerColumn = parseFloat(elevationNumberRodsPerColumn);
    const totalcolumnRods = (columnnumber * rodsPerColumn * columnlength) / 12;

    // elevation beams
    const beamlength = parseFloat(elevationBeamLength);
    const beamwidth = parseFloat(elevationBeamWidth);
    const beamheight = parseFloat(elevationBeamHeight);

    const beamvolume = beamlength * beamwidth * beamheight; // Wet volume
    const beamdryVolume = beamvolume * 1.54;
    const beamsandVolume = beamdryVolume * (2 / 4);
    const beamcementVolume = beamdryVolume * (1 / 4);
    const beamgravelVolume = beamdryVolume * (1 / 4);

    // rods per beam
    const rodsPerBeam = parseFloat(elevationNumRodsPerBeam);
    const totalBeamRods = rodsPerBeam * 4;

    // elevation wall
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
    const totalSandVol = sandVol + beamsandVolume + columnsandVolume;
    const totalCementVol = cementVol + beamcementVolume + columncementVolume;
    const totalGravelVol = beamgravelVolume + columngravelVolume;
    const dryConcreteVolume = beamdryVolume + columndryVolume;
    const totalEleRods = totalBeamRods + totalcolumnRods;

    // Update state with results
    setElevationEstimate({
      dryMortarVol,
      beamdryVolume,
      columndryVolume,
      dryConcreteVolume,
      totalSandVol,
      totalCementVol,
      totalGravelVol,
      blockNumber,
      totalBlockCost,
      totalEleRods,
    });
  };

  const calculateRoofingEstimate = () => {
    const L = parseFloat(houseLength);
    const W = parseFloat(houseWidth);
    const R = parseFloat(rise);
    const Ru = parseFloat(run);
    const S = parseFloat(span);

    const rafterLength = Math.sqrt(Math.pow(R, 2) + Math.pow(Ru, 2));
    const pitch = R / Ru;
    const pitchInDegrees = Math.atan(pitch) * (180 / Math.PI);
    const numberOfRafters = Math.ceil(L / S) + 1;
    const totalNumberOfRafters = numberOfRafters * rafterLength * 2;
    const numberOfRisers = Math.ceil(L / S) + 1;
    const totalNumberOfRisers = numberOfRisers * R * 2;
    const chaining = (W * L) / 4;
    const baseArea = W * L;
    const areaOfRoofing = baseArea / Math.cos(pitchInDegrees * (Math.PI / 180));
    const sheet = Math.ceil(areaOfRoofing / 30);
    const ceiling = Math.ceil(baseArea / 32);
    const purlin = Math.ceil((rafterLength * L) / 0.9);
    const boards = Math.ceil(
      totalNumberOfRafters + totalNumberOfRisers + chaining
    );

    setRoofingEstimate({
      numberOfCeilingBoards: ceiling,
      numberOfRoofingSheets: sheet,
      numberOfBoards: boards,
      numberOfPurlins: purlin,
    });
  };

  const handleNext = () => {
    if (step === 3) {
      calculateEstimates();
    }
    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleExport = async () => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 8px; }
          .header { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <!-- Total Outputs -->
        <h2>Total Outputs</h2>
        <table>
          <tr class="header">
            <th>Material</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
          <!-- Foundation Estimates -->
          <tr>
            <td>Total Dry Concrete Volume</td>
            <td>${totalFoundationEstimate.totalVolume}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Total Dry Sand Volume</td>
            <td>${totalFoundationEstimate.totalSandVolume}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Total Dry Cement Volume</td>
            <td>${totalFoundationEstimate.totalCementVolume}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Total Dry Gravel Volume</td>
            <td>${totalFoundationEstimate.totalGravelVolume}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Total Number of 12m Rods</td>
            <td>${totalFoundationEstimate.totalRods}</td>
            <td></td>
          </tr>
          <tr>
            <td>Total Number of Blocks</td>
            <td>${wallEstimate.numberOfBlocks}</td>
            <td></td>
          </tr>
          <!-- Elevation Estimates -->
          <tr>
            <td>Dry Volume of Mortar</td>
            <td>${elevationEstimate.dryMortarVol}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Beam Dry Concrete Volume</td>
            <td>${elevationEstimate.beamdryVolume}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Dry Column Concrete Volume</td>
            <td>${elevationEstimate.columndryVolume}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Total Dry Concrete Volume (Elevation)</td>
            <td>${elevationEstimate.dryConcreteVolume}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Sand Volume (Elevation)</td>
            <td>${elevationEstimate.totalSandVol}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Cement Volume (Elevation)</td>
            <td>${elevationEstimate.totalCementVol}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Gravel Volume (Elevation)</td>
            <td>${elevationEstimate.totalGravelVol}</td>
            <td>m³</td>
          </tr>
          <tr>
            <td>Number of Blocks (Elevation)</td>
            <td>${elevationEstimate.blockNumber}</td>
            <td></td>
          </tr>
          <tr>
            <td>Total Block Cost</td>
            <td>${elevationEstimate.totalBlockCost}</td>
            <td>FCFA</td>
          </tr>
          <tr>
            <td>Number of 12m Rods (Elevation)</td>
            <td>${elevationEstimate.totalEleRods}</td>
            <td>FCFA</td>
          </tr>
          <!-- Roofing Estimates -->
          <tr>
            <td>Number of Ceiling Boards</td>
            <td>${roofingEstimate.numberOfCeilingBoards}</td>
            <td></td>
          </tr>
          <tr>
            <td>Number of Roofing Sheets</td>
            <td>${roofingEstimate.numberOfRoofingSheets}</td>
            <td></td>
          </tr>
          <tr>
            <td>Number of Purlins</td>
            <td>${roofingEstimate.numberOfPurlins}</td>
            <td></td>
          </tr>
          <tr>
            <td>Number of Boards (Roofing)</td>
            <td>${roofingEstimate.numberOfBoards}</td>
            <td></td>
          </tr>
        </table>
      </body>
    </html>
    `;
    

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log(`PDF saved at: ${uri}`);
    } catch (error) {
      console.error("Failed to print:", error);
    }

    // Display a WebView to preview the content (optional)
    return <WebView source={{ html: htmlContent }} style={{ flex: 1 }} />;
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
              <Line />
              <Text>Dimension of Beam</Text>
              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Length (m)"
                  placeholder="Enter total beam length"
                  value={elevationBeamLength}
                  onChange={(text) => setElevationBeamLength(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Width (m)"
                  placeholder="Enter width"
                  value={elevationBeamWidth}
                  onChange={(text) => setelevationBeamWidth(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Thickness (m)"
                  placeholder="Enter height"
                  value={elevationBeamHeight}
                  onChange={(text) => setelevationBeamHeight(text)}
                />
              </View>

              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  title="Number of rods per beam"
                  placeholder="Enter Value"
                  value={elevationNumRodsPerBeam}
                  onChange={(text) => setelevationNumberRodsPerBeam(text)}
                />
              </View>
              <Line />
              <Text>Dimension of Columns</Text>
              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Length (m)"
                  placeholder="Enter length"
                  value={elevationColumnLength}
                  onChange={(text) => setElevationColumnLength(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Width (m)"
                  placeholder="Enter width"
                  value={elevationColumnWidth}
                  onChange={(text) => setelevationColumnWidth(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Height (m)"
                  placeholder="Enter height"
                  value={elevationColumnHeight}
                  onChange={(text) => setelevationColumnHeight(text)}
                />
              </View>
              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  style={inputStyles.twoColumnInput}
                  title="Number of Columns"
                  placeholder="Enter Value"
                  value={elevationColumnNumber}
                  onChange={(text) => setelevationColumnNumber(text)}
                />
                <TextInputTitle
                  style={inputStyles.twoColumnInput}
                  title="Number of rods per column"
                  placeholder="Enter Value"
                  value={elevationNumberRodsPerColumn}
                  onChange={(text) => setelevationNumberRodsPerColumn(text)}
                />
              </View>
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
            <>
              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  style={inputStyles.twoColumnInput}
                  title="House Length (m)"
                  placeholder="Enter length"
                  value={houseLength}
                  onChange={(text) => setHouseLength(text)}
                />
                <TextInputTitle
                  style={inputStyles.twoColumnInput}
                  title="House Width (m)"
                  placeholder="Enter width"
                  value={houseWidth}
                  onChange={(text) => setHouseWidth(text)}
                />
              </View>
              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Rise (m)"
                  placeholder="Enter rise"
                  value={rise}
                  onChange={(text) => setRise(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Run (m)"
                  placeholder="Enter run"
                  value={run}
                  onChange={(text) => setRun(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Span (m)"
                  placeholder="Enter span"
                  value={span}
                  onChange={(text) => setSpan(text)}
                />
              </View>
            </>
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
                onPress={() => setOutputTab("All")}
              >
                <Text
                  style={
                    outputTab === "All"
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setOutputTab("FoundationOutput")}
              >
                <Text
                  style={
                    outputTab === "FoundationOutput"
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  Foundation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setOutputTab("ElevationOutput")}
              >
                <Text
                  style={
                    outputTab === "ElevationOutput"
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  Elevation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setOutputTab("RoofingOutput")}
              >
                <Text
                  style={
                    outputTab === "RoofingOutput"
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  Roofing
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tableStyles.container}>
              {outputTab === "FoundationOutput" && (
                /* ======= Foundation ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>
                      Foundation Outputs
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
              {outputTab === "ElevationOutput" && (
                /* ======= Elevation ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>
                      Elevation Outputs
                    </Text>
                  </View>
                  <>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.columnHeaderLeft}>
                          Material
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.columnHeader}>Quantity</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.columnHeader}>Unit</Text>
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
                          Beam Dry Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {elevationEstimate.beamdryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Dry Column Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {elevationEstimate.columndryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Total Dry Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {elevationEstimate.dryConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>Sand Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {elevationEstimate.totalSandVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>Cement Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {elevationEstimate.totalCementVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>Gravel Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {elevationEstimate.totalGravelVol}
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
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Number of 12m Rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {elevationEstimate.totalEleRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>FCFA</Text>
                      </View>
                    </View>
                  </>
                </>
              )}
              {outputTab === "RoofingOutput" && (
                /* ======= Roofing ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>
                      Roofing Outputs
                    </Text>
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
                  <>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Number of Boards
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {roofingEstimate.numberOfCeilingBoards}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}></Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Number of Roofing Sheets
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {roofingEstimate.numberOfRoofingSheets}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}></Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Number of Purlins
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {roofingEstimate.numberOfPurlins}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}></Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Number of Boards
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {roofingEstimate.numberOfBoards}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}></Text>
                      </View>
                    </View>
                  </>
                </>
              )}
              {outputTab === "All" && (
                <View>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>
                      All Outputs
                    </Text>
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

                  <>
                    {/* total foundation estimate */}
                    <>
                      <View style={tableStyles.row}>
                        <Text style={tableStyles.columnSubHeader}>
                          Foundation:
                        </Text>
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
                    {/* Elevation */}
                    <>
                      <View style={tableStyles.row}>
                        <Text style={tableStyles.columnSubHeader}>
                          Elevation:
                        </Text>
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
                            Beam Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.beamdryVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Dry Column Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.columndryVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Total Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.dryConcreteVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>Sand Volume</Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.totalSandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Cement Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.totalCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Gravel Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.totalGravelVol}
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
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Number of 12m Rods
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.totalEleRods}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>FCFA</Text>
                        </View>
                      </View>
                    </>
                    {/* ======= Roofing ======= */}
                    <>
                      <View style={tableStyles.row}>
                        <Text style={tableStyles.columnSubHeader}>
                          Roofing:
                        </Text>
                      </View>
                      <>
                        <View style={tableStyles.row}>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cellLeft}>
                              Number of Boards
                            </Text>
                          </View>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cell}>
                              {roofingEstimate.numberOfCeilingBoards}
                            </Text>
                          </View>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cell}></Text>
                          </View>
                        </View>
                        <View style={tableStyles.row}>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cellLeft}>
                              Number of Roofing Sheets
                            </Text>
                          </View>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cell}>
                              {roofingEstimate.numberOfRoofingSheets}
                            </Text>
                          </View>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cell}></Text>
                          </View>
                        </View>
                        <View style={tableStyles.row}>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cellLeft}>
                              Number of Purlins
                            </Text>
                          </View>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cell}>
                              {roofingEstimate.numberOfPurlins}
                            </Text>
                          </View>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cell}></Text>
                          </View>
                        </View>
                        <View style={tableStyles.row}>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cellLeft}>
                              Number of Boards
                            </Text>
                          </View>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cell}>
                              {roofingEstimate.numberOfBoards}
                            </Text>
                          </View>
                          <View style={tableStyles.column}>
                            <Text style={tableStyles.cell}></Text>
                          </View>
                        </View>
                      </>
                    </>
                  </>

                  {/* 
                 ======= Foundation and elevation ======= 
                <>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>Total Outputs</Text>
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
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Dry Volume of Mortar
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {wallEstimate.dryVolume + elevationEstimate.dryMortarVol}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>m³</Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Dry Concrete Volume
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {totalFoundationEstimate.totalVolume + elevationEstimate.dryConcreteVolume}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>m³</Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Dry Sand Volume
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {totalFoundationEstimate.totalSandVolume + elevationEstimate.totalSandVol}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>m³</Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Dry Cement Volume
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {totalFoundationEstimate.totalCementVolume + elevationEstimate.totalCementVol}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>m³</Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Dry Gravel Volume
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {totalFoundationEstimate.totalGravelVolume + elevationEstimate.totalGravelVol}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>m³</Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Total Number of 12m Rods
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {totalFoundationEstimate.totalRods + elevationEstimate.totalEleRods}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}></Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Total Number of Blocks
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {wallEstimate.numberOfBlocks + elevationEstimate.blockNumber}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}></Text>
                    </View>
                  </View>
                </>
                 ======= Roofing ======= 
                <>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Number of Ceiling Boards
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {roofingEstimate.numberOfCeilingBoards}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}></Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Number of Roofing Sheets
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {roofingEstimate.numberOfRoofingSheets}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}></Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Number of Purlins
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {roofingEstimate.numberOfPurlins}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}></Text>
                    </View>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cellLeft}>
                        Number of Boards
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}>
                        {roofingEstimate.numberOfBoards}
                      </Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.cell}></Text>
                    </View>
                  </View>
                </> */}
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <ButtonOutlined title="Previous" onPress={handlePrevious} />
              <ButtonPrimary title="Export All" onPress={handleExport} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={containerStyles.scrollContainer}>
      <View style={containerStyles.container}>
      <ProgressBar step={step} steps={4} />
      {renderContent()}
      </View>
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
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  progressBarContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0df",
    borderRadius: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: primary_color,
    borderRadius: 5,
  },
  progressText: {
    marginTop: 5,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
  },
  tabText: {
    color: "#888",
    fontSize: 16,
  },
  activeTabText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SingleHouse;
