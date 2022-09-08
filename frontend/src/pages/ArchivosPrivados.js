import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom'
import {Routes, Route, useNavigate} from 'react-router-dom';
import React, { useEffect, useRef,useState, Fragment, FormEventHandler,   } from 'react';
//Cards
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function ArchivosPrivados() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { Data } = state;
    const [info, setinfo] = useState([]);
    const InsertArchivo: FormEventHandler = async  (event)  => {
      event.preventDefault();
      event.persist();
      navigate('/InsertArchivo', { state: { Data: Data } });  
    };
    const submitHandler: FormEventHandler = async  (event)  => {
      event.preventDefault();
      event.persist();
      navigate('/Inicio', { state: { Data: Data } });  
    };
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin':'*'
      }
    };
    fetch("http://localhost:3005/ArchivosPrivados/"+Data[0].Personid,requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setinfo(data.data);
      });
      console.log(info);
  }, []);
  return (
    <>
    <h1><small>{`Hola de nuevo!!  ${Data[0].nombreUsuario}`}</small></h1>
    <h1><small>Archivos Privados</small></h1>
    <button type="button" class="Espacio btn btn-warning" onClick = {submitHandler}>Publicos</button>
    <button type="button" class="Espacio btn btn-success"  onClick = {InsertArchivo}>Ingresar Archivo</button>
    <br>
    </br>
    <br></br>
    <br></br>
    <div className='GridCard'>
    <Row xs={1} md={3} className="g-4">
        {info.map((s) => (
        <Col>
          <Card aria-disabled='true' style={{ width: '20rem' }}  >
            <Card.Img  variant="top" src="https://previews.123rf.com/images/tmricons/tmricons1510/tmricons151000623/45815578-sube-icono-del-archivo-presentar-un-bot%C3%B3n-de-documento-s%C3%ADmbolo-documento-de-flecha.jpg"/>
            <Card.Body>
              <Card.Title >{s.nombreArchivo}</Card.Title>
              <Card.Text>
                Este es un documento que se encuentra almacenado en un s3 aws
              </Card.Text>
              <Card.Link href={s.URL}>Link Descarga</Card.Link>
              <Card.Link href={s.URL}>Editar</Card.Link>
              <Card.Link href={s.URL}>Eliminar</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        ))}
    </Row>
    </div>
    
    </>
  );
}

export default ArchivosPrivados;