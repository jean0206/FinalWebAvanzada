import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import Background from '../../assets/icons/header2.png';
import Logo from '../../assets/images/logohuawei.png';
import {AuthContext} from '../../context/authContext';
import {
  HMSAccountAuthService,
  HMSAuthParamConstants,
  HMSAuthScopeListConstants,
  HMSAuthRequestOptionConstants,
} from '@hmscore/react-native-hms-account';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {verifyUser} from '../../utils/request';

const Login = ({navigation}) => {
  const {user, setUser} = useContext(AuthContext);

  const SignIn = () => {
    let signInData = {
      accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM,
      authRequestOption: [
        HMSAuthRequestOptionConstants.ID_TOKEN,
        HMSAuthRequestOptionConstants.ACCESS_TOKEN,
      ],
      authScopeList: [HMSAuthScopeListConstants.EMAIL],
    };

    HMSAccountAuthService.signIn(signInData)
      .then(response => {
        verifyUser(response.openId)
          .then( async customer => {
            console.log(customer.data)
            if(customer.data['oldUser']){
              setUser({
                auth: true,
                huaweiId: response.openId,
                name: response.displayName || "",
                email: response.email || "",
                photoPerfil: response.avatarUriString || "",
                country: customer.data["user"].country,
                city: customer.data["user"].city,
                state: customer.data["user"].state,
              });
              try {
                const jsonValue = JSON.stringify({
                  auth: true,
                  huaweiId: response.openId,
                  name: response.displayName || "",
                  email: response.email || "",
                  photoPerfil: response.avatarUriString || "",
                  country: customer.data["user"].country,
                  city: customer.data["user"].city,
                  state: customer.data["user"].state,
                })
                await AsyncStorage.setItem('user',jsonValue)
              } catch (error) {
                console.log(error.message);
              }
              console.log(response.displayName);
              navigation.navigate('Info');
            }else{
              setUser({
                auth: false,
                huaweiId: response.openId,
                name: response.displayName || "",
                email: response.email || "",
                photoPerfil: response.avatarUriString || "",
              });
              navigation.navigate('configinital');
            }
          })
          .catch(err => console.log(err.message));
        
      })
      .catch(err => {
        console.log(err);
      });

    /*
      setUser({auth:true,huaweiId:''})
      navigation.navigate("Info")*/
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.header} source={Background} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={SignIn} style={styles.button}>
          <Image style={styles.imageButton} source={Logo} />
          <Text style={styles.textButton}>Iniciar sesión con huawei</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 335,
    height: 54,
    backgroundColor: '#6670fd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    width: width,
    height: 350,
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 80,
  },
  textButton: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  imageButton: {
    width: 30,
    height: 30,
    marginRight: 6,
  },
});

export default Login;
