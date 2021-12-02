import React from 'react';
import {View, Text, StyleSheet, Image, Touchable, TouchableOpacity} from 'react-native';
import CloseIcon from '../../assets/icons/close.png'

const ImageUpload = ({action,image}) => {
  return (
    <View style={styles.imageContainer}>
        <TouchableOpacity onPress={action} style={styles.deleteContainer}>
            <Image style={styles.icon} source={CloseIcon} />
        </TouchableOpacity>
      <Image
      style={styles.image}
        source={{
          uri: image ||'https://res.cloudinary.com/dcoe4y2fd/image/upload/v1624087131/ldlvbhgvtmb0yvhwax8q.jpg',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 120,
    height: 90,
    backgroundColor: 'black',
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 6,
    marginTop:30,
  },
  image:{
      width: 120,
      height: 90,
      borderRadius: 10,
  },
  deleteContainer: {
      position:'absolute',
      zIndex: 4,
      width:20,
      height: 20,
      backgroundColor:'#FDFDFD',
      borderRadius: 40,
      right:0,
      marginRight: 4,
      justifyContent:'center',
      alignItems:'center',
      marginTop: 2,
  },
  icon: {
      width: 10,
      height: 10,
      resizeMode: 'contain',
  }
});

export default ImageUpload;
