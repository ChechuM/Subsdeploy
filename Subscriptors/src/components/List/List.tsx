import { Sub } from "../../types"

interface Props {
    subs: Array<Sub>
}

// puesto así de esta forma este componente no soporta children -> y es que en realidad no necesita soportar children! -> es un JSX element 
// si quisiera hacer que soportara children tengo que definirlo como un React.FunctionComponent
// const List: React.FunctionComponent<Props> = ({subs}) => {} 
// y luego exportarlo abajo de la función con export default List
export default function List ({subs}: Props) {

// prueba para demostrar cómo definir qué quiere la función para poder utilizar mejor la herramienta de TS y lo que espera recibir para mejor manejo de errores

const renderList = (): JSX.Element[] => {
    return subs.map(sub => {
            return (
              <li key={sub.nick}>
                <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
                <h4>{sub.nick} (<small>{sub.subMonths}</small>) </h4>
                {/* En caso de que quiera que muestre los primeros 100 caracteres de la descripción puedo seleccionar el método .substring(0, 100) -> pero como no todos los objetos dentro del array [subs] tienen description necesito colocar el ? antes del método */}
                <p>{sub.description?.substring(0, 100)}</p>
              </li>
            )
          })
}

    return (
        <ul>
            {renderList()}
        </ul>
    )
}