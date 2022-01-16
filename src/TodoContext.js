import React, {useReducer, createContext, useContext, useRef} from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true, 
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true, 
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false, 
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false, 
  },
];


// 추후 useReducer에서 사용할 함수 - state와 action을 가져와서 그 다음 상태를 리턴함
// CREATE : 새로운 항목 생성
// TOGGLE : 껐다 켰다
// REMOVE : 지우기

function todoReducer(state, action) {
  switch(action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? {...todo, done: !todo.done} : todo
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


// Hook 만들기
// State와 Dispatch 따로 만든 이유는
// 사용하기 편하고 & "컴포넌트 최적화"를 위해서!
// TodoCreate에서는 사실 Dispatch만 필요함
// 만약 하나의 Context를 만들고 그 안에 Dispatch와 State를 넣어주게 된다면
// TodoCreate는 렌더링할 필요하 없을 경우에도 렌더링하게 됨 --> Context 안에 상태(State)가 들어있기 때문!
// rmfjsep Context에 Dispatch만 넣어주면 State가 바뀌어도  TodoCreate는 새로 렌더링되지 않음

// State를 위한 Context
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return useContext(TodoStateContext);
}

// Dispatch를 위한 Context
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