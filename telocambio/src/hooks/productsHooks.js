import {useState,useEffect, useContext} from 'react';
import { getAllProducts } from '../utils/request';
import {AuthContext} from '../context/authContext';


export function useProducts() {
    const [products,setProducts] = useState([])
    const {user, setUser} = useContext(AuthContext);
    useEffect(()=>{
        const getProducts = ()=>{
            getAllProducts(user.country,user.city,user.state).
            then(response=> setProducts(response.data["products"])).
            catch(error=>console.error(error.messate))
        }
        getProducts();
    },[])

    const updateProducts = () => {
        console.log(user)
        if(user.auth){
            getAllProducts(user.country,user.city,user.state).
                then(response=> setProducts(response.data["products"])).
                catch(error=>console.error(error.messate))
        }else{
            setProducts([])
        }
    }

    return {
        products,
        updateProducts
    }
}