import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../themes/Colors';

const SectionHeader = ({title, count}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.category}>{title}</Text>
        <Text style={styles.categoryCount}>{count}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.button}>See All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  category: {
    fontSize: 18,
    fontWeight: '500',
  },
  categoryCount: {
    fontSize: 15,
    color: Colors.backgroundDark,
  },
  button: {
    fontSize: 18,
    color: Colors.blue,
  },
});
