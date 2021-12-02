import React from 'react';
import {View, Text, Image, StyleSheet,} from 'react-native';
import Header from '../../assets/images/header1.png';

const CardHeader = ({image}) => {
  return (
    <>
      <Image source={image} style={styles.cardContainer}/>
    </>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 270,
        height: 163,
        borderRadius: 14,
        overflow: 'hidden',
        marginRight:20,
        marginLeft:20,
        resizeMode: 'contain'
    },
})

export default CardHeader;
