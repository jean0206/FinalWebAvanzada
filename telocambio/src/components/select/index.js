import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Select = ({title, listData, change}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [typeTitle, setTypeTitle] = useState(title);
  const [selected, setSelected] = useState(title);
  const [data, setData] = useState(listData);

  const getName = name => {
    setSelected(getAttribute(name));
    change(title, name);
    setModalVisible(!modalVisible);
  };

  const getAttribute = attribute => {
    console.log(attribute)
    const value = {
      "País/Región":attribute.name,
      "Estado":attribute.region,
      "Ciudad":attribute.city,
    }
    return value[title];
  }

  const ListItem = ({name}) => {
    return (
      <TouchableOpacity
        onPress={() => getName(name)}
        style={styles.listContainer}>
        <Text style={styles.textList}>{getAttribute(name)}</Text>
        <View style={styles.separator}></View>
      </TouchableOpacity>
    );
  };

  const openModal = () => {
    if (listData.length !== 0) {
      setModalVisible(!modalVisible);
    }
  };

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <ScrollView style={{borderRadius: 6, marginTop: 5}}>
              {listData.map((item, id) => (
                <ListItem key={id} name={item} />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>{typeTitle}</Text>
      <TouchableOpacity onPress={() => openModal()} style={styles.select}>
        <Text style={styles.textSelect}>{selected}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    width: 300,
    height: 65,
    backgroundColor: 'rgba(189,189,189,0.2)',
    borderRadius: 6,
    justifyContent:'center',
  },
  textSelect: {
    fontFamily: 'Montserrat-Light',
    marginLeft: 5
  },
  title: {
    fontFamily: 'Montserrat-Semibold',
    fontSize: 20,
    color: '#6670FD',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalContainer: {
    width: 300,
    height: 500,
    backgroundColor: 'white',
  },
  listContainer: {
    width: 300,
    height: 60,
    justifyContent: 'space-around',
  },
  textList: {
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
    color: '#1F2937',
  },
  separator: {
    width: 280,
    height: 1,
    backgroundColor: 'black',
  },
});

export default Select;
