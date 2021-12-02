import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import ButtonBack from '../../components/buttonBack';
import {AuthContext} from '../../context/authContext';
import {addMessage, getMessages} from '../../utils/request';
import Send from '../../assets/icons/send.png';

const Chat = ({route, navigation}) => {
  const {name, id, nameChatTwo} = route.params;
  const {user} = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [text, onChangeText] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    const getAllMessages = async () => {
      console.log(id);
      const response = await getMessages(id);
      console.log(response.data);
      setChats(response.data['message']);
    };
    getAllMessages();
  }, []);

  const sendMessage = async () => {
    let newDate = '';
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      newDate = `${day}-0${month}-${year}`;
    } else {
      newDate = `${day}-${month}-${year}`;
    }
    if (text !== '') {
      try {
        const response = await addMessage(id, user.huaweiId, text);
        console.log(response.data);
        setChats([...chats, {user:user.huaweiId,message:text,date:newDate}]);
        onChangeText("")
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const width = Dimensions.get('screen').width;

  const Message = ({chat}) => {
    return (
      <View
        style={{
          width: width,
          alignItems: chat.user === user.huaweiId ? 'flex-end' : 'flex-start',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: 300,
            minHeight: 70,
            backgroundColor:
              chat.user === user.huaweiId ? '#A7ADFF' : '#F7F8FF',
            marginLeft: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              marginLeft: 6,
              marginRight: 6,
              fontSize: 18,
              marginTop: 20,
              marginBottom: 20,
              color: chat.user === user.huaweiId ? '#FFFFFF' : '#978CFF',
            }}>
            {chat.message}
          </Text>
          <Text
            style={{
              textAlign: 'right',
              position: 'absolute',
              bottom: 0,
              right: 0,
              marginTop: 4,
              marginRight: 4,
              color: chat.user === user.huaweiId ? '#FFFFFF' : '#BDBDBD',
            }}>
            {chat.date}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ButtonBack />
      <Text style={styles.title}>{user.name===name?nameChatTwo:name}</Text>
      <View style={styles.chatsContent}>
        <View style={{flex: 1, marginBottom: 20}}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{alignItems: 'center', width: width}}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }>
            {chats.map((chat,index) => (
              <Message key={index} chat={chat} />
            ))}
          </ScrollView>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
          
            }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Nuevo mensaje"
              placeholderTextColor="#cbcbcb"
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 200,
                backgroundColor: '#F7F8FF',
                borderWidth: 1,
                borderColor: '#6670FD',
                width: 60,
                height: 60,
                marginLeft:20
              }}>
              <Image
                source={Send}
                style={{width: 40, height: 40, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
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
    marginTop: 0,
    resizeMode: 'contain',
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
  input: {
    borderWidth: 1,
    borderColor: '#CBCBCB',
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    color: '#CBCBCB',
    height: 70,
    width: 250,
  },
});

export default Chat;
