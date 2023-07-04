import React from 'react';
import { View } from 'react-native';
import { Box } from 'native-base';

const LEVEL_COLORS = [
  'lightblue',
  'lightyellow',
  'lightcoral'
];

type Props = {
  level: number;
}

export function LevelBars({ level }: Props) {
  const backgroundColor = LEVEL_COLORS[level - 1];

  return (
    <View style={styles.bars}>
      <Box style={[styles.level, styles.level1, { backgroundColor }]} />
      {level > 1 && <Box style={[styles.level, styles.level2, { backgroundColor }]} />}
      {level > 2 && <Box style={[styles.level, styles.level3, { backgroundColor }]} />}
    </View>
  );
}

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  level: {
    width: 4,
    borderRadius: 6,
    marginLeft: 4
  },
  level1: {
    height: 6,
    backgroundColor: 'gray',
  },
  level2: {
    height: 12,
    backgroundColor: 'gray',
  },
  level3: {
    height: 20,
    backgroundColor: 'gray',
  },
});
