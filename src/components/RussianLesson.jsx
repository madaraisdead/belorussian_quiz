import React, {useState, useEffect} from 'react'
import { serviceQuestions } from '../serviceQuestions'  
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { completeQuestion, getLevelOne, getLevelTwo, getQuestions } from '../actions/users'
import questions from '../reducers/questions'
import { completedlevelOneQuestion } from '../api'
import back from '../img/backrussian.png'
import cake from '../img/cake.png'
import next from '../img/next.png'
import { ToastContainer, toast, cssTransition } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const RussianLesson = ({questions, loggedIn , getLevelOne}) =>{ 
    const dispatch = useDispatch()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [allQuestionsData, setAllQuestionsData] = useState()
    const [questionsData, setQuestionsData] = useState(questions.filter(question => question.level === 1))
    const [lessonEnd, setLessonEnd] = useState()
    const [score, setScore] = useState()
    const [overall, setOverall] = useState()
    const [complete, setComplete] = useState(false)
    console.log(allQuestionsData)

    const getCompleted = async () =>{
        const response = await axios.get('http://localhost:5000/users/questionslevelonecompleted')
        setOverall(response.data.length * 20)
    }
    useEffect (()=>{
        getCompleted()
        setAllQuestionsData(questions)
        // dispatch(getLevelTwo())
        // dispatch(getLevelOne())
    }, [])  
    const notify =() =>{
        toast('🦜 Паспарабуй яшчэ!', {position: toast.POSITION.TOP_CENTER, autoClose: 8000, pauseOnHover : false});
    }
    let shuffledAnswers =[]
    if (overall === questionsData.length *20){
        shuffledAnswers = []
    } else {
        shuffledAnswers = [...questionsData[currentQuestion].answers].sort(()=> Math.random() - 0.5)
    } 

    const handleAnswer = async(answer) =>{
        let newIndex
        if (answer === questionsData[currentQuestion].correctAnswer){ 
            allQuestionsData[currentQuestion].isCompleted = true
            console.log(allQuestionsData)
            const data = [...allQuestionsData]
            // setAllQuestionsData({...allQuestionsData})
            // console.log(currentQuestion)
             newIndex = currentQuestion +1
             setOverall(overall + 20)
             setCurrentQuestion(currentQuestion + 1)
            
            // const data = Array.from(allQuestionsData)
             console.log(data)
             await  dispatch(completeQuestion(data))
        }
        if (answer !== questionsData[currentQuestion].correctAnswer){
            setCurrentQuestion(currentQuestion)
            newIndex = currentQuestion
            notify()
        }
        if (newIndex === questionsData.length){
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
            questions.length > 0 && loggedIn && (
                <div className = 'russian__lesson__wrapper'>
                    <button className = 'home__logout' onClick = {()=> goBack()}>Вярнуцца да меню </button>
                    {
                        questionsData[currentQuestion].isCompleted ? (
                            <div className = 'russian__lesson__completed'>
                                <h2 className = 'russian__lesson__main__title'>{questionsData[currentQuestion].questionText}</h2>
                                <h2>Ты адказаў  : {questionsData[currentQuestion].correctAnswer}</h2>
                                <h2>Пераходзь да наступнага задання</h2>
                                <img onClick = {()=> nextQuestion()} className='russian__lesson__next' src = {next} alt= 'back' height='300' width = '300'></img>
                            </div>
                        )
                        : (
                            <div className = 'russian__lesson__main'>   
                               
                                <h2 className = 'russian__lesson__main__title'>{questionsData[currentQuestion].questionText}</h2>
                                <div >
                                 <button className = 'russian__lesson__answer' onClick = {() => handleAnswer(shuffledAnswers[0])} >{shuffledAnswers[0]}</button> 
                                  <button className = 'russian__lesson__answer'  onClick = {() => handleAnswer(shuffledAnswers[1])}>{shuffledAnswers[1]}</button>
                                  <button  className = 'russian__lesson__answer' onClick = {() => handleAnswer(shuffledAnswers[2])}>{shuffledAnswers[2]}</button>
                                  <button className = 'russian__lesson__answer' onClick = {() => handleAnswer(shuffledAnswers[3])}>{shuffledAnswers[3]}</button> 
                                </div>
                                <h2 className = 'russian__lesson__score'>Пакуль у цябе {overall} з {questionsData.length * 20}</h2>
                                <img className = 'russian__lesson__cake' src= {cake} alt ='cake' height = '80' width = '80'></img>
                            </div>
                        )
                    }
                    
                </div>
               
            ) 
        }
 
    </div> 
    )
}