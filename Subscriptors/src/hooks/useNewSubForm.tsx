import { useReducer} from "react"
import { Sub } from "../types"

interface FormState {
    inputValues: Sub
}

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string
        inputValue: string
    }
} | {
    type: "clear",
}

const INITIAL_STATE = {
    nick: '',
    subMonths: 0,
    avatar: '',
    description: ''
}

const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch(action.type){
        case "change_value": 
        const {inputName, inputValue} = action.payload
        return{
            ...state,
            [inputName] : inputValue
        }

        case "clear":
            return INITIAL_STATE
    } 
}

// esto es un cast on hook
const useNewSubForm = () => {
    return useReducer(formReducer, INITIAL_STATE)

    // según buenas prácticas podría generar una función aquí que despache la acción y de esa manera éste no se vería en el file Form.tsx
    // sería ->
    // const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE)

    // const clearForm = useCallback(() => dispatch({type: 'clear'}), [])

    // return {
    //     formState: inputValues,
    //     clearForm
    // }
}

export default useNewSubForm