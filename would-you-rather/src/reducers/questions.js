import {RECEIVE_QUESTIONS, ADD_ANSWER, ADD_QUESTION} from '../actions/questions'

export default function questions (state = {}, action){
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_ANSWER:
            const {qid, answer, authUser} = action
            let newState = {}
            if (answer === qid.optionOne.text){
                newState = {
                    ...state, // bring in all the state to avoid mutation
                    [qid]: { // which particular item parent in the state u want to change
                        ...state[qid], //bring in all the item parent state without mutation
                        optionOne:{
                            ...state[qid.optionOne], 
                            votes: state[qid.optionOne].votes.concat([authUser])
                        }
                        
                    },
                    [authUser]: { // which particular item parent in the state u want to change
                        ...state[authUser], //bring in all the item parent state without mutation
                        answers:{
                            ...state[authUser].answers, 
                            qid: "OptionOne",
                        },
                        questions: state[authUser].questions.concat([qid]) 
                    }

                }
            }
            if (answer === qid.optionTwo.text){
                newState = {
                    ...state, // bring in all the state to avoid mutation
                    [qid]: { // which particular item parent in the state u want to change
                        ...state[qid], //bring in all the item parent state without mutation
                        optionTwo:{
                            ...state[qid.optionTwo], 
                            votes: state[qid.optionTwo].votes.concat([authUser])
                        }
                        
                    },
                    [authUser]: { // which particular item parent in the state u want to change
                        ...state[authUser], //bring in all the item parent state without mutation
                        answers:{
                            ...state[authUser].answers, 
                            qid: "OptionTwo",
                        },
                        questions: state[authUser].questions.concat([qid]) 
                    }
                }
            }
            return newState
            
        case ADD_QUESTION:
            return {
                ...state, 
                [action.question.id]: action.question,
            }
        default:
            return state
    }
}