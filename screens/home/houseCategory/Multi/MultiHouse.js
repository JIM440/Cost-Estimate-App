import React, { useState } from 'react';
import {
  View,
  Picker,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Print from 'expo-print';
import { WebView } from 'react-native-webview';

import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import tableStyles from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/Button';
import TextInputTitle from '../../../../components/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import { primary_color } from '../../../../styles/colors';
import ButtonOutlined from '../../../../components/ButtonOutlined';

const SingleHouse = () => {
  const [step, setStep] = useState(1);
  const [outputTab, setOutputTab] = useState('All');

  const [deckingType, setDeckingType] = useState('');
  const [floorNumber, setFloorNumber] = useState(1);

  // //  //  //  //foundation states
  const [pricePerBlock, setPricePerBlock] = useState('');
  const [pricePerM3, setPricePerM3] = useState('');
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
  // floor 1 // /// // // //
  const [elevationEstimate, setElevationEstimate] = useState({});
  const [elevationWallLength, setElevationWallLength] = useState('');
  const [elevationWallWidth, setelevationWallWidth] = useState('');
  const [elevationWallHeight, setelevationWallHeight] = useState('');
  const [elevationWBlockLength, setelevationWallBlockLength] = useState('');
  const [elevationWallBlockWidth, setelevationWallBlockWidth] = useState('');
  const [elevationWallBlockHeight, setelevationWallBlockHeight] = useState('');
  const [elevationWallSubtractArea, setelevationWallSubtractArea] =
    useState('');
  const [elPricePerM3, setElPricePerM3] = useState('');

  const [blockPrice, setBlockPrice] = useState('');
  const [elevationBeamLength, setElevationBeamLength] = useState('');
  const [elevationBeamWidth, setelevationBeamWidth] = useState('');
  const [elevationBeamHeight, setelevationBeamHeight] = useState('');
  const [elevationNumRodsPerBeam, setelevationNumberRodsPerBeam] = useState('');
  // Beam
  const [elevationColumnLength, setElevationColumnLength] = useState('');
  const [elevationColumnWidth, setelevationColumnWidth] = useState('');
  const [elevationColumnHeight, setelevationColumnHeight] = useState('');
  const [elevationNumberRodsPerColumn, setelevationNumberRodsPerColumn] =
    useState('');
  const [elevationColumnNumber, setelevationColumnNumber] = useState('');
  // floor 2 // /// // // //
  const [elevationEstimate2, setElevationEstimate2] = useState({
    dryMortarVol: '',
    beamdryVolume: '',
    columndryVolume: '',
    dryConcreteVolume: '',
    totalSandVol: '',
    totalCementVol: '',
    totalGravelVol: '',
    blockNumber: '',
    totalBlockCost: '',
    totalEleRods: '',
  });

  const [elevationWallLength2, setElevationWallLength2] = useState('');
  const [elevationWallWidth2, setelevationWallWidth2] = useState('');
  const [elevationWallHeight2, setelevationWallHeight2] = useState('');
  const [elevationWBlockLength2, setelevationWallBlockLength2] = useState('');
  const [elevationWallBlockWidth2, setelevationWallBlockWidth2] = useState('');
  const [elevationWallBlockHeight2, setelevationWallBlockHeight2] =
    useState('');
  const [elevationWallSubtractArea2, setelevationWallSubtractArea2] =
    useState('');
  const [blockPrice2, setBlockPrice2] = useState('');
  const [elPricePerM32, setElPricePerM32] = useState('');
  const [elevationBeamLength2, setElevationBeamLength2] = useState('');
  const [elevationBeamWidth2, setelevationBeamWidth2] = useState('');
  const [elevationBeamHeight2, setelevationBeamHeight2] = useState('');
  const [elevationNumRodsPerBeam2, setelevationNumberRodsPerBeam2] =
    useState('');
  // Beam
  const [elevationColumnLength2, setElevationColumnLength2] = useState('');
  const [elevationColumnWidth2, setelevationColumnWidth2] = useState('');
  const [elevationColumnHeight2, setelevationColumnHeight2] = useState('');
  const [elevationNumberRodsPerColumn2, setelevationNumberRodsPerColumn2] =
    useState('');
  const [elevationColumnNumber2, setelevationColumnNumber2] = useState('');

  // // // // // // // Roofing States
  const [houseLength, setHouseLength] = useState('');
  const [houseWidth, setHouseWidth] = useState('');
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const [span, setSpan] = useState('');
  const [roofingEstimate, setRoofingEstimate] = useState(null);

  // // // // // // // deckig - rc slab
  const [RCSLabLength, setRCSLabLength] = useState('');
  const [RCSLabWidth, setRCSLabWidth] = useState('');
  const [RCSLabHeight, setRCSLabHeight] = useState('');
  const [RCSLabRodSpacing, setRCSLabRodSpacing] = useState('');
  const [RCSlabEstimate, setRCSlabEstimate] = useState({
    concreteVolume: '',
    num12mRods: '',
    dryVol: '',
    sandVol: '',
    cementVol: '',
    gravelVol: '',
    numBagsCement: '',
  });

  // // // // // // // // decking - hollow block slab
  const [HBSlabLength, setHBSlabLength] = useState('');
  const [HBSlabWidth, setHBSlabWidth] = useState('');
  const [HBSlabThickness, setHBSlabThickness] = useState('');
  const [HBSlabSpan, setHBSlabSpan] = useState('');
  const [HBSlabBlockLength, setHBSlabBlockLength] = useState('');
  const [HBSlabBlockWidth, setHBSlabBlockWidth] = useState('');
  const [HBSlabEstimate, setHBSlabEstimate] = useState({
    concreteVolume: '',
    numBlocks: '',
    num12mRods: '',
    dryVol: '',
    sandVol: '',
    cementVol: '',
    gravelVol: '',
    numBagsCement: '',
  });

  const HBEstimate = () => {
    const areaOfSlab = parseInt(HBSlabLength) * parseInt(HBSlabWidth);
    const areaOfBlock =
      parseInt(HBSlabBlockLength) * parseInt(HBSlabBlockWidth);

    const numBlocks = Math.ceil(areaOfSlab / areaOfBlock);
    const concreteVolume = areaOfSlab * 0.004; // Convert to cubic meters (0.4 cm to meters)

    const numRods = Math.ceil(
      parseInt(HBSlabSpan) / parseInt(HBSlabBlockWidth)
    );
    const num12mRods = Math.ceil((numRods * parseInt(HBSlabWidth)) / 12); // Assuming rods are 12 meters long

    const dryVol = concreteVolume * 1.54; // Dry volume of concrete
    const gravelVol = dryVol * 0.25; // Dry volume of gravel

    // Calculate volumes based on ratio 1:1:2 (cement:gravel:sand)
    const cementVol = dryVol * 0.25;
    const sandVol = cementVol * 0.5;

    // Calculate number of bags of cement
    const densityOfCement = 1440; // Density of cement in kg/m³
    const numBagsCement = Math.ceil((cementVol * densityOfCement) / 50); // Assuming 1 bag = 50 kg

    const estimatedData = {
      concreteVolume: concreteVolume.toFixed(2), // Two decimal places
      numRods: numRods,
      num12mRods: num12mRods,
      numBlocks: numBlocks,
      dryVol: dryVol.toFixed(2),
      sandVol: sandVol.toFixed(2),
      cementVol: cementVol.toFixed(2),
      gravelVol: gravelVol.toFixed(2),
      numBagsCement: numBagsCement,
    };

    setHBSlabEstimate(estimatedData);
  };

  const RCEstimate = () => {
    const areaOfSlab = parseInt(RCSLabLength) * parseInt(RCSLabWidth);
    const concreteVolume = areaOfSlab * parseFloat(RCSLabHeight);

    const numRodsX = Math.ceil(
      parseInt(RCSLabLength) / parseInt(RCSLabRodSpacing)
    );
    const num12mRodsX = Math.ceil((numRodsX * parseInt(RCSLabWidth)) / 12);

    const numRodsY = Math.ceil(
      parseInt(RCSLabWidth) / parseInt(RCSLabRodSpacing)
    );
    const num12mRodsY = Math.ceil((numRodsY * parseInt(RCSLabWidth)) / 12);

    const num12mRods = num12mRodsX + num12mRodsY;

    const dryVol = concreteVolume * 1.54; // Dry volume of concrete
    const gravelVol = dryVol * 0.25; // Dry volume of gravel

    // Calculate volumes based on ratio 1:1:2 (cement:gravel:sand)
    const cementVol = dryVol * 0.25;
    const sandVol = cementVol * 0.5;

    // Calculate number of bags of cement
    const densityOfCement = 1440; // Density of cement in kg/m³
    const numBagsCement = Math.ceil((cementVol * densityOfCement) / 50); // Assuming 1 bag = 50 kg

    const estimatedData = {
      concreteVolume: concreteVolume.toFixed(2), // Two decimal places
      num12mRods: num12mRods,
      dryVol: dryVol.toFixed(2),
      sandVol: sandVol.toFixed(2),
      cementVol: cementVol.toFixed(2),
      gravelVol: gravelVol.toFixed(2),
      numBagsCement: numBagsCement,
    };

    setRCSlabEstimate(estimatedData);
  };

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
    CalculateElevation2();
    calculateRoofingEstimate();

    if (deckingType === 'rcSlab') {
      RCEstimate();
    }
    if (deckingType === 'hollowSlab') {
      HBEstimate();
    }

    const totalDryConcreteVolume = (
      footingEstimate.dryVolume +
      columnEstimate.dryVolume +
      beamEstimate.dryVolume
    ).toFixed(2);
    const totalDryMortarVolume = wallEstimate.dryVolume;
    const totalDrySandVolFromMortarVolume = wallEstimate.sandVolume;
    const totalDryCementFromMortarVolume = wallEstimate.cementVolume;
    const totalSandConcreteVolume = (
      footingEstimate.sandVolume +
      columnEstimate.sandVolume +
      beamEstimate.sandVolume
    ).toFixed(2);
    const totalCementConcreteVolume = (
      footingEstimate.cementVolume +
      columnEstimate.cementVolume +
      beamEstimate.cementVolume
    ).toFixed(2);
    const totalGravelConcreteVolume = (
      footingEstimate.gravelVolume +
      columnEstimate.gravelVolume +
      beamEstimate.gravelVolume
    ).toFixed(2);
    const totalRods = (
      footingEstimate.totalRods +
      columnEstimate.totalRods +
      beamEstimate.totalRods
    ).toFixed(2);
    const totalPricePerM3 = (pricePerM3 * totalDryConcreteVolume).toFixed(2);

    setTotalFoundationEstimate({
      totalDryConcreteVolume,
      totalSandConcreteVolume,
      totalCementConcreteVolume,
      totalGravelConcreteVolume,
      totalDryMortarVolume,
      totalDrySandVolFromMortarVolume,
      totalDryCementFromMortarVolume,
      totalRods,
      totalPricePerM3,
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
    const columnnumber = parseFloat(elevationColumnNumber);

    const columnvolume =
      columnlength * columnwidth * columnheight * columnnumber; // Wet volume
    const columndryVolume = (columnvolume * 1.54).toFixed(2);
    const columnsandVolume = columndryVolume * (1 / 4);
    const columncementVolume = columndryVolume * (1 / 4);
    const columngravelVolume = columndryVolume * (2 / 4);

    const rodsPerColumn = parseFloat(elevationNumberRodsPerColumn);

    const totalcolumnRods = (columnnumber * rodsPerColumn * columnheight) / 12;

    // elevation beams
    const beamlength = parseFloat(elevationBeamLength);
    const beamwidth = parseFloat(elevationBeamWidth);
    const beamheight = parseFloat(elevationBeamHeight);

    const beamvolume = beamlength * beamwidth * beamheight; // Wet volume
    const beamdryVolume = (beamvolume * 1.54).toFixed(2);
    const beamsandVolume = beamdryVolume * (1 / 4);
    const beamcementVolume = beamdryVolume * (1 / 4);
    const beamgravelVolume = beamdryVolume * (2 / 4);

    // rods per beam
    const rodsPerBeam = parseFloat(elevationNumRodsPerBeam);
    const totalBeamRods = (rodsPerBeam * beamlength) / 12;

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
      (wallLength * wallHeight - subtractAreaValue) * wallWidth;

    const blockVolume = blockLengthValue * blockWidthValue * blockHeightValue;
    const totalBlockVolume = wallVolumeValue;
    const blockNumber = Math.ceil(totalBlockVolume / blockVolume);

    // Calculate dry mortar volume
    const dryMortarVol = (totalBlockVolume * 1.54).toFixed(2);

    // Calculate sand volume
    const dryMortarSandVol = ((dryMortarVol * 3) / 4).toFixed(2);

    // Calculate cement volume and weight, assuming density of cement as 1440 kg/m³
    const dryMortarCementVol = ((dryMortarVol * 1) / 4).toFixed(2);
    // const cementWeightValue = cementVol * 1440;

    // Calculate total cost
    const totalBlockCost = (blockNumber * blockPriceValue).toFixed(2);
    const concreteSandVol = (beamsandVolume + columnsandVolume).toFixed(2);
    const concreteCementVol = (beamcementVolume + columncementVolume).toFixed(
      2
    );
    const concreteGravelVol = (beamgravelVolume + columngravelVolume).toFixed(
      2
    );
    const dryConcreteVolume =
      parseFloat(beamdryVolume) + parseFloat(columndryVolume);
    const totalEleRods = totalBeamRods + totalcolumnRods;

    const ElPrice = parseFloat(elPricePerM3);
    const totalPricePerM3Elevation = ElPrice * dryConcreteVolume;
    console.log(ElPrice);
    console.log(dryConcreteVolume);
    console.log(totalPricePerM3Elevation);
    // Update state with results
    setElevationEstimate({
      dryMortarVol,
      dryMortarCementVol,
      dryMortarSandVol,
      beamdryVolume,
      columndryVolume,
      dryConcreteVolume,
      concreteSandVol,
      concreteCementVol,
      concreteGravelVol,
      blockNumber,
      totalBlockCost,
      totalEleRods,
      totalPricePerM3Elevation,
    });
  };

  const CalculateElevation2 = () => {
    // elevation colums
    const columnlength = parseFloat(elevationColumnLength2);
    const columnwidth = parseFloat(elevationColumnWidth2);
    const columnheight = parseFloat(elevationColumnHeight2);
    const columnnumber = parseInt(elevationColumnNumber2);

    const columnvolume =
      columnlength * columnwidth * columnheight * columnnumber; // Wet volume
    const columndryVolume = (columnvolume * 1.54).toFixed(2);
    const columnsandVolume = columndryVolume * (1 / 4);
    const columncementVolume = columndryVolume * (1 / 4);
    const columngravelVolume = columndryVolume * (2 / 4);

    const rodsPerColumn = parseFloat(elevationNumberRodsPerColumn2);
    const totalcolumnRods = (columnnumber * rodsPerColumn * columnheight) / 12;

    // elevation beams
    const beamlength = parseFloat(elevationBeamLength2);
    const beamwidth = parseFloat(elevationBeamWidth2);
    const beamheight = parseFloat(elevationBeamHeight2);

    const beamvolume = beamlength * beamwidth * beamheight; // Wet volume
    const beamdryVolume = (beamvolume * 1.54).toFixed(2);
    const beamsandVolume = beamdryVolume * (1 / 4);
    const beamcementVolume = beamdryVolume * (1 / 4);
    const beamgravelVolume = beamdryVolume * (2 / 4);

    // rods per beam
    const rodsPerBeam = parseFloat(elevationNumRodsPerBeam2);
    const totalBeamRods = (rodsPerBeam * beamlength) / 12;

    // elevation wall
    const wallLength = parseFloat(elevationWallLength2);
    const wallWidth = parseFloat(elevationWallWidth2);
    const wallHeight = parseFloat(elevationWallHeight2);
    const blockLengthValue = parseFloat(elevationWBlockLength2);
    const blockWidthValue = parseFloat(elevationWallBlockWidth2);
    const blockHeightValue = parseFloat(elevationWallBlockHeight2);
    const subtractAreaValue = parseFloat(elevationWallSubtractArea2);
    const blockPriceValue = parseFloat(blockPrice2);
    // Calculate wall volume
    const wallVolumeValue =
      (wallLength * wallHeight - subtractAreaValue) * wallWidth;

    const blockVolume = blockLengthValue * blockWidthValue * blockHeightValue;
    const totalBlockVolume = wallVolumeValue;
    const blockNumber = Math.ceil(totalBlockVolume / blockVolume);

    // Calculate dry mortar volume
    const dryMortarVol = (totalBlockVolume * 1.54).toFixed(2);

    // Calculate sand volume
    const dryMortarSandVol = ((dryMortarVol * 3) / 4).toFixed(2);

    // Calculate cement volume and weight, assuming density of cement as 1440 kg/m³
    const dryMortarCementVol = ((dryMortarVol * 1) / 4).toFixed(2);
    // Calculate total cost
    // Calculate total cost
    const totalBlockCost = (blockNumber * blockPriceValue).toFixed(2);
    const concreteSandVol = (beamsandVolume + columnsandVolume).toFixed(2);
    const concreteCementVol = (beamcementVolume + columncementVolume).toFixed(
      2
    );
    const concreteGravelVol = (beamgravelVolume + columngravelVolume).toFixed(
      2
    );
    const dryConcreteVolume =
      parseFloat(beamdryVolume) + parseFloat(columndryVolume);
    const totalEleRods = totalBeamRods + totalcolumnRods;

    const ElPrice = parseFloat(elPricePerM3);
    const totalPricePerM3Elevation = ElPrice * dryConcreteVolume;
    // Update state with results
    setElevationEstimate2({
      dryMortarVol,
      dryMortarCementVol,
      dryMortarSandVol,
      beamdryVolume,
      columndryVolume,
      dryConcreteVolume,
      concreteSandVol,
      concreteCementVol,
      concreteGravelVol,
      blockNumber,
      totalBlockCost,
      totalEleRods,
      totalPricePerM3Elevation,
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
    if (step === 4) {
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
          </style>
        </head>
        <body>
          <h2>Roofing Estimate</h2>
          <table>
            <tr>
              <td>Number of Ceiling Boards</td>
              <td>${roofingEstimate.numberOfCeilingBoards}</td>
            </tr>
            <tr>
              <td>Number of Roofing Sheets</td>
              <td>${roofingEstimate.numberOfRoofingSheets}</td>
            </tr>
            <tr>
              <td>Number of Purlins</td>
              <td>${roofingEstimate.numberOfPurlins}</td>
            </tr>
            <tr>
              <td>Number of Boards</td>
              <td>${roofingEstimate.numberOfBoards}</td>
            </tr>
          </table>

          <h2>Foundation and Elevation Estimate</h2>
          <table>
            <tr>
              <td>Material</td>
              <td>Quantity</td>
              <td>Unit</td>
            </tr>
            <tr>
              <td>Dry Volume of Mortar</td>
              <td>${
                wallEstimate.dryVolume + elevationEstimate.dryMortarVol
              }</td>
              <td>m³</td>
            </tr>
            <tr>
              <td>Dry Concrete Volume</td>
              <td>${
                totalFoundationEstimate.totalVolume +
                elevationEstimate.dryConcreteVolume
              }</td>
              <td>m³</td>
            </tr>
            <tr>
              <td>Dry Sand Volume</td>
              <td>${
                totalFoundationEstimate.totalSandVolume +
                elevationEstimate.totalSandVol
              }</td>
              <td>m³</td>
            </tr>
            <tr>
              <td>Dry Cement Volume</td>
              <td>${
                totalFoundationEstimate.totalCementVolume +
                elevationEstimate.totalCementVol
              }</td>
              <td>m³</td>
            </tr>
            <tr>
              <td>Dry Gravel Volume</td>
              <td>${
                totalFoundationEstimate.totalGravelVolume +
                elevationEstimate.totalGravelVol
              }</td>
              <td>m³</td>
            </tr>
            <tr>
              <td>Total Number of 12m Rods</td>
              <td>${
                totalFoundationEstimate.totalRods +
                elevationEstimate.totalEleRods
              }</td>
              <td></td>
            </tr>
            <tr>
              <td>Total Number of Blocks</td>
              <td>${
                wallEstimate.numberOfBlocks + elevationEstimate.blockNumber
              }</td>
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
      console.error('Failed to print:', error);
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
                  title="# Rods Per Footing"
                  value={numberRodsPerFooting}
                  onChange={(value) => {
                    setNumberRodsPerFooting(value);
                  }}
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
                  title="# Rods Per Column"
                  value={numberRodsPerColumn}
                  onChange={(value) => {
                    setNumberRodsPerColumn(value);
                  }}
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
                  placeholder="Enter Value"
                  title="# Rods Per Beam"
                  value={numerRodsPerBeam}
                  onChange={(value) => {
                    setNumerRodsPerBeam(value);
                  }}
                />
              </View>
              <TextInputTitle
                placeholder="Enter value"
                title="Price per m³"
                value={pricePerM3}
                onChange={(value) => {
                  setPricePerM3(value);
                }}
              />
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
              <TextInputTitle
                style={inputStyles.twoColumnInput}
                placeholder="Enter Value"
                title="Price per Block"
                value={pricePerBlock}
                onChange={(value) => {
                  setPricePerBlock(value);
                }}
              />
            </>
            <ButtonPrimary title="Next" onPress={handleNext} />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={titleStyles.boldTitle}>Elevation</Text>
            <Text>Enter the inputs of floor 1 and floor 2</Text>
            <Line />

            <View style={styles.tabs}>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setFloorNumber(1)}
              >
                <Text
                  style={
                    floorNumber === 1 ? styles.activeTabText : styles.tabText
                  }
                >
                  Floor 1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setFloorNumber(2)}
              >
                <Text
                  style={
                    floorNumber === 2 ? styles.activeTabText : styles.tabText
                  }
                >
                  Floor 2
                </Text>
              </TouchableOpacity>
            </View>

            {floorNumber == 1 && (
              <>
                <Text style={titleStyles.boldTitle}>Floor 1</Text>
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
                <TextInputTitle
                  title="Price Per m³"
                  placeholder="Enter price"
                  value={elPricePerM3}
                  onChange={(text) => setElPricePerM3(text)}
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
            )}
            {floorNumber == 2 && (
              <>
                <Text style={titleStyles.boldTitle}>Floor 2</Text>
                <Text>Dimension of Wall</Text>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Length (m)"
                    placeholder="Enter length"
                    value={elevationWallLength2}
                    onChange={(text) => setElevationWallLength2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Width (m)"
                    placeholder="Enter width"
                    value={elevationWallWidth2}
                    onChange={(text) => setelevationWallWidth2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Height (m)"
                    placeholder="Enter height"
                    value={elevationWallHeight2}
                    onChange={(text) => setelevationWallHeight2(text)}
                  />
                </View>
                <Line />
                <Text>Dimension of Block</Text>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Length (m)"
                    placeholder="Enter length"
                    value={elevationWBlockLength2}
                    onChange={(text) => setelevationWallBlockLength2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Width (m)"
                    placeholder="Enter width"
                    value={elevationWallBlockWidth2}
                    onChange={(text) => setelevationWallBlockWidth2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Height (m)"
                    placeholder="Enter height"
                    value={elevationWallBlockHeight2}
                    onChange={(text) => setelevationWallBlockHeight2(text)}
                  />
                </View>
                <Line />

                <TextInputTitle
                  title="Subtract Area (m²)"
                  placeholder="Enter area"
                  value={elevationWallSubtractArea2}
                  onChange={(text) => setelevationWallSubtractArea2(text)}
                />

                <TextInputTitle
                  title="Price Per Block"
                  placeholder="Enter price"
                  value={blockPrice2}
                  onChange={(text) => setBlockPrice2(text)}
                />
                <TextInputTitle
                  title="Price Per m³"
                  placeholder="Enter price"
                  value={elPricePerM32}
                  onChange={(text) => setElPricePerM32(text)}
                />
                <Line />
                <Text>Dimension of Beam</Text>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Length (m)"
                    placeholder="Enter total beam length"
                    value={elevationBeamLength2}
                    onChange={(text) => setElevationBeamLength2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Width (m)"
                    placeholder="Enter width"
                    value={elevationBeamWidth2}
                    onChange={(text) => setelevationBeamWidth2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Thickness (m)"
                    placeholder="Enter height"
                    value={elevationBeamHeight2}
                    onChange={(text) => setelevationBeamHeight2(text)}
                  />
                </View>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    title="Number of rods per beam"
                    placeholder="Enter Value"
                    value={elevationNumRodsPerBeam2}
                    onChange={(text) => setelevationNumberRodsPerBeam2(text)}
                  />
                </View>
                <Line />
                <Text>Dimension of Columns</Text>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Length (m)"
                    placeholder="Enter length"
                    value={elevationColumnLength2}
                    onChange={(text) => setElevationColumnLength2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Width (m)"
                    placeholder="Enter width"
                    value={elevationColumnWidth2}
                    onChange={(text) => setelevationColumnWidth2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    title="Height (m)"
                    placeholder="Enter height"
                    value={elevationColumnHeight2}
                    onChange={(text) => setelevationColumnHeight2(text)}
                  />
                </View>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.twoColumnInput}
                    title="Number of Columns"
                    placeholder="Enter Value"
                    value={elevationColumnNumber2}
                    onChange={(text) => setelevationColumnNumber2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.twoColumnInput}
                    title="Number of rods per column"
                    placeholder="Enter Value"
                    value={elevationNumberRodsPerColumn2}
                    onChange={(text) => setelevationNumberRodsPerColumn2(text)}
                  />
                </View>
              </>
            )}
            <View style={styles.buttonContainer}>
              <ButtonOutlined title="Previous" onPress={handlePrevious} />
              <ButtonPrimary title="Next" onPress={handleNext} />
            </View>
          </View>
        );
      case 3:
        return (
          <>
            <Text style={{ marginBottom: 16 }}>
              Select Decking Type to fill in its inputs (only one can be chosen)
            </Text>

            <Picker
              selectedValue={deckingType}
              onValueChange={(itemValue) => setDeckingType(itemValue)}
              style={inputStyles.picker}
            >
              <Picker.Item label="Select Decking Type" value="" />
              <Picker.Item label="RC Slab" value="rcSlab" />
              <Picker.Item label="Hollow Block Slab" value="hollowSlab" />
            </Picker>

            {deckingType == 'rcSlab' && (
              <>
                <Text style={titleStyles.boldTitle}>RC Slab Estimate</Text>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    placeholder="Enter Length"
                    value={RCSLabLength}
                    title="Length (m)"
                    onChange={(text) => setRCSLabLength(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    placeholder="Enter Width"
                    value={RCSLabWidth}
                    title="Width (m)"
                    onChange={(text) => setRCSLabWidth(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    placeholder="Enter Thickness"
                    value={RCSLabHeight}
                    title="Thickness (m)"
                    onChange={(text) => setRCSLabHeight(text)}
                  />
                </View>
                <TextInputTitle
                  placeholder="Enter Spacing"
                  value={RCSLabRodSpacing}
                  title="Spacing between Rods (m)"
                  onChange={(text) => setRCSLabRodSpacing(text)}
                />
              </>
            )}
            {deckingType == 'hollowSlab' && (
              <>
                <Text style={titleStyles.boldTitle}>
                  Hollow Block Slab Estimate
                </Text>
                <Text style={titleStyles.title}>Slab Dimensions</Text>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    placeholder="Enter Length"
                    value={HBSlabLength}
                    title="Length (m)"
                    onChange={(text) => setHBSlabLength(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    placeholder="Enter Width"
                    value={HBSlabWidth}
                    title="Width (m)"
                    onChange={(text) => setHBSlabWidth(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.threeColumnInput}
                    placeholder="Enter Thickness"
                    value={HBSlabThickness}
                    title="Thickness (m)"
                    onChange={(text) => setHBSlabThickness(text)}
                  />
                </View>
                <Line />

                <Text style={titleStyles.title}>Block Dimensions</Text>
                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.twoColumnInput}
                    placeholder="Enter Length"
                    value={HBSlabBlockLength}
                    title="Length of Block (m)"
                    onChange={(text) => setHBSlabBlockLength(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.twoColumnInput}
                    placeholder="Enter Width"
                    value={HBSlabBlockWidth}
                    title="Width of Block (m)"
                    onChange={(text) => setHBSlabBlockWidth(text)}
                  />
                </View>
                <TextInputTitle
                  placeholder="Enter Span"
                  value={HBSlabSpan}
                  title="Span between Rods (m)"
                  onChange={(text) => setHBSlabSpan(text)}
                />
              </>
            )}

            <View style={styles.buttonContainer}>
              <ButtonOutlined title="Previous" onPress={handlePrevious} />
              {deckingType === '' ? (
                ''
              ) : (
                <ButtonPrimary title="Next" onPress={handleNext} />
              )}
            </View>
          </>
        );
      case 4:
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
      case 5:
        return (
          <View>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setOutputTab('All')}
              >
                <Text
                  style={
                    outputTab === 'All' ? styles.activeTabText : styles.tabText
                  }
                >
                  All
                </Text>
              </TouchableOpacity>
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
                onPress={() => setOutputTab('DeckingOutput')}
              >
                <Text
                  style={
                    outputTab === 'DeckingOutput'
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  Decking
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
                /* ======= Foundation Output ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={tableStyles.columnHeaderSingle}>
                      Foundation Outputs
                    </Text>
                  </View>
                  {/* Row 1 */}
                  <>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Total Dry Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {totalFoundationEstimate.totalDryConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Sand Volume from Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {totalFoundationEstimate.totalSandConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Cement Volume from Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {totalFoundationEstimate.totalCementConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Gravel Volume from Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {totalFoundationEstimate.totalGravelConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Dry Mortar Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {totalFoundationEstimate.totalDryMortarVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Sand Volume from Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {
                            totalFoundationEstimate.totalDrySandVolFromMortarVolume
                          }
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Cement Volume from Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {
                            totalFoundationEstimate.totalDryCementFromMortarVolume
                          }
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Total Price Per m³
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {totalFoundationEstimate.totalPricePerM3}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>FCFA</Text>
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
                        <Text style={tableStyles.cell}>Rods</Text>
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
                        <Text style={tableStyles.cell}>Blocks</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Price For Blocks{' '}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {wallEstimate.numberOfBlocks * pricePerBlock}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>FCFA</Text>
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
                      Elevation Outputs
                    </Text>
                  </View>
                  <>
                    <View style={tableStyles.row}>
                      <Text style={tableStyles.columnSubHeader}>Floor 1:</Text>
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
                            Cement Volume from Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.dryMortarCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Sand Volume from Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.dryMortarSandVol}
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
                            Column Dry Concrete Volume
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
                          <Text style={tableStyles.cellLeft}>
                            Sand Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.concreteSandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Cement Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.concreteCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Gravel Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.concreteGravelVol}
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
                          <Text style={tableStyles.cell}>Blocks</Text>
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
                            Total Price Per m³
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate.totalPricePerM3Elevation}
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
                            {elevationEstimate.totalEleRods.toFixed(2)}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Rods</Text>
                        </View>
                      </View>
                    </>
                  </>

                  <>
                    <View style={tableStyles.row}>
                      <Text style={tableStyles.columnSubHeader}>Floor 2:</Text>
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
                            {elevationEstimate2.dryMortarVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Cement Volume from Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate2.dryMortarCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Sand Volume from Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate2.dryMortarSandVol}
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
                            {elevationEstimate2.beamdryVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Column Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate2.columndryVolume}
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
                            {elevationEstimate2.dryConcreteVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Sand Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate2.concreteSandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Cement Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate2.concreteCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Gravel Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate2.concreteGravelVol}
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
                            {elevationEstimate2.blockNumber}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Blocks</Text>
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
                            {elevationEstimate2.totalBlockCost}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>FCFA</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cellLeft}>
                            Total Price Per m³
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {elevationEstimate2.totalPricePerM3Elevation}
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
                            {elevationEstimate2.totalEleRods.toFixed(2)}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Rods</Text>
                        </View>
                      </View>
                    </>
                  </>
                </>
              )}
              {outputTab === 'DeckingOutput' && (
                <>
                  {deckingType === 'rcSlab' && (
                    <>
                      <View style={tableStyles.row}>
                        <Text style={tableStyles.columnHeaderSingle}>
                          RC Slab Outputs
                        </Text>
                      </View>
                      {/* Row 1: Material */}
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

                      {/* Row 2: Dry Volume of Concrete */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Dry Volume of Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {RCSlabEstimate.dryVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>

                      {/* Row 3: Dry Volume of Sand */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Dry Volume of Sand
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {RCSlabEstimate.sandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>

                      {/* Row 4: Dry Volume of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Dry Volume of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {RCSlabEstimate.cementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>

                      {/* Row 5: Dry Volume of Gravel */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Dry Volume of Gravel
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {RCSlabEstimate.gravelVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>

                      {/* Row 6: Number of Bags of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Number of Bags of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {RCSlabEstimate.numBagsCement}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Bags</Text>
                        </View>
                      </View>

                      {/* Row 7: Number of Rods */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Number of Rods</Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {RCSlabEstimate.num12mRods}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Rods</Text>
                        </View>
                      </View>
                    </>
                  )}
                  {deckingType === 'hollowSlab' && (
                    <>
                      <View style={tableStyles.row}>
                        <Text style={tableStyles.columnHeaderSingle}>
                          Hollow Block Slab Outputs
                        </Text>
                      </View>
                      {/* Row 1: Material */}
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

                      {/* Row 2: Dry Volume of Concrete */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Dry Volume of Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {HBSlabEstimate.dryVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>

                      {/* Row 3: Dry Volume of Sand */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Dry Volume of Sand
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {HBSlabEstimate.sandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>

                      {/* Row 4: Dry Volume of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Dry Volume of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {HBSlabEstimate.cementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>

                      {/* Row 5: Dry Volume of Gravel */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Dry Volume of Gravel
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {HBSlabEstimate.gravelVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>m³</Text>
                        </View>
                      </View>

                      {/* Row 6: Number of Bags of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Number of Bags of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {HBSlabEstimate.numBagsCement}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}></Text>
                        </View>
                      </View>

                      {/* Row 7: Number of Bags of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            Number of Bags of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {HBSlabEstimate.numBlocks}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Bags</Text>
                        </View>
                      </View>

                      {/* Row 8: Number of Rods */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Number of Rods</Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>
                            {HBSlabEstimate.num12mRods}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={tableStyles.cell}>Rods</Text>
                        </View>
                      </View>
                    </>
                  )}
                </>
              )}
              {outputTab === 'RoofingOutput' && (
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
                          Number of Ceiling Boards
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {roofingEstimate.numberOfCeilingBoards}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>Boards</Text>
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
                        <Text style={tableStyles.cell}>Sheets</Text>
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
                        <Text style={tableStyles.cell}>Purlins</Text>
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
                        <Text style={tableStyles.cell}>Boards</Text>
                      </View>
                    </View>
                  </>
                </>
              )}
              {outputTab === 'All' && (
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
                  {/* Foundation */}
                  <>
                    <View style={tableStyles.row}>
                      <Text style={tableStyles.columnSubHeader}>
                        Foundation:
                      </Text>
                    </View>

                    <>
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
                  {/* Elevation */}
                  <>
                    <View style={tableStyles.row}>
                      <Text style={tableStyles.columnSubHeader}>Elevation</Text>
                    </View>

                    <View style={tableStyles.row}>
                      <Text style={tableStyles.columnSubHeader}>Floor 1:</Text>
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
                  <>
                    <View style={tableStyles.row}>
                      <Text style={tableStyles.columnSubHeader}>Floor 2:</Text>
                    </View>

                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>
                          Dry Volume of Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>
                          {elevationEstimate2.dryMortarVol}
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
                          {elevationEstimate2.beamdryVolume}
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
                          {elevationEstimate2.columndryVolume}
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
                          {elevationEstimate2.dryConcreteVolume}
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
                          {elevationEstimate2.totalSandVol}
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
                          {elevationEstimate2.totalCementVol}
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
                          {elevationEstimate2.totalGravelVol}
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
                          {elevationEstimate2.blockNumber}
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
                          {elevationEstimate2.totalBlockCost}
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
                          {elevationEstimate2.totalEleRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>FCFA</Text>
                      </View>
                    </View>
                  </>
                  {/* Decking */}
                  <>
                    <View style={tableStyles.row}>
                      <Text style={tableStyles.columnSubHeader}>
                        Decking: {deckingType === 'rcSlab' && 'RC Slab'}{' '}
                        {deckingType === 'hollowSlab' && 'Hollow Block Slab'}
                      </Text>
                    </View>

                    <>
                      {deckingType === 'rcSlab' && (
                        <>
                          {/* Row 2: Dry Volume of Concrete */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Dry Volume of Concrete
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {RCSlabEstimate.dryVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>m³</Text>
                            </View>
                          </View>

                          {/* Row 3: Dry Volume of Sand */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Dry Volume of Sand
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {RCSlabEstimate.sandVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>m³</Text>
                            </View>
                          </View>

                          {/* Row 4: Dry Volume of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Dry Volume of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {RCSlabEstimate.cementVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>m³</Text>
                            </View>
                          </View>

                          {/* Row 5: Dry Volume of Gravel */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Dry Volume of Gravel
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {RCSlabEstimate.gravelVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>m³</Text>
                            </View>
                          </View>

                          {/* Row 6: Number of Bags of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Number of Bags of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {RCSlabEstimate.numBagsCement}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}></Text>
                            </View>
                          </View>

                          {/* Row 7: Number of Rods */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Number of Rods
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {RCSlabEstimate.num12mRods}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}></Text>
                            </View>
                          </View>
                        </>
                      )}
                      {deckingType === 'hollowSlab' && (
                        <>
                          {/* Row 2: Dry Volume of Concrete */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Dry Volume of Concrete
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {HBSlabEstimate.dryVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>m³</Text>
                            </View>
                          </View>

                          {/* Row 3: Dry Volume of Sand */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Dry Volume of Sand
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {HBSlabEstimate.sandVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>m³</Text>
                            </View>
                          </View>

                          {/* Row 4: Dry Volume of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Dry Volume of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {HBSlabEstimate.cementVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>m³</Text>
                            </View>
                          </View>

                          {/* Row 5: Dry Volume of Gravel */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Dry Volume of Gravel
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {HBSlabEstimate.gravelVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>m³</Text>
                            </View>
                          </View>

                          {/* Row 6: Number of Bags of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Number of Bags of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {HBSlabEstimate.numBagsCement}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}></Text>
                            </View>
                          </View>

                          {/* Row 7: Number of Bags of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Number of Bags of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {HBSlabEstimate.numBlocks}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}></Text>
                            </View>
                          </View>

                          {/* Row 8: Number of Rods */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                Number of Rods
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}>
                                {HBSlabEstimate.num12mRods}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={tableStyles.cell}></Text>
                            </View>
                          </View>
                        </>
                      )}
                    </>
                  </>
                  {/* Roofing */}
                  <>
                    <View style={tableStyles.row}>
                      <Text style={tableStyles.columnSubHeader}>Roofing:</Text>
                    </View>
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
                        <Text style={tableStyles.cell}>Boards</Text>
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
                        <Text style={tableStyles.cell}>Sheets</Text>
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
                        <Text style={tableStyles.cell}>Purlins</Text>
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
                        <Text style={tableStyles.cell}>Boards</Text>
                      </View>
                    </View>
                  </>
                </View>
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
    <ScrollView style={containerStyles.scrollContainer}>
      <View style={containerStyles.container}>
        <ProgressBar step={step} steps={5} />
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
