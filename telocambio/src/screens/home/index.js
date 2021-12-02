import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Background from '../../assets/icons/header.png';
import Hands from '../../assets/icons/loc.png';
import Search from '../../assets/icons/search.png';
import Caja from '../../assets/icons/caja.png';
import Tec from '../../assets/icons/tecno.png';
import Art from '../../assets/icons/art.png';
import Closet from '../../assets/icons/closet.png';
import Cocina from '../../assets/icons/cocina.png';
import Acce from '../../assets/icons/acce.png';
import CardHeader from '../../components/cardHeader';
import Category from '../../components/Category';
import ProductCard from '../../components/productCard';
import {getAllProducts} from '../../utils/request';
import {AuthContext} from '../../context/authContext';
import {useFocusEffect} from '@react-navigation/native';
import {useProducts} from '../../hooks/productsHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../assets/images/header1.png';
import HeaderTwo from '../../assets/images/header2.png';
import HeaderThree from '../../assets/images/header3.png';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    image: Header,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    image: HeaderTwo,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    image: HeaderThree,
  },
];

const categories = [
  {
    id: -1,
    name: 'Todos',
    image: Caja,
  },
  {
    id: 1,
    name: 'Tecnología',
    image: Tec,
  },
  {
    id: 2,
    name: 'Arte',
    image: Art,
  },
  {
    id: 3,
    name: 'Moda',
    image: Closet,
  },
  {
    id: 4,
    name: 'Cocina',
    image: Cocina,
  },
  {
    id: 5,
    name: 'Accesorios',
    image: Acce,
  },
  {
    id: 6,
    name: 'Otros',
    image: Search,
  },
];

const initialData = [
  {
    category: 'Tecnología',
    name: 'HUAWEI MateBook',
    photos:["https://img01.huaweifile.com/sg/ms/co/pms/product/6901443434787/group/800_800_138B7BBC5305EA59F9661DE1DAC20F230B6F94886278F269.webp","https://img01.huaweifile.com/sg/ms/co/pms/product/6901443434787/group/800_800_7F4EBCA49E3FFC73D4D021E5A793A916F0085A1484AD20FC.webp"],
    actual: "Disponible",
    description: "El HUAWEI MateBook D 14 está equipado con una increíble pantalla IPS de 1.920 x 1.080 y los bordes se han reducido a solo 4,8 mm, lo que hace que la pantalla FullView de 14 pulgadas parezca casi interminable.",
    goal:"Mi meta es poder obtener un huaweiP40",
    id:"1298i1221n1201290312901asdasdas",
    ownerId: "oiajdisajiojioasdas21312",
    _id:"1298i1221n1201290312901asdasdas",
  },
  {
    category: 'Accesorios',
    name: 'HUAWEI WATCH GT 2 Pro',
    photos:["https://img01.huaweifile.com/sg/ms/co/pms/product/6972453166470/800_800_4E9016B8E75920D74FE2CF6A3DAAF67D0C9CD152110D3054mp.webp"],
    actual: "Disponible",
    description: "Levanta la muñeca, puedes saber las horas de la salida y puesta del sol, la salida y puesta de la luna, para prepararte para las aventuras al aire libre. Además, los 8 tipos de fases lunares como la luna nueva, la luna llena, la luna del primer cuarto, etc. y las mareas te permiten observar el cielo y disfrutar ver pasar el tiempo.",
    goal:"Mi meta es poder obtener un huaweiP40",
    id:"1298i1221n12012903129asda01asdasdas",
    ownerId: "oiajdisajiojioasdasaaaa",
    _id:"1298i1221n12012903129asda01asdasdas",
  },
  {
    category: 'Moda',
    name: 'HUAWEI Classic Backpack',
    photos:["https://img01.huaweifile.com/sg/ms/co/pms/product/6972453167798/group/800_800_55DB75829DF18C172A8CA047BBE73FCF47C011451CE97B94.webp"],
    actual: "Disponible",
    description: "Un compartimiento independiente forrado con espude epe de 3mm mantiene tu laptop a salvo y su cremallera lateral te permite acceder a ella rápidamente.",
    goal:"Mi meta es poder obtener un huaweiP40",
    id:"1298i1221n12012903129asda01asdasda",
    ownerId: "oiajdisajiojioasdas",
    _id:"1298i1221n12012903129asda01asdasda",
  },
]



