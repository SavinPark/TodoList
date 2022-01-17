import React, { useState, useRef } from 'react';
import styled, {css} from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  dusplay: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom 0px;
  transform: translate(-50%, 50%);

  font-size: 60px;
  color: #fff;
  border-radius: 40px;
  
  border: none;
  outline: none;

  // circel버튼을 누르면 색이 변하면서 45도 회전하는 효과
  transition: 0.125s all ease-in;
  ${props => props.open && css`
    background: #ff6b6b;
    &:hover {
      background: #ff8787;
    }
    &:active {
      background: #fa5252;
    }
    transform: translate(-50%, 50%) rotate(45deg);
  `}
`;
// circle 버튼을 누르면 입력폼 나타남
const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;
// form 태그X
// const InsertForm = styled.div` 
// form 태그O
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

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Title');
  const [contents, setContents] = useState('');
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onFormToggle = () => setOpen(!open);
  const onTitle = (e) => setTitle(e.target.value);
  const onContents = (e) => setContents(e.target.value);
  const onSubmit = e => {
    e.preventDefault(); // 새로고침 방지
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        title,
        contents,
        done: false,
      }
    });
    setTitle('');
    setContents('');
    setOpen(false);
    nextId.current += 1;
  }

  // keypress 이벤트 추가 후 Enter키 제거하기
  // 모든 엘리먼트에 적용
  // document.addEventListener('keypress', function(event) {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //   };
  // }, true);

  // Title 영역에서 Enter키 누르면, Contents 영역으로 이동
  const onMoveFocus = (e) => {
    if(e.key === 'Enter') {
      document.getElementById('nextFocus').focus();
      e.preventDefault();
    }
  }

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm>
            <Input
              placeholder="Title" 
              autoFocus
              onChange={onTitle}
              value={title}
              onKeyPress={onMoveFocus}
            />
            <Textarea
              id='nextFocus'
              placeholder="Contents" 
              onChange={onContents}
              value={contents}
            />
            <SaveBtn onClick={onSubmit}>Save</SaveBtn>
          </InsertForm>
        </InsertFormPositioner>
      )}
     <CircleButton onClick={onFormToggle} open={open}>
       <MdAdd style={{width: '70px', height: '70px', position: 'relative', right:'1px', top: '4px'}} />
     </CircleButton>
    </>
  );
}

// 불필요한 렌더링 방지
export default React.memo(TodoCreate);
// export default TodoCreate;