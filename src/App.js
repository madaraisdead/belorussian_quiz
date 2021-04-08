import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLevelOne, getLevelTwo, getQuestions, signin, signup } from './actions/users';
import { completedlevelOneQuestion, getQuestionsLevelOne } from './api';
import './App.scss';
import AuthContext from './components/context/AuthContext';
import { Login } from './components/login/Login';
import { PictureLesson } from './components/PictureLesson';
import { RussianLesson } from './components/RussianLesson'

import level1 from './img/level1.png'
import level2 from './img/level2.png'
import hello from './img/hello.png'

function App() {
  const {loggedIn, userId, getLoggedIn} = useContext(AuthContext)
  // const [email, setEmail] = useState('test2')
  // const [password, setPassword] = useState('password') 
  // const [firstName, setFirstName] = useState('evgen')
  // const [lastName, setLastName] = useState('evgen')
  const [user, setUser] = useState()
  const [completedLevelOne ,setCompletedLevelOne] = useState([])
  const [showLevel, setShowLevel] = useState(0)
  const questions = useSelector(state => state.questions)
  const dispatch = useDispatch()

  // const toSignin = async () =>{
  //   const userData = {
  //     email,
  //     password,
  //     firstName,
  //     lastName
  //   }
  //         await dispatch(signin(userData))
  //         getLoggedIn()
         
  // }
  async function logout(){
    await axios.get('http://localhost:5000/users/logout')
    window.location = '/'
  }
  useEffect (()=>{
   dispatch(getQuestions())
  }, [loggedIn, dispatch])

  return (
    <div>
      {
        !loggedIn ? (
          <Login getLoggedIn = {getLoggedIn}/>
        ) : questions.length > 0 && showLevel === 0 ? (
          <div className = 'home__wrapper'> 
          <button className = 'home__logout' onClick = {() => logout()}>Выхад</button>
          <img src = {hello} alt='hello' height = '150'></img>
          <h1 className = 'home__wrapper__title'>Шчыра вітаю цябе </h1>
            <div className = 'home__main'>
              <h2 className = 'home__main__title'>Выберы занятак, якім хочаш заняцца сёння</h2>
              <div className = 'home__lessons'> 
                <div className = 'home__lesson__card' onClick = {()=> setShowLevel(1)}>
                <h1>Нянудныя словы </h1>
                  <img src={level1} alt= 'level1' height = '250'></img>

                </div>
                <div className = 'home__lesson__card' onClick = {()=> setShowLevel(2)}>
                  <h1>Жывыя малюнкі</h1>
                  <img src={level2} alt= 'level1' height = '250'></img>
                </div>
              </div>
            </div>
            <div className = 'circle1'></div>
            <div className = 'circle2'></div>
          </div>
         
        ) :
        showLevel === 1 ? (
          <RussianLesson getLevelOne = {getLevelOne} loggedIn = {loggedIn} questions = {questions} />
        ) : showLevel === 2 ? (
          <PictureLesson  loggedIn ={loggedIn} getLevelTwo = {getLevelTwo} questions = {questions} />
        )
        :null
      }
     
        {/* {
          questions.length >0 && loggedIn && showLevel === 0 &&(
            
          )
        } */}
         
    {/* //      <button onClick = {()=>setShowLevel(1)}>
    //           level 1
    //      </button>
    //      <button onClick = {()=>setShowLevel(2)}>
    //           level 2
    //      </button>
         
    //       {questions.length > 0 && showLevel === 1 && (
    //           <RussianLesson getLevelOne = {getLevelOne} loggedIn = {loggedIn} questions = {questions} />
    //       ) }
    //       {
    //         questions.length> 0 && showLevel === 2 &&
    //         <PictureLesson  loggedIn ={loggedIn} getLevelTwo = {getLevelTwo} questions = {questions} />
    //       } */}
    </div>
    
  );
}

export default App;
