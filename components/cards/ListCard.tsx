import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { longCardStyles } from '../../styles/components/cards';

export interface ListCardProps {
  title: string;
  meta?: string;
  subtitle?: string; // backwards compatibility
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const ListCard: React.FC<ListCardProps> = ({
  title,
  meta,
  subtitle,
  left,
  right,
  onPress,
  containerStyle,
  titleStyle,
}) => {
  const { colors } = useTheme();

  const content = (
    <View
      style={[
        longCardStyles.longCardBox,
        { backgroundColor: colors.card, 
          borderColor: colors.borderColor, borderWidth: 1 

        },
        containerStyle,
      ]}
    >
      {left ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.center}>
        <Text
          style={[
            longCardStyles.title,
            { color: colors.heading_text },
            titleStyle,
          ]}
        >
          {typeof title === 'string' ? title : ''}
        </Text>
        {(meta || subtitle) && typeof (meta || subtitle) === 'string' ? (
          <Text style={[styles.meta, { color: colors.muted_text, marginLeft: 12 }]}>
            {meta || subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
};

const styles = StyleSheet.create({
  left: {
    marginRight: 12,
  },
  center: {
    flex: 1,
  },
  right: {
    marginLeft: 12,
  },
  meta: {
    fontSize: 13,
    marginTop: 2,
  },
});

export default ListCard;

