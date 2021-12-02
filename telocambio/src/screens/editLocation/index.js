import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {AuthContext} from '../../context/authContext';
import Select from '../../components/select';
import axios from 'axios';
import {editUser,getApi} from '../../utils/request';
import {useNavigation} from '@react-navigation/native';
import ButtonBack from '../../components/buttonBack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialConfig = () => {
  const [countries, setCountries] = useState([]);
  const [API_KEY,setAPIKey] = useState("")
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const [regionName, setRegionName] = useState('');
  const {user, setUser} = useContext(AuthContext);
  const [infoSelected, setInfoSelected] = useState({
    Pais: '',
    Ciudad: '',
    Estado: '',
  });

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('asdasdas');
  const changeFormState = (value, city, code) => {
    console.log(value, city, code);
  };

  const change = (title, object) => {
    if (title === 'País/Región') {
      console.log(object);
      getState(object.code);
      infoSelected[title] = object.name;
      setInfoSelected({...infoSelected});
      setCountryCode(object.code);
    } else if (title === 'Estado') {
      getCities(object.region, countryCode);
      infoSelected[title] = object.region;
      setInfoSelected({...infoSelected});
    } else {
      infoSelected[title] = object.city;
      setInfoSelected({...infoSelected});
    }
    console.log(infoSelected);
    //
  };

 

  const getState = countryCode => {
    axios
      .get(
        `https://battuta.medunes.net/api/region/${countryCode}/all/?key=${API_KEY}`,
      )
      .then(response => setStates(response.data))
      .catch(error => {
        setModalVisible(true);
        setErrorMessage(error.message);
      });
  };

  const addNewUser = async () => {
    if (infoSelected['País/Región'] === '') {
      setErrorMessage('¡Error, debe seleccionar un pais!');
      setModalVisible(true);
    } else if (infoSelected['Estado'] === '') {
      setErrorMessage('¡Error, debe seleccionar un estado!');
      setModalVisible(true);
    } else if (infoSelected['Ciudad'] === '') {
      setErrorMessage('¡Error, debe seleccionar una ciudad!');
      setModalVisible(true);
    } else {
      editUser(
        user.huaweiId,
        infoSelected['País/Región'],
        infoSelected['Ciudad'],
        infoSelected['Estado'],
      )
        .then(async response => {
          setModalVisible(true);
          setErrorMessage('Se ha registrado con exito');
          user['city'] = infoSelected['Ciudad'];
          user['country'] = infoSelected['País/Región'];
          user['state'] = infoSelected['Estado'];
          setUser(user);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          navigation.goBack();
        })
        .catch(error => {
          setModalVisible(true);
          setErrorMessage(error.message);
        });
    }
  };

  const getCities = (region, countryCode) => {
    axios
      .get(
        `https://geo-battuta.net/api/city/${countryCode}/search/?region=${region}&key=${API_KEY}`,
      )
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        setModalVisible(true);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    const getCountries = async () => {
      const new_API_KEY = await getApi();
      setAPIKey(new_API_KEY)
       axios
        .get(`https://battuta.medunes.net/api/country/all/?key=${new_API_KEY}`)
        .then(response => {
          console.log(response.data)
          setCountries(response.data);
        })
        .catch(error => {
          setModalVisible(true);
          console.log("ERROR AQUI"+error.message)
          setErrorMessage(error.message);
        });
    };

    getCountries();
    return ()=>console.log("Hola")
  }, []);

  return (
    <View style={styles.container}>
      <ButtonBack />
      <Text style={styles.textRegister}>Editar ubicación</Text>
      <Select title="País/Región" listData={countries} change={change} />
      <Select title="Estado" listData={states} change={change} />
      <Select title="Ciudad" listData={cities} change={change} />
      <TouchableOpacity onPress={addNewUser} style={styles.button}>
        <Text style={styles.textButton}>Editar</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.buttonModal}>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  textRegister: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 30,
    color: '#6670fd',
    marginBottom: 40,
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
  },
});

export default InitialConfig;
