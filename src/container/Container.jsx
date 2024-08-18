import {View} from 'react-native';
import React from 'react';
import {Colors} from '../themes/Colors';

const Container = ({children, style}) => {
  return (
    <View
      style={[{flex: 1, padding: 16, backgroundColor: Colors.white}, style]}>
      {children}
    </View>
  );
};

export default Container;
