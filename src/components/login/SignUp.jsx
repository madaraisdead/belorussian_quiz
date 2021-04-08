import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signin, signup } from '../../actions/users'
import edu from '../../img/edu.png'
import { Login } from './Login'

export const SignUp = ({getLoggedIn}) =>{
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isLogin, setIsLogin] = useState(false)

    const toSignin = async () =>{
        const userData = {
          email,
          password,   
        }
              await dispatch(signup(userData))
              getLoggedIn()
              window.location = '/'
             
      }
    return (
        <div>
            {
                isLogin ? (
                    <Login getLoggedIn = {getLoggedIn}/>
                )
                :
                <div className = 'login__wrapper'>
                <div className = 'login__main'>
                    <div>
                    <img src = {edu} alt ='pic' height= '250' ></img>
                    </div>
                <h1>Далучэнне</h1>
                <div className = 'login__input__container' >
                    <h3>Пошта</h3>
                    <input value = {email} onChange= {(e)=> setEmail(e.target.value)} className = 'login__input' type= 'email'></input>
                </div>
                <div >
                    <h3>Пароль</h3>
                    <input  value = {password} onChange= {(e)=> setPassword(e.target.value)} className = 'login__input' type= 'password'></input>
                </div>
                <div >
                    <h3>Iмя</h3>
                    <input  value = {firstName} onChange= {(e)=> setFirstName(e.target.value)} className = 'login__input'></input>
                </div>
                <div >
                    <h3>Прозвішча</h3>
                    <input  value = {lastName} onChange= {(e)=> setLastName(e.target.value)} className = 'login__input'></input>
                </div>
                    <button className= 'login__button' onClick={()=> toSignin()}>Далучыцца</button>
                    <p className = 'additional__info' onClick = {()=> setIsLogin(true)}>Ужо з намi? Увайсьцi</p>
                </div>
            </div>
            }
    
        </div>
       
    )
}