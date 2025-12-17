import React from 'react';
import { View, Text } from 'react-native';
import tableStyles from '../styles/components/table';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
}

export interface TableRow {
  [key: string]: string | number | React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  showHeader?: boolean;
  style?: object;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  showHeader = true,
  style,
}) => {
  const getHeaderStyle = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'left':
        return tableStyles.columnHeaderLeft;
      case 'right':
        return tableStyles.columnHeaderRight;
      default:
        return tableStyles.columnHeader;
    }
  };

  const getCellStyle = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'left':
        return tableStyles.cellLeft;
      case 'right':
        return [tableStyles.cell, { textAlign: 'right' }];
      default:
        return tableStyles.cell;
    }
  };

  return (
    <View style={[tableStyles.container, style]}>
      {showHeader && (
        <View style={tableStyles.row}>
          {columns.map((column, index) => (
            <View key={index} style={tableStyles.column}>
              <Text style={getHeaderStyle(column.headerAlign || column.align)}>
                {column.label}
              </Text>
            </View>
          ))}
        </View>
      )}
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={tableStyles.row}>
          {columns.map((column, colIndex) => (
            <View key={colIndex} style={tableStyles.column}>
              <Text style={getCellStyle(column.align)}>
                {row[column.key] ?? '-'}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Table;

