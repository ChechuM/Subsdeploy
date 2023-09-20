
import useNewSubForm from "../../hooks/useNewSubForm"
import { Sub } from "../../types"

// le definición de los estados o props es mejor dejarlas dentro/cerca del componente para poder acceder a esa información fácilmente. Si es muy grande, podemos dejarlo en un file en la misma carpeta para poder tener acceso a él rápida y fácilmente


interface FromProps {
    // onNewSub: React.Dispatch<React.SetStateAction<Sub[]>>
    // esto es muy descriptivo, y puede generar problemas en caso de necesitar hacer cambios en un futuro, podemos explicarle que es una función que recibe un Sub
    onNewSub: (newSub: Sub) => void
}

const Form = ({onNewSub}:FromProps ) => {
    // const [inputValues, setInputValues] = useState<FormState["inputValues"]>(INITIAL_STATE)

    // desde el file useNewSubForm.tsx tomo el inputValues y el dispatch -> dado por el reducer
    // según buenas prácticas, debería tener otra función en el cast on hook (en ../../hooks/useNewSubForm.tsx) -> en ésta función se llamaría al dispatch desde allí, así no se ve el dispatch aquí
    // en lugar del dispatch, aquí pido la función clearForm
    const [inputValues, dispatch] = useNewSubForm()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // onNewSub(subs => ([...subs, inputValues]))
        onNewSub(inputValues);
        handleClear()
    }

    // al redactar funciones con eventos, nos va a pedir qué tipo de dato es dicho evento. Para poder determinar ésto podemos directamente redactar la función en el sitio donde va a ser llamada la función y al hacer hover sobre ésta nos dirá todo los datos porque ya tiene el contexto para poder inferirlo
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value
            }
        })
        // setInputValues({
        //     ...inputValues,
        //     [e.target.name] : e.target.value
        // })
    }

    const handleClear = () =>{
        // setInputValues(INITIAL_STATE)
        dispatch({type: "clear"})
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="nick"/>
                <input onChange={handleChange} value={inputValues.subMonths} type="number" name="subMonths" placeholder="subMonths"/>
                <input onChange={handleChange} value={inputValues.avatar} type="text" name="avatar" placeholder="avatar"/>
                <textarea onChange={handleChange} value={inputValues.description} name="description" placeholder="description"/>
                
                <button onClick={handleClear} type="button">Clear the form</button>
                <button type="submit">Save New Sub!</button>
            </form>
        </div>
    )
}

export default Form