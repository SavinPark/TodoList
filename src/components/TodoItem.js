import React, { useState } from 'react';
import styled, {css} from "styled-components";
import { MdDone, MdDelete, MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  border: 3px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props => props.done && css`
    border: 3px solid #38d9a9;
    color: #38d9a9;
  `}
`;
const Text = styled.div`
  flex: 1;
  font-size: 22px;
  color: #495057;
  &:hover {
    cursor: pointer;
  }
  ${props => props.done && css`
    color: #ced4da;
  `}
`;
const Remove = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;
/////////Edit페이지/////////
const CircleButton = styled.button`
  background: #ff6b6b;
  &:hover {
    background: #ff8787;
  }
  &:active {
    background: #fa5252;
  }
  transform: translate(-50%, 50%) rotate(45deg);

  z-index: 6;
  cursor: pointer;
  width: 80px;
  height: 80px;
  dusplay: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom 0px;
  // transform: translate(-50%, 50%);

  font-size: 60px;
  color: #fff;
  border-radius: 40px;
  
  border: none;
  outline: none;

  // circel버튼을 누르면 색이 변하면서 45도 회전하는 효과
  transition: 0.125s all ease-in;
  ${props => props.edit && css`
    background: #38d9a9;
    &:hover {
      background: #63e6be;
    }
    &:active {
      background: #20c997;
    }
    transform: translate(-50%, 50%);
  `}
`;
// circle 버튼을 누르면 입력폼 나타남
const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;
const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;
const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  &::placeholder {
    color: #999;
  }
`;
const Textarea = styled.textarea`
  height: 400px;
  padding: 12px;
  margin-top: 16px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  resize: none;
  &::placeholder {
    font-weight: 600;
    color: #999;
  }
`
const SaveBtn = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 16px;
  padding-top: 8px;
  box-sizing: border-box;
  background: #6666ff;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: ;
  text-align: center;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background: #8080ff;
  }
`

function TodoItem({id, title, contents, done}) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContents, setNewContents] = useState(contents);
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onFormToggle = () => setEdit(!edit);
  const onTitle = (e) => setNewTitle(e.target.value);
  const onContents = (e) => setNewContents(e.target.value);
  
  const onToggle = () => 
    dispatch({
      type: 'TOGGLE',
      id
    });
  const onRemove = () => {
    dispatch({
      type: 'REMOVE',
      id
    });
  }
  const onEdit = () => {
    dispatch({
      type: 'EDIT',
      id,
    });
    setEdit(!edit);
  }
  const onSubmit = e => {
    onRemove();
    e.preventDefault(); // 새로고침 방지
    dispatch({
      type: 'CREATE',
      todo: {
        id,
        title: newTitle,
        contents: newContents,
        done: false,
      }
    });
    setEdit(false);
    nextId.current += 1;
  }
  // Title 영역에서 Enter키 누르면, Contents 영역으로 이동
  const onMoveFocus = (e) => {
    if(e.key === 'Enter') {
      document.getElementById('nextFocus').focus();
      e.preventDefault();
    }
  }

  return(
    <>
      {edit && (
        <>
        <InsertFormPositioner>
          <InsertForm>
            <Input
              placeholder={title}
              autoFocus
              onChange={onTitle}
              value={newTitle}
              onKeyPress={onMoveFocus}
            />
            <Textarea
              id='nextFocus'
              placeholder={contents}
              onChange={onContents}
              value={newContents}
            />
            <SaveBtn onClick={onSubmit}>Save</SaveBtn>
          </InsertForm>
        </InsertFormPositioner>
        <CircleButton onClick={onFormToggle}>
          <MdAdd style={{width: '70px', height: '70px', position: 'relative', right:'1px', top: '4px'}} />
        </CircleButton>
        </>
      )}
      <TodoItemBlock>
        <CheckCircle done={done} onClick={onToggle}>{done && <MdDone />}</CheckCircle>
        <Text id={id} done={done} onClick={onEdit} edit={edit}>{title}</Text>
        <Remove onClick={onRemove}>
          <MdDelete />
        </Remove>
      </TodoItemBlock>
    </>
  );
}

// React.memo 컴포넌트 최적화 
// 예를 들어 '컴포넌트 수정하기'를 클릭했을 때 아래있는 컴포넌트들은 리렌더링하지 않음 --> Dispatch만 가져오기 때문
export default React.memo(TodoItem);