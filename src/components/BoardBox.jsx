import React, { useState } from "react";
import NewListOrAddingList from "./NewListOrAddingList";
import UpdateCard from "./UpdateCard";
import List from "./List";

const BoardBox = ({ lists, setLists }) => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cardINDEX, setCardINDEX] = useState(null);
  const [listIndex, setListIndex] = useState(null);

  const handleEditCard = ({  index, listIndex }) => {
    setCardINDEX(index);
    setListIndex(listIndex);
    console.log(index,listIndex);
    setIsPopupOpen(true); 
  };
  const handleClosePopup = () => {
    setCardINDEX(null);
    setListIndex(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="relative ">
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={handleClosePopup}
        ></div>
      )}
      <div
        className={`h-full w-full  rounded-md ${
          isPopupOpen ? "opacity-20" : "opacity-100"
        } transition-opacity duration-300`}
      >
        <div className="flex flex-cols gap-6 m-4 overflow-x-auto overflow-hidden scrollbar-hide  flex-nowrap items-start">
          {lists.map((list, index) => (
           <List
              key={index}
              index={index}
              list={list}
              lists={lists}
              setLists={setLists}
              handleEditCard={handleEditCard}
            />
          ))}
          <NewListOrAddingList lists={lists} setLists={setLists} />
        </div>
      </div>
      {isPopupOpen && (
        <UpdateCard
          setIsPopupOpen={setIsPopupOpen}
          lists={lists}
          setLists={setLists}
          cardINDEX={cardINDEX}
          listIndex={listIndex}
        />
      )}
    </div>
  );
};

export default BoardBox;

