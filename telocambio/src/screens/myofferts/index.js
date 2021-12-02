import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {getAllOfferts} from '../../utils/request';
import {AuthContext} from '../../context/authContext';
import ButtonBack from '../../components/buttonBack';
import Product from '../../components/offertCard';
import Void from '../../assets/images/voidtoo.png';

const MyOfferts = () => {
  const {user} = useContext(AuthContext);
  const [offerts, setOfferts] = useState([]);

  useEffect(() => {
    const request = async () => {
      try {
        const getAll = await getAllOfferts(user.huaweiId);
        console.log(getAll.data);
        setOfferts(getAll.data['allOfferts']);
      } catch (error) {
        console.log(error.message);
      }
    };
    request();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ButtonBack />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Mis ofertas </Text>
      </View>
      {offerts && offerts.length !== 0 ? (
        <View style={{flex: 1, marginBottom:80, marginTop:20}}>
        <ScrollView contentContainerStyle={{flex: 1,alignItems: 'center'}}>
        {offerts.map(product => (
            <Product
              nameProduct={product.name}
              key={product._id}
              price={product.price}
              image={product.photos[0]}
              images={product.photos}
              goal={product.ownerName}
              description={product.description}
              id={product._id}
              productId= {product.productId}
              ownerId = {product.ownerId}
              state= {product.state}
            />
          ))}
        </ScrollView>
          
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{width: 400, height: 500, resizeMode: 'contain'}}
            source={Void}
          />
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
    fontSize: 23,
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
});

export default MyOfferts;
