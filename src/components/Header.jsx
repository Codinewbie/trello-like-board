import React from 'react';
import 'boxicons';
import 'boxicons/css/boxicons.min.css';
import aman2 from "/src/images/aman2.jpg";


const Header = ({setLists}) => {

    const handleResetBoard = () =>{
        setLists([]);
    }

  return (  
    <div className = "border-b">
    <div className=" flex justify-between gap-3 space-5 items-center mx-6 py-2">
        <div className = "flex justify-center items-center gap-2">
            <box-icon name='trello' type='logo' color='#2264d4' ></box-icon>
            <div className="text-blue-600 font-bold">Trello</div>
        </div>
        <div className="flex flex-row justify-center items-center mr-6 sm:mr-0 gap-3 sm:gap-5">
          <button className = "bg-zinc-50 h-8 bg-opacity-40 text-zinc-800  font-semibold text-xs px-2 rounded-md hover:bg-black hover:bg-opacity-20    " onClick={handleResetBoard}>
              Reset Board
          </button>
          <a className="flex justify-start items-center space-x-2 p-1  " href="https://codinewbie.github.io/portfolio/" title="portfolio" target="_blank" rel="noopener noreferrer">
              <div className="h-8 w-8 bg-gray-100 absolute   text-center flex justify-center  items-center rounded-full z-20 " >
                      <img
                          src={aman2} // Path relative to the public folder
                          alt="aman image"
                          className="object-cover rounded-full grayscale"
                      />
              </div>
              <div className="hidden sm:block flex flex-col rounded-md relative bg-white  bg-opacity-40 hover:bg-opacity-20 text-[10px] pl-7 px-2 py-[1px] pb-[2px] text-zinc-900 font-semibold items-center justify-center ">
                Aman Kumar
              </div>
          </a>
        </div>
    </div>
    </div>
  );
};

export default Header;
