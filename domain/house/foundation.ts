export type FootingInputs = {
  length: number;
  width: number;
  thickness: number;
  count: number;
  rodsPerFooting: number;
};

export type FootingResult = {
  volume: number;
  dryVolume: number;
  sandVolume: number;
  cementVolume: number;
  gravelVolume: number;
  totalRods: number;
};

export function computeFooting(inputs: FootingInputs): FootingResult {
  const { length, width, thickness, count, rodsPerFooting } = inputs;

  const volume = length * width * thickness * count;
  const dryVolume = volume * 1.54;
  const sandVolume = dryVolume * (2 / 4);
  const cementVolume = dryVolume * (1 / 4);
  const gravelVolume = dryVolume * (1 / 4);
  const totalRods = (count * rodsPerFooting * thickness) / 12;

  return {
    volume,
    dryVolume,
    sandVolume,
    cementVolume,
    gravelVolume,
    totalRods,
  };
}

export type ColumnInputs = {
  length: number;
  width: number;
  height: number;
  count: number;
  rodsPerColumn: number;
};

export type ColumnResult = {
  volume: number;
  dryVolume: number;
  sandVolume: number;
  cementVolume: number;
  gravelVolume: number;
  totalRods: number;
};

export function computeColumn(inputs: ColumnInputs): ColumnResult {
  const { length, width, height, count, rodsPerColumn } = inputs;

  const volume = length * width * height * count;
  const dryVolume = volume * 1.54;
  const sandVolume = dryVolume * (2 / 4);
  const cementVolume = dryVolume * (1 / 4);
  const gravelVolume = dryVolume * (1 / 4);
  const totalRods = (count * rodsPerColumn * length) / 12;

  return {
    volume,
    dryVolume,
    sandVolume,
    cementVolume,
    gravelVolume,
    totalRods,
  };
}

export type BeamInputs = {
  length: number;
  width: number;
  height: number;
  rodsPerBeam: number;
};

export type BeamResult = {
  volume: number;
  dryVolume: number;
  sandVolume: number;
  cementVolume: number;
  gravelVolume: number;
  totalRods: number;
};

export function computeBeam(inputs: BeamInputs): BeamResult {
  const { length, width, height, rodsPerBeam } = inputs;

  const volume = length * width * height;
  const dryVolume = volume * 1.54;
  const sandVolume = dryVolume * (2 / 4);
  const cementVolume = dryVolume * (1 / 4);
  const gravelVolume = dryVolume * (1 / 4);
  const totalRods = (rodsPerBeam * length) / 12;

  return {
    volume,
    dryVolume,
    sandVolume,
    cementVolume,
    gravelVolume,
    totalRods,
  };
}

export type WallInputs = {
  length: number;
  width: number;
  height: number;
  blockLength: number;
  blockWidth: number;
  blockHeight: number;
};

export type WallResult = {
  volume: number;
  dryVolume: number;
  sandVolume: number;
  cementVolume: number;
  numberOfBlocks: number;
};

export function computeWall(inputs: WallInputs): WallResult {
  const { length, width, height, blockLength, blockWidth, blockHeight } =
    inputs;

  const volume = length * width * height;
  const dryVolume = volume * 1.33;
  const sandVolume = dryVolume * (3 / 4);
  const cementVolume = dryVolume * (1 / 4);

  const blockVolume = blockLength * blockWidth * blockHeight;
  const numberOfBlocks = Math.ceil(volume / blockVolume);

  return {
    volume,
    dryVolume,
    sandVolume,
    cementVolume,
    numberOfBlocks,
  };
}

