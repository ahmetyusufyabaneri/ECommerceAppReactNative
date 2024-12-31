import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../database/Database';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'toastify-react-native';
import Feather from 'react-native-vector-icons/Feather';
import Container from '../container/Container';
import Cart from '../components/Cart';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyCartScreen = () => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    getDataFromDataBase();
  }, [navigation]);

  const getDataFromDataBase = async () => {
    let items = await AsyncStorage.getItem('cartItems');

    items = JSON.parse(items);

    let productData = [];

    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          data.quantity = 1;
          productData.push(data);
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  const getTotal = productData => {
    let total = 0;

    for (let index = 0; index < productData.length; index++) {
      let productPrice =
        productData[index].productPrice * productData[index].quantity;

      total += productPrice;
    }
    setTotal(total);
  };

  const checkout = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }
    navigation.navigate('Home');
  };

  return (
    <Container style={{position: 'relative'}}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack('Home')}
            style={styles.iconContainer}>
            <Feather name="chevron-left" size={28} color={Colors.black} />
          </TouchableOpacity>
          <Text style={{fontSize: 22, fontWeight: '600'}}>Order Details</Text>
        </View>
        <Text style={styles.title}>My Cart</Text>
        <View>
          {product.length > 0
            ? product.map(data => (
                <Cart
                  key={data.id}
                  data={data}
                  product={product}
                  setProduct={setProduct}
                  getDataFromDataBase={getDataFromDataBase}
                  getTotal={getTotal}
                />
              ))
            : null}
        </View>
        <View
          style={{
            marginVertical: 16,
            flexDirection: 'column',
            gap: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>
            Delivery Location
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.backgroundLight,
                }}>
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={16}
                  color={Colors.blue}
                />
              </View>
              <View>
                <Text>Sweden</Text>
                <Text>17-001, Stockholm</Text>
              </View>
            </View>
            <View>
              <Feather name="chevron-right" size={26} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: 16,
            flexDirection: 'column',
            gap: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Payment Method</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.backgroundLight,
                }}>
                <FontAwesome name="cc-visa" size={16} color={Colors.blue} />
              </View>
              <View>
                <Text style={{fontWeight: '700'}}>VISA Classic</Text>
                <Text style={{color: Colors.backgroundDark}}>
                  **** **** **** 3406
                </Text>
              </View>
            </View>
            <View>
              <Feather name="chevron-right" size={26} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 24, gap: 12}}>
          <Text style={{fontSize: 20, fontWeight: '700'}}>Order Info</Text>
          <View style={{marginTop: 8, gap: 12}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: Colors.grey}}>Subtotal</Text>
              <Text style={{fontSize: 15, fontWeight: '500'}}>
                {total}.00 $
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: Colors.grey}}>
                Shopping Cost
              </Text>
              <Text style={{fontSize: 15, fontWeight: '500'}}>
                {total / 20} $
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 16, color: Colors.grey}}>Total</Text>
              <Text style={{fontSize: 20, fontWeight: '500'}}>
                {total + total / 20} $
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          checkout();
          Toast.success('Your order created!');
        }}
        style={{
          backgroundColor: Colors.blue,
          paddingVertical: 16,
          borderRadius: 16,
          marginTop: 16,
        }}>
        <Text
          style={{
            color: Colors.white,
            fontWeight: '600',
            letterSpacing: 1,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
          Checkout ({total + 10}.00 $)
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({
  header: {
    width: '66%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 32,
    marginBottom: 16,
  },
});
