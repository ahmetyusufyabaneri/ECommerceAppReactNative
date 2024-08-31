import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Container from '../container/Container';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import {Items} from '../database/Database';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);

  const getData = () => {
    let productList = [];
    let accessoryList = [];

    for (let i = 0; i < Items.length; i++) {
      if (Items[i].category === 'product') {
        productList.push(Items[i]);
        setProducts(productList);
      } else {
        accessoryList.push(Items[i]);
        setAccessories(accessoryList);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <SubHeader />
        <SectionHeader title={'Products'} count={40} />
        <View style={styles.cards}>
          {products.map((data, index) => (
            <ProductCard key={index} data={data} />
          ))}
        </View>
        <SectionHeader title={'Accessories'} count={78} />
        <View style={styles.cards}>
          {accessories.map((data, index) => (
            <ProductCard key={index} data={data} />
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
    rowGap: 20,
  },
});
