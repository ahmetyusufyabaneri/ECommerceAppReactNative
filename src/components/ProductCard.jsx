import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';

const ProductCard = ({data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetail', {productID: data?.id})
      }
      style={styles.container}>
      <View style={styles.card}>
        {data?.isOff && (
          <View style={styles.offPercentage}>
            <Text style={styles.offPercentageCount}>%{data.offPercentage}</Text>
          </View>
        )}
        <Image source={data?.productImage} style={styles.cardImage} />
      </View>
      <Text style={styles.productName}>{data?.productName}</Text>
      <Text>{data?.productPrice} $</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: '48%',
  },
  card: {
    backgroundColor: Colors.backgroundLight,
    position: 'relative',
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  offPercentage: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.green,
    padding: 6,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  offPercentageCount: {
    color: Colors.white,
    fontWeight: '700',
  },
  cardImage: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
  },
  productName: {
    color: Colors.black,
    fontWeight: '600',
    marginVertical: 4,
  },
});
