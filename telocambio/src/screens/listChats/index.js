import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../context/authContext';
import Chats from '../../assets/images/chats.png';
import ButtonBack from '../../components/buttonBack';
import Team from '../../assets/icons/teams.png';
import Flecha from '../../assets/icons/flechachat.png';
import {getChats} from '../../utils/request';

const ListChats = ({route, navigation}) => {
  const {user, setUser} = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getAllChats = async () => {
      try {
        const allChats = await getChats(user.huaweiId);
        console.log(allChats.data);
        setChats(allChats.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllChats();
  }, []);

  const Chat = ({chat}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('User', {
            screen: 'chat',
            params: {
              name: chat.nameChat,
              id: chat.chatId,
              nameChatTwo: chat.nameChatTwo
            },
          });
        }}
        style={styles.chatContainer}>
        <Image source={Team} style={styles.icon} />
        <Text style={styles.nameText}>
          {user.name === chat.nameChat ? chat.nameChatTwo : chat.nameChat}
        </Text>
        <Image source={Flecha} style={styles.arrowIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ButtonBack />
      <Text style={styles.title}>Mis chats</Text>
      <View style={styles.chatsContent}>
        <View style={{flex: 1}}>
          {chats.length === 0 ? (
            <View style={{marginBottom: 80}}>
              <Image source={Chats} style={styles.image} />
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.scroll}>
              {chats.map((chat, index) => (
                <Chat key={index} chat={chat} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#6670FD',
    marginTop: 20,
  },
  chatsContent: {
    marginTop: 40,
    marginBottom: 200,
  },
  image: {
    width: 500,
    height: 700,
    marginTop: -40,
    resizeMode: 'contain',
    marginBottom: 80,
  },
  scroll: {
    alignItems: 'center',
  },
  chatContainer: {
    width: 300,
    height: 80,
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    justifyContent: 'space-around',
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 60,
    borderColor: '#6C63FF',
    borderWidth: 1,
  },
  arrowIcon: {
    width: 40,
    height: 40,
  },
  nameText: {
    fontFamily: 'Montserrat-Light',
  },
});

export default ListChats;
