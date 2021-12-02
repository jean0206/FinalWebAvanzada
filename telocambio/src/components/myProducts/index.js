import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Like from '../../assets/icons/likeBlack.png';
import LikeRed from '../../assets/icons/likeHearth.png';
import {useNavigation} from '@react-navigation/native';
import Box from '../../assets/icons/box1.png'

const Product = ({image, nameProduct, description, goal, category,images, id}) => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation();

  const getProps = () => {
    navigation.navigate('User', {
      screen: 'myOfferProduct',
      params: {
        name: nameProduct,
        description: description,
        goal: goal,
        category: category,
        images: images,
        id:id
      },
    });
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
        <View style={{flexDirection:'row', justifyContent: 'space-between',marginLeft: 10,marginRight:20}}>
          <Text style={styles.nameProduct}>{nameProduct}</Text>
          <Image source={Box} style={{width:25,height:25}}/>
        </View>
        <View style={styles.actionsContainer}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
          <TouchableOpacity onPress={getProps} style={styles.buttonView}>
            <Text style={styles.buttonText}>Ver ofertas</Text>
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
    width: 100,
    height: 28,
    backgroundColor: '#6670fd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  likeIcon: {
    width: 20,
    height: 20,
    overflow: 'hidden',
  },
  likeContainer: {
    width: 25,
    height: 25,
    padding: 3,
  },
  categoryContainer: {
    width: 90,
    height: 30,
    backgroundColor: 'rgba(167,137,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  categoryText: {
    fontFamily: 'Montserrat-Light',
    color: '#6670FD',
  },
});

export default Product;