const Home = () => {
  const {user, setUser, getUser} = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([])
  const [products, updateProducts] = useState([]);
  const renderItem = ({item}) => <CardHeader image={item.image}/>;
  const renderCategories = ({item}) => (
    <Category name={item.name} handleChange={sendInfo} image={item.image} />
  );

  const sendInfo = name => {
    if(name==="Todos"){
      updateProducts(allProducts)
    }else {
      const filterData = allProducts.filter( product => product.category === name)
      updateProducts(filterData);
      console.log(filterData);
      console.log(name);
    }
  };

  useEffect(() => {
    const getUser = () => {
      console.log('HOLAAAAAAAAAAA');
    };
    getUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // console.log(user)
      const getProducts = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            console.log('USE FOCUS EFFECT');
            const valueNew = JSON.parse(value);
            getAllProducts(
              valueNew.huaweiId,
              valueNew.country,
              valueNew.city,
              valueNew.state,
            )
              .then(response => {
                console.log(response.data);
                if(response.data.length > 0) {
                  updateProducts(response.data);
                  setAllProducts(response.data);
                }else {
                  updateProducts(initialData)
                  setAllProducts(initialData)
                }
              })
              .catch(error => error.message);
          } else {
            updateProducts(initialData)
                  setAllProducts(initialData)
          }
        } catch (e) {
          // error reading value
        }
      };
      getProducts();
    }, []),
  );

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar backgroundColor="#6670FD" />
      <ImageBackground style={styles.header} source={Background}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Telocambio</Text>
          <Image style={styles.headerImage} source={Hands} />
        </View>
      <View style={{marginTop:40}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      </ImageBackground>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scroll}>
          <View style={styles.categorieContainer}>
            <Text style={styles.categorieTitle}>Categorias</Text>
          </View>
          <View style={styles.categories}>
            <FlatList
              data={categories}
              renderItem={renderCategories}
              keyExtractor={item => item.id}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.productsContainer}>
            <View style={styles.categorieContainerProducts}>
              <Text style={styles.categorieTitle}>Productos</Text>
            </View>
            {products.map(product => (
              <ProductCard
                key={product._id}
                nameProduct={product.name}
                image={product.photos[0]}
                description={product.description}
                goal={product.goal}
                id={product._id}
                category={product.category}
                images={product.photos}
                show={true}
                ownerId= {product.ownerId}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const allWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'black',
    height: 100,
  },
  scroll: {
    flex: 1,
  },
  categories: {
    flex: 1,
    height: 80,
    marginLeft: 20,
    marginTop: 10,
  },
  categorieTitle: {
    fontFamily: 'Montserrat-Bold',
    marginLeft: 20,
    fontSize: 18,
  },
  header: {
    width: allWidth,
    height: 310,
    textAlign: 'center',
    alignItems: 'center',
  },
  categorieContainer: {
    flex: 1,
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
    marginTop: 18,
  },
  headerImage: {
    width: 20,
    height: 20,
    marginTop: 18,
    marginLeft: 9,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 86,
    marginTop: -20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSearch: {
    width: 253,
    height: 40,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    marginTop: 25,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 25,
    elevation: 3,
  },
  listContainer: {
    height: 163,
    flexGrow: 0,
    marginTop: 10,
  },
  searchIcon: {
    padding: 10,
    width: 20,
    height: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#C5C5C5',
    width: 236,
    borderRadius: 10,
  },
  productsContainer: {
    width: allWidth,
    alignItems: 'center',
  },
  categorieContainerProducts: {
    alignItems: 'flex-start',
    width: allWidth,
    marginBottom: 20,
  },
});

export default Home;
