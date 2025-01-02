import React, { useEffect, useRef, useState } from "react";
import "boxicons";
import "boxicons/css/boxicons.min.css";
import NewListOrAddingList from "./NewListOrAddingList";
import AddACard from "./AddACard";
import UpdateCard from "./UpdateCard";
import Card from "./Card";

const BoardBox = ({ lists, setLists }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedListName, setEditedListName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cardINDEX, setCardINDEX] = useState(null);
  const [listIndex, setListIndex] = useState(null);

  const cardsRefs = useRef([]);

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

  const handleDeleteList = (index) => {
    const afterDeleting = [...lists];
    afterDeleting.splice(index, 1);
    setLists(afterDeleting);
  };

  const startEditingListName = (index) => {
    setEditIndex(index);
    setEditedListName(lists[index].name);
  };

  const saveEditedListName = (index) => {
    const updatedLists = [...lists];
    updatedLists[index].name = editedListName;
    setLists(updatedLists);
    setEditIndex(null);
    setEditedListName("");
  };
  const handleKeyPress = (e , index) => {
    // Check if the Enter key (key code 13) is pressed
    if (e.key === 'Enter') {
      saveEditedListName(index); // Trigger the button click handler
    }
  };

  const getDueStatus = (dueDate) => {
    const today = new Date();
    const cardDueDate = new Date(dueDate);
    return today > cardDueDate;
  };

  useEffect(() => {
    if (listIndex !== null && cardsRefs.current[listIndex]) {
      const container = cardsRefs.current[listIndex];
      container.scrollTop = container.scrollHeight; // Scroll to the bottom
    }
  }, [lists]);

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
            <div
              key={index}
              className="rounded-xl w-72 bg-zinc-200 border flex-shrink-0"
            >
              <div className="flex items-center w-full px-4 pt-4">
                <div className="flex justify-between pr-3 pl-1 w-full gap-3 ">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedListName}
                      onKeyDown={(e) => handleKeyPress(e,index)}
                      onChange={(e) => setEditedListName(e.target.value)}
                      className="border border-gray-400 p-2 rounded text-sm w-full"
                    />
                  ) : (
                    <div className="font-semibold text-sm">{list.name}</div>
                  )}
                  {editIndex === index ? (
                    <button
                      className="text-blue-600 text-sm font-semibold"
                      onClick={() => saveEditedListName(index)}
                      title="Save"
                    >
                      <box-icon name="check"></box-icon>
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center"
                      onClick={() => startEditingListName(index)}
                      title="Edit list name"
                    >
                      <box-icon
                        name="pencil"
                        type="solid"
                        color="#737171"
                        size="sm"
                      ></box-icon>
                    </button>
                  )}
                </div>
                <button
                  className="flex items-center"
                  onClick={() => handleDeleteList(index)}
                  title="Delete list"
                >
                  <box-icon name="folder-minus" color="#737171"></box-icon>
                </button>
              </div>
              <div
                className="flex flex-col gap-2 mt-4 px-2 max-h-[calc(100vh-270px)] overflow-y-auto custom-scrollbar"
                ref={(el) => (cardsRefs.current[index] = el)}
                id="cards"
              >
                {list.cards.map((card, cardIndex) => {
                  let isOverdue = false;
                  if(card[2]!="" || card[2]!=null){
                   isOverdue = getDueStatus(card[2]); // Check if the card is overdue
                  }
                  return (
                      <Card
                            isOverdue={isOverdue}
                            key={cardIndex}
                            index={cardIndex}
                            listIndex={index}
                            card={card}
                            handleEditCard={handleEditCard}
                            lists = {lists}
                            setLists = {setLists}
                      />
                  );
                })}
              </div>
              <AddACard lists={lists} setLists={setLists} index={index} />
            </div>
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

