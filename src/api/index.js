import axios from 'axios'


const urlUsers = 'http://localhost:5000/users'

axios.defaults.withCredentials = true

export const signup = (user) => axios.post(`${urlUsers}/signup`, user)
export const  signin = (user) => axios.post(`${urlUsers}/login`, user)
export const getQuestions = () => axios.get(`${urlUsers}/questions`)
export const getQuestionsLevelOne = () => axios.get(`${urlUsers}/questionslevelone`)
export const getQuestionsLevelTwo = () => axios.get(`${urlUsers}/questionsleveltwo`)
export const getQuestionsLevelThree = () => axios.get(`${urlUsers}/questionslevelthree`)
export const completeQuestion = (questions) => axios.post(`${urlUsers}/setcompleted`, questions)