/*
action:{type:,payload:}
*/
const initialState = {
  todos: [],
};
const reducer = (state = initialState, action) => {
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case "ADD_TODO": {
      const temp = state.todos;
      temp.push(payload);
      return { ...state, todos: temp };
    }

    case "DELETE_TODO": {
      return {
        ...state,
        todos:
          payload.id === "all"
            ? []
            : state.todos.filter((todo) => todo.id !== payload.id),
      };
    }

    default:
      return state;
  }
};
export default reducer;
