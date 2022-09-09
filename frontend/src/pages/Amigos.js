import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState, Fragment, FormEventHandler,   } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Alert } from 'react-bootstrap';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { BsTelephoneForwardFill } from "react-icons/bs";


function Amigos() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Data } = state;
  const [info, setinfo] = useState([]);
  const handleClick = (event, param) => {
    navigate('/Inicio', { state: { Data: Data } });  
  };
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    };
    fetch("http://localhost:3005/Usuarios",requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setinfo(data.data);
        console.log(data.data);
      });
      
  }, []);
  const AgregarAmigo = (event, param,name) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body : JSON.stringify({IdAmigoEmisor:Data[0].Personid,IdAmigoReceptor : param})
    };
    console.log(requestOptions.body);
    fetch("http://localhost:3005/AgregarAmigo/",requestOptions)
    .then((response) => response.json())

    setShow(true)
    setName(name)
  };
  return (
    <>
    <h2>Seleccione sus amigos</h2>
    <button type="button" class="Espacio btn btn-info"  onClick = {handleClick}>Inicio</button>
    <MDBTable  align='middle' >
      <MDBTableHead>
        <tr>
          <th scope='col'>Foto</th>
          <th scope='col'>Nombre</th>
          <th scope='col'>Correo</th>
          <th scope='col'>ArchivosPublicos</th>
          <th scope='col'>AgregarAmigos</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {info.map((s) => (
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={s.fotoperfil}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{s.nombreUsuario}</p>
                <p className='text-muted mb-0'>{s.correo}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{s.nombreUsuario}</p>
          </td>
          <td>
            <MDBBadge color='warning' pill>
              {s.correo}
            </MDBBadge>
          </td>
          <td>
            <MDBBadge color='warning' pill>
              {s.conteo}
            </MDBBadge>
          </td>
          <td>
            <MDBBtn onClick={event => AgregarAmigo(event, s.Personid,s.nombreUsuario)} color='link' rounded size='sm'>
            <BsTelephoneForwardFill className="ml-4" />
            </MDBBtn>
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
    <Alert show={show} variant="success">
        <Alert.Heading>Tu nuevo amigo es ! {name}</Alert.Heading>
        <hr />
      </Alert>
      
    </>
  );
}

export default Amigos;
