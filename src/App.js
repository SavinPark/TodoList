/// App--Project02.js

import React, { useState } from 'react';
import './App.css';
import styled, {createGlobalStyle} from "styled-components";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { TodoProvider } from './TodoContext';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead.js';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';


// styled-components
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;
const Carousel = styled.div`
  width: 1656px;
  margin: 0 auto;

  display: flex;
  overflow: hidden;
  justify-content: space-around;  // 카드 사이에 균등한 여백을 두고 정렬

  // border: 4px solid red;
  // height: 1000px;
  // background: pink;
`;
const Slider = styled.div`
  width: 2760px; 
  display: flex;
  
  // background: powderblue;
`;


// APP COMPONENT
function App() {

  // 페이지 배열
  const [page, setPage] = useState([-2, -1, 0, 1, 2]);

  // 버튼 (Prev, Next)
  const [prev, setPrev] = useState(0); // PREV 누른 횟수
  const [next, setNext] = useState(0); // NEXT 누른 횟수

  //////////// onPrev 함수 ////////////
  const onPrev= () => {
    console.log('PREV');
    setPrev(prev + 1);

    // 1. 첫 페이지 추가
    setPage([page[0] - 1, ...page]);

    // 2-1. 카드 이동 (->) [slider]
    const slider = document.querySelector('.slider');
    slider.style.transform = `translate(${552}px)`;
    slider.style.transition = `${0.5}s ease-out`;

    // 3. 마지막 카드 삭제
    // 0.5초 후 실행
    setTimeout(function(){
      console.log('before page', page);
      console.log('after page', [page[0] - 1, ...page]);

      // 마지막 카드 삭제
      setPage([page[0] - 1, ...page].filter(p => p !== [page[0] - 1, ...page][[page[0] - 1, ...page].length - 1]));

      // // .slider 원위치로 이동
      slider.style.transform = `translate(${0}px)`;  
      slider.style.transition = `${0}s ease-out`; 
    }, 500);
  }


  //////////// onNext 함수 ////////////
  const onNext = () => {
    console.log('NEXT');
    setNext(next + 1);

    // 1. 마지막 페이지 추가
    setPage([...page, page[page.length-1] + 1]);
    
    // 2. 카드 이동 (<-)
    const slider = document.querySelector('.slider');
    slider.style.transform = `translate(${-552}px)`; 
    slider.style.transition = `${0.5}s ease-out`; 
    
    // 3. 첫 번째 카드 삭제 (0.5초 후 실행)
    setTimeout(function(){
      console.log('before page', page);
      console.log('after page', [...page, page[page.length-1] + 1]);

      // 첫 번째 카드 삭제
      setPage([...page, page[page.length-1] + 1].filter(p => p !== page[0]));

      // .slider 원위치로 이동 
      slider.style.transform = `translate(${0}px)`; 
      slider.style.transition = `${0}s ease-out`; 
    }, 500);
  }

  // Create Card : TodoTemplate을 그려주는 함수
  const createCard = (n, index) => {
    return (
      <div className='card' key={index}>
        <TodoProvider>
          <TodoTemplate num={n}>
            <TodoHead when={n}/>
            <TodoList />
            <TodoCreate />
            {/* <TodoList page={n} /> */}
            {/* <TodoCreate page={n} /> */}
          </TodoTemplate>
        </TodoProvider>
      </div>
    );
  }
 

  return(
    <>
      <GlobalStyle />
      <div style={{display: 'flex'}}>

        {/* Prev Btn */}
        <FaChevronLeft className='controlBtn prev' onClick={onPrev} />

        <Carousel className='carousel'>
          <Slider className='slider' >
           
           {/* TodoTemplate Card */}
           { page.map((n, index) => createCard(n, index))}
            
          </Slider>
        </Carousel>

        {/* Next Btn */}
        <FaChevronRight className='controlBtn next' onClick={onNext} />
        
      </div>
    </>
  );
}

// export default App;
export default React.memo(App);