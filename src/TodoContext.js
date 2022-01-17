import React, {useReducer, createContext, useContext, useRef} from 'react';

const initialTodos = [
  {
    id: 1,
    title: 'Todo 1',
    contents: 'Todo 1 Todo 1 Todo 1',
    done: true,
    edit: false,
  },
  {
    id: 2,
    title: 'Todo 2',
    contents: 'Todo 2 Todo 2 Todo 2',
    done: true,
    edit: false,
  },
  {
    id: 3,
    title: 'Todo 3',
    contents: 'Todo 3 Todo 3 Todo 3',
    done: false, 
    edit: false,
  },
  {
    id: 4,
    title: 'Todo 4',
    contents: 'Todo 4 Todo 4 Todo 4',
    done: false, 
    edit: false,
  },
];

// CREATE : 새로운 항목 생성
// TOGGLE : 껐다 켰다
// REMOVE : 지우기
// EDIT : 원래 항목 수정하기

function todoReducer(state, action) {
  switch(action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo => 
        todo.id === action.id ? {...todo, done: !todo.done} : todo
      );
    case 'EDIT':
      return state.map(todo => 
        todo.id === action.id ? {...todo, edit: !todo.edit} : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return useContext(TodoNextIdContext);
}