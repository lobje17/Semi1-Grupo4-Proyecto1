import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom'
import React, { useEffect, useState, Fragment, FormEventHandler,   } from 'react';

function Inicio() {
    const { state } = useLocation();
    const { Data } = state;
    const getDatos = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //const response = await fetch("http://35.219.177.18/getProcessData", requestOptions);
    //const json = await response.json();
    //setinfo(json);
  };

  useEffect(() => {   
    
  }, []);
  return (
    <>
    <h1>{`Hola de nuevo!!  ${Data[0].nombreUsuario}`}</h1>
    </>
  );
}
export default Inicio;