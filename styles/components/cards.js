import { StyleSheet } from 'react-native';
import { light_bg_blue, primary_color } from '../colors';
import { border_radius_22, border_radius_8 } from '../global';

const longCardStyles = StyleSheet.create({
  longCardContainer: {
    flex: 1,
  },
  title: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  longCardBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: light_bg_blue,
    padding: 10,
    marginBottom: 8,
    marginTop: 8,
    borderRadius: border_radius_8,
  },
  chevron_right: {
    marginLeft: 'auto',
  },
});

const wideCardStyles = StyleSheet.create({
  wideCardContainer: {
    paddingTop: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wideCardBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: light_bg_blue,
    borderRadius: border_radius_22,
    padding: 22,
    marginBottom: 10,
    width: '48%',
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'capitalize',
  },
});

export { longCardStyles, wideCardStyles };
