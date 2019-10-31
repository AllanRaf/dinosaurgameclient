export default function score (state = 1, action = {}) {  
    console.log('in the score reducer', action.type)
  switch (action.type) {
      case "INCREASE_SCORE":
          console.log('increasing score')
        return state++
      case  "UPDATE_SCORE":
        return action.payload
      default:
        return state;
    }
  }