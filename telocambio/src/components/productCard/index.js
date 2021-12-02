import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Like from '../../assets/icons/likeBlack.png';
import LikeRed from '../../assets/icons/likeHearth.png';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCard = ({
  image,
  nameProduct,
  description,
  goal,
  category,
  images,
  id,
  show,
  ownerId
}) => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation();

  const getProps = () => {
    navigation.navigate('Inicio', {
      screen: 'productInfo',
      params: {
        name: nameProduct,
        description: description,
        goal: goal,
        category: category,
        images: images,
        id: id,
        ownerId: ownerId,
      },
    });
  };

  const saveProduct = async () => {
    try {
      if (!like === true) {
        setLike(!like);
        const productSaved = {
          image,
          nameProduct,
          description,
          goal,
          category,
          images,
          id,
        };

        const products = await AsyncStorage.getItem('products');

        if (products) {
          const allProducts = JSON.parse(products);
          const searchProduct = allProducts.find(product =>product.id===id)
          if(!searchProduct) {
            allProducts.push(productSaved);
            await AsyncStorage.setItem('products', JSON.stringify(allProducts));
            console.log(allProducts);
          }
        } else {
          const allProducts = [productSaved];
          await AsyncStorage.setItem('products', JSON.stringify(allProducts));
        }
      } else {
        setLike(!like);
        const products = await AsyncStorage.getItem('products');
        console.log(products);
        if (products) {
          const allProducts = JSON.parse(products);
          const newProducts = allProducts.filter(product => product.id !== id);
          await AsyncStorage.setItem('products', JSON.stringify(newProducts));
          console.log(newProducts);
        }
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.nameProduct}>{nameProduct}</Text>
        </View>
        <View style={styles.actionsContainer}>
          {
            show?
          <TouchableOpacity
            onPress={() => saveProduct()}
            style={styles.likeContainer}>
            <Image style={styles.likeIcon} source={like ? LikeRed : Like} />
          </TouchableOpacity>:<></>
          }
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          <TouchableOpacity onPress={getProps} style={styles.buttonView}>
            <Text style={styles.buttonText}>Ver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 88,
    borderRadius: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 1,
    marginBottom: 10,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  infoContainer: {
    width: 260,
    height: 60,
    justifyContent: 'space-around',
  },
  nameProduct: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#1F2937',
  },
  actionsContainer: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonView: {
    width: 88,
    height: 28,
    backgroundColor: '#6670fd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  likeIcon: {
    width: 20,
    height: 20,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  likeContainer: {
    width: 25,
    height: 25,
    padding: 3,
    resizeMode: 'contain',
  },categoryContainer: {
    width: 90,
    height: 30,
    backgroundColor: 'rgba(167,137,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  categoryText: {
    fontFamily: 'Montserrat-Light',
    color: '#6670FD',
  },
});

export default ProductCard;
