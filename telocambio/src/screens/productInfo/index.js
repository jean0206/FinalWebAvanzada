import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import ButtonBack from '../../components/buttonBack';

const ProductInfo = ({route, navigation}) => {
  const {name, category, goal, description,images, id, ownerId} = route.params;

  const width = Dimensions.get('screen').width;
  const [selected, setSelected] = useState('description');


  const changeDescription = name => {
    console.log(id)
    setSelected(name);
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
      <View>
        <ButtonBack/>
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
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
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
                <Text style={styles.textDescription}>Meta</Text>
              </TouchableOpacity>
              {selected === 'goal' ? (
                <View style={styles.selectedOption}></View>
              ) : (
                <View style={{width: 81, height: 8}}></View>
              )}
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {selected === 'goal' ? goal : description}
            </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Inicio',{screen:'offerProduct',params:{
            id:id,
            ownerId:ownerId
          }})}  style={styles.button}>
            <Text style={styles.textButton}>Ofrecer intercambio</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop:30,
  },
  
  textButton: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  categoryContainer: {
    width: 90,
    height: 30,
    backgroundColor: 'rgba(167,137,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 20,
    marginTop: 20,
  },
  categoryText: {
    fontFamily: 'Montserrat-Light',
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
    marginRight:40,
    textAlign: 'justify'
  },
});

export default ProductInfo;
