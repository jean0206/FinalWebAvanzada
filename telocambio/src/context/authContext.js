import React, {createContext, useState,useEffect} from 'react';

export const AuthContext = createContext();

const initialData = {
  auth: false,
  huaweiId: '',
  name : '',
  email : '',
  photoPerfil: '',
  country: '',
  city: '',
  state: '',
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(initialData);

    useEffect(()=>{
        console.log("NUEVO USUARIO")
        console.log(user);
    },[user])

    const getUser = () => {
      return user;
    }

  return (
    <AuthContext.Provider 
      value={{
        user,
        setUser,
        getUser
      }}>
      {children}
    </AuthContext.Provider>
  );
};
