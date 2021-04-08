import * as api from '../api'

export const signup = (user) => async(dispatch) =>{
    try {
        const { data } = await api.signup(user)
        dispatch({type: 'CREATE_USER', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const signin =(user) => async(dispatch) =>{
    try {
        const { data } = await api.signin(user)
        dispatch({type: 'FETCH_USERS',payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getQuestions =() => async(dispatch) =>{
    try {
        const {data} = await api.getQuestions()
        dispatch({type: 'FETCH_QUESTIONS', payload : data})
    } catch (error) {
        console.log(error)
    }
}
export const getLevelOne = () => async(dispatch) =>{
    try {
        const {data} = await api.getQuestionsLevelOne()
        dispatch({type: 'LEVEL_ONE', payload : data})
    } catch (error) {
        console.log(error)
    }
}
export const getLevelTwo = () => async(dispatch) =>{
    try {
        const {data} = await api.getQuestionsLevelTwo()
        dispatch({type: 'LEVEL_TWO', payload : data})
    } catch (error) {
        console.log(error)
    }
}
export const getLevelThree = () => async(dispatch) =>{
    try {
        const {data} = await api.getQuestionsLevelThree()
        dispatch({type: 'LEVEL_THREE', payload : data})
    } catch (error) {
        console.log(error)
    }
}
export const completeQuestion = (questions) => async(dispatch) =>{
    try {
        const {data} = await api.completeQuestion(questions)
        dispatch ({type: 'SET_COMPLETED', payload: data})
    } catch (error) {
        console.log(error)
    }
}