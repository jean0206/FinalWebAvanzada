import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../../components/productCard';
import SavedImage from '../../assets/images/saved.png';
import {HMSBanner} from '@hmscore/react-native-hms-ads';

const Saved = () => {
  const [savedProducts, setSavedProducts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getProducts = async () => {
        try {
          const products = await AsyncStorage.getItem('products');
          console.log(products);
          if (products) {
            const allProducts = JSON.parse(products);
            setSavedProducts(allProducts);
            console.log(allProducts);
          }
        } catch (error) {}
      };
      getProducts();

      return () => console.log('Sisa');
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Productos guardados</Text>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
          {savedProducts && savedProducts.length !== 0 ? (
            <View style={styles.scrollContainer}>
              <ScrollView
                contentContainerStyle={{ alignItems: 'center'}}>
                {savedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    nameProduct={product.nameProduct}
                    image={product.images[0]}
                    description={product.description}
                    goal={product.goal}
                    id={product.id}
                    category={product.category}
                    images={product.images}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image source={SavedImage} style={styles.voidImage} />
            </View>
          )}
        </ScrollView>
        <HMSBanner
          adId="m47s7mld5l"
          style={{height: 50, marginBottom:5}}
          onAdLoaded={_ => {
            console.log('HMSBanner onAdLoaded');
          }}
          onAdFailed={e => {
            console.warn('HMSBanner onAdFailed', e.nativeEvent);
          }}
        />
      </View>
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
  scrollContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 80,
  },
  voidImage: {
    width: 400,
    height: 400,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Saved;
