import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom'
import {Routes, Route, useNavigate} from 'react-router-dom';
import React, { useEffect, useRef,useState, Fragment, FormEventHandler,   } from 'react';
//Cards
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Inicio() {
    const [search, setSearch] = React.useState('');
    const { state } = useLocation();
    const { Data } = state;
    const navigate = useNavigate();
    let [info, setinfo] = useState([]);
    const submitHandler: FormEventHandler = async  (event)  => {
      event.preventDefault();
      event.persist();
      navigate('/Privados', { state: { Data: Data } });  
    };
    const InsertArchivo: FormEventHandler = async  (event)  => {
      event.preventDefault();
      event.persist();
      navigate('/InsertArchivo', { state: { Data: Data } });  
    };
    const handleClick = (event, param) => {
      navigate('/EditarArchivo', { state: { Data: Data, Archivo: param } });  
    };
    const handleSearch = (event) => {
      setSearch(event.target.value);
    };
    const EliminarArchivo = (event, param) => {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      };
      fetch("http://"+process.env.REACT_APP_BACKEND_IP+"/deleteArchivo/"+param,requestOptions)
      .then((response) => response.json())
      alert("Se elimino el archivo");
      navigate('/Inicio', { state: { Data: Data } });  
    };
  
    const AgregarAmigo = (event, param) => {
      navigate('/Amigos', { state: { Data: Data } });  
    };
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    };
    fetch("http://"+process.env.REACT_APP_BACKEND_IP+"/ArchivosPublicos/"+Data[0].Personid,requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setinfo(data.data);
      });
      console.log(info);
  }, []);
  return (
    <>
    <h1><small>{`Hola de nuevo!!  ${Data[0].nombreUsuario}`}</small></h1>
    <h1><small>Archivos Publicos</small></h1>
    
    <div className='perfil bg-image hover-overlay'>
      <img src={Data[0].fotoperfil} className='img-fluid' />
      <a href='#!'>
        <div className='mask overlay' style={{ backgroundColor: 'rgba(57, 192, 237, 0.2)' }}></div>
      </a>
    </div>
    <button type="button" class=" Espacio btn btn-warning" onClick = {submitHandler} >Privados</button>
    <button type="button" class="Espacio btn btn-success"  onClick = {InsertArchivo}>Ingresar Archivo</button>
    <button type="button" class="Espacio btn btn-info"  onClick = {AgregarAmigo}>Amigos</button>
    <br></br>
    <br></br>
    <div className='GridCard'>
    <label htmlFor="search">
        Search by Task:
        <input id="search" type="text" onChange={handleSearch} />
      </label>
    <Row xs={1} md={3} className="g-4">
        {info.map((s) => (
        <Col>
          <Card aria-disabled='true' style={{ width: '25rem' }}  >
            <Card.Img  variant="top" src="https://previews.123rf.com/images/tmricons/tmricons1510/tmricons151000623/45815578-sube-icono-del-archivo-presentar-un-bot%C3%B3n-de-documento-s%C3%ADmbolo-documento-de-flecha.jpg"/>
            <Card.Body>
              <Card.Title >{s.nombreArchivo}</Card.Title>
              <Card.Text>
                Este es un documento que se encuentra almacenado en un s3 aws
              </Card.Text>
              <Card.Subtitle className="mb-2 text-muted">Dueño: {s.nombreUsuario}</Card.Subtitle>
              <a href={s.URL}type="button" class=" Espacio btn btn-warning" role="button">Ver Archivo</a>
              <button type="button" class=" Espacio btn btn-warning" onClick={event => handleClick(event, s)} >Editar</button>
              <button type="button" class=" Espacio btn btn-warning" onClick={event => EliminarArchivo(event, s.idArchivo)} >Eliminar</button>
            </Card.Body>
          </Card>
        </Col>
        ))}
    </Row>
    </div>
    
    </>
  );
}

export default Inicio;