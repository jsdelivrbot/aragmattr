export default function(state = null, action) {
  switch(action.type) {
    case 'SESSION_SELECTED':
      return action.payLoad;
  }

  return state;
}