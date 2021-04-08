import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeQuestion, getLevelOne, getLevelTwo, getQuestions } from '../actions/users'
import  tower  from '../img/tower.jpg'
import  kosinka  from '../img/kosinka.jpg'
import  love  from '../img/love.jpg'
import  hat  from '../img/hat.jpg'
import  sunflower  from '../img/sunflower.jpg'
import  carpet  from '../img/carpet.jpg'
import  cotton  from '../img/cotton.jpg'
import  zavist  from '../img/zavist.jpg'
import  rinok  from '../img/rinok.jpg'
import  sugar  from '../img/sugar.jpg'
import back from '../img/backrussian.png'
import next from '../img/next.png'
import cake from '../img/cake.png'
import { ToastContainer, toast, cssTransition } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
toast.configure()


export const PictureLesson = ({questions, loggedIn}) =>{
    const dispatch = useDispatch()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [allQuestionsData, setAllQuestionsData] = useState(questions)
    const [questionsData, setQuestionsData] = useState(questions.filter(question => question.level === 2))
    const [lessonEnd, setLessonEnd] = useState(false)
    const [overall, setOverall] = useState(200)
    const getCompleted = async () =>{
        const response = await axios.get('http://localhost:5000/users/questionsleveltwocompleted')
        setOverall(response.data.length * 20)
    }
    console.log(allQuestionsData)
    useEffect(()=>{
        getCompleted()
        // dispatch(getLevelTwo())
        // dispatch(getQuestions())
    }, [])
    const notify =() =>{
        toast('🦜 Паспарабуй яшчэ!', {position: toast.POSITION.TOP_CENTER, autoClose: 8000, pauseOnHover : false});
    }
    const handleAnswer = async(answer) =>{
        let newIndex
        if (answer === questionsData[currentQuestion].correctAnswer){
             allQuestionsData[currentQuestion+10].isCompleted = true
             const data = [...allQuestionsData]
             newIndex = currentQuestion +1
             setOverall(overall + 20)
             setCurrentQuestion(currentQuestion + 1)
             dispatch(completeQuestion(data))
        }
        if (answer !== questionsData[currentQuestion].correctAnswer){
            setCurrentQuestion(currentQuestion)
            newIndex = currentQuestion
            notify()
        }
        if (overall === questionsData.length * 20){
            setLessonEnd(true)
            console.log(lessonEnd)
            console.log(questionsData.length)
        }
    }
    const goBack = () =>{
        window.location = '/'
    }
    const nextQuestion = ()=>{
        if (!lessonEnd)
        setCurrentQuestion(currentQuestion + 1)
        else setCurrentQuestion(currentQuestion)
    }

    return overall === questionsData.length*20 ? (
        <div className = 'russian__lesson__wrapper'>
            <h1>Гэты ўрок завершаны. Запрашаю да іншага</h1>
            <img src={back} alt='back' height ='300' width='300' onClick ={()=>goBack()}></img>
        </div>
    ) : (
        <div>
            {
                questionsData.length > 0  && loggedIn && (
                    <div className ='picture__lesson__wrapper'>
                         <button className = 'home__logout' onClick = {()=> goBack()}>Вярнуцца да меню </button>
                        {
                            questionsData[currentQuestion].isCompleted ? (
                                <div className = 'russian__lesson__completed'>
                                    <h1>{questionsData[currentQuestion].questionText}</h1>
                                    <h2>Ты адказаў на гэтае пытанне</h2>
                                    <h2>Пераходзь да наступнага задання</h2>
                                    <img onClick = {()=> nextQuestion()} className='russian__lesson__next' src = {next} alt= 'back' height='300' width = '300'></img>
                                </div>
                            ) 
                            :
                            (
                                <div className = 'picture__lesson__main'>
                                     <h2 className = 'picture__lesson__main__title'>{questionsData[currentQuestion].questionText}</h2>
                                     {
                                         currentQuestion === 0 && (
                                             <div className = 'picture__lesson__answers'>
                                                 <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=1?blur.jpg' onClick = {()=> handleAnswer('1')}></img>
                                                 <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=2?blur.jpg' onClick = {()=> handleAnswer('2')}></img>
                                                  <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=3?blur.jpg' onClick = {()=> handleAnswer('4')}></img>
                                                   <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {tower} onClick = {()=> handleAnswer('3')}></img>
                                             </div>
                                         )
                                         }{
                                         currentQuestion === 1 && (
                                             <div  className = 'picture__lesson__answers'>
                                                 <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=4?blur.jpg' onClick = {()=> handleAnswer('3')}></img>
                                                 <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=5?blur.jpg' onClick = {()=> handleAnswer('2')}></img>
                                                 <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {kosinka} onClick = {()=> handleAnswer('1')}></img>
                                                  <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=6?blur.jpg' onClick = {()=> handleAnswer('4')}></img>
                                                   
                                             </div>
                                         )
                                     }
                                     {
                                       currentQuestion === 2 && (
                                        <div className = 'picture__lesson__answers'>
                                                <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=7?blur.jpg' onClick = {()=> handleAnswer('3')}></img>
                                                <img  className = 'picture__lesson__answer'alt = 'pic' src = 'https://picsum.photos/300?random=8?blur.jpg' onClick = {()=> handleAnswer('2')}></img>
                                                <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {love} onClick = {()=> handleAnswer('1')}/>
                                                <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=9?blur.jpg' onClick = {()=> handleAnswer('4')}></img>
                                               
                                        </div>
                                    ) 
                                    }
                                      {
                                       currentQuestion === 3 && (
                                        <div className = 'picture__lesson__answers'>
                                             <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {hat} onClick = {()=> handleAnswer('4')}></img>
                                            <img  className = 'picture__lesson__answer'alt = 'pic' src = 'https://picsum.photos/300?random=10?blur.jpg' onClick = {()=> handleAnswer('3')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=11?blur.jpg' onClick = {()=> handleAnswer('2')}></img>
                                             <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=12?blur.jpg' onClick = {()=> handleAnswer('1')}></img>
                                             
                                        </div>
                                    ) 
                                    }
                                    {
                                       currentQuestion === 4 && (
                                        <div className = 'picture__lesson__answers'>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=13?blur.jpg' onClick = {()=> handleAnswer('3')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {sunflower} onClick = {()=> handleAnswer('2')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=14?blur.jpg' onClick = {()=> handleAnswer('1')}></img>
                                             <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=15?blur.jpg' onClick = {()=> handleAnswer('4')}></img>
                                             
                                        </div>
                                    ) 
                                    }
                                     {
                                       currentQuestion === 5 && (
                                        <div className = 'picture__lesson__answers'>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=16?blur.jpg' onClick = {()=> handleAnswer('1')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=17?blur.jpg' onClick = {()=> handleAnswer('2')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {carpet} onClick = {()=> handleAnswer('3')}></img>
                                             <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=18?blur.jpg' onClick = {()=> handleAnswer('4')}></img>
                                              
                                        </div>
                                    ) 
                                    }
                                      {
                                       currentQuestion === 6 && (
                                        <div className = 'picture__lesson__answers'>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=19?blur.jpg' onClick = {()=> handleAnswer('3')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=20?blur.jpg' onClick = {()=> handleAnswer('2')}></img>
                                             <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=21?blur.jpg' onClick = {()=> handleAnswer('4')}></img>
                                             <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {cotton} onClick = {()=> handleAnswer('1')}></img>
                                        </div>
                                    ) 
                                    }
                                      {
                                       currentQuestion === 7 && (
                                        <div className = 'picture__lesson__answers'>
                                             <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {zavist} onClick = {()=> handleAnswer('4')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=22?blur.jpg' onClick = {()=> handleAnswer('3')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=23?blur.jpg' onClick = {()=> handleAnswer('2')}></img>
                                             <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=24?blur.jpg' onClick = {()=> handleAnswer('1')}></img>
                                             
                                        </div>
                                    ) 
                                    }
                                    {
                                       currentQuestion === 8 && (
                                        <div className = 'picture__lesson__answers'>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=25?blur.jpg' onClick = {()=> handleAnswer('1')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {rinok} onClick = {()=> handleAnswer('3')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=26?blur.jpg' onClick = {()=> handleAnswer('2')}></img>
                                             <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=27?blur.jpg' onClick = {()=> handleAnswer('4')}></img>
                                              
                                        </div>
                                    ) 
                                    }
                                       {
                                       currentQuestion === 9 && (
                                        <div className = 'picture__lesson__answers'>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=28?blur.jpg' onClick = {()=> handleAnswer('3')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=29?blur.jpg' onClick = {()=> handleAnswer('1')}></img>
                                            <img className = 'picture__lesson__answer' alt = 'pic' width ='300' height ='300' src = {sugar} onClick = {()=> handleAnswer('2')}></img>
                                             <img className = 'picture__lesson__answer' alt = 'pic' src = 'https://picsum.photos/300?random=30?blur.jpg' onClick = {()=> handleAnswer('4')}></img>
                                             
                                        </div>
                                    ) 
                                    }
                                   <h2 className = 'russian__lesson__score'>Пакуль у цябе {overall} з {questionsData.length * 20}</h2>
                                    {/* <img src= {cake} alt ='cake' height = '80' width = '80'></img>   */}
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}