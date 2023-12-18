import React,{useState} from 'react'
import Square from "./Square";
import gameOverSound from "../sounds/gameOver.wav";
import  clickSound from "../sounds/click.wav";

export default function Board() {

  const gameOver=new Audio(gameOverSound);
  gameOver.volume=0.2;
  const click=new Audio(clickSound);
  click.volume=0.2;
  
 

  function handleChange(index){
  
    if(state[index]!==null){
      return;
    }
    const copyState=[...state]
    copyState[index]=isXTurn ? "X" :"O"
    setState(copyState)
    setIsXTurn(!isXTurn)


  }

  const [state, setState] =useState(Array(9).fill(null));
  const[isXTurn,setIsXTurn]=useState(true);
  
  React.useEffect(()=> {
    if(state.some((tile)=> tile !== null)){
      click.play();
    }
  });
 


  function checkWinner(){
    const winnerLogic=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for(let logic of winnerLogic){
      const[a,b,c]=logic;
      if(state[a]!==null && state[a]===state[b] && state[a]===state[c]){
        return state[a];
        
      }
    }

    const areAllTilesFilledIn =state.every((square)=> square !== null);
    if(areAllTilesFilledIn){
      return "draw";
    }



    return false;

    
  }


  const isWinner= checkWinner();

  React.useEffect(()=>{
    if(isWinner){
      gameOver.play();
    }
},[isWinner])


  function handleReset(){
    setState(Array(9).fill(null))
  }

  return (
  <>
  <div className='board-container'>
  {isWinner ? (
  isWinner === 'draw' ? (
    <>
      It's a draw! <button className='but--reset' onClick={handleReset}>Reset</button>
    </>
  ) : (
    <>
      {isWinner} won the game <button className='but--reset'  onClick={handleReset}>Reset</button>
    </>
  )
): 
    ( <> 

      <h4 className='turn--mark'>Player {isXTurn ? "X": "O"} <span>Turn</span></h4>
  <div className='boxes'>
    <div className='board-row'>
      <Square onClick={()=>handleChange(0)} value={state[0]}/>
      <Square onClick={()=>handleChange(1)}  value={state[1]}/>
      <Square onClick={()=>handleChange(2)} value={state[2]}/>
    </div>

    <div className='board-row'>
    <Square  onClick={()=>handleChange(3)} value={state[3]}/>
    <Square  onClick={()=>handleChange(4)}  value={state[4]}/>
    <Square onClick={()=>handleChange(5)}  value={state[5]}/>
    </div>

    <div className='board-row'>
    <Square  onClick={()=>handleChange(6)}  value={state[6]}/>
    <Square  onClick={()=>handleChange(7)}  value={state[7]}/>
    <Square  onClick={()=>handleChange(8)}  value={state[8]}/>
    </div>

  </div>
  </>
  )}
  <div className='tic-design'>
   <h2 className='tic-1'>tic.</h2> 
    <h2 className='tic-2' style={{color:"#DCBF3F",marginTop:"-80px"}}>tac.</h2>
    <h2 className='tic-3' style={{marginTop:"-80px"}}>toe.</h2>
  </div>
  </div>
  </>
  
  )
  
}
