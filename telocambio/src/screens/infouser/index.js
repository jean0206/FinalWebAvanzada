import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Notification from '../../assets/icons/notification.png';
import Settings from '../../assets/icons/settings.png';
import UserSettings from '../../assets/icons/settingsuser.png';
import Box from '../../assets/icons/box.png';
import Chat from '../../assets/icons/chat.png';
import Offert from '../../assets/icons/offert.png';
import {AuthContext} from '../../context/authContext';
import {HMSAccountAuthService} from '@hmscore/react-native-hms-account';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {getNotifications} from '../../utils/request';
import {
  HmsLocalNotification,
  HmsPushResultCode,
} from '@hmscore/react-native-hms-push';

const InfoUser = ({navigation}) => {
  const {user, setUser} = useContext(AuthContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getAllNotfications = async () => {
      try {
        pushNotification('Bienvenido de nuevo');
        const response = await getNotifications(user.huaweiId);
        response.data.forEach(notification => {
          pushNotification(notification.text);
        });
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
      setCount(1);
    };
    getAllNotfications();
  }, []);

  const pushNotification = async message => {
    const notification = {
      [HmsLocalNotification.Attr.title]: 'Nueva notificación',
      [HmsLocalNotification.Attr.message]: message, // (required)
      [HmsLocalNotification.Attr.ticker]: 'Nueva notificación de telocambio',
      [HmsLocalNotification.Attr.largeIconUrl]:
        'https://res.cloudinary.com/dcoe4y2fd/image/upload/v1629773087/logo_cambio_iracfj.png',
      [HmsLocalNotification.Attr.smallIcon]: 'ic_notification',
      [HmsLocalNotification.Attr.bigText]: message,
      [HmsLocalNotification.Attr.color]: 'white',
      [HmsLocalNotification.Attr.vibrate]: true,
      [HmsLocalNotification.Attr.vibrateDuration]: 1000,
      [HmsLocalNotification.Attr.tag]: 'hms_tag',
      [HmsLocalNotification.Attr.ongoing]: false,
      [HmsLocalNotification.Attr.importance]:
        HmsLocalNotification.Importance.max,
      [HmsLocalNotification.Attr.dontNotifyInForeground]: false,
      [HmsLocalNotification.Attr.autoCancel]: false,
    };
    // LocalNotification
    HmsLocalNotification.localNotification(notification)
      .then(result => {
        this.log('LocalNotification Default', result);
      })
      .catch(err => {
        console.log(
          '[LocalNotification Default] Error/Exception: ' + JSON.stringify(err),
        );
      });
  };

  const logout = () => {
    HMSAccountAuthService.signOut()
      .then(async () => {
        await setUser({
          auth: false,
          huaweiId: '',
          name: '',
          email: '',
          photoPerfil: '',
          city: '',
          state: '',
          country: '',
        });
        try {
          await AsyncStorage.removeItem('user')
        } catch (error) {
          console.log(error.message);
        }
        console.log('signOut -> Success');
        navigation.navigate('Login');
        console.log('Hola');
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.userInfo}>
        <Image
          style={styles.infoImage}
          source={{
            uri:
              user.photoPerfil !== ''
                ? user.photoPerfil
                : 'https://static.vecteezy.com/system/resources/previews/000/500/239/non_2x/vector-users-icon-design.jpg',
          }}
        />
        <View>
          <Text style={styles.textName}>
            {user.name !== '' ? user.name : 'User'}
          </Text>
          <Text style={styles.email}>
            {user.email !== '' ? user.email : 'user@telocambio.com'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Noti')}
          style={styles.iconcontainer}>
          <Image style={styles.icon} source={Notification} />
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('User', {screen: 'myproducts'})}
        style={styles.userInfo}>
        <Image style={styles.settingsImage} source={UserSettings} />
        <View>
          <Text style={styles.textName}>Mis productos</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('User', {screen: 'myproducts'})}
          style={styles.iconcontainer}>
          <Image style={styles.icon} source={Box} />
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('User', {screen: 'myofferts'})}
        style={styles.userInfo}>
        <Image style={styles.settingsImage} source={UserSettings} />
        <View>
          <Text style={styles.textName}>Mis ofertas</Text>
        </View>
        <TouchableOpacity
          
          style={styles.iconcontainer}>
          <Image style={styles.icon} source={Offert} />
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('User', {screen: 'listchat'})}
        style={styles.userInfo}>
        <Image style={styles.settingsImage} source={UserSettings} />
        <View>
          <Text style={styles.textName}>Chats</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('User', {screen: 'listchat'})}
          style={styles.iconcontainer}>
          <Image style={styles.icon} source={Chat} />
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => navigation.navigate('User', {screen: 'edit'})}>
        <Image style={styles.settingsImage} source={UserSettings} />
        <View>
          <Text style={styles.textName}>Configuración</Text>
        </View>
        <TouchableOpacity style={styles.iconcontainer}>
          <Image style={styles.icon} source={Settings} />
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logout()} style={styles.buttonlogout}>
        <Text style={styles.textButton}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4/5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20
  },
  email: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#6B7280',
    fontSize: 10,
  },
  userInfo: {
    width: 327,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 11,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  settingsImage: {
    width: 35,
    height: 35,
  },
  infoImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  textName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#374151',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconcontainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: '#F9F9F9',
  },
  buttonlogout: {
    width: 335,
    height: 54,
    backgroundColor: '#6670fd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'white',
  },
});

export default InfoUser;
