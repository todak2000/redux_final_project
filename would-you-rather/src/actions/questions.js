import {saveQuestion, saveQuestionAnswer} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}
// Add Answer action function
function addAnswer ({authUser, qid, answer}){
    return {
        type: ADD_ANSWER,
        authUser,
        qid,
        answer
    }
}
// add question action function
function addQuestion (question){
    return {
        type: ADD_QUESTION,
        question
    }
}
// add Question handler
export function handleAddQuestion (info ){
    return (dispatch)=>{
        dispatch(showLoading())
        return saveQuestion(info)
        . then((info)=>dispatch(addQuestion(info)))
        .then(()=>dispatch(hideLoading()))
    }
}

// add Answer handler
export function handleAddAnswer (info ){
    return (dispatch)=>{
        dispatch(showLoading())
        return saveQuestionAnswer(info)
        . then((info)=>dispatch(addAnswer(info)))
        .then(()=>dispatch(hideLoading()))
    }
}