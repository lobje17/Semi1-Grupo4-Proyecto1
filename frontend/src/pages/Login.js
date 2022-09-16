import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState, Fragment, FormEventHandler,   } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Alert } from 'react-bootstrap';
import env from "react-dotenv";

function Login() {
  const [values, setValues] = useState({});
  const [show, setShow] = useState(false);
  let [info, setinfo] = useState({});
  const navigate = useNavigate();
  let status = '';

  const onFormChange = (e, updatedAt) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const submitHandler: FormEventHandler = async  (event)  => {
    event.preventDefault();
    event.persist();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({ correo: values.correo, contrasenia : values.password })
    };
    const response = await fetch("http://"+process.env.REACT_APP_BACKEND_IP+"/Login", requestOptions);
    const json = await response.json();
    console.log(json.data);
    if(json.status == '200'){
      navigate('/Inicio', { state: { Data: json.data } });
    }else{
      navigate("/");
      
      setShow(true)
    }

  };
  return (
    <>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onFormChange} name="correo" type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group  className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onFormChange} type="password" name="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
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
    </>
  );
}

export default Login;