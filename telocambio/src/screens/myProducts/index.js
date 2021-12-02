import React, {useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {AuthContext} from '../../context/authContext';
import {getProductById} from '../../utils/request';
import {useFocusEffect} from '@react-navigation/native';
import Void from '../../assets/images/void.png';
import Product from '../../components/myProducts';
import ButtonBack from '../../components/buttonBack';

const MyProducts = () => {
  const {user, setUser} = useContext(AuthContext);
  const [ownProducts, setOwnProducts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getProducts = async () => {
        console.log(user.huaweiId);
        try {
          const products = await getProductById(user.huaweiId);
          setOwnProducts(products.data['products']);
          console.log(products.data['products']);
        } catch (error) {
          console.log('SISA');
          console.log(error.message);
        }
      };
      getProducts();

      return () => console.log('Sisa');
    }, []),
  );

  return (
    <View style={styles.screenContainer}>
      <ButtonBack />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Mis productos </Text>
      </View>
      {ownProducts && ownProducts.length !== 0 ? (
        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
            {ownProducts.map(product => (
              <Product
                key={product._id}
                category={product.category}
                id={product._id}
                image={product.photos[0]}
                nameProduct={product.name}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={Void} style={styles.voidImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#282A45',
  },
  voidImage: {
    width: 400,
    height: 400,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 80,
  },
});

export default MyProducts;
