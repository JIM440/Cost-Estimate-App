// @ts-nocheck
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { createTableStyles } from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/buttons/Button';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import { useTheme } from '../../../../context/ThemeContext';
import { useLocale } from '../../../../context/LocaleContext';
import ButtonOutlined from '../../../../components/buttons/ButtonOutlined';
import { useProjects } from '../../../../context/ProjectsContext';
import FullHouseStepFooter from '../../../../components/home/FullHouseStepFooter';

type MultiHouseProps = {
  floors?: number;
  projectId?: string;
  onRegisterSave?: (fn: () => Promise<void>) => void;
};

function sanitizeForFilename(name: string): string {
  const s = name.trim().replace(/[/\\:*?"<>|]/g, '_').replace(/\s+/g, '_') || 'estimate';
  return s.slice(0, 100);
}

const MultiHouse: React.FC<MultiHouseProps> = ({ floors = 2, projectId, onRegisterSave }) => {
  const [step, setStep] = useState(1);
  const [outputTab, setOutputTab] = useState('All');
  const [exporting, setExporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [projectName, setProjectName] = useState('');
  const saveHandlerRef = useRef<() => Promise<void>>();
  const { projects, addProject, updateProject } = useProjects();
  const { colors } = useTheme();
  const { t } = useLocale();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const tableStyles = useMemo(() => createTableStyles(colors), [colors]);

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

  // Prefill from existing project when editing
  useEffect(() => {
    if (!projectId) return;
    const existing = projects.find((p) => p.id === projectId && p.type === 'multi-house');
    if (!existing) return;
    const inputs = existing.data?.inputs || {};
    setProjectName(existing.title || inputs.projectName || '');
  }, [projectId, projects]);

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
    // Simple validation: require key inputs for each step before moving on.
    if (step === 1) {
      if (!projectName.trim()) {
        alert(t('house.alert.projectName'));
        return;
      }
      if (!footingLength || !footingWidth || !footingThickness || !numberFootings) {
        alert(t('house.alert.footing'));
        return;
      }
      if (!columnLength || !columnWidth || !columnHeight || !numberColumns) {
        alert(t('house.alert.column'));
        return;
      }
    }
    if (step === 2) {
      if (!elevationWallLength || !elevationWallHeight || !elevationWallWidth) {
        alert(t('house.alert.elevationWall'));
        return;
      }
      if (!elevationWBlockLength || !elevationWallBlockWidth || !elevationWallBlockHeight) {
        alert(t('house.alert.elevationBlock'));
        return;
      }
    }
    if (step === 3) {
      if (!houseLength || !houseWidth || !rise || !run || !span) {
        alert(t('house.alert.roofing'));
        return;
      }
    }
    if (step === 4) {
      calculateEstimates();
    }
    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const buildExportHtml = () => {
    const defaultTitle =
      floors === 4
        ? t('projects.defaultTitle.four') || 'Four Storey House Estimate'
        : floors === 3
          ? t('projects.defaultTitle.three') || 'Three Storey House Estimate'
          : floors === 2
            ? t('projects.defaultTitle.two') || 'Two Storey House Estimate'
            : t('projects.defaultTitle.multi') || 'Multi Storey House Estimate';
    const projectTitle = projectName.trim() || defaultTitle;

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
          <h1>${projectTitle}</h1>
          <h2>${t('house.pdf.roofingEstimate')}</h2>
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

          <h2>${t('house.pdf.foundationElevationEstimate')}</h2>
          <table>
            <tr>
              <td>${t('house.pdf.material')}</td>
              <td>${t('house.pdf.quantity')}</td>
              <td>${t('house.pdf.unit')}</td>
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
          <h2>Key Input Dimensions</h2>
          <table>
            <tr>
              <th>Section</th>
              <th>Field</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Foundation - Footing</td>
              <td>Length / Width / Thickness / # Footings / # Rods per Footing</td>
              <td>${footingLength} / ${footingWidth} / ${footingThickness} / ${numberFootings} / ${numberRodsPerFooting}</td>
            </tr>
            <tr>
              <td>Foundation - Column</td>
              <td>Length / Width / Height / # Columns / # Rods per Column</td>
              <td>${columnLength} / ${columnWidth} / ${columnHeight} / ${numberColumns} / ${numberRodsPerColumn}</td>
            </tr>
            <tr>
              <td>Foundation - Beam</td>
              <td>Length / Width / Height / # Rods per Beam</td>
              <td>${beamLength} / ${beamWidth} / ${beamHeight} / ${numerRodsPerBeam}</td>
            </tr>
            <tr>
              <td>Foundation - Wall</td>
              <td>Length / Width / Height / Block (L×W×H) / Price per Block</td>
              <td>${wallLength} / ${wallWidth} / ${wallHeight} / ${blockLength}×${blockWidth}×${blockHeight} / ${pricePerBlock}</td>
            </tr>
            <tr>
              <td>Roofing</td>
              <td>House Length / Width / Rise / Run / Span</td>
              <td>${houseLength} / ${houseWidth} / ${rise} / ${run} / ${span}</td>
            </tr>
          </table>
        </body>
      </html>
    `;
    return htmlContent;
  };

  const validateForExportOrSave = () => {
    // Step 1: project name + foundation + columns
    if (!projectName.trim()) {
      alert(t('house.alert.projectName'));
      return false;
    }
    if (!footingLength || !footingWidth || !footingThickness || !numberFootings) {
      alert(t('house.alert.foundationExport'));
      return false;
    }
    if (!columnLength || !columnWidth || !columnHeight || !numberColumns) {
      alert(t('house.alert.column'));
      return false;
    }

    // Step 2: elevation walls + blocks
    if (!elevationWallLength || !elevationWallHeight || !elevationWallWidth) {
      alert(t('house.alert.elevationWall'));
      return false;
    }
    if (!elevationWBlockLength || !elevationWallBlockWidth || !elevationWallBlockHeight) {
      alert(t('house.alert.elevationBlock'));
      return false;
    }

    // Step 3: roofing
    if (!houseLength || !houseWidth || !rise || !run || !span) {
      alert(t('house.alert.roofingExport'));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForExportOrSave()) return;
    const htmlContent = buildExportHtml();
    setSaving(true);
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      let pdfUri = uri;
      if (FileSystem.documentDirectory) {
        try {
          const defaultTitle =
            floors === 4
              ? t('projects.defaultTitle.four') || 'Four Storey House Estimate'
              : floors === 3
                ? t('projects.defaultTitle.three') || 'Three Storey House Estimate'
                : floors === 2
                  ? t('projects.defaultTitle.two') || 'Two Storey House Estimate'
                  : t('projects.defaultTitle.multi') || 'Multi Storey House Estimate';
          const baseName = sanitizeForFilename(projectName.trim() || defaultTitle);
          const destUri = `${FileSystem.documentDirectory}estimates/${baseName}.pdf`;
          await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}estimates`, { intermediates: true });
          await FileSystem.copyAsync({ from: uri, to: destUri });
          pdfUri = destUri;
        } catch (copyErr) {
          console.warn('Could not copy PDF to documents, using temp uri:', copyErr);
        }
      }

      const summary = [
        {
          label: 'projects.summary.dryConcreteFoundationElevation',
          value: String(
            (totalFoundationEstimate.totalVolume || 0) +
              (elevationEstimate.dryConcreteVolume || 0)
          ),
          unit: 'm³',
        },
        {
          label: 'projects.summary.dryMortarVolume',
          value: String(
            (wallEstimate.dryVolume || 0) + (elevationEstimate.dryMortarVol || 0)
          ),
          unit: 'm³',
        },
        {
          label: 'projects.summary.roofingBoards',
          value: String(roofingEstimate?.numberOfBoards || ''),
          unit: 'projects.summary.unitBoards',
        },
      ];

      const defaultTitle =
        floors === 4
          ? t('projects.defaultTitle.four') || 'Four Storey House Estimate'
          : floors === 3
            ? t('projects.defaultTitle.three') || 'Three Storey House Estimate'
            : floors === 2
              ? t('projects.defaultTitle.two') || 'Two Storey House Estimate'
              : t('projects.defaultTitle.multi') || 'Multi Storey House Estimate';
      const title = projectName.trim() || defaultTitle;
      const projectData = {
        type: 'multi-house' as const,
        title,
        summary,
        data: {
          meta: { floors },
          inputs: {
            projectName: projectName.trim() || title,
            deckingType,
            floorNumber,
            pricePerBlock,
            pricePerM3,
            footingLength,
            footingWidth,
            footingThickness,
            numberFootings,
            numberRodsPerFooting,
            columnLength,
            columnWidth,
            columnHeight,
            numberColumns,
            numberRodsPerColumn,
            beamLength,
            beamWidth,
            beamHeight,
            numerRodsPerBeam,
            wallLength,
            wallWidth,
            wallHeight,
            blockLength,
            blockWidth,
            blockHeight,
            houseLength,
            houseWidth,
            rise,
            run,
            span,
          },
          outputs: {
            wallEstimate,
            elevationEstimate,
            elevationEstimate2,
            totalFoundationEstimate,
            roofingEstimate,
          },
          pdfUri,
        },
      };

      if (projectId) {
        const existing = projects.find((p) => p.id === projectId && p.type === 'multi-house');
        if (existing) {
          await updateProject({
            ...existing,
            ...projectData,
            id: existing.id,
            createdAt: existing.createdAt,
          });
        } else {
          await addProject(projectData);
        }
      } else {
        await addProject(projectData);
      }
      Alert.alert(t('house.saveSuccess'));
    } catch (error) {
      console.error('Failed to save:', error);
      Alert.alert(t('projects.export.failed'), t('projects.export.failedMessage'));
    } finally {
      setSaving(false);
    }
  };

  saveHandlerRef.current = handleSave;
  useEffect(() => {
    onRegisterSave?.(() => saveHandlerRef.current?.());
  }, [onRegisterSave]);

  const handleExport = async () => {
    if (!validateForExportOrSave()) return;
    const htmlContent = buildExportHtml();
    setExporting(true);
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (isSharingAvailable && uri) {
        let shareUri = uri;
        const defaultTitle =
          floors === 4
            ? t('projects.defaultTitle.four') || 'Four Storey House Estimate'
            : floors === 3
              ? t('projects.defaultTitle.three') || 'Three Storey House Estimate'
              : floors === 2
                ? t('projects.defaultTitle.two') || 'Two Storey House Estimate'
                : t('projects.defaultTitle.multi') || 'Multi Storey House Estimate';
        const baseName = sanitizeForFilename(projectName.trim() || defaultTitle);
        if (FileSystem.documentDirectory) {
          try {
            const destUri = `${FileSystem.documentDirectory}estimates/${baseName}.pdf`;
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}estimates`, { intermediates: true });
            await FileSystem.copyAsync({ from: uri, to: destUri });
            shareUri = destUri;
          } catch (_) {}
        }
        await Sharing.shareAsync(shareUri, {
          mimeType: 'application/pdf',
          dialogTitle: t('projects.export.shareTitle'),
        });
      }
    } catch (error) {
      console.error('Failed to export:', error);
      Alert.alert(t('projects.export.failed'), t('projects.export.failedMessage'));
    } finally {
      setExporting(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <>
              <TextInputTitle
                style={inputStyles.container}
                placeholder={t('projects.name.placeholder')}
                title={t('projects.name.title')}
                value={projectName}
                onChange={setProjectName}
                inputMode="text"
              />
              <Line />
              <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('house.foundation')}</Text>
              <Line />

              <Text style={{ color: colors.heading_text }}>Footing:</Text>

              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  placeholder="Enter Value"
                  title={t('house.input.lengthM')}
                  value={footingLength}
                  onChange={(value) => {
                    setFootingLength(value);
                  }}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  placeholder="Enter Value"
                  title={t('house.input.widthM')}
                  value={footingWidth}
                  onChange={(value) => {
                    setFootingWidth(value);
                  }}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  placeholder="Enter Value"
                  title={t('house.input.thicknessM')}
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
                  title={t('house.input.numFootings')}
                  value={numberFootings}
                  onChange={(value) => {
                    setNumberFootings(value);
                  }}
                />
                <TextInputTitle
                  style={inputStyles.twoColumnInput}
                  placeholder="Enter Value"
                  title={t('house.input.numRodsPerFooting')}
                  value={numberRodsPerFooting}
                  onChange={(value) => {
                    setNumberRodsPerFooting(value);
                  }}
                />
              </View>

              <Line />
              <Text style={{ color: colors.heading_text }}>Column:</Text>
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

              <Text style={{ color: colors.heading_text }}>Beam:</Text>
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

              <Text style={{ color: colors.heading_text }}>Foundation Wall:</Text>
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
            <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('house.elevation')}</Text>
            <Text style={{ color: colors.heading_text }}>Enter the inputs for each floor</Text>
            <Line />

            <View style={styles.tabs}>
              {Array.from({ length: floors }, (_, index) => {
                const n = index + 1;
                const isActive = floorNumber === n;
                return (
                  <ButtonPrimary
                    key={n}
                    title={`Floor ${n}`}
                    variant={isActive ? 'primary' : 'outline'}
                    fullRound
                    onPress={() => setFloorNumber(n)}
                    style={styles.tab}
                  />
                );
              })}
            </View>

            {floorNumber === 1 && (
              <>
                <Text style={titleStyles.boldTitle}>Floor 1</Text>
                <Text style={{ color: colors.heading_text }}>Dimension of Wall</Text>
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
                <Text style={{ color: colors.heading_text }}>Dimension of Block</Text>
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

                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.twoColumnInput}
                    title="Price Per Block"
                    placeholder="Enter price"
                    value={blockPrice}
                    onChange={(text) => setBlockPrice(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.twoColumnInput}
                    title="Price Per m³"
                    placeholder="Enter price"
                    value={elPricePerM3}
                    onChange={(text) => setElPricePerM3(text)}
                  />
                </View>
                <Line />
                <Text style={{ color: colors.heading_text }}>Dimension of Beam</Text>
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
                <Text style={{ color: colors.heading_text }}>Dimension of Columns</Text>
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
            {floorNumber > 1 && (
              <>
                <Text style={titleStyles.boldTitle}>{`Floor ${floorNumber}`}</Text>
                <Text style={{ color: colors.heading_text }}>Dimension of Wall</Text>
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
                <Text style={{ color: colors.heading_text }}>Dimension of Block</Text>
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

                <View style={inputStyles.threeColumn}>
                  <TextInputTitle
                    style={inputStyles.twoColumnInput}
                    title="Price Per Block"
                    placeholder="Enter price"
                    value={blockPrice2}
                    onChange={(text) => setBlockPrice2(text)}
                  />
                  <TextInputTitle
                    style={inputStyles.twoColumnInput}
                    title="Price Per m³"
                    placeholder="Enter price"
                    value={elPricePerM32}
                    onChange={(text) => setElPricePerM32(text)}
                  />
                </View>
                <Line />
                <Text style={{ color: colors.heading_text }}>Dimension of Beam</Text>
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
                <Text style={{ color: colors.heading_text }}>Dimension of Columns</Text>
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
            <FullHouseStepFooter
              onPrevious={handlePrevious}
              onNext={handleNext}
              previousLabel={t('house.previous')}
              nextLabel={t('house.next')}
            />
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
              style={[inputStyles.picker, { color: colors.heading_text, borderColor: colors.borderColor }]}
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

            <FullHouseStepFooter
              onPrevious={handlePrevious}
              onNext={deckingType === '' ? undefined : handleNext}
              previousLabel={t('house.previous')}
              nextLabel={t('house.next')}
              showNext={deckingType !== ''}
            />
          </>
        );
      case 4:
        return (
          <View>
            <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('house.roofing')}</Text>
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
              <View style={styles.navButton}>
                <ButtonOutlined title="Previous" onPress={handlePrevious} />
              </View>
              <View style={styles.navButton}>
                <ButtonPrimary title="Next" onPress={handleNext} />
              </View>
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
                    outputTab === 'All'
                      ? [styles.activeTabText, { color: colors.heading_text }]
                      : [styles.tabText, { color: colors.muted_text }]
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
                      ? [styles.activeTabText, { color: colors.heading_text }]
                      : [styles.tabText, { color: colors.muted_text }]
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
                      ? [styles.activeTabText, { color: colors.heading_text }]
                      : [styles.tabText, { color: colors.muted_text }]
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
                      ? [styles.activeTabText, { color: colors.heading_text }]
                      : [styles.tabText, { color: colors.muted_text }]
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
                      ? [styles.activeTabText, { color: colors.heading_text }]
                      : [styles.tabText, { color: colors.muted_text }]
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
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
                      Foundation Outputs
                    </Text>
                  </View>
                  {/* Row 1 */}
                  <>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Total Dry Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {totalFoundationEstimate.totalDryConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Sand Volume from Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {totalFoundationEstimate.totalSandConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Cement Volume from Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {totalFoundationEstimate.totalCementConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Gravel Volume from Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {totalFoundationEstimate.totalGravelConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Mortar Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {totalFoundationEstimate.totalDryMortarVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Sand Volume from Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {
                            totalFoundationEstimate.totalDrySandVolFromMortarVolume
                          }
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Cement Volume from Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {
                            totalFoundationEstimate.totalDryCementFromMortarVolume
                          }
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Total Price Per m³
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {totalFoundationEstimate.totalPricePerM3}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Total Number of 12m rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {totalFoundationEstimate.totalRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Rods</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Total Number of blocks
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {wallEstimate.numberOfBlocks}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Blocks</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Price For Blocks{' '}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {wallEstimate.numberOfBlocks * pricePerBlock}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                      </View>
                    </View>
                  </>
                </>
              )}
              {outputTab === 'ElevationOutput' && (
                /* ======= Elevation ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
                      Elevation Outputs
                    </Text>
                  </View>
                  <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Floor 1:</Text>
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
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Dry Volume of Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.dryMortarVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Cement Volume from Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.dryMortarCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Sand Volume from Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.dryMortarSandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Beam Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.beamdryVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Column Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.columndryVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.dryConcreteVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Sand Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.concreteSandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Cement Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.concreteCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Gravel Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.concreteGravelVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Number of blocks
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.blockNumber}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Blocks</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Block Cost
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.totalBlockCost}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Price Per m³
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.totalPricePerM3Elevation}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Number of 12m Rods
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate.totalEleRods.toFixed(2)}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Rods</Text>
                        </View>
                      </View>
                    </>
                  </>

                  <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Floor 2:</Text>
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
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Dry Volume of Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.dryMortarVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Cement Volume from Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.dryMortarCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Sand Volume from Mortar
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.dryMortarSandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Beam Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.beamdryVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Column Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.columndryVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.dryConcreteVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Sand Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.concreteSandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Cement Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.concreteCementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Gravel Volume from Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.concreteGravelVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Number of blocks
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.blockNumber}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Blocks</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Block Cost
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.totalBlockCost}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Price Per m³
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.totalPricePerM3Elevation}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Number of 12m Rods
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {elevationEstimate2.totalEleRods.toFixed(2)}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Rods</Text>
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
                        <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
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
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Dry Volume of Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {RCSlabEstimate.dryVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>

                      {/* Row 3: Dry Volume of Sand */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Dry Volume of Sand
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {RCSlabEstimate.sandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>

                      {/* Row 4: Dry Volume of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Dry Volume of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {RCSlabEstimate.cementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>

                      {/* Row 5: Dry Volume of Gravel */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Dry Volume of Gravel
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {RCSlabEstimate.gravelVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>

                      {/* Row 6: Number of Bags of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Number of Bags of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {RCSlabEstimate.numBagsCement}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Bags</Text>
                        </View>
                      </View>

                      {/* Row 7: Number of Rods */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Number of Rods</Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {RCSlabEstimate.num12mRods}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Rods</Text>
                        </View>
                      </View>
                    </>
                  )}
                  {deckingType === 'hollowSlab' && (
                    <>
                      <View style={tableStyles.row}>
                        <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
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
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Dry Volume of Concrete
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {HBSlabEstimate.dryVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>

                      {/* Row 3: Dry Volume of Sand */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Dry Volume of Sand
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {HBSlabEstimate.sandVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>

                      {/* Row 4: Dry Volume of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Dry Volume of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {HBSlabEstimate.cementVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>

                      {/* Row 5: Dry Volume of Gravel */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Dry Volume of Gravel
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {HBSlabEstimate.gravelVol}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>

                      {/* Row 6: Number of Bags of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Number of Bags of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {HBSlabEstimate.numBagsCement}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                        </View>
                      </View>

                      {/* Row 7: Number of Bags of Cement */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            Number of Bags of Cement
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {HBSlabEstimate.numBlocks}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Bags</Text>
                        </View>
                      </View>

                      {/* Row 8: Number of Rods */}
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Number of Rods</Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {HBSlabEstimate.num12mRods}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Rods</Text>
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
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
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
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of Ceiling Boards
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {roofingEstimate.numberOfCeilingBoards}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Boards</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of Roofing Sheets
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {roofingEstimate.numberOfRoofingSheets}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Sheets</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of Purlins
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {roofingEstimate.numberOfPurlins}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Purlins</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of Boards
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {roofingEstimate.numberOfBoards}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Boards</Text>
                      </View>
                    </View>
                  </>
                </>
              )}
              {outputTab === 'All' && (
                <View>
                  <View style={tableStyles.row}>
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
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
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>
                        Foundation:
                      </Text>
                    </View>

                    <>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Dry Concrete Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {totalFoundationEstimate.totalVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Dry Sand Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {totalFoundationEstimate.totalSandVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Dry Cement Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {totalFoundationEstimate.totalCementVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Dry Gravel Volume
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {totalFoundationEstimate.totalGravelVolume}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Number of 12m rods
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {totalFoundationEstimate.totalRods}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Total Number of blocks
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {wallEstimate.numberOfBlocks}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                        </View>
                      </View>
                    </>
                  </>
                  {/* Elevation */}
                  <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Elevation</Text>
                    </View>

                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Floor 1:</Text>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.dryMortarVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Beam Dry Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.beamdryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Column Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.columndryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Total Dry Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.dryConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>Sand Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.totalSandVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>Cement Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.totalCementVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>Gravel Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.totalGravelVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of blocks
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.blockNumber}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Total Block Cost
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.totalBlockCost}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of 12m Rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate.totalEleRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                      </View>
                    </View>
                  </>
                  <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Floor 2:</Text>
                    </View>

                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.dryMortarVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Beam Dry Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.beamdryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Column Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.columndryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Total Dry Concrete Volume
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.dryConcreteVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>Sand Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.totalSandVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>Cement Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.totalCementVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>Gravel Volume</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.totalGravelVol}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of blocks
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.blockNumber}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Total Block Cost
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.totalBlockCost}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of 12m Rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {elevationEstimate2.totalEleRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                      </View>
                    </View>
                  </>
                  {/* Decking */}
                  <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>
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
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Dry Volume of Concrete
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {RCSlabEstimate.dryVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                            </View>
                          </View>

                          {/* Row 3: Dry Volume of Sand */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Dry Volume of Sand
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {RCSlabEstimate.sandVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                            </View>
                          </View>

                          {/* Row 4: Dry Volume of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Dry Volume of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {RCSlabEstimate.cementVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                            </View>
                          </View>

                          {/* Row 5: Dry Volume of Gravel */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Dry Volume of Gravel
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {RCSlabEstimate.gravelVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                            </View>
                          </View>

                          {/* Row 6: Number of Bags of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Number of Bags of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {RCSlabEstimate.numBagsCement}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                            </View>
                          </View>

                          {/* Row 7: Number of Rods */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Number of Rods
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {RCSlabEstimate.num12mRods}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                            </View>
                          </View>
                        </>
                      )}
                      {deckingType === 'hollowSlab' && (
                        <>
                          {/* Row 2: Dry Volume of Concrete */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Dry Volume of Concrete
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {HBSlabEstimate.dryVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                            </View>
                          </View>

                          {/* Row 3: Dry Volume of Sand */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Dry Volume of Sand
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {HBSlabEstimate.sandVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                            </View>
                          </View>

                          {/* Row 4: Dry Volume of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Dry Volume of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {HBSlabEstimate.cementVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                            </View>
                          </View>

                          {/* Row 5: Dry Volume of Gravel */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Dry Volume of Gravel
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {HBSlabEstimate.gravelVol}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                            </View>
                          </View>

                          {/* Row 6: Number of Bags of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Number of Bags of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {HBSlabEstimate.numBagsCement}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                            </View>
                          </View>

                          {/* Row 7: Number of Bags of Cement */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Number of Bags of Cement
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {HBSlabEstimate.numBlocks}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                            </View>
                          </View>

                          {/* Row 8: Number of Rods */}
                          <View style={tableStyles.row}>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                Number of Rods
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                                {HBSlabEstimate.num12mRods}
                              </Text>
                            </View>
                            <View style={tableStyles.column}>
                              <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                            </View>
                          </View>
                        </>
                      )}
                    </>
                  </>
                  {/* Roofing */}
                  <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Roofing:</Text>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of Ceiling Boards
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {roofingEstimate.numberOfCeilingBoards}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Boards</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of Roofing Sheets
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {roofingEstimate.numberOfRoofingSheets}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Sheets</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of Purlins
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {roofingEstimate.numberOfPurlins}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Purlins</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of Boards
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {roofingEstimate.numberOfBoards}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>Boards</Text>
                      </View>
                    </View>
                  </>
                </View>
              )}
            </View>
            <FullHouseStepFooter
              onPrevious={handlePrevious}
              onNext={handleExport}
              previousLabel={t('house.previous')}
              nextLabel={t('house.exportAll')}
              loadingNext={exporting}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{...containerStyles.container, paddingBottom: 32}}>
        <ProgressBar step={step} steps={5} colors={colors} styles={styles} />
        {renderContent()}
      </View>
  );
};

const ProgressBar = ({ step, steps, colors, styles }) => {
  const progress = (step / steps) * 100;
  if (!colors || !styles) return null;
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { backgroundColor: colors.borderColor }]}>
        <View style={[styles.progress, { width: `${progress}%`, backgroundColor: colors.primary_color }]} />
      </View>
      <Text style={[styles.progressText, { color: colors.muted_text }]}>
        {step} / {steps}
      </Text>
    </View>
  );
};

const createStyles = (colors: { borderColor: string }) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.borderColor,
      padding: 10,
      marginVertical: 10,
    },
    progressBarContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    progressBar: {
      height: 10,
      width: '100%',
      borderRadius: 5,
    },
    progress: {
      height: '100%',
      borderRadius: 5,
    },
    progressText: {
      marginTop: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
    },
    navButton: {
      flex: 1,
    },
    tabs: {
      flexDirection: 'row',
      marginBottom: 16,
      gap: 8,
    },
    tab: {},
    tabText: {
      fontSize: 16,
    },
    activeTabText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default MultiHouse;
