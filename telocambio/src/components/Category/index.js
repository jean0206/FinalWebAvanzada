import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import TecIcon from '../../assets/icons/tec.png';

const Category = ({name, handleChange, image}) => {
  return (
    <TouchableOpacity
      onPress={() => handleChange(name)}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={{width: 40, height: 40}} source={image} />
      </View>
      <Text style={styles.nameCategorie}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 113,
    alignItems: 'center',
    marginRight: 3,
  },
  imageContainer: {
    width: 53,
    height: 53,
    backgroundColor: 'rgba(167, 173, 255, 0.2)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameCategorie: {
    color: '#333333',
    fontFamily: 'Montserrat-Light',
  },
});

export default Category;
