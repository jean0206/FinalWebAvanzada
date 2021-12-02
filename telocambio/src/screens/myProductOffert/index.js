import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Product from '../../components/offertCard';
import {getOffert} from '../../utils/request';
import Void from '../../assets/images/voidtoo.png';
import ButtonBack from '../../components/buttonBack';

const MyProductOffert = ({route, navigation}) => {
  const [offerts, setOfferts] = useState([]);
  const {id} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const getProducts = async () => {
        try {
          console.log(id);
          const newOfferts = await getOffert(id);
          setOfferts(newOfferts.data['offerts']);
          console.log(newOfferts.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      getProducts();

      return () => console.log('Sisa');
    }, []),
  );
  return (
    <View style={{flex: 1}}>
      <ButtonBack/>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Mis ofertas</Text>
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
              toggle={true}
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
});

export default MyProductOffert;
