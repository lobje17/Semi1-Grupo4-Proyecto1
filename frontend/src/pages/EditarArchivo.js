import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState, Fragment, FormEventHandler,   } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Alert } from 'react-bootstrap';

function EditarArchivo() {
  let [values, setValues] = useState({});
  const [show, setShow] = useState(false);
  let [info, setinfo] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Data ,Archivo} = state;
  const [type, setType] = useState("");
  let [base64, setBase64] = useState("");

  const onFormChange = (e, updatedAt) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const submitHandler: FormEventHandler = async  (event)  => {
    event.preventDefault();
    event.persist();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({ idArchivo: Archivo.idArchivo,nombreArchivo : values.Nombre,visibilidad: parseInt(values.Tipo),contrasenia:values.password,correo: Data[0].correo})
    };
    console.log(requestOptions.body);
    const response = await fetch("http://"+process.env.REACT_APP_BACKEND_IP+"/EditarArchivo", requestOptions);
    const json = await response.json();
    console.log(json);
    if(json.status == '200'){
      navigate('/Inicio', { state: { Data: Data } });
    }else{
      navigate("/");
    }
  };
  return (
    <>
    <h2>Ingrese su archivo</h2>
    <div class="FormIngresar">
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Nombre Archivo</Form.Label>
        <Form.Control onChange={onFormChange} name="Nombre" defaultValue={Archivo.nombreArchivo || ''}  type="text" placeholder="Enter Nombre" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tipo</Form.Label>
        <Form.Select onChange={onFormChange} name="Tipo"  defaultValue={Archivo.isPublic || ''} aria-label="tipo archivo">
          <option>Open this select menu</option>
          <option value="1">Publico</option>
          <option value="0">Privado</option>
    </Form.Select>
    <Form.Group  className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onFormChange} type="password" name="password" placeholder="Password" />
      </Form.Group>
      </Form.Group>
      <Button variant="primary" type="submit" onClick = {submitHandler}
      >
        Submit
      </Button>
    </Form>

    </div>
    </>
  );
}

export default EditarArchivo;