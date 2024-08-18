import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="shopping-bag" size={28} style={styles.shoppingBag} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
        <Ionicons
          name="cart"
          size={28}
          color={Colors.backgroundMedium}
          style={styles.shoppingCart}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shoppingBag: {
    padding: 12,
  },
  shoppingCart: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.backgroundMedium,
    borderRadius: 6,
  },
});
