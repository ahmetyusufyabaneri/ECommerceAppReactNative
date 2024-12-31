import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Items} from '../database/Database';
import {Colors} from '../themes/Colors';
import {Toast} from 'toastify-react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Container from '../container/Container';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = () => {
  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  const position = Animated.divide(scrollX, width);

  const navigation = useNavigation();

  const route = useRoute();
  const {productID} = route.params;

  const [product, setProduct] = useState([]);

  const getData = () => {
    const product = Items.find(item => item.id == productID);
    if (product) {
      setProduct(product);
      return;
    }
  };

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (error) {
  //     return error;
  //   }
  // };

  useEffect(() => {
    getData();
    // clearAsyncStorage();
  }, [navigation]);

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');

    itemArray = JSON.parse(itemArray);

    if (itemArray) {
      let array = itemArray;
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  const calculateDiscount =
    (product.productPrice * product.offPercentage) / 100;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{backgroundColor: Colors.backgroundLight}}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Feather name="chevron-left" size={28} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            renderItem={({item}) => (
              <View style={{width: width, height: 250}}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={item}
                />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 16,
            }}>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 2,
                        backgroundColor: Colors.backgroundDark,
                        marginHorizontal: 4,
                        opacity,
                      }}></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <Container style={{flexDirection: 'col', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <FontAwesome name="shopping-cart" size={22} color={Colors.blue} />
            <Text style={{fontSize: 14}}>Shopping</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.2,
                width: '80%',
              }}>
              {product.productName}
            </Text>
            <TouchableOpacity
              style={{
                width: 45,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: Colors.backgroundLight,
              }}>
              <Entypo name="link" size={28} color={Colors.blue} />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 14, fontWeight: '500'}}>
            {product.description}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: Colors.backgroundLight,
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
                <Text>Sweden</Text>
                <Text>17-001, Stockholm</Text>
              </View>
            </View>
            <View>
              <Feather name="chevron-right" size={26} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              marginHorizontal: 'auto',
              gap: 4,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {product.productPrice} $
            </Text>
            {product.isOff && (
              <Text style={{fontSize: 16}}>
                Tax Rate {product.offPercentage}% - {calculateDiscount}$ (
                {product.productPrice + calculateDiscount}$)
              </Text>
            )}
          </View>
        </Container>
      </ScrollView>
      {product.isAvailable ? (
        <TouchableOpacity
          onPress={() => {
            addToCart(product.id);
            Toast.success('Product added to cart', 'top');
          }}
          style={{
            width: '90%',
            marginHorizontal: 'auto',
            marginBottom: 8,
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
            Add to Cart
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: '90%',
            marginHorizontal: 'auto',
            marginBottom: 8,
            backgroundColor: Colors.blue,
            paddingVertical: 16,
            borderRadius: 16,
            marginTop: 16,
            opacity: 0.6,
          }}
          disabled={true}>
          <Text
            style={{
              color: Colors.white,
              fontWeight: '600',
              letterSpacing: 1,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            Not Available
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconContainer: {
    width: '100%',
    paddingTop: 16,
    paddingLeft: 16,
  },
});
