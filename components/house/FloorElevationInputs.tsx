import React from 'react';
import { View, Text } from 'react-native';

import { Line, titleStyles } from '../../styles/utility';
import { inputStyles } from '../../styles/components/inputStyles';
import TextInputTitle from '../../components/inputs/InputTitle';
import { useTheme } from '../../context/ThemeContext';

export type FloorElevationInputsProps = {
  floorLabel: string;
  // wall
  wallLength: string;
  wallWidth: string;
  wallHeight: string;
  onChangeWallLength: (v: string) => void;
  onChangeWallWidth: (v: string) => void;
  onChangeWallHeight: (v: string) => void;

  // block
  blockLength: string;
  blockWidth: string;
  blockHeight: string;
  onChangeBlockLength: (v: string) => void;
  onChangeBlockWidth: (v: string) => void;
  onChangeBlockHeight: (v: string) => void;

  subtractArea: string;
  onChangeSubtractArea: (v: string) => void;

  pricePerBlock: string;
  pricePerM3: string;
  onChangePricePerBlock: (v: string) => void;
  onChangePricePerM3: (v: string) => void;

  // beam
  beamLength: string;
  beamWidth: string;
  beamHeight: string;
  numRodsPerBeam: string;
  onChangeBeamLength: (v: string) => void;
  onChangeBeamWidth: (v: string) => void;
  onChangeBeamHeight: (v: string) => void;
  onChangeNumRodsPerBeam: (v: string) => void;

  // columns
  columnLength: string;
  columnWidth: string;
  columnHeight: string;
  columnNumber: string;
  numRodsPerColumn: string;
  onChangeColumnLength: (v: string) => void;
  onChangeColumnWidth: (v: string) => void;
  onChangeColumnHeight: (v: string) => void;
  onChangeColumnNumber: (v: string) => void;
  onChangeNumRodsPerColumn: (v: string) => void;
};

const FloorElevationInputs: React.FC<FloorElevationInputsProps> = (p) => {
  const { colors } = useTheme();

  return (
    <>
      <Text style={titleStyles.boldTitle}>{p.floorLabel}</Text>
      <Text style={{ color: colors.heading_text }}>Dimension of Wall</Text>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Length (m)"
          placeholder="Enter length"
          value={p.wallLength}
          onChange={p.onChangeWallLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Width (m)"
          placeholder="Enter width"
          value={p.wallWidth}
          onChange={p.onChangeWallWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Height (m)"
          placeholder="Enter height"
          value={p.wallHeight}
          onChange={p.onChangeWallHeight}
        />
      </View>
      <Line />

      <Text style={{ color: colors.heading_text }}>Dimension of Block</Text>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Length (m)"
          placeholder="Enter length"
          value={p.blockLength}
          onChange={p.onChangeBlockLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Width (m)"
          placeholder="Enter width"
          value={p.blockWidth}
          onChange={p.onChangeBlockWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Height (m)"
          placeholder="Enter height"
          value={p.blockHeight}
          onChange={p.onChangeBlockHeight}
        />
      </View>
      <Line />

      <TextInputTitle
        title="Subtract Area (m²)"
        placeholder="Enter area"
        value={p.subtractArea}
        onChange={p.onChangeSubtractArea}
      />

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          title="Price Per Block"
          placeholder="Enter price"
          value={p.pricePerBlock}
          onChange={p.onChangePricePerBlock}
        />
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          title="Price Per m³"
          placeholder="Enter price"
          value={p.pricePerM3}
          onChange={p.onChangePricePerM3}
        />
      </View>
      <Line />

      <Text style={{ color: colors.heading_text }}>Dimension of Beam</Text>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Length (m)"
          placeholder="Enter total beam length"
          value={p.beamLength}
          onChange={p.onChangeBeamLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Width (m)"
          placeholder="Enter width"
          value={p.beamWidth}
          onChange={p.onChangeBeamWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Thickness (m)"
          placeholder="Enter height"
          value={p.beamHeight}
          onChange={p.onChangeBeamHeight}
        />
      </View>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          title="Number of rods per beam"
          placeholder="Enter Value"
          value={p.numRodsPerBeam}
          onChange={p.onChangeNumRodsPerBeam}
        />
      </View>
      <Line />

      <Text style={{ color: colors.heading_text }}>Dimension of Columns</Text>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Length (m)"
          placeholder="Enter length"
          value={p.columnLength}
          onChange={p.onChangeColumnLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Width (m)"
          placeholder="Enter width"
          value={p.columnWidth}
          onChange={p.onChangeColumnWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Height (m)"
          placeholder="Enter height"
          value={p.columnHeight}
          onChange={p.onChangeColumnHeight}
        />
      </View>
      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          title="Number of Columns"
          placeholder="Enter Value"
          value={p.columnNumber}
          onChange={p.onChangeColumnNumber}
        />
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          title="Number of rods per column"
          placeholder="Enter Value"
          value={p.numRodsPerColumn}
          onChange={p.onChangeNumRodsPerColumn}
        />
      </View>
    </>
  );
};

export default FloorElevationInputs;

