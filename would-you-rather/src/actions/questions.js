import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { addAnswerToUser, addQuestionToUser } from "../actions/users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
// Add Answer action function
function addAnswerToQuestion({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authedUser,
    qid,
    answer,
  };
}
// add question action function
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
// add Question handler
export function handleAddQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestion(info)
      .then((info) => {
        dispatch(addQuestion(info));
        dispatch(addQuestionToUser(info));
      })
      .then(() => dispatch(hideLoading()));
  };
}

// add Answer handler
export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(addAnswerToQuestion(info)); // updating the UI
    dispatch(addAnswerToUser(info));
    return saveQuestionAnswer(info).catch((e) => {
      // updating the BE
      console.warn("Error in saveQuestionAnswer: ", e);
    });
  };
}
