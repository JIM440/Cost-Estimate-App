export type RoofInputModel = {
  houseLength: number;
  houseWidth: number;
  rise: number;
  run: number;
  span: number;
  roofOverhang?: number;
  numberOfStoreys?: number;
  roofType?: 'gable';
};

export type RoofGeometryResult = {
  rafterLength: number;
  pitchRatio: number;
  pitchDegrees: number;
  roofArea: number;
  ceilingArea: number;
};

export type RoofMaterialConfig = {
  sheetLength: number;
  sheetWidth: number;
  sheetOverlap: number;
  ceilingBoardLength: number;
  ceilingBoardWidth: number;
  rafterSpacing: number;
  purlinSpacing: number;
  purlinStandardLength: number;
};

export type RoofMaterialEstimate = {
  effectiveSheetWidth: number;
  sheetArea: number;
  numberOfSheets: number;
  ceilingBoardArea: number;
  numberOfBoards: number;
  numberOfRafters: number;
  purlinRows: number;
  totalPurlinLength: number;
  numberOfPurlins: number;
};

export type RoofCostInput = {
  sheetUnitPrice: number;
  boardUnitPrice: number;
  purlinUnitPrice: number;
  rafterUnitPrice: number;
  wastePercent?: number;
};

export type RoofCostResult = {
  sheetCost: number;
  boardCost: number;
  purlinCost: number;
  rafterCost: number;
  materialsSubtotal: number;
  waste: number;
  totalCost: number;
};

export type RoofResultModel = {
  inputs: RoofInputModel;
  geometry: RoofGeometryResult;
  materials: RoofMaterialEstimate;
  costs?: RoofCostResult;
};

export const DEFAULT_ROOF_MATERIAL_CONFIG: RoofMaterialConfig = {
  sheetLength: 3,
  sheetWidth: 0.9,
  sheetOverlap: 0.1,
  ceilingBoardLength: 2.4,
  ceilingBoardWidth: 1.2,
  rafterSpacing: 0.6,
  purlinSpacing: 1.0,
  purlinStandardLength: 3,
};

export function computeRoofGeometry(inputs: RoofInputModel): RoofGeometryResult {
  const { houseLength, houseWidth, rise, run } = inputs;

  if (
    houseLength <= 0 ||
    houseWidth <= 0 ||
    rise <= 0 ||
    run <= 0
  ) {
    throw new Error('Please enter valid building dimensions');
  }

  const rafterLength = Math.sqrt(rise * rise + run * run);
  const pitchRatio = rise / run;
  const pitchDegrees = Math.atan(pitchRatio) * (180 / Math.PI);

  // Gable roof: two identical slopes
  const roofArea = 2 * houseLength * rafterLength;
  const ceilingArea = houseLength * houseWidth;

  return {
    rafterLength,
    pitchRatio,
    pitchDegrees,
    roofArea,
    ceilingArea,
  };
}

export function estimateRoofMaterials(
  inputs: RoofInputModel,
  config: RoofMaterialConfig = DEFAULT_ROOF_MATERIAL_CONFIG
): { geometry: RoofGeometryResult; materials: RoofMaterialEstimate } {
  const geometry = computeRoofGeometry(inputs);
  const {
    houseLength,
    span,
  } = inputs;

  const {
    sheetLength,
    sheetWidth,
    sheetOverlap,
    ceilingBoardLength,
    ceilingBoardWidth,
    rafterSpacing,
    purlinSpacing,
    purlinStandardLength,
  } = config;

  const effectiveSheetWidth = sheetWidth - sheetOverlap;
  const sheetArea = sheetLength * effectiveSheetWidth;

  let numberOfSheets = Math.ceil(geometry.roofArea / sheetArea);
  numberOfSheets = Math.ceil(numberOfSheets * 1.05); // 5% waste

  const ceilingBoardArea = ceilingBoardLength * ceilingBoardWidth;
  let numberOfBoards = Math.ceil(geometry.ceilingArea / ceilingBoardArea);
  numberOfBoards = Math.ceil(numberOfBoards * 1.05); // 5% waste

  const numberOfRafters = Math.ceil(houseLength / rafterSpacing) + 1;

  const rafterRows = Math.max(1, Math.ceil(geometry.rafterLength / purlinSpacing));
  const totalPurlinLength = rafterRows * houseLength * 2;
  const numberOfPurlins = Math.ceil(totalPurlinLength / purlinStandardLength);

  return {
    geometry,
    materials: {
      effectiveSheetWidth,
      sheetArea,
      numberOfSheets,
      ceilingBoardArea,
      numberOfBoards,
      numberOfRafters,
      purlinRows: rafterRows,
      totalPurlinLength,
      numberOfPurlins,
    },
  };
}

export function computeRoofCosts(
  materials: RoofMaterialEstimate,
  pricing: RoofCostInput
): RoofCostResult {
  const {
    numberOfSheets,
    numberOfBoards,
    numberOfPurlins,
    numberOfRafters,
  } = materials;

  const {
    sheetUnitPrice,
    boardUnitPrice,
    purlinUnitPrice,
    rafterUnitPrice,
    wastePercent = 0,
  } = pricing;

  const sheetCost = numberOfSheets * Math.max(sheetUnitPrice, 0);
  const boardCost = numberOfBoards * Math.max(boardUnitPrice, 0);
  const purlinCost = numberOfPurlins * Math.max(purlinUnitPrice, 0);
  const rafterCost = numberOfRafters * Math.max(rafterUnitPrice, 0);

  const materialsSubtotal = sheetCost + boardCost + purlinCost + rafterCost;
  const waste = materialsSubtotal * Math.max(wastePercent, 0);
  const totalCost = materialsSubtotal + waste;

  return {
    sheetCost,
    boardCost,
    purlinCost,
    rafterCost,
    materialsSubtotal,
    waste,
    totalCost,
  };
}

export function computeFullRoofEstimate(
  inputs: RoofInputModel,
  pricing?: RoofCostInput,
  config: RoofMaterialConfig = DEFAULT_ROOF_MATERIAL_CONFIG
): RoofResultModel {
  const { geometry, materials } = estimateRoofMaterials(inputs, config);

  const result: RoofResultModel = {
    inputs,
    geometry,
    materials,
  };

  if (pricing) {
    result.costs = computeRoofCosts(materials, pricing);
  }

  return result;
}

