import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState, Fragment, FormEventHandler,   } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Alert } from 'react-bootstrap';

function Login() {
  const [values, setValues] = useState({});
  const [show, setShow] = useState(false);
  let [info, setinfo] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Data } = state;
  const [type, setType] = useState("");
  let [base64, setBase64] = useState("");

  const onFormChange = (e, updatedAt) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const onChange = e => {
    const files = e.target.files;
    const file = files[0];
    setType(file.type)
    getBase64(file);
  };

  const onLoad = fileString => {
    setBase64(fileString);
  };

  const getBase64 = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  const submitHandler: FormEventHandler = async  (event)  => {
    event.preventDefault();
    event.persist();
    base64 = base64.replace(/data:.+?,/,"");   
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({ BASE64: base64, CONTENIDO : type, NOMBRE: values.Nombre, PUBLICO: parseInt(values.Tipo),IdUsuario: Data[0].Personid})
    };
    const response = await fetch("http://44.208.35.199:3005/SubirArchivo", requestOptions);
    const json = await response.json();
    if(json.status == '200'){
      navigate('/Inicio', { state: { Data: Data } });
    }else{
      navigate("/");
      
      setShow(true)
    }
  };
  return (
    <>
    <h2>Ingrese su archivo</h2>
    <div class="FormIngresar">
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre Archivo</Form.Label>
        <Form.Control onChange={onFormChange} name="Nombre" type="text" placeholder="Enter Nombre" />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Seleccione su archivo</Form.Label>
        <Form.Control onChange={onChange} type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Tipo</Form.Label>
        <Form.Select onChange={onFormChange} name="Tipo"  aria-label="tipo archivo">
          <option>Open this select menu</option>
          <option value="1">Publico</option>
          <option value="0">Privado</option>
    </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" onClick = {submitHandler}
      >
        Submit
      </Button>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>Vuelva a introducir sus credenciales</small>
          </Toast.Header>
          <Toast.Body>Woohoo, Datos Incorrectos!</Toast.Body>
        </Toast>
      </Col>
    </Form>

    </div>
    </>
  );
}

export default Login;