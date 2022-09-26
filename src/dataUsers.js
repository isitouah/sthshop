import { useState, useEffect } from "react";
import {saveUser} from "./Users";

export const useLoadUser = () => {

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };  
    useEffect(() => {
      const fetchData = () => {
        fetch('https://sthstore.herokuapp.com/users',requestOptions)
          .then((response) => response.json())
          .then((dataUsers) => {setIsLoaded(true); setData(dataUsers);})
          .catch(error => { setError(error);});
      };
      fetchData();
    }, []);
  
    return { error, isLoaded, data };
  };


  export const useAddUser = (parm,bd) => {
    const [user, setUser] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [addError, setAddError] = useState(null);
    
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body : JSON.stringify(bd)
      };  
      useEffect(() => {
        const fetchData = () => {
          fetch('https://sthstore.herokuapp.com/users/add',requestOptions)
            .then((response) =>{ 
              if(response.ok){
                  response.json()
              }else{
                throw new Error('User Already registered');
              }  
              }
            )
            .then((dataUsers) => {setIsAdded(true); setUser(bd.userName); saveUser(bd);setAddError(null)})
            .catch(error => { setAddError(error.message);setIsAdded(false)});
        };
        if(parm){
        fetchData(); 
            
        }
      }, [parm]);
    
      return { user, isAdded, addError, bd };
    }; 