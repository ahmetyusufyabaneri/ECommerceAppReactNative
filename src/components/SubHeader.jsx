import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SubHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop & Service</Text>
      <Text style={styles.text}>Audio shop on Rustaveli Ave 57.</Text>
      <Text style={styles.text}>
        This shop offers both products and services
      </Text>
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 28,
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: 1,
  },
  text: {
    fontSize: 16,
  },
});
