import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../context/authContext';
import {getNotifications, deleteNotification} from '../../utils/request';
import {useFocusEffect} from '@react-navigation/native';
import Notification from '../../assets/icons/noti.png';
import Delete from '../../assets/icons/delete.png';
import Noti from '../../assets/images/not.png';

const Notifications = () => {
  const {user} = useContext(AuthContext);
  const [notification, setNotifications] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getAllNotfications = async () => {
        console.log(user.huaweiId);
        try {
          const response = await getNotifications(user.huaweiId);
          setNotifications(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      getAllNotfications();

      return () => console.log('Sisa');
    }, []),
  );

  const deleteNoti = async id => {
    console.log(id);
    try {
      const responseA = await deleteNotification(id);
      const response = await getNotifications(user.huaweiId);
      console.log(responseA);
      setNotifications(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const Card = ({id, text}) => {
    return (
      <View style={styles.notificationContainer}>
        <Image source={Notification} style={styles.image} />
        <Text style={styles.textNoti}>{text}</Text>
        <TouchableOpacity onPress={() => deleteNoti(id)}>
          <Image source={Delete} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginTop: 40, marginBottom: 85}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Notificaciones</Text>
      </View>
      {notification.length > 0 ? (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          {notification.map(noti => (
            <Card text={noti.text} id={noti._id} key={noti._id} />
          ))}
        </ScrollView>
      ) : (
          <View  style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
              <Image source={Noti} style={{width:400,height:400, resizeMode:'contain'}}/>
          </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    width: 300,
    height: 90,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#282A45',
  },
  image: {
    width: 41,
    height: 41,
    resizeMode: 'contain',
  },
  textNoti: {
    fontFamily: 'Montserrat-SemiBold',
    width: 180,
    textAlign: 'center',
    color: '#CBCBCB',
  },
});

export default Notifications;
