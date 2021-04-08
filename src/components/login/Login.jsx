import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signin } from '../../actions/users'
import edu from '../../img/edu.png'
import {SignUp} from './SignUp'


export const Login = ({getLoggedIn}) =>{
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)

    const toSignin = async () =>{
        const userData = {
          email,
          password,   
        }
              await dispatch(signin(userData))
              getLoggedIn()
              window.location = '/'
             
      }
    return (
        <div>
            {
                isSignUp ? (
                    <SignUp getLoggedIn = {getLoggedIn}/>
                ) :
                <div className = 'login__wrapper'>
                {
                   <div className = 'login__main'>
                   <div>
                   <img src = {edu} alt ='pic' height= '250' ></img>
                   </div>
               <h1>Уваход</h1>
               <div className = 'login__input__container' >
                   <h3>Пошта</h3>
                   <input value = {email} onChange= {(e)=> setEmail(e.target.value)} className = 'login__input' type= 'email'></input>
               </div>
               <div >
                   <h3>Пароль</h3>
                   <input  value = {password} onChange= {(e)=> setPassword(e.target.value)} className = 'login__input' type= 'password'></input>
               </div>
                   <button className= 'login__button' onClick={()=> toSignin()}>Увайсьцi</button>
                   <p className = 'additional__info' onClick= {()=> setIsSignUp(true)}>Яшчэ не навучаецеся? Далучыцца </p>
               </div>
               }
               
              
           </div>
            }
         
        </div>
       
    )
}