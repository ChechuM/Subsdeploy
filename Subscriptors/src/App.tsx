import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import List from './components/List/List';
import Form from './components/Form/Form';
import { Sub, SubsResponseFromApi } from './types';
import axios from 'axios';

interface AppState {
  subs: Array<Sub>
}

// const INITIAL_STATE= [
//   {
//       nick: 'dapelu',
//       subMonths: 3,
//       avatar: 'https://i.pravatar.cc/150?u=dapelu',
//       description: 'Dapelu sometimes works as a moderator'
//     },
//     {
//       nick: 'sergio_serrano',
//       subMonths: 7,
//       avatar: 'https://i.pravatar.cc/150?u=sergio_serrano'
//     }

// ] 


function App() {
  // Ejemplo para explicar cómo determinar los tipos de datos dentro del estado en TS
  // De esa manera puedo utilizar diferentes tipos de datos de los que he usado cuando usé el esto al inicio 
  // const[number, setNumber] = useState<number | string>(5)
  // const changeNumber = () => {
  //   setNumber("2")
  // }

  const [subs, setSubs] = useState<AppState["subs"]>([])
  // le defino el tipo de dato que puede esperar -> le digo que dentro de la interfaz AppState -> la definida en subs
  // puedo usar useState<Array<Sub>> también, es lo mismo
  // con <Array<Sub>> le explico lo que puede esperar recibir -> ha sido seteado anteriormente en las interfaces (contratos)


  // useRef es un hook que me permite guardar valor que queda guardado entre renderizados pero no causa un renderizado
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // setSubs(INITIAL_STATE)

    // Necesito una forma en la que TS pueda checkear antes del run time para ver si toda la información es correcta. Para que falle en el build time y me avise en caso de error
    // Al recibir datos de una api o se forman dinámicamente TS no puede entrar a revisarlos y validarlos -> TS valida en build time, no en run time
    // Entonces armo una función que me explica qué es lo que voy a recibir -> una promesa que contenga datos del tipo -> SubsResponseFromApi 

    // con fetch! -> preciso decirle el tipo de datos que va a generar en la función fetchSubs
    //const fetchSubs = (): Promise<SubsResponseFromApi> => {
      // return fetch('http://localhost:8000/subs').then(res => res.json())      
   //}

    // con axios puedo decirle el tipo de datos desde el get, entonces no hace falta decírselo en la función, directamente lo expreso en el get del axios
    const fetchSubs = () => {
      return axios
      .get<SubsResponseFromApi>('http://localhost:8000/subs')
      .then(response => response.data)
    }

  // Lo óptimo sería que el fetch de datos esté por fuera del componente en una carpeta llamada services -> que en cada file tiene las rutas de donde se obtiene la información requerida

    // ésta función va a hacer que cambien los formatos de los datos desde la api para que se adapten a los utilizados por la web
    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
      return apiResponse.map(subFromApi => {
        // recupero los datos recibidos desde la api y los transformo al formato que yo quiero que tengan
        const {
          nick,
          months: subMonths,
          profilerURL: avatar,
          description
        } = subFromApi

        return {
          nick,
          subMonths,
          avatar,
          description
        }
      })
    }
    
    // Y de esa manera, cuando la llamo, ya me muestra desde antes si los datos recibidos son los que se esperaban o no
    fetchSubs()
      // .then(apiSubs => {
      //   const subs = mapFromApiToSubs(apiSubs)
      //   setSubs(subs)
      // })
      .then(mapFromApiToSubs)
      .then(setSubs)
  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs=> [...subs, newSub])
  }

  return (
    <div className="App" ref={divRef}>
      <h1>Subscriptors</h1>
      <List subs={subs} />
      <Form onNewSub={handleNewSub}/>
    </div>
  );
}

export default App;
