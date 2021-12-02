import axios from 'axios';

const server = 'https://telocambio-app.herokuapp.com/';
//const server = 'http://192.168.1.10:3000/'
export const verifyUser = async id => {
  const userVerify = await axios.get(server + 'user/' + id + '/verify');
  return userVerify;
};

export const addUser = async (
  huaweiId,
  name,
  email,
  photoPerfil,
  city,
  country,
  state,
) => {
  const userVerify = await axios.post(server + 'user/', {
    huaweiId,
    name,
    email,
    photoPerfil,
    city,
    country,
    state,
  });
  return userVerify;
};

export const addProduct = async (
  ownerId,
  goal,
  photos,
  name,
  description,
  category,
  country,
  city,
  state,
) => {
  const newUser = await axios.post(server + 'product', {
    ownerId,
    goal,
    photos,
    name,
    description,
    category,
    country,
    city,
    state,
  });
  return newUser;
};

export const getProductById = async id => {
  const products = await axios.get(server + 'product/' + id);
  return products;
};

export const getAllProducts = async (ownerId, country, city, state) => {
  const products = await axios.post(server + 'product/list', {
    ownerId,
    country,
    city,
    state,
  });

  return products;
};

export const addOffert = async (
  productId,
  name,
  photos,
  price,
  description,
  ownerId,
  ownerName,
) => {
  const response = await axios.post(server + 'product/offert', {
    productId,
    name,
    photos,
    price,
    description,
    ownerId,
    ownerName,
  });
  return response;
};

export const getOffert = async id => {
  const response = await axios.get(server + 'product/offert/' + id);
  return response;
};

export const acceptOffert = async (id, productId) => {
  const response = await axios.post(server + 'product/offert/accept', {
    id,
    productId,
  });
  return response;
};

export const refuseOffert = async id => {
  const response = await axios.post(server + 'product/offert/refuse', {
    id,
  });
  return response;
};

export const addChat = async (userOne, userTwo, name,nameChatTwo) => {
  const response = await axios.post(server + 'chat/', {
    userOne: userOne,
    userTwo: userTwo,
    nameChat: name,
    nameChatTwo:nameChatTwo
  });

  return response;
};

export const getChats = async id => {
  const response = await axios.get(server + 'chat/' + id);
  return response;
};

export const addMessage = async (id, user, message) => {
  const response = await axios.post(server + 'chat/message', {
    id,
    user,
    message,
  });
  return response;
};

export const getMessages = async id => {
  const response = await axios.get(server + 'chat/message/' + id);
  return response;
};

export const addNotification = async (id, message) => {
  console.log('AAAAAAAAAAA LA NOTIFICACIONNNNNNNNNN');
  const response = await axios.post(server + 'notification/', {
    ownerId: id,
    text: message,
  });
  return response;
};

export const getNotifications = async id => {
  console.log('HUAWEI');
  console.log(id);
  const response = await axios.get(server + 'notification/' + id);
  return response;
};

export const deleteNotification = async id => {
  const response = await axios.delete(server + 'notification/' + id);
  return response;
};

export const editUser = async (id, country, city, state) => {
  const response = await axios.post(server + 'user/edit', {
    id,
    country,
    city,
    state,
  });
  return response;
};

export const getAllOfferts = async (id) => {
  const reponse = await axios.get(server + 'product/offert/all/'+ id)
  return reponse;
}

export const getApi = async () => {
  const reponse = await axios.get(server + 'user/')
  console.log(reponse.data)
  return reponse.data["api"];
}


//export const addUser =
