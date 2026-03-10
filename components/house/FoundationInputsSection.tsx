import React from 'react';
import { View, Text } from 'react-native';

import { Line, titleStyles } from '../../styles/utility';
import { inputStyles } from '../../styles/components/inputStyles';
import TextInputTitle from '../../components/inputs/InputTitle';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';

type FoundationInputsSectionProps = {
  footingLength: string;
  footingWidth: string;
  footingThickness: string;
  numberFootings: string;
  numberRodsPerFooting: string;
  columnLength: string;
  columnWidth: string;
  columnHeight: string;
  numberColumns: string;
  numberRodsPerColumn: string;
  beamLength: string;
  beamWidth: string;
  beamHeight: string;
  numerRodsPerBeam: string;
  wallLength: string;
  wallWidth: string;
  wallHeight: string;
  blockLength: string;
  blockWidth: string;
  blockHeight: string;
  pricePerM3: string;
  pricePerBlock: string;
  onChangeFootingLength: (value: string) => void;
  onChangeFootingWidth: (value: string) => void;
  onChangeFootingThickness: (value: string) => void;
  onChangeNumberFootings: (value: string) => void;
  onChangeNumberRodsPerFooting: (value: string) => void;
  onChangeColumnLength: (value: string) => void;
  onChangeColumnWidth: (value: string) => void;
  onChangeColumnHeight: (value: string) => void;
  onChangeNumberColumns: (value: string) => void;
  onChangeNumberRodsPerColumn: (value: string) => void;
  onChangeBeamLength: (value: string) => void;
  onChangeBeamWidth: (value: string) => void;
  onChangeBeamHeight: (value: string) => void;
  onChangeNumerRodsPerBeam: (value: string) => void;
  onChangeWallLength: (value: string) => void;
  onChangeWallWidth: (value: string) => void;
  onChangeWallHeight: (value: string) => void;
  onChangeBlockLength: (value: string) => void;
  onChangeBlockWidth: (value: string) => void;
  onChangeBlockHeight: (value: string) => void;
  onChangePricePerM3: (value: string) => void;
  onChangePricePerBlock: (value: string) => void;
};

const FoundationInputsSection: React.FC<FoundationInputsSectionProps> = (props) => {
  const { colors } = useTheme();
  const { t } = useLocale();

  return (
    <View>
      <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>
        {t('house.foundation')}
      </Text>
      <Line />

      <Text style={{ color: colors.heading_text }}>Footing:</Text>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title={t('house.input.lengthM')}
          value={props.footingLength}
          onChange={props.onChangeFootingLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title={t('house.input.widthM')}
          value={props.footingWidth}
          onChange={props.onChangeFootingWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title={t('house.input.thicknessM')}
          value={props.footingThickness}
          onChange={props.onChangeFootingThickness}
        />
      </View>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          placeholder="Enter Value"
          title={t('house.input.numFootings')}
          value={props.numberFootings}
          onChange={props.onChangeNumberFootings}
        />
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          placeholder="Enter Value"
          title={t('house.input.numRodsPerFooting')}
          value={props.numberRodsPerFooting}
          onChange={props.onChangeNumberRodsPerFooting}
        />
      </View>

      <Line />
      <Text style={{ color: colors.heading_text }}>Column:</Text>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Length"
          value={props.columnLength}
          onChange={props.onChangeColumnLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Width"
          value={props.columnWidth}
          onChange={props.onChangeColumnWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Thickness"
          value={props.columnHeight}
          onChange={props.onChangeColumnHeight}
        />
      </View>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          placeholder="Enter Value"
          title="Number of Columns"
          value={props.numberColumns}
          onChange={props.onChangeNumberColumns}
        />
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          placeholder="Enter Value"
          title="# Rods Per Column"
          value={props.numberRodsPerColumn}
          onChange={props.onChangeNumberRodsPerColumn}
        />
      </View>

      <Line />
      <Text style={{ color: colors.heading_text }}>Beam:</Text>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Beam Length"
          value={props.beamLength}
          onChange={props.onChangeBeamLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Beam Width"
          value={props.beamWidth}
          onChange={props.onChangeBeamWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Beam Height"
          value={props.beamHeight}
          onChange={props.onChangeBeamHeight}
        />
      </View>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          placeholder="Enter Value"
          title="# Rods Per Beam"
          value={props.numerRodsPerBeam}
          onChange={props.onChangeNumerRodsPerBeam}
        />
      </View>

      <TextInputTitle
        placeholder="Enter value"
        title="Price per m³"
        value={props.pricePerM3}
        onChange={props.onChangePricePerM3}
      />

      <Line />

      <Text style={{ color: colors.heading_text }}>Foundation Wall:</Text>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Wall Length"
          value={props.wallLength}
          onChange={props.onChangeWallLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Wall Width"
          value={props.wallWidth}
          onChange={props.onChangeWallWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Wall Height"
          value={props.wallHeight}
          onChange={props.onChangeWallHeight}
        />
      </View>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Block Length"
          value={props.blockLength}
          onChange={props.onChangeBlockLength}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Block Width"
          value={props.blockWidth}
          onChange={props.onChangeBlockWidth}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          placeholder="Enter Value"
          title="Block Height"
          value={props.blockHeight}
          onChange={props.onChangeBlockHeight}
        />
      </View>

      <TextInputTitle
        placeholder="Enter value"
        title="Price Per Block"
        value={props.pricePerBlock}
        onChange={props.onChangePricePerBlock}
      />
    </View>
  );
};

export default FoundationInputsSection;

