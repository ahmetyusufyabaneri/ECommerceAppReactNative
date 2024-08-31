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
import Feather from 'react-native-vector-icons/Feather';
import Container from '../container/Container';
import Cart from '../components/Cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyCartScreen = () => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();

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
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    getDataFromDataBase();
  }, [navigation]);

  return (
    <Container style={{position: 'relative'}}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack('Home')}
            style={styles.iconContainer}>
            <Feather name="chevron-left" size={28} color={Colors.black} />
          </TouchableOpacity>
          <Text>Order Details</Text>
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
                />
              ))
            : null}
        </View>
        <View style={{marginVertical: 16, flexDirection: 'column', gap: 20}}>
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
                <Ionicons name="location-sharp" size={16} color={Colors.blue} />
              </View>
              <View>
                <Text>Finland</Text>
                <Text>16-002, Helsinki</Text>
              </View>
            </View>
            <View>
              <Feather name="chevron-right" size={26} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 16, flexDirection: 'column', gap: 20}}>
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
      </ScrollView>
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
