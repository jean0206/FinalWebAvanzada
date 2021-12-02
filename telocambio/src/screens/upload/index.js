import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import UploadIcon from '../../assets/icons/upload.png';
import ImageUpload from '../../components/imageUpload';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../../context/authContext';
import {addProduct} from '../../utils/request';

const Upload = () => {
  const {user, setUser} = useContext(AuthContext);

  const [photos, setPhotos] = useState([]);
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [category, setCategory] = useState([
    {name: 'Tecnología', active: false},
    {name: 'Arte', active: false},
    {name: 'Moda', active: false},
    {name: 'Cocina', active: false},
    {name: 'Accesorios', active: false},
    {name: 'Otros', active: false},
  ]);
  const [categorySelected, setCategorySelected] = useState('');

  const uploadPhoto = async type => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 1,
        includeBase64: true,
      },
      async response => {
        let URL_CLOUD =
          'https://api.cloudinary.com/v1_1/dcoe4y2fd/image/upload';

        let base64 = `data:image/jpg;base64,${response['assets'][0].base64}`;

        let data = {
          file: base64,
          upload_preset: 'ml_default',
        };

        fetch(URL_CLOUD, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        })
          .then(async r => {
            let data = await r.json();
            console.log(data);
            setPhotos([...photos, data['secure_url']]);
          })
          .catch(err => console.log(err));
      },
    );
  };

  const deletePhoto = index => {
    console.log(index);
    photos.splice(index, 1);
    setPhotos([...photos]);
  };

  const sendPost = () => {
    if (user.auth) {
      if (title === '') {
        setErrorMessage('¡Debe digitar un titulo!');
        setModalVisible(true);
      } else if (goal === '') {
        setErrorMessage('¡Debe digitar una meta!');
        setModalVisible(true);
      } else if (description == '') {
        setErrorMessage('¡Debe digitar una descripción del producto!');
        setModalVisible(true);
      } else if (photos.length === 0) {
        setErrorMessage('¡Debe añadir al menos una foto del producto!');
        setModalVisible(true);
      } else if (categorySelected === '') {
        setErrorMessage('¡Debe elegir una categoria!');
        setModalVisible(true);
      } else {
        addProduct(user.huaweiId, goal, photos, title, description, categorySelected, user.country,user.city,user.state)
          .then(response => {
            setErrorMessage('¡Se ha añadido el producto!');
            setModalVisible(true);
            setTitle('');
            setGoal('');
            setDescription('');
            setCategory([
              {name: 'Tecnología', active: false},
              {name: 'Arte', active: false},
              {name: 'Moda', active: false},
              {name: 'Cocina', active: false},
              {name: 'Accesorios', active: false},
              {name: 'Otros', active: false},
            ]);
            setCategorySelected('');
            setPhotos([]);
          })
          .catch(error => console.log(error));
      }
    } else {
      setErrorMessage('¡Debe iniciar sesión para publicar productos!');
      setModalVisible(true);
    }
  };

  const changeCategory = (item, index) => {
    category.map((element, i) => {
      if (i === index) {
        category[i].active = true;
        setCategorySelected(category[i].name);
      } else {
        category[i].active = false;
      }
    });
    setCategory([...category]);
  };

  const Category = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => changeCategory(item, index)}
        style={[
          styles.category,
          {
            backgroundColor: item.active ? '#6670FD' : 'black',
          },
        ]}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F2F2F2" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Crear una publicación</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textInput}>Nuevo producto</Text>
        <TextInput
          style={styles.input}
          placeholder="Digita el nombre del producto"
          placeholderTextColor="#BDBDBD"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.separatorContainer}>
        <View style={styles.separator}></View>
      </View>
      <TouchableOpacity onPress={uploadPhoto} style={styles.uploadContainer}>
        <Image style={styles.imageUpload} source={UploadIcon} />
        <Text style={styles.headerText}>Sube una foto</Text>
        <Text style={styles.description}>Añade fotos de tus productos</Text>
      </TouchableOpacity>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.imagesContainers}>
            {photos.map((photo, index) => (
              <ImageUpload
                key={index}
                action={() => deletePhoto(index)}
                image={photo}
              />
            ))}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textInput}>Categoría</Text>
            <View style={styles.categoryContainer}>
              {category.map((item, index) => (
                <Category key={index} index={index} item={item} />
              ))}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textInput}>Descripción</Text>
            <TextInput
              style={styles.descriptioninput}
              placeholder="Digita la descripción del producto"
              multiline={true}
              placeholderTextColor="#BDBDBD"
              inputStyle={{color: '#BDBDBD'}}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textInput}>¿Cuál es tu meta?</Text>
            <TextInput
              style={styles.goalInput}
              placeholder="Digita la meta a la que deseas llegar"
              multiline={true}
              placeholderTextColor="#BDBDBD"
              value={goal}
              onChangeText={setGoal}
            />
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => sendPost()} style={styles.button}>
              <Text style={styles.textButton}>Publicar anuncio</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    </SafeAreaView>
  );
};

const sizeWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  categoryContainer: {
    flex: 1,
    height: 90,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    justifyContent: 'center',
  },
  category: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 8,
    marginRight: 4,
  },
  categoryText: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
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
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#282A45',
  },
  uploadContainer: {
    width: 300,
    height: 200,
    backgroundColor: '#E3E5FC',
    borderRadius: 18,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  imageUpload: {
    width: 70,
    height: 60,
    resizeMode: 'contain',
  },
  description: {
    fontFamily: 'Montserrat-Light',
  },
  input: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#BDBDBD',
    width: 300,
    textAlign:'center',
  },
  inputContainer: {
    width: sizeWidth,
    marginTop: 16,
    alignItems: 'center',
  },
  textInput: {
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
    color: '#282A45',
  },
  separator: {
    backgroundColor: '#c5c5c5',
    height: 1,
    width: sizeWidth - 40,
    marginLeft: 20,
    marginRight: 20,
  },
  separatorContainer: {
    alignItems: 'center',
  },
  imagesContainers: {
    width: sizeWidth,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  scroll: {
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 90,
    marginTop: 10,
  },
  descriptioninput: {
    height: 100,
    color: '#BDBDBD',
    backgroundColor: '#E3E5FC',
    width: 310,
    borderRadius: 6,
    marginTop: 15,
  },
  goalInput: {
    height: 70,
    color: '#BDBDBD',
    backgroundColor: '#E3E5FC',
    width: 310,
    borderRadius: 6,
    marginTop: 15,
  },
  button: {
    width: 310,
    height: 54,
    backgroundColor: '#6670fd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
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
  },
});

export default Upload;
