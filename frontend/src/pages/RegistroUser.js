import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState, Fragment, FormEventHandler,   } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Alert } from 'react-bootstrap';

function RegistroUser() {
  const [values, setValues] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let [info, setinfo] = useState({});
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
    if(values.password == values.password2){
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({"nombreUsuario" : values.Nombre,
                              "fotoURL" : base64,
                              "contrasenia" : values.password,
                              "correo" : values.correo})
      };
      console.log(requestOptions.body);
      const response = await fetch("http://44.208.35.199:3005/Registro", requestOptions);
      const json = await response.json();
      if(json.status == '200'){
        navigate('/');
      }else{
        navigate("/");
      }
    }else{
      setShow(true);
    }
    
  };
  return (
    <>
    <h2>Sing Up</h2>
    <div class="FormIngresar">
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre Usuario</Form.Label>
        <Form.Control onChange={onFormChange} name="Nombre" type="text" placeholder="Enter Nombre" />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Seleccione su archivo</Form.Label>
        <Form.Control onChange={onChange} type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onFormChange} name="correo" type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group  className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onFormChange} type="password" name="password" placeholder="Password" />
      </Form.Group>
      <Form.Group  className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onFormChange} type="password" name="password2" placeholder="Password" />
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
    <Alert show={show} variant="success">
        <Alert.Heading>Las contraseñas no coinciden</Alert.Heading>
        <hr />
      </Alert>
    </div>
    </>
  );
}

export default RegistroUser;