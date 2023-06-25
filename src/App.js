import Hearder from './Compontent/Editable/hearder/Hearder.jsx';
import './App.css';
import Board from './Compontent/Board/Board';
import a from './Compontent/Images/a.jpg'
import b from './Compontent/Images/b.jpg'
import c from './Compontent/Images/c.jpg'
import d from './Compontent/Images/d.jpg'
import e from './Compontent/Images/e.jpg'
import f from './Compontent/Images/f.jpg'
import g from './Compontent/Images/g.jpg'
import i from './Compontent/Images/i.jpg'
import j from './Compontent/Images/j.jpg'
import k from './Compontent/Images/k.jpg'
import l from './Compontent/Images/l.jpg'
import m from './Compontent/Images/m.jpg'
import n from './Compontent/Images/n.jpg'
import o from './Compontent/Images/o.jpg'
import p from './Compontent/Images/p.jpg'
import q from './Compontent/Images/q.jpg'
import Editable from './Compontent/Editable/Editable';
import { useEffect, useState } from 'react';

function App() {

  const[target,SetTarget] = useState({
    cid: "",
    bid: "",
});

  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('kanban')) || [] 
  );
  
  const [changebg , setChangebg] = useState(0)
  const backgroundImages = [a,b,c,d,e,f,g,i,j,k,l,m,n,o,p,q];

const changeTheme = () => {
  // console.log("change pic")
  if (backgroundImages.length - 1 > changebg) {
    setChangebg(changebg + 1);
  } else {
    setChangebg(0);
  }
};
    // {
    //   id: Date.now() + Math.random() * 2,
    //   title: "To DO",
    //   cards: [
    //     {
    //       id: Date.now() + Math.random(),
    //       title: "Card 1",
    //       tasks: [],
    //       desc: "cdhytfhgf hghjvju hkfhhjy",
    //       Date: "",
    //     },
    //     {
    //       id: Date.now() + Math.random(),
    //       title: "Card 2",
    //       tasks: [],
    //       desc: "cdhytfhgf hghjvju hkfhhjy",
    //       Date: "",
    //     }

    //   ]
    // },

  // ]);

  const addcard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      tasks: [],
      date: "",
      desc: "",

    };
    const index = boards.findIndex((item) => item.id === bid)
    if (index < 0) return;

    const tempboards = [...boards];
    tempboards[index].cards.push(card);
    setBoards(tempboards);
  };

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;


    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;


    const tempboards = [...boards];
    tempboards[bIndex].cards.splice(cIndex, 1)
    setBoards(tempboards)
  }

  const addBoard = (title) => {
   
    setBoards([
      ...boards, {
        id: Date.now() + Math.random(),
        title,
        cards: [],
      },
    ])
    
  };

  const removeBoard = bid => {
    const tempboards = boards.filter((item) => item.id !== bid);
    setBoards(tempboards);
  }

  //Card Drag Down
  
  const handleDragEnd = (cid,bid) => {
    let s_bIndex,s_cIndex,t_bIndex,t_cIndex
    s_bIndex = boards.findIndex((item) => item.id === bid)
    if(s_bIndex < 0)
    return;
    s_cIndex = boards[s_bIndex]?.cards?.findIndex((item) => item.id === cid)
    if(s_cIndex < 0)
    return;

    t_bIndex = boards.findIndex((item) => item.id === target.bid)
    if(t_bIndex < 0)
    return;
    t_cIndex = boards[t_bIndex].cards?.findIndex((item) => item.id === target.cid)
    if(t_cIndex < 0)
    return;

    const tempboards = [...boards]
    const tempCard = tempboards[s_bIndex].cards[s_cIndex]

    tempboards[s_bIndex].cards.splice(s_cIndex,1);
    tempboards[t_bIndex].cards.splice(t_cIndex, 0,tempCard)

    setBoards(tempCard)




  }

  const handleDrageEnter = (cid,bid) => {
    SetTarget({
      cid,
      bid,
    }); 

  }

  const updateCard = (cid,bid,card) => {

    const bIndex = boards.findIndex((item) => item.id === bid)
    if(bIndex < 0)
    return;
    const cIndex = boards[bIndex]?.cards?.findIndex((item) => item.id === cid)
    if(cIndex < 0)
    return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards)

  }

  useEffect(() => {
    localStorage.setItem('kanban',JSON.stringify(boards))
  },[boards])

  
  function clearBoardAll(){
    setBoards([])
  }



  return (
    <div className='app'style={{ backgroundImage: `url(${backgroundImages[changebg]})` }}>
      <div className='app_navbar'>
        <Hearder changeTheme={changeTheme}/>
      </div>
      <div className='app_outer'>
        <div className='app_boards'>
          {
            boards.map((item) => (
              <Board 
              key={item.id} 
              boards={item} 
              removeBoard={removeBoard} 
              addcard = {addcard}
              removeCard = {removeCard}
              handleDrageEnter={handleDrageEnter}
              handleDragEnd={handleDragEnd}
              updateCard = {updateCard}
              clearBoardAll={clearBoardAll}
              />
            ))}
          <div className='app_boards_board'>
            <Editable
              displayclass="app_boards_board_add"
              text="Add Board"
              placeholder="Enter board title"
              onSubmit={(value) => addBoard(value)}
            />
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
