import React from 'react';
import { View, StyleSheet } from 'react-native';

import ButtonPrimary from '../buttons/Button';
import ButtonOutlined from '../buttons/ButtonOutlined';

type FullHouseStepFooterProps = {
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  showPrevious?: boolean;
  showNext?: boolean;
  loadingNext?: boolean;
  disabledNext?: boolean;
};

const FullHouseStepFooter: React.FC<FullHouseStepFooterProps> = ({
  onPrevious,
  onNext,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  showPrevious = true,
  showNext = true,
  loadingNext = false,
  disabledNext = false,
}) => {
  return (
    <View style={styles.container}>
      {showPrevious ? (
        <View style={styles.buttonWrapper}>
          <ButtonOutlined title={previousLabel} onPress={onPrevious} />
        </View>
      ) : (
        <View style={styles.buttonWrapper} />
      )}

      {showNext ? (
        <View style={styles.buttonWrapper}>
          <ButtonPrimary
            title={nextLabel}
            onPress={onNext || (() => {})}
            loading={loadingNext}
            disabled={disabledNext}
          />
        </View>
      ) : (
        <View style={styles.buttonWrapper} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default FullHouseStepFooter;

