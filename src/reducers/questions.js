export default function questions(questions = [], action) {
    switch (action.type)
    {
      case 'FETCH_QUESTIONS':
          return action.payload;
      case 'LEVEL_ONE':
        return action.payload;
        case 'LEVEL_TWO':
        return action.payload;
        case 'LEVEL_THREE':
        return action.payload;
        case 'SET_COMPLETED': 
           return [...questions, action.payload]
          
      default:
      return questions;
    }
  }