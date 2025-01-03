import React, { useState } from 'react';
import 'boxicons';
import 'boxicons/css/boxicons.min.css';
import { RxCross2 } from "react-icons/rx";

const NewListOrAddingList = ({lists ,setLists}) => {
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState(''); 

    const handleAddListClick = () => {
        setIsAddingList(true); 
    };
    const handleSaveList = () => {
        if (newListName.trim() !== '') {
          setLists([...lists, { name: newListName, cards: [] }]); 
          setNewListName('');
          setIsAddingList(false);
        }
      };
    const handleCancel = () => {
        setNewListName('');
        setIsAddingList(false); 
    };
    const handleKeyPress = (e ) => {
      if (e.key === 'Enter') {
        handleSaveList(); 
      }
    };

  return (  
    <React.Fragment>
         {!isAddingList ? (
          <button
            className="rounded-xl p-3 h-12 flex gap-2 items-center w-72 bg-white hover:bg-black bg-opacity-20 flex-shrink-0 hover:bg-opacity-20"
            onClick={handleAddListClick}
          >
            <box-icon name="plus" color="#49239a"></box-icon>
            <div className="text-indigo-900 text-sm font-semibold">Add a list</div>
          </button>
        ) : (
          <div className="w-72 h-[102px] bg-zinc-200 p-3  flex-shrink-0 rounded-xl">
            <input
              type="text"
              value={newListName}
              onKeyDown={handleKeyPress}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name"
              className="border  border-gray-400 p-2 w-full rounded text-sm focus:outline-blue-600"
            />
            <div className="flex items-center gap-3 mt-2">
              <button
                className="bg-blue-600 text-white text-sm px-3 h-8 rounded"
                onClick={handleSaveList}
              >
                Add list
              </button>
              <button className="flex justify-center items-center h-8 w-8 rounded-md hover:bg-gray-300" onClick={handleCancel}>
                <RxCross2 />
              </button>
            </div>
          </div>
        )}
    </React.Fragment>
  );
};

export default NewListOrAddingList;
