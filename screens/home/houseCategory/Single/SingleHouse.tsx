// @ts-nocheck
import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { WebView } from 'react-native-webview';

import { Line, containerStyles, titleStyles } from '../../../../styles/utility';
import { createTableStyles } from '../../../../styles/components/table';
import ButtonPrimary from '../../../../components/buttons/Button';
import TextInputTitle from '../../../../components/inputs/InputTitle';
import { inputStyles } from '../../../../styles/components/inputStyles';
import { useTheme } from '../../../../context/ThemeContext';
import { useLocale } from '../../../../context/LocaleContext';
import ButtonOutlined from '../../../../components/buttons/ButtonOutlined';
import { useProjects } from '../../../../context/ProjectsContext';

type SingleHouseProps = {
  projectId?: string;
  onRegisterSave?: (fn: () => Promise<void>) => void;
};

function sanitizeForFilename(name: string): string {
  const s = name.trim().replace(/[/\\:*?"<>|]/g, '_').replace(/\s+/g, '_') || 'estimate';
  return s.slice(0, 100);
}

const SingleHouse: React.FC<SingleHouseProps> = ({ projectId, onRegisterSave }) => {
  const [step, setStep] = useState(1);
  const [outputTab, setOutputTab] = useState('All');
  const [exporting, setExporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { projects, addProject, updateProject } = useProjects();
  const { colors } = useTheme();
  const { t } = useLocale();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const tableStyles = useMemo(() => createTableStyles(colors), [colors]);

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
    const existing = projects.find((p) => p.id === projectId && p.type === 'single-house');
    if (!existing) return;
    const inputs = existing.data?.inputs || {};

    setProjectName(existing.title || inputs.projectName || '');
    setPricePerBlock(inputs.pricePerBlock ?? '');
    setPricePerM3(inputs.pricePerM3 ?? '');
    setFootingLength(inputs.footingLength ?? '');
    setFootingWidth(inputs.footingWidth ?? '');
    setFootingThickness(inputs.footingThickness ?? '');
    setNumberFootings(inputs.numberFootings ?? '');
    setNumberRodsPerFooting(inputs.numberRodsPerFooting ?? '');

    setColumnLength(inputs.columnLength ?? '');
    setColumnWidth(inputs.columnWidth ?? '');
    setColumnHeight(inputs.columnHeight ?? '');
    setNumberColumns(inputs.numberColumns ?? '');
    setNumberRodsPerColumn(inputs.numberRodsPerColumn ?? '');

    setBeamLength(inputs.beamLength ?? '');
    setBeamWidth(inputs.beamWidth ?? '');
    setBeamHeight(inputs.beamHeight ?? '');
    setNumerRodsPerBeam(inputs.numerRodsPerBeam ?? '');

    setWallLength(inputs.wallLength ?? '');
    setWallWidth(inputs.wallWidth ?? '');
    setWallHeight(inputs.wallHeight ?? '');
    setBlockLength(inputs.blockLength ?? '');
    setBlockWidth(inputs.blockWidth ?? '');
    setBlockHeight(inputs.blockHeight ?? '');

    setElevationWallLength(inputs.elevationWallLength ?? '');
    setelevationWallWidth(inputs.elevationWallWidth ?? '');
    setelevationWallHeight(inputs.elevationWallHeight ?? '');
    setelevationWallBlockLength(inputs.elevationWBlockLength ?? '');
    setelevationWallBlockWidth(inputs.elevationWallBlockWidth ?? '');
    setelevationWallBlockHeight(inputs.elevationWallBlockHeight ?? '');
    setelevationWallSubtractArea(inputs.elevationWallSubtractArea ?? '');
    setElPricePerM3(inputs.elPricePerM3 ?? '');
    setBlockPrice(inputs.blockPrice ?? '');

    setElevationBeamLength(inputs.elevationBeamLength ?? '');
    setelevationBeamWidth(inputs.elevationBeamWidth ?? '');
    setelevationBeamHeight(inputs.elevationBeamHeight ?? '');
    setelevationNumberRodsPerBeam(inputs.elevationNumRodsPerBeam ?? '');

    setElevationColumnLength(inputs.elevationColumnLength ?? '');
    setelevationColumnWidth(inputs.elevationColumnWidth ?? '');
    setelevationColumnHeight(inputs.elevationColumnHeight ?? '');
    setelevationNumberRodsPerColumn(inputs.elevationNumberRodsPerColumn ?? '');
    setelevationColumnNumber(inputs.elevationColumnNumber ?? '');

    setHouseLength(inputs.houseLength ?? '');
    setHouseWidth(inputs.houseWidth ?? '');
    setRise(inputs.rise ?? '');
    setRun(inputs.run ?? '');
    setSpan(inputs.span ?? '');
  }, [projectId, projects]);

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
    const numberOfBlocks = Math.ceil(volume / blockVolume);

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
    const sheet = Math.ceil(areaOfRoofing / 2.7);
    const ceiling = Math.ceil(baseArea / 5.28);
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
      calculateEstimates();
    }
    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
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

  const saveHandlerRef = useRef<() => Promise<void>>();

  const handleSave = async () => {
    if (!validateForExportOrSave()) return;
    const htmlContent = buildExportHtml();
    setSaving(true);
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      let pdfUri = uri;
      if (FileSystem.documentDirectory) {
        try {
          const baseName = sanitizeForFilename(projectName.trim() || t('projects.defaultTitle.single') || 'Single Storey House Estimate');
          const destUri = `${FileSystem.documentDirectory}estimates/${baseName}.pdf`;
          await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}estimates`, { intermediates: true });
          await FileSystem.copyAsync({ from: uri, to: destUri });
          pdfUri = destUri;
        } catch (copyErr) {
          console.warn('Could not copy PDF to documents, using temp uri:', copyErr);
        }
      }

      const summary = [
        { label: 'projects.summary.totalDryConcreteVolume', value: String(totalFoundationEstimate.totalDryConcreteVolume ?? ''), unit: 'm³' },
        { label: 'projects.summary.totalDryMortarVolume', value: String(totalFoundationEstimate.totalDryMortarVolume ?? ''), unit: 'm³' },
        { label: 'projects.summary.roofingBoards', value: String(roofingEstimate?.numberOfBoards ?? ''), unit: 'projects.summary.unitBoards' },
      ];
      const title = projectName.trim() || t('projects.defaultTitle.single') || 'Single Storey House Estimate';
      const projectData = {
        type: 'single-house' as const,
        title,
        summary,
        data: {
          inputs: {
            projectName: projectName.trim() || title,
            pricePerBlock, pricePerM3, footingLength, footingWidth, footingThickness, numberFootings, numberRodsPerFooting,
            columnLength, columnWidth, columnHeight, numberColumns, numberRodsPerColumn,
            beamLength, beamWidth, beamHeight, numerRodsPerBeam,
            wallLength, wallWidth, wallHeight, blockLength, blockWidth, blockHeight,
            elevationWallLength, elevationWallWidth, elevationWallHeight, elevationWBlockLength, elevationWallBlockWidth, elevationWallBlockHeight, elevationWallSubtractArea,
            elPricePerM3, blockPrice,
            elevationBeamLength, elevationBeamWidth, elevationBeamHeight, elevationNumRodsPerBeam,
            elevationColumnLength, elevationColumnWidth, elevationColumnHeight, elevationNumberRodsPerColumn, elevationColumnNumber,
            houseLength, houseWidth, rise, run, span,
          },
          outputs: { footingEstimate, columnEstimate, beamEstimate, wallEstimate, totalFoundationEstimate, elevationEstimate, roofingEstimate },
          pdfUri,
        },
      };

      if (projectId) {
        const existing = projects.find((p) => p.id === projectId && p.type === 'single-house');
        if (existing) {
          await updateProject({ ...existing, ...projectData, id: existing.id, createdAt: existing.createdAt });
        } else {
          await addProject(projectData);
        }
      } else {
        await addProject(projectData);
      }
      alert(t('house.saveSuccess'));
    } catch (error) {
      console.error('Failed to save:', error);
      alert(t('projects.export.failed'));
    } finally {
      setSaving(false);
    }
  };

  saveHandlerRef.current = handleSave;
  useEffect(() => {
    onRegisterSave?.(() => saveHandlerRef.current?.());
  }, [onRegisterSave]);

  const buildExportHtml = () => {
    const projectTitle =
      projectName.trim() ||
      t('projects.defaultTitle.single') ||
      'Single Storey House Estimate';
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
        <h1>${projectTitle}</h1>
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

        <h2>Key Input Dimensions</h2>
        <table>
          <tr class="header">
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
            <td>Elevation - Wall</td>
            <td>Length / Height / Thickness / Subtract Area</td>
            <td>${elevationWallLength} / ${elevationWallHeight} / ${elevationWallWidth} / ${elevationWallSubtractArea}</td>
          </tr>
          <tr>
            <td>Elevation - Block</td>
            <td>Length / Width / Height / Price per m³</td>
            <td>${elevationWBlockLength} / ${elevationWallBlockWidth} / ${elevationWallBlockHeight} / ${elPricePerM3}</td>
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

  const handleExport = async () => {
    if (!validateForExportOrSave()) return;
    const htmlContent = buildExportHtml();
    setExporting(true);
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      const canShare = await Sharing.isAvailableAsync();
      if (canShare && uri) {
        let shareUri = uri;
        const baseName = sanitizeForFilename(projectName.trim() || t('projects.defaultTitle.single') || 'Single Storey House Estimate');
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
          dialogTitle: t('house.exportAll'),
        });
      }
    } catch (error) {
      console.error('Failed to export:', error);
      alert(t('projects.export.failed'));
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
                  title="Height"
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
            <ButtonPrimary title={t('house.next')} onPress={handleNext} />
          </View>
        );
      case 2:
        return (
          <View>
            <>
              <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>{t('house.elevation')}</Text>
              <Line />
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
                  title="Height (m)"
                  placeholder="Enter height"
                  value={elevationWallHeight}
                  onChange={(text) => setelevationWallHeight(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Thickness (m)"
                  placeholder="Enter thickness"
                  value={elevationWallWidth}
                  onChange={(text) => setelevationWallWidth(text)}
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
                  title="Height (m)"
                  placeholder="Enter height"
                  value={elevationWallBlockHeight}
                  onChange={(text) => setelevationWallBlockHeight(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title="Thickness (m)"
                  placeholder="Enter thickness"
                  value={elevationWallBlockWidth}
                  onChange={(text) => setelevationWallBlockWidth(text)}
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
                  title="Height (m)"
                  placeholder="Enter height"
                  value={elevationBeamHeight}
                  onChange={(text) => setelevationBeamHeight(text)}
                />
              </View>

              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  title={t('house.input.numRodsPerBeam')}
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
                  title={t('house.input.lengthM')}
                  placeholder="Enter length"
                  value={elevationColumnLength}
                  onChange={(text) => setElevationColumnLength(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title={t('house.input.widthM')}
                  placeholder="Enter width"
                  value={elevationColumnWidth}
                  onChange={(text) => setelevationColumnWidth(text)}
                />
                <TextInputTitle
                  style={inputStyles.threeColumnInput}
                  title={t('house.input.heightM')}
                  placeholder="Enter height"
                  value={elevationColumnHeight}
                  onChange={(text) => setelevationColumnHeight(text)}
                />
              </View>
              <View style={inputStyles.threeColumn}>
                <TextInputTitle
                  style={inputStyles.twoColumnInput}
                  title={t('house.input.numColumns')}
                  placeholder="Enter Value"
                  value={elevationColumnNumber}
                  onChange={(text) => setelevationColumnNumber(text)}
                />
                <TextInputTitle
                  style={inputStyles.twoColumnInput}
                  title={t('house.input.numRodsPerColumn')}
                  placeholder="Enter Value"
                  value={elevationNumberRodsPerColumn}
                  onChange={(text) => setelevationNumberRodsPerColumn(text)}
                />
              </View>
            </>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <ButtonOutlined title={t('house.previous')} onPress={handlePrevious} />
              </View>
              <View style={styles.buttonWrapper}>
                <ButtonPrimary title={t('house.next')} onPress={handleNext} />
              </View>
            </View>
          </View>
        );
      case 3:
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
              <View style={styles.buttonWrapper}>
                <ButtonOutlined title={t('house.previous')} onPress={handlePrevious} />
              </View>
              <View style={styles.buttonWrapper}>
                <ButtonPrimary title={t('house.next')} onPress={handleNext} />
              </View>
            </View>
          </View>
        );
      case 4:
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
                  {t('house.all')}
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
                  {t('house.foundation')}
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
                  {t('house.elevation')}
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
                  {t('house.roofing')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tableStyles.container}>
              {outputTab === 'FoundationOutput' && (
                /* ======= Foundation ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
                      {t('house.foundationOutputs')}
                    </Text>
                  </View>
                  {/* Row 1 */}
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeaderLeft}>Material</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>Quantity</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>Unit</Text>
                    </View>
                  </View>
                  {/* <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Footing:</Text>
                    </View>

                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Wet Volume of Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {footingEstimate.volume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {footingEstimate.dryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Sand
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {footingEstimate.sandVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Cement
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {footingEstimate.cementVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Gravel
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {footingEstimate.sandVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of 12m rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {footingEstimate.totalRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                      </View>
                    </View>
                  </> */}
                  {/* columns */}
                  {/* <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Columns:</Text>
                    </View>

                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Wet Volume of Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {columnEstimate.volume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {columnEstimate.dryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Sand
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {columnEstimate.sandVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Cement
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {columnEstimate.cementVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Gravel
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {columnEstimate.gravelVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of 12m rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {columnEstimate.totalRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                      </View>
                    </View>
                  </> */}
                  {/* beam */}
                  {/* <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>Beam:</Text>
                    </View>

                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Wet Volume of Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {beamEstimate.volume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Concrete
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {beamEstimate.dryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Sand
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {beamEstimate.sandVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Cement
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {beamEstimate.cementVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Gravel
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {beamEstimate.gravelVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Number of 12m rods
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {beamEstimate.totalRods}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                      </View>
                    </View>
                  </> */}
                  {/* foundation wall */}
                  {/* <>
                    <View style={tableStyles.row}>
                      <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>
                        {t('house.foundation')} Wall:
                      </Text>
                    </View>

                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Wet Volume of Mortar
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {wallEstimate.volume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
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
                          {wallEstimate.dryVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Sand
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {wallEstimate.sandVolume}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          Dry Volume of Cement
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                          {wallEstimate.cementVolume}
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
                          {wallEstimate.numberOfBlocks}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cell, { color: colors.heading_text }]}></Text>
                      </View>
                    </View>
                  </> */}
                  {/* total foundation estimate */}
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
                      {t('house.elevationOutputs')}
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
                        <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>Quantity</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>Unit</Text>
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
              )}
              {outputTab === 'RoofingOutput' && (
                /* ======= Roofing ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
                      {t('house.roofingOutputs')}
                    </Text>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeaderLeft}>Material</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>Quantity</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>Unit</Text>
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
                      {t('house.all')} Outputs
                    </Text>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeaderLeft}>Material</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>Quantity</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>Unit</Text>
                    </View>
                  </View>

                  <>
                    {/* total foundation estimate */}
                    <>
                      <View style={tableStyles.row}>
                        <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>
                          {t('house.foundation')}:
                        </Text>
                      </View>

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
                    {/* Elevation */}
                    <>
                      <View style={tableStyles.row}>
                        <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>
                          {t('house.elevation')}:
                        </Text>
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
                    {/* ======= Roofing ======= */}
                    <>
                      <View style={tableStyles.row}>
                        <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>
                          {t('house.roofing')}:
                        </Text>
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
                  </>
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <ButtonOutlined title={t('house.previous')} onPress={handlePrevious} />
              </View>
              <View style={styles.buttonWrapper}>
                <ButtonPrimary title={t('house.exportAll')} onPress={handleExport} loading={exporting} />
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
      <View style={{...containerStyles.container, paddingBottom: 32}}>
        <ProgressBar step={step} steps={4} colors={colors} styles={styles} />
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
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
      alignItems: 'flex-end',
    },
    buttonWrapper: {
      flex: 1,
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
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    tab: {
      paddingVertical: 10,
    },
    tabText: {
      fontSize: 16,
    },
    activeTabText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default SingleHouse;
