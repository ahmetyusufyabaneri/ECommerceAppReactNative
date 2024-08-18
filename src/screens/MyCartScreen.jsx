import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const MyCartScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text onPress={() => navigation.navigate('Home')}>MyCartScreen</Text>
    </View>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({});
