import { StyleSheet } from 'react-native';
import { light_bg_blue, primary_color, white } from '../colors';
import { border_radius_22, border_radius_8 } from '../global';

const longCardStyles = StyleSheet.create({
  longCardContainer: {
    flex: 1,
  },
  title: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  longCardBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: white,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: border_radius_8,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
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
    backgroundColor: white,
    borderRadius: border_radius_22,
    padding: 10,
    marginBottom: 20,
    paddingVertical: 20,
    width: '30.5%',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  title: {
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

const ColumnLayouts = StyleSheet.create({
  TwoColumn: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  TwoColumnItem: {
    width: '48%',
    marginRight: 10,
    borderColor: 'gray',
  },
});

export { longCardStyles, wideCardStyles, ColumnLayouts };
