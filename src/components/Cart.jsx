import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../themes/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({data, product, setProduct, getDataFromDataBase, getTotal}) => {
  const navigation = useNavigation();

  const updateQuantity = (id, type) => {
    const updateProduct = product.map(item => {
      if (item.id === id) {
        let newQuantity =
          type === 'dec' ? item.quantity - 1 : item.quantity + 1;

        item.quantity = newQuantity > 0 ? newQuantity : deleteProduct(id);
      }
      return item;
    });
    setProduct(updateProduct);
    getTotal(updateProduct);
  };

  const deleteProduct = async id => {
    let productsArray = await AsyncStorage.getItem('cartItems');
    productsArray = JSON.parse(productsArray);

    if (productsArray) {
      let array = productsArray.filter(product => product !== id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(array));
      getDataFromDataBase();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {productID: data.id})
        }
        style={styles.imageContainer}>
        <Image source={data.productImage} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.productDetail}>
        <Text style={styles.productName}>{data.productName}</Text>
        <Text style={styles.productPrice}>
          {data.productPrice * data.quantity} $
        </Text>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <TouchableOpacity
              onPress={() => updateQuantity(data.id, 'dec')}
              style={styles.iconContainer}>
              <Feather name="minus" size={24} />
            </TouchableOpacity>
            <Text style={styles.count}>{data.quantity}</Text>
            <TouchableOpacity
              onPress={() => updateQuantity(data.id, 'inc')}
              style={styles.iconContainer}>
              <Feather name="plus" size={24} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => deleteProduct(data.id)}
            style={[styles.iconContainer, {backgroundColor: Colors.red}]}>
            <Feather name="trash" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  imageContainer: {
    width: '33%',
    height: 120,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productDetail: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: Colors.backgroundDark,
    marginBottom: 20,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundLight,
    padding: 4,
    borderRadius: 999,
  },
  count: {
    fontSize: 18,
    fontWeight: '300',
  },
});
