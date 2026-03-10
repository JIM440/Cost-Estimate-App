// @ts-nocheck
import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
import { computeFooting, computeColumn, computeBeam, computeWall } from '../../../../domain/house/foundation';
import {
  computeFullRoofEstimate,
  DEFAULT_ROOF_MATERIAL_CONFIG,
} from '../../../../domain/roof/roofing';
import FoundationInputsSection from '../../../../components/house/FoundationInputsSection';
import RoofingInputsSection from '../../../../components/house/RoofingInputsSection';
import HouseOutputTabs from '../../../../components/house/HouseOutputTabs';

type SingleHouseProps = {
  projectId?: string;
  onRegisterSave?: (fn: () => Promise<void>) => void;
  saveHandlerRef?: React.MutableRefObject<(() => Promise<void>) | null>;
};

function sanitizeForFilename(name: string): string {
  const s = name.trim().replace(/[/\\:*?"<>|]/g, '_').replace(/\s+/g, '_') || 'estimate';
  return s.slice(0, 100);
}

const SingleHouse: React.FC<SingleHouseProps> = ({ projectId, onRegisterSave, saveHandlerRef }) => {
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
  const [roofingEstimate, setRoofingEstimate] = useState<any>(null);
  const [pricePerRoofingSheet, setPricePerRoofingSheet] = useState('');
  const [pricePerCeilingBoardM, setPricePerCeilingBoardM] = useState('');
  const [pricePerBoard, setPricePerBoard] = useState('');
  const [pricePerPurlin, setPricePerPurlin] = useState('');

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
    setPricePerRoofingSheet(inputs.pricePerRoofingSheet ?? '');
    setPricePerCeilingBoardM(inputs.pricePerCeilingBoardM ?? '');
    setPricePerBoard(inputs.pricePerBoard ?? '');
    setPricePerPurlin(inputs.pricePerPurlin ?? '');
  }, [projectId, projects]);

  // Calculate volumes and quantities for footings
  const calculateFooting = () =>
    computeFooting({
      length: parseFloat(footingLength),
      width: parseFloat(footingWidth),
      thickness: parseFloat(footingThickness),
      count: parseInt(numberFootings),
      rodsPerFooting: parseFloat(numberRodsPerFooting),
    });

  // Calculate volumes and quantities for columns
  const calculateColumn = () =>
    computeColumn({
      length: parseFloat(columnLength),
      width: parseFloat(columnWidth),
      height: parseFloat(columnHeight),
      count: parseInt(numberColumns),
      rodsPerColumn: parseFloat(numberRodsPerColumn),
    });

  // Calculate volumes and quantities for beams
  const calculateBeam = () =>
    computeBeam({
      length: parseFloat(beamLength),
      width: parseFloat(beamWidth),
      height: parseFloat(beamHeight),
      rodsPerBeam: parseFloat(numerRodsPerBeam),
    });

  // Calculate volumes and quantities for foundation walls
  const calculateWall = () =>
    computeWall({
      length: parseFloat(wallLength),
      width: parseFloat(wallWidth),
      height: parseFloat(wallHeight),
      blockLength: parseFloat(blockLength),
      blockWidth: parseFloat(blockWidth),
      blockHeight: parseFloat(blockHeight),
    });

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
    const dryMortarVol = (totalBlockVolume * 1.33).toFixed(2);

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

    if (!L || !W || !R || !Ru || !S || L <= 0 || W <= 0 || R <= 0 || Ru <= 0 || S <= 0) {
      return;
    }

    const sheetPrice = parseFloat(pricePerRoofingSheet || '0');
    const ceilingPrice = parseFloat(pricePerCeilingBoardM || '0');
    const boardPrice = parseFloat(pricePerBoard || '0');
    const purlinPrice = parseFloat(pricePerPurlin || '0');

    const result = computeFullRoofEstimate(
      {
        houseLength: L,
        houseWidth: W,
        rise: R,
        run: Ru,
        span: S,
        roofType: 'gable',
      },
      {
        sheetUnitPrice: Number.isNaN(sheetPrice) ? 0 : sheetPrice,
        boardUnitPrice: Number.isNaN(ceilingPrice) ? 0 : ceilingPrice,
        purlinUnitPrice: Number.isNaN(purlinPrice) ? 0 : purlinPrice,
        rafterUnitPrice: Number.isNaN(boardPrice) ? 0 : boardPrice,
      },
      DEFAULT_ROOF_MATERIAL_CONFIG
    );

    setRoofingEstimate({
      numberOfCeilingBoards: result.materials.numberOfBoards,
      numberOfRoofingSheets: result.materials.numberOfSheets,
      numberOfPurlins: result.materials.numberOfPurlins,
      numberOfBoards: result.materials.numberOfRafters,
      sheetsCost: result.costs?.sheetCost ?? 0,
      ceilingCost: result.costs?.boardCost ?? 0,
      boardsCost: result.costs?.rafterCost ?? 0,
      purlinsCost: result.costs?.purlinCost ?? 0,
    });
  };

  const handleNext = () => {
    // Simple validation: require key inputs for each step before moving on.
    if (step === 1) {
      if (!projectName.trim()) {
        Alert.alert(t('house.alert.projectName'));
        return;
      }
      if (!footingLength || !footingWidth || !footingThickness || !numberFootings) {
        Alert.alert(t('house.alert.footing'));
        return;
      }
      if (!columnLength || !columnWidth || !columnHeight || !numberColumns) {
        Alert.alert(t('house.alert.column'));
        return;
      }
    }
    if (step === 2) {
      if (!elevationWallLength || !elevationWallHeight || !elevationWallWidth) {
        Alert.alert(t('house.alert.elevationWall'));
        return;
      }
      if (!elevationWBlockLength || !elevationWallBlockWidth || !elevationWallBlockHeight) {
        Alert.alert(t('house.alert.elevationBlock'));
        return;
      }
    }
    if (step === 3) {
      if (!houseLength || !houseWidth || !rise || !run || !span) {
        Alert.alert(t('house.alert.roofing'));
        return;
      }
      calculateEstimates();
    }
    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const isFilled = (v: any) => String(v ?? '').trim().length > 0;

  const isExportReady = () => {
    const required = [
      projectName,
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
      elevationWallLength,
      elevationWallWidth,
      elevationWallHeight,
      elevationWBlockLength,
      elevationWallBlockWidth,
      elevationWallBlockHeight,
      elevationWallSubtractArea,
      elPricePerM3,
      blockPrice,
      elevationBeamLength,
      elevationBeamWidth,
      elevationBeamHeight,
      elevationNumRodsPerBeam,
      elevationColumnLength,
      elevationColumnWidth,
      elevationColumnHeight,
      elevationNumberRodsPerColumn,
      elevationColumnNumber,
      houseLength,
      houseWidth,
      rise,
      run,
      span,
      pricePerRoofingSheet,
      pricePerCeilingBoardM,
      pricePerBoard,
      pricePerPurlin,
    ];

    return required.every(isFilled);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const complete = isExportReady();
      const existing =
        projectId
          ? projects.find((p) => p.id === projectId && p.type === 'single-house')
          : undefined;
      const existingPdfUri = (existing?.data?.pdfUri as string | undefined) ?? undefined;

      const totalMaterialCost =
        (parseFloat(totalFoundationEstimate.totalPricePerM3) || 0) +
        ((wallEstimate.numberOfBlocks || 0) * (parseFloat(pricePerBlock) || 0)) +
        (parseFloat(elevationEstimate.totalBlockCost) || 0) +
        (parseFloat(elevationEstimate.totalPricePerM3Elevation) || 0);
      const labourCost = totalMaterialCost * 0.2;
      const summary = complete
        ? [
            { label: 'projects.summary.totalDryConcreteVolume', value: String(totalFoundationEstimate.totalDryConcreteVolume ?? ''), unit: 'm³' },
            { label: 'projects.summary.totalDryMortarVolume', value: String(totalFoundationEstimate.totalDryMortarVolume ?? ''), unit: 'm³' },
            { label: 'projects.summary.roofingBoards', value: String(roofingEstimate?.numberOfBoards ?? ''), unit: 'projects.summary.unitBoards' },
            { label: 'projects.summary.totalCost', value: String(Math.round(totalMaterialCost)), unit: 'FCFA' },
            { label: 'projects.summary.labourEstimate', value: String(Math.round(labourCost)), unit: 'FCFA' },
          ]
        : existing?.summary ?? [];
      const title = projectName.trim() || t('projects.defaultTitle.single') || 'Single Storey House Estimate';
      const projectData = {
        type: 'single-house' as const,
        title,
        summary,
        data: {
          meta: { complete },
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
            pricePerRoofingSheet, pricePerCeilingBoardM, pricePerBoard, pricePerPurlin,
          },
          outputs: { footingEstimate, columnEstimate, beamEstimate, wallEstimate, totalFoundationEstimate, elevationEstimate, roofingEstimate },
          pdfUri: existingPdfUri,
        },
      };

      if (existing) {
        await updateProject({ ...existing, ...projectData, id: existing.id, createdAt: existing.createdAt });
      } else {
        await addProject(projectData);
      }

      Alert.alert(complete ? t('house.saveSuccess') : (t('house.saveDraftSuccess') || t('house.saveSuccess')));
    } catch (error) {
      console.error('Failed to save:', error);
      Alert.alert(t('projects.export.failed'));
    } finally {
      setSaving(false);
    }
  };

  const internalSaveRef = useRef<() => Promise<void>>();
  internalSaveRef.current = handleSave;
  const invokeSave = useCallback(() => internalSaveRef.current?.(), []);
  useEffect(() => {
    if (saveHandlerRef) saveHandlerRef.current = invokeSave;
    else onRegisterSave?.(invokeSave);
  }, [onRegisterSave, saveHandlerRef, invokeSave]);

  const buildExportHtml = () => {
    const projectTitle =
      projectName.trim() ||
      t('projects.defaultTitle.single') ||
      'Single Storey House Estimate';
    const buildingType = 'Single-storey building';
    const formatNumber = (value: any): string => {
      if (value === null || value === undefined) return '';
      const n = typeof value === 'number' ? value : Number(value);
      if (Number.isNaN(n)) return String(value ?? '');
      if (Number.isInteger(n)) return String(n);
      return n.toFixed(2);
    };
    const safe = (value: any): string => {
      if (value === null || value === undefined) return '';
      if (typeof value === 'number') {
        if (Number.isNaN(value)) return '';
        return formatNumber(value);
      }
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
          return formatNumber(trimmed);
        }
        return trimmed;
      }
      return String(value);
    };
    const primaryColor = '#0D6B7A';
    const foundationSubtotal =
      (parseFloat(totalFoundationEstimate.totalPricePerM3) || 0) +
      ((wallEstimate.numberOfBlocks || 0) * (parseFloat(pricePerBlock) || 0));
    const elevationSubtotal =
      (parseFloat(elevationEstimate.totalBlockCost) || 0) +
      (parseFloat(elevationEstimate.totalPricePerM3Elevation) || 0);
    const grandTotal = foundationSubtotal + elevationSubtotal;
    const labourEst = grandTotal * 0.2;
    const grandTotalWithLabour = grandTotal + labourEst;
    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #0F172A; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          th, td { border: 1px solid #E2E8F0; padding: 8px 10px; text-align: left; }
          .title-bar { background-color: ${primaryColor}; padding: 16px 20px; margin-bottom: 24px; }
          .title-bar h1 { color: #FFFFFF; margin: 0; font-size: 22px; }
          .subtitle { color: #FFFFFF; margin-top: 4px; font-size: 14px; }
          .section-title { background-color: ${primaryColor}; color: white; padding: 10px 12px; font-size: 1.1em; font-weight: bold; margin-bottom: 0; margin-top: 28px; }
          .section-title:first-of-type { margin-top: 0; }
          .table-header { background-color: ${primaryColor}; color: white; }
          .table-header th { font-weight: bold; }
          .section-block { margin-bottom: 32px; }
        </style>
      </head>
      <body>
        <div class="title-bar">
          <h1>${projectTitle}</h1>
          <div class="subtitle">${buildingType}</div>
        </div>

        <div class="section-block">
          <div class="section-title">${t('house.foundation')}</div>
          <table>
            <tr class="table-header">
              <th>#</th>
              <th>${t('house.pdf.description')}</th>
              <th>${t('house.pdf.unit')}</th>
              <th>${t('house.pdf.quantity')}</th>
              <th>${t('house.pdf.unitPrice')}</th>
              <th>${t('house.pdf.total')}</th>
            </tr>
            <tr><td>1</td><td>${t('house.output.totalDryConcreteVolume')}</td><td>m³</td><td>${safe(totalFoundationEstimate.totalDryConcreteVolume)}</td><td></td><td></td></tr>
            <tr><td>2</td><td>${t('house.output.sandVolumeFromConcrete')}</td><td>m³</td><td>${safe(totalFoundationEstimate.totalSandConcreteVolume)}</td><td></td><td></td></tr>
            <tr><td>3</td><td>${t('house.output.cementVolumeFromConcrete')}</td><td>m³</td><td>${safe(totalFoundationEstimate.totalCementConcreteVolume)}</td><td></td><td></td></tr>
            <tr><td>4</td><td>${t('house.output.gravelVolumeFromConcrete')}</td><td>m³</td><td>${safe(totalFoundationEstimate.totalGravelConcreteVolume)}</td><td></td><td></td></tr>
            <tr><td>5</td><td>${t('house.output.totalDryMortarVolume')}</td><td>m³</td><td>${safe(totalFoundationEstimate.totalDryMortarVolume)}</td><td></td><td></td></tr>
            <tr><td>6</td><td>${t('house.output.sandVolumeFromMortar')}</td><td>m³</td><td>${safe(totalFoundationEstimate.totalDrySandVolFromMortarVolume)}</td><td></td><td></td></tr>
            <tr><td>7</td><td>${t('house.output.cementVolumeFromMortar')}</td><td>m³</td><td>${safe(totalFoundationEstimate.totalDryCementFromMortarVolume)}</td><td></td><td></td></tr>
            <tr><td>8</td><td>${t('house.output.totalPricePerM3')}</td><td>FCFA</td><td></td><td></td><td>${safe(totalFoundationEstimate.totalPricePerM3)}</td></tr>
            <tr><td>9</td><td>${t('house.output.totalNumberOf12mRods')}</td><td>${t('house.pdf.unitRods') || 'Rods'}</td><td>${safe(totalFoundationEstimate.totalRods)}</td><td></td><td></td></tr>
            <tr><td>10</td><td>${t('house.output.totalNumberOfBlocks')}</td><td>${t('house.pdf.unitBlocks') || 'Blocks'}</td><td>${safe(wallEstimate.numberOfBlocks)}</td><td></td><td></td></tr>
            <tr><td>11</td><td>${t('house.output.priceForBlocks')}</td><td>FCFA</td><td></td><td></td><td>${safe((wallEstimate.numberOfBlocks || 0) * (parseFloat(pricePerBlock) || 0))}</td></tr>
            <tr><td></td><td>${t('house.pdf.subtotal') || 'Subtotal'}</td><td>FCFA</td><td></td><td></td><td>${safe(foundationSubtotal)}</td></tr>
          </table>
        </div>

        <div class="section-block">
          <div class="section-title">${t('house.elevation')}</div>
          <table>
            <tr class="table-header">
              <th>#</th>
              <th>${t('house.pdf.description')}</th>
              <th>${t('house.pdf.unit')}</th>
              <th>${t('house.pdf.quantity')}</th>
              <th>${t('house.pdf.unitPrice')}</th>
              <th>${t('house.pdf.total')}</th>
            </tr>
            <tr><td>1</td><td>${t('house.output.dryMortarVolume')}</td><td>m³</td><td>${safe(elevationEstimate.dryMortarVol)}</td><td></td><td></td></tr>
            <tr><td>2</td><td>${t('house.output.cementVolumeFromMortar')}</td><td>m³</td><td>${safe(elevationEstimate.dryMortarCementVol)}</td><td></td><td></td></tr>
            <tr><td>3</td><td>${t('house.output.sandVolumeFromMortar')}</td><td>m³</td><td>${safe(elevationEstimate.dryMortarSandVol)}</td><td></td><td></td></tr>
            <tr><td>4</td><td>${t('house.output.beamDryConcreteVolume')}</td><td>m³</td><td>${safe(elevationEstimate.beamdryVolume)}</td><td></td><td></td></tr>
            <tr><td>5</td><td>${t('house.output.columnDryConcreteVolume')}</td><td>m³</td><td>${safe(elevationEstimate.columndryVolume)}</td><td></td><td></td></tr>
            <tr><td>6</td><td>${t('house.output.dryConcreteVolume')}</td><td>m³</td><td>${safe(elevationEstimate.dryConcreteVolume)}</td><td></td><td></td></tr>
            <tr><td>7</td><td>${t('house.output.sandVolumeFromConcrete')}</td><td>m³</td><td>${safe(elevationEstimate.concreteSandVol)}</td><td></td><td></td></tr>
            <tr><td>8</td><td>${t('house.output.cementVolumeFromConcrete')}</td><td>m³</td><td>${safe(elevationEstimate.concreteCementVol)}</td><td></td><td></td></tr>
            <tr><td>9</td><td>${t('house.output.gravelVolumeFromConcrete')}</td><td>m³</td><td>${safe(elevationEstimate.concreteGravelVol)}</td><td></td><td></td></tr>
            <tr><td>10</td><td>${t('house.output.totalNumberOfBlocks')}</td><td>${t('house.pdf.unitBlocks') || 'Blocks'}</td><td>${safe(elevationEstimate.blockNumber)}</td><td></td><td></td></tr>
            <tr><td>11</td><td>${t('house.output.totalBlockCost')}</td><td>FCFA</td><td></td><td></td><td>${safe(elevationEstimate.totalBlockCost)}</td></tr>
            <tr><td>12</td><td>${t('house.output.totalPricePerM3')}</td><td>FCFA</td><td></td><td></td><td>${safe(elevationEstimate.totalPricePerM3Elevation)}</td></tr>
            <tr><td>13</td><td>${t('house.output.totalEleRods')}</td><td>${t('house.pdf.unitRods') || 'Rods'}</td><td>${safe(elevationEstimate.totalEleRods != null ? Number(elevationEstimate.totalEleRods).toFixed(2) : '')}</td><td></td><td></td></tr>
            <tr><td></td><td>${t('house.pdf.subtotal') || 'Subtotal'}</td><td>FCFA</td><td></td><td></td><td>${safe(elevationSubtotal)}</td></tr>
          </table>
        </div>

        <div class="section-block">
          <div class="section-title">${t('house.roofing')}</div>
          <table>
            <tr class="table-header">
              <th>#</th>
              <th>${t('house.pdf.description')}</th>
              <th>${t('house.pdf.unit')}</th>
              <th>${t('house.pdf.quantity')}</th>
              <th>${t('house.pdf.unitPrice')}</th>
              <th>${t('house.pdf.total')}</th>
            </tr>
            <tr>
              <td>1</td>
              <td>${t('estimate.roofing.ceilingBoards')}</td>
              <td>Boards</td>
              <td>${safe(roofingEstimate?.numberOfCeilingBoards)}</td>
              <td>${safe(pricePerCeilingBoardM)}</td>
              <td>${safe(roofingEstimate?.ceilingCost != null ? roofingEstimate.ceilingCost.toFixed(2) : '')}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>${t('estimate.roofing.roofingSheets')}</td>
              <td>Sheets</td>
              <td>${safe(roofingEstimate?.numberOfRoofingSheets)}</td>
              <td>${safe(pricePerRoofingSheet)}</td>
              <td>${safe(roofingEstimate?.sheetsCost != null ? roofingEstimate.sheetsCost.toFixed(2) : '')}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>${t('estimate.roofing.purlins')}</td>
              <td>Purlins</td>
              <td>${safe(roofingEstimate?.numberOfPurlins)}</td>
              <td>${safe(pricePerPurlin)}</td>
              <td>${safe(roofingEstimate?.purlinsCost != null ? roofingEstimate.purlinsCost.toFixed(2) : '')}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>${t('estimate.roofing.rafters')}</td>
              <td>${t('estimate.roofing.raftersUnit')}</td>
              <td>${safe(roofingEstimate?.numberOfBoards)}</td>
              <td>${safe(pricePerBoard)}</td>
              <td>${safe(roofingEstimate?.boardsCost != null ? roofingEstimate.boardsCost.toFixed(2) : '')}</td>
            </tr>
          </table>
        </div>

        <div class="section-block">
          <div class="section-title">${t('house.costSummary')}</div>
          <table>
            <tr class="table-header">
              <th>#</th>
              <th>${t('house.pdf.description')}</th>
              <th>${t('house.pdf.unit')}</th>
              <th>${t('house.pdf.quantity')}</th>
              <th>${t('house.pdf.unitPrice')}</th>
              <th>${t('house.pdf.total')}</th>
            </tr>
            <tr>
              <td>1</td>
              <td>${t('projects.summary.totalCost')}</td>
              <td>FCFA</td>
              <td></td>
              <td></td>
              <td>${Number(grandTotal).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>${t('projects.summary.labourEstimate')}</td>
              <td>FCFA</td>
              <td></td>
              <td></td>
              <td>${Number(labourEst).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>${t('house.pdf.grandTotal') || 'Grand Total'}</td>
              <td>FCFA</td>
              <td></td>
              <td></td>
              <td>${Number(grandTotalWithLabour).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
            </tr>
          </table>
        </div>
      </body>
    </html>
    `;
    return htmlContent;
  };

  const handleExport = async () => {
    if (!isExportReady()) {
      Alert.alert(t('house.alert.completeAllInputsToExport') || t('house.alert.roofingExport'));
      return;
    }
    // Ensure outputs are up-to-date before exporting
    calculateEstimates();
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

        // Persist PDF uri for export-from-card later
        const existing =
          projectId
            ? projects.find((p) => p.id === projectId && p.type === 'single-house')
            : undefined;
        const totalMaterialCost =
          (parseFloat(totalFoundationEstimate.totalPricePerM3) || 0) +
          ((wallEstimate.numberOfBlocks || 0) * (parseFloat(pricePerBlock) || 0)) +
          (parseFloat(elevationEstimate.totalBlockCost) || 0) +
          (parseFloat(elevationEstimate.totalPricePerM3Elevation) || 0);
        const labourCost = totalMaterialCost * 0.2;
        const summary = [
          { label: 'projects.summary.totalDryConcreteVolume', value: String(totalFoundationEstimate.totalDryConcreteVolume ?? ''), unit: 'm³' },
          { label: 'projects.summary.totalDryMortarVolume', value: String(totalFoundationEstimate.totalDryMortarVolume ?? ''), unit: 'm³' },
          { label: 'projects.summary.roofingBoards', value: String(roofingEstimate?.numberOfBoards ?? ''), unit: 'projects.summary.unitBoards' },
          { label: 'projects.summary.totalCost', value: String(Math.round(totalMaterialCost)), unit: 'FCFA' },
          { label: 'projects.summary.labourEstimate', value: String(Math.round(labourCost)), unit: 'FCFA' },
        ];
        const title = projectName.trim() || t('projects.defaultTitle.single') || 'Single Storey House Estimate';
        const projectData = {
          type: 'single-house' as const,
          title,
          summary,
          data: {
            meta: { complete: true },
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
              pricePerRoofingSheet, pricePerCeilingBoardM, pricePerBoard, pricePerPurlin,
            },
            outputs: { footingEstimate, columnEstimate, beamEstimate, wallEstimate, totalFoundationEstimate, elevationEstimate, roofingEstimate },
            pdfUri: shareUri,
          },
        };
        if (existing) {
          await updateProject({ ...existing, ...projectData, id: existing.id, createdAt: existing.createdAt });
        } else {
          await addProject(projectData);
        }

        await Sharing.shareAsync(shareUri, {
          mimeType: 'application/pdf',
          dialogTitle: t('house.exportAll'),
        });
      }
    } catch (error) {
      console.error('Failed to export:', error);
      Alert.alert(t('projects.export.failed'));
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
              <FoundationInputsSection
                footingLength={footingLength}
                footingWidth={footingWidth}
                footingThickness={footingThickness}
                numberFootings={numberFootings}
                numberRodsPerFooting={numberRodsPerFooting}
                columnLength={columnLength}
                columnWidth={columnWidth}
                columnHeight={columnHeight}
                numberColumns={numberColumns}
                numberRodsPerColumn={numberRodsPerColumn}
                beamLength={beamLength}
                beamWidth={beamWidth}
                beamHeight={beamHeight}
                numerRodsPerBeam={numerRodsPerBeam}
                wallLength={wallLength}
                wallWidth={wallWidth}
                wallHeight={wallHeight}
                blockLength={blockLength}
                blockWidth={blockWidth}
                blockHeight={blockHeight}
                pricePerM3={pricePerM3}
                pricePerBlock={pricePerBlock}
                onChangeFootingLength={setFootingLength}
                onChangeFootingWidth={setFootingWidth}
                onChangeFootingThickness={setFootingThickness}
                onChangeNumberFootings={setNumberFootings}
                onChangeNumberRodsPerFooting={setNumberRodsPerFooting}
                onChangeColumnLength={setColumnLength}
                onChangeColumnWidth={setColumnWidth}
                onChangeColumnHeight={setColumnHeight}
                onChangeNumberColumns={setNumberColumns}
                onChangeNumberRodsPerColumn={setNumberRodsPerColumn}
                onChangeBeamLength={setBeamLength}
                onChangeBeamWidth={setBeamWidth}
                onChangeBeamHeight={setBeamHeight}
                onChangeNumerRodsPerBeam={setNumerRodsPerBeam}
                onChangeWallLength={setWallLength}
                onChangeWallWidth={setWallWidth}
                onChangeWallHeight={setWallHeight}
                onChangeBlockLength={setBlockLength}
                onChangeBlockWidth={setBlockWidth}
                onChangeBlockHeight={setBlockHeight}
                onChangePricePerM3={setPricePerM3}
                onChangePricePerBlock={setPricePerBlock}
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
            <RoofingInputsSection
              houseLength={houseLength}
              houseWidth={houseWidth}
              rise={rise}
              run={run}
              span={span}
              pricePerRoofingSheet={pricePerRoofingSheet}
              pricePerCeilingBoardM={pricePerCeilingBoardM}
              pricePerPurlin={pricePerPurlin}
              pricePerBoard={pricePerBoard}
              onChangeHouseLength={setHouseLength}
              onChangeHouseWidth={setHouseWidth}
              onChangeRise={setRise}
              onChangeRun={setRun}
              onChangeSpan={setSpan}
              onChangePricePerRoofingSheet={setPricePerRoofingSheet}
              onChangePricePerCeilingBoardM={setPricePerCeilingBoardM}
              onChangePricePerPurlin={setPricePerPurlin}
              onChangePricePerBoard={setPricePerBoard}
            />
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
            <HouseOutputTabs current={outputTab} onChange={setOutputTab} styles={styles} />
            <View style={tableStyles.container}>
              {outputTab === 'FoundationOutput' && (
                /* ======= Foundation ======= */
                <>
                  <View style={tableStyles.row}>
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
                      {t('house.foundation')}
                    </Text>
                  </View>
                  {/* Row 1 */}
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeaderLeft}>{t('house.pdf.material')}</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeader}>{t('house.pdf.quantity')}</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeader}>{t('house.pdf.unit')}</Text>
                    </View>
                  </View>
                  
                  {/* total foundation estimate */}
                  <>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.totalDryConcreteVolume')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalDryConcreteVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.sandVolumeFromConcrete')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalSandConcreteVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.cementVolumeFromConcrete')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalCementConcreteVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.gravelVolumeFromConcrete')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalGravelConcreteVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.totalDryMortarVolume')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalDryMortarVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.sandVolumeFromMortar')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalDrySandVolFromMortarVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.cementVolumeFromMortar')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalDryCementFromMortarVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.totalPricePerM3')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalPricePerM3}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>FCFA</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.totalNumberOf12mRods')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{totalFoundationEstimate.totalRods}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>Rods</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.totalNumberOfBlocks')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{wallEstimate.numberOfBlocks}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>Blocks</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.priceForBlocks')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{wallEstimate.numberOfBlocks * pricePerBlock}</Text>
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
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
                      {t('house.elevation')}
                    </Text>
                  </View>
                  <>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.columnHeaderLeft, { color: colors.heading_text }]}>
                          {t('house.pdf.material')}
                        </Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('house.pdf.quantity')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('house.pdf.unit')}</Text>
                      </View>
                    </View>

                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          {t('house.output.dryVolumeOfMortar')}
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
                        <Text style={tableStyles.cellLeft}>{t('house.output.cementVolumeFromMortar')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{elevationEstimate.dryMortarCementVol}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.sandVolumeFromMortar')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{elevationEstimate.dryMortarSandVol}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.beamDryConcreteVolume')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{elevationEstimate.beamdryVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.columnDryConcreteVolume')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{elevationEstimate.columndryVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.dryConcreteVolume')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{elevationEstimate.dryConcreteVolume}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>m³</Text>
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
                      {t('house.roofing')}
                    </Text>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeaderLeft, { color: colors.heading_text }]}>{t('house.pdf.material')}</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('house.pdf.quantity')}</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={[tableStyles.columnHeader, { color: colors.heading_text }]}>{t('house.pdf.unit')}</Text>
                    </View>
                  </View>
                  <>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                          {t('house.output.numberOfCeilingBoards')}
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
                        <Text style={tableStyles.cellLeft}>{t('house.output.numberOfPurlins')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{roofingEstimate.numberOfPurlins}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>Purlins</Text>
                      </View>
                    </View>
                    <View style={tableStyles.row}>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cellLeft}>{t('house.output.numberOfBoards')}</Text>
                      </View>
                      <View style={tableStyles.column}>
                        <Text style={tableStyles.cell}>{roofingEstimate.numberOfBoards}</Text>
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
                    <Text style={[tableStyles.columnHeaderSingle, { color: colors.heading_text }]}>
                      {t('house.all')} {t('house.outputs')}
                    </Text>
                  </View>
                  <View style={tableStyles.row}>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeaderLeft}>{t('house.pdf.material')}</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeader}>{t('house.pdf.quantity')}</Text>
                    </View>
                    <View style={tableStyles.column}>
                      <Text style={tableStyles.columnHeader}>{t('house.pdf.unit')}</Text>
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
                            Cost of Ceiling Boards
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {roofingEstimate.ceilingCost}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
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
                            Cost of Roofing Sheets
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {roofingEstimate.sheetsCost}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
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
                            Cost of Purlins
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {roofingEstimate.purlinsCost}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
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
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            Cost of Boards
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {roofingEstimate.boardsCost}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                        </View>
                      </View>
                    </>
                    {/* Cost summary */}
                    <>
                      <View style={tableStyles.row}>
                        <Text style={[tableStyles.columnSubHeader, { color: colors.heading_text }]}>
                          {t('house.costSummary')}:
                        </Text>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            {t('projects.summary.totalCost')}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {(
                              (parseFloat(totalFoundationEstimate.totalPricePerM3) || 0) +
                              ((wallEstimate.numberOfBlocks || 0) * (parseFloat(pricePerBlock) || 0)) +
                              (parseFloat(elevationEstimate.totalBlockCost) || 0) +
                              (parseFloat(elevationEstimate.totalPricePerM3Elevation) || 0)
                            ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
                        </View>
                      </View>
                      <View style={tableStyles.row}>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cellLeft, { color: colors.heading_text }]}>
                            {t('projects.summary.labourEstimate')}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>
                            {(
                              ((parseFloat(totalFoundationEstimate.totalPricePerM3) || 0) +
                                ((wallEstimate.numberOfBlocks || 0) * (parseFloat(pricePerBlock) || 0)) +
                                (parseFloat(elevationEstimate.totalBlockCost) || 0) +
                                (parseFloat(elevationEstimate.totalPricePerM3Elevation) || 0)) *
                              0.2
                            ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </Text>
                        </View>
                        <View style={tableStyles.column}>
                          <Text style={[tableStyles.cell, { color: colors.heading_text }]}>FCFA</Text>
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
                <ButtonPrimary
                  title={t('house.exportAll')}
                  onPress={handleExport}
                  loading={exporting}
                  disabled={!isExportReady()}
                />
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
