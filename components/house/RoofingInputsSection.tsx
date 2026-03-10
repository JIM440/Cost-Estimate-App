import React from 'react';
import { View, Text } from 'react-native';

import { Line, titleStyles } from '../../styles/utility';
import { inputStyles } from '../../styles/components/inputStyles';
import TextInputTitle from '../../components/inputs/InputTitle';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';

type RoofingInputsSectionProps = {
  houseLength: string;
  houseWidth: string;
  rise: string;
  run: string;
  span: string;
  pricePerRoofingSheet?: string;
  pricePerCeilingBoardM?: string;
  pricePerPurlin?: string;
  pricePerBoard?: string;
  onChangeHouseLength: (value: string) => void;
  onChangeHouseWidth: (value: string) => void;
  onChangeRise: (value: string) => void;
  onChangeRun: (value: string) => void;
  onChangeSpan: (value: string) => void;
  onChangePricePerRoofingSheet?: (value: string) => void;
  onChangePricePerCeilingBoardM?: (value: string) => void;
  onChangePricePerPurlin?: (value: string) => void;
  onChangePricePerBoard?: (value: string) => void;
};

const RoofingInputsSection: React.FC<RoofingInputsSectionProps> = (props) => {
  const { colors } = useTheme();
  const { t } = useLocale();

  return (
    <View>
      <Text style={[titleStyles.boldTitle, { color: colors.heading_text }]}>
        {t('house.roofing')}
      </Text>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          title="House Length (m)"
          placeholder="Enter length"
          value={props.houseLength}
          onChange={props.onChangeHouseLength}
        />
        <TextInputTitle
          style={inputStyles.twoColumnInput}
          title="House Width (m)"
          placeholder="Enter width"
          value={props.houseWidth}
          onChange={props.onChangeHouseWidth}
        />
      </View>

      <View style={inputStyles.threeColumn}>
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Rise (m)"
          placeholder="Enter rise"
          value={props.rise}
          onChange={props.onChangeRise}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Run (m)"
          placeholder="Enter run"
          value={props.run}
          onChange={props.onChangeRun}
        />
        <TextInputTitle
          style={inputStyles.threeColumnInput}
          title="Span (m)"
          placeholder="Enter span"
          value={props.span}
          onChange={props.onChangeSpan}
        />
      </View>

      {(props.onChangePricePerRoofingSheet ||
        props.onChangePricePerCeilingBoardM ||
        props.onChangePricePerPurlin ||
        props.onChangePricePerBoard) && (
        <>
          <Line />
          <View style={inputStyles.threeColumn}>
            {props.onChangePricePerRoofingSheet && (
              <TextInputTitle
                style={inputStyles.oneColumnInput}
                title={t('estimate.roofing.pricePerSheet')}
                placeholder={t('common.enterPricePerSheet')}
                value={props.pricePerRoofingSheet ?? ''}
                onChange={props.onChangePricePerRoofingSheet}
              />
            )}
            {props.onChangePricePerCeilingBoardM && (
              <TextInputTitle
                style={inputStyles.oneColumnInput}
                title={t('estimate.roofing.pricePerCeilingM')}
                placeholder={t('common.enterPrice')}
                value={props.pricePerCeilingBoardM ?? ''}
                onChange={props.onChangePricePerCeilingBoardM}
              />
            )}
          </View>

          <View style={inputStyles.threeColumn}>
            {props.onChangePricePerPurlin && (
              <TextInputTitle
                style={inputStyles.oneColumnInput}
                title={t('estimate.roofing.pricePerPurlin')}
                placeholder={t('common.enterPrice')}
                value={props.pricePerPurlin ?? ''}
                onChange={props.onChangePricePerPurlin}
              />
            )}
            {props.onChangePricePerBoard && (
              <TextInputTitle
                style={inputStyles.oneColumnInput}
                title={t('estimate.roofing.pricePerBoard')}
                placeholder={t('common.enterPrice')}
                value={props.pricePerBoard ?? ''}
                onChange={props.onChangePricePerBoard}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default RoofingInputsSection;

