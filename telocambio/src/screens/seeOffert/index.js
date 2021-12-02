import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ButtonBack from '../../components/buttonBack';
import {acceptOffert} from '../../utils/request';
import {refuseOffert, addChat, addNotification} from '../../utils/request';
import {AuthContext} from '../../context/authContext';

const SeeOffert = ({route, navigation}) => {
  const {user, setUser} = useContext(AuthContext);

  const {
    name,
    category,
    goal,
    description,
    images,
    id,
    price,
    productId,
    ownerName,
    ownerId,
  } = route.params;

  const width = Dimensions.get('screen').width;
  const [selected, setSelected] = useState('description');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRefuse, setModalRefuse] = useState(false);
  const [modalNew, setModalNew] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const changeDescription = name => {
    console.log(id);
    setSelected(name);
  };

  useEffect(() => {
    console.log(ownerId);
    console.log(user.huaweiId);
  }, []);

  const acceptNewOffert = async () => {
    try {
      const response = await acceptOffert(id, productId);
      console.log('Envia la aceptación');
      console.log(response.data);
      setModalNew(false);
      setErrorMessage('¡Has aceptado la oferta! \n Se ha creado un nuevo chat');
      setModalVisible(true);
      const chatResponse = await addChat(
        user.huaweiId,
        ownerId,
        goal,
        user.name,
      );
      console.log(chatResponse.data);
      addNotification(
        ownerId,
        `La oferta realizada a ${user.name} fue aceptada.`,
      );
    } catch (error) {
      console.log('Envia la aceptación mal');
      console.log(error.message);
    }
  };

  const redirect = () => {
    setModalVisible(false);
    navigation.navigate('User', {screen: 'Info'});
  };

  const refuseNewOffert = async () => {
    try {
      const response = await refuseOffert(id);
      console.log(response);
      setModalRefuse(false);
      setErrorMessage('¡Has rechazado la oferta!');
      addNotification(
        ownerId,
        `La oferta realizada a ${user.name} fue rechazada.`,
      );
      setModalVisible(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const refCarousel = useRef();

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          height: 310,
        }}>
        <Image
          source={{
            uri: item,
          }}
          style={{width: width, height: 310}}
        />
      </View>
    );
  };

  return (
    <View>
      <ButtonBack />
      <View>
        <Carousel
          layout={'default'}
          ref={refCarousel}
          data={images}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>${price}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={{flex: 1, marginBottom: 90}}>
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <View style={styles.descriptionSelected}>
              <View style={styles.descriptionContainer}>
                <TouchableOpacity
                  onPress={() => changeDescription('description')}
                  style={styles.buttonDescription}>
                  <Text style={styles.textDescription}>Descripción</Text>
                </TouchableOpacity>
                {selected === 'description' ? (
                  <View style={styles.selectedOption}></View>
                ) : (
                  <View style={{width: 81, height: 8}}></View>
                )}
              </View>
              <View style={styles.descriptionContainer}>
                <TouchableOpacity
                  onPress={() => changeDescription('goal')}
                  style={styles.buttonDescription}>
                  <Text style={styles.textDescription}>Información</Text>
                </TouchableOpacity>
                {selected === 'goal' ? (
                  <View style={styles.selectedOption}></View>
                ) : (
                  <View style={{width: 81, height: 8}}></View>
                )}
              </View>
            </View>
            <View style={styles.textContainer}>
              {selected === 'goal' ? (
                <View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                      flexWrap: 'wrap',
                    }}>
                    Dueño del producto:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Light',
                      fontSize: 18,
                      flexWrap: 'wrap',
                    }}>
                    {goal}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                      flexWrap: 'wrap',
                      marginTop: 20,
                    }}>
                    Precio estimado del producto:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Light',
                      fontSize: 18,
                      flexWrap: 'wrap',
                    }}>
                    ${price}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontFamily: 'Montserrat-Light',
                    fontSize: 18,
                    flexWrap: 'wrap',
                  }}>
                  {description}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => setModalNew(true)}
              style={styles.button}>
              <Text style={styles.textButton}>Aceptar oferta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalRefuse(true)}
              style={styles.cancelButton}>
              <Text style={styles.textButton}>Rechazar oferta</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalNew}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={[styles.modalText, {fontSize: 20, textAlign: 'center'}]}>
                ¿Desea aceptar esta oferta?
              </Text>
              <TouchableOpacity
                onPress={acceptNewOffert}
                style={styles.buttonAccept}>
                <Text style={styles.textButton}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalNew(!modalNew)}
                style={styles.buttonRefuse}>
                <Text style={styles.textButton}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              onPress={() => redirect()}
              style={styles.buttonModal}>
              <Text style={styles.textButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalRefuse}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[styles.modalText, {fontSize: 20, textAlign: 'center'}]}>
              ¿Desea rechazar esta oferta?
            </Text>
            <TouchableOpacity
              onPress={refuseNewOffert}
              style={styles.buttonAccept}>
              <Text style={styles.textButton}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalRefuse(!modalRefuse)}
              style={styles.buttonRefuse}>
              <Text style={styles.textButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height - 310,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    marginTop: -80,
    elevation: 20,
    borderTopRightRadius: 30,
  },
  button: {
    width: 335,
    height: 54,
    backgroundColor: '#6670fd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },

  textButton: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  categoryContainer: {
    width: 110,
    height: 30,
    backgroundColor: 'rgba(167,137,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 20,
    marginTop: 20,
  },
  categoryText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#6670FD',
  },
  titleContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
  },
  descriptionSelected: {
    width: Dimensions.get('screen').width,
    height: 70,
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  selectedOption: {
    width: 81,
    height: 8,
    backgroundColor: '#6670FD',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonDescription: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#6670FD',
  },
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: Dimensions.get('screen').width,
    marginLeft: 90,
    marginRight: 20,
    marginTop: 20,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#828282',
  },
  cancelButton: {
    width: 335,
    height: 54,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    width: 300,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  button: {
    width: 335,
    height: 54,
    backgroundColor: '#6670fd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 60,
  },
  textButton: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  buttonModal: {
    width: 270,
    height: 54,
    backgroundColor: '#6670fd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 60,
  },
  modalText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#6670fd',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonAccept: {
    width: 270,
    height: 54,
    backgroundColor: '#6670fd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonRefuse: {
    width: 270,
    height: 54,
    backgroundColor: '#EB5757',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default SeeOffert;
