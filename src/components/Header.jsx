import React from 'react';
import 'boxicons';
import 'boxicons/css/boxicons.min.css';


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
      <div className="flex flex-row justify-center items-center gap-5">
        <button className = "bg-zinc-50 h-8 bg-opacity-40 font-semibold text-sm px-2 rounded-md hover:bg-blue-600 hover:bg-opacity-60   hover:text-white " onClick={handleResetBoard}>
            Reset Board
        </button>
        <div className="flex justify-start items-center space-x-2 p-1">
            <div className="h-8 w-8 bg-gray-100 border border-blue-600  text-center flex justify-center  items-center rounded-full overflow-hidden">
                    <img
                        src="/src/images/aman2.jpg" // Path relative to the public folder
                        alt="aman image"
                        className="object-cover rounded-full"
                    />
            </div>
          <div className="hidden md:block flex text-sm text-blue-800 font-semibold items-center justify-center mb-1">
            Aman Kumar
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
