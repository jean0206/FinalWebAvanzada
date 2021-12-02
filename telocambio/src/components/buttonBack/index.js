import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Button from '../../assets/icons/flecha.png';
import { useNavigation } from '@react-navigation/native';

const ButtonBack = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10,
      }}
      onPress={()=>{
          navigation.goBack()
      }}
      >
      <Image
        source={Button}
        style={{
          width: 30,
          height: 30,
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default ButtonBack;
