// import React, { useEffect, useRef, useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
// import 'boxicons';
// import 'boxicons/css/boxicons.min.css';
// import NewListOrAddingList from './NewListOrAddingList';
// import AddACard from './AddACard';
// import UpdateCard from './UpdateCard';

// const BoardBox = ({ lists, setLists }) => {
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedListName, setEditedListName] = useState('');
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [cardINDEX, setCardINDEX] = useState(null);
//   const [listIndex, setListIndex] = useState(null);
//   const cardsref = useRef(null);

//   const handleEditCard = ({ cardIndex, index }) => {
//     setCardINDEX(cardIndex);
//     setListIndex(index);
//     console.log(cardINDEX,listIndex);
//     setIsPopupOpen(true); 
//   };

//   const handleClosePopup = () => {
   
//     setIsPopupOpen(false);
//   };

//   const handleDeleteList = (index) => {
//     const afterDeleting = [...lists];
//     afterDeleting.splice(index, 1);
//     setLists(afterDeleting);
//   };

//   const startEditingListName = (index) => {
//     setEditIndex(index);
//     setEditedListName(lists[index].name);
//   };

//   const saveEditedListName = (index) => {
//     const updatedLists = [...lists];
//     updatedLists[index].name = editedListName;
//     setLists(updatedLists);
//     setEditIndex(null);
//     setEditedListName('');
//   };

//   // Function to determine if the card is overdue
  
//   // Drag-and-drop for Lists
//   const moveList = (dragIndex, hoverIndex) => {
//     const updatedLists = [...lists];
//     const draggedList = updatedLists[dragIndex];
//     updatedLists.splice(dragIndex, 1);
//     updatedLists.splice(hoverIndex, 0, draggedList);
//     setLists(updatedLists);
//   };

//   // Drag-and-drop for Cards
//   const moveCard = (dragIndex, hoverIndex, listIndex) => {
//     const updatedLists = [...lists];
//     const draggedCard = updatedLists[listIndex].cards[dragIndex];
//     updatedLists[listIndex].cards.splice(dragIndex, 1);
//     updatedLists[listIndex].cards.splice(hoverIndex, 0, draggedCard);
//     setLists(updatedLists);
//   };

//   useEffect(() => {
//     if (cardsref.current) {
//       cardsref.current.scrollTop = cardsref.current.scrollHeight;
//     }
//   }, [lists]); // Triggered when the lists change

//   return (
//     <div className="relative">
//       {isPopupOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={handleClosePopup}></div>
//       )}
//       <div className={`h-full w-full border rounded-md ${isPopupOpen ? "opacity-20" : "opacity-100"} transition-opacity duration-300`}>
//         <div className="flex flex-cols gap-6 m-4 overflow-x-auto border pb-20 flex-nowrap items-start">
//           {lists.map((list, index) => (
//             <List
//               key={index}
//               index={index}
//               list={list}
//               moveList={moveList}
//               handleDeleteList={handleDeleteList}
//               startEditingListName={startEditingListName}
//               saveEditedListName={saveEditedListName}
//               editIndex={editIndex}
//               editedListName={editedListName}
//               setEditedListName={setEditedListName}
//               cardsref={cardsref}
//               moveCard={moveCard}
//               lists={lists}
//               setLists={setLists}
//               handleEditCard={handleEditCard}
//             />
//           ))}
//           <NewListOrAddingList lists={lists} setLists={setLists} />
//         </div>
//       </div>
//       {isPopupOpen && (
//         <UpdateCard setIsPopupOpen={setIsPopupOpen} lists={lists} setLists={setLists} cardINDEX={cardINDEX} listIndex={listIndex} />
//       )}
//     </div>
//   );
// };

// // List component for drag-and-drop functionality
// const List = ({ index, list, moveList, handleDeleteList, startEditingListName, saveEditedListName,handleEditCard, editIndex, editedListName, setEditedListName, cardsref, moveCard, lists, setLists }) => {
//   const [, drop] = useDrop({
//     accept: 'LIST',
//     hover: (item) => {
//       if (item.index !== index) {
//         moveList(item.index, index);
//         item.index = index;
//       }
//     },
//   });
//   const getDueStatus = (dueDate) => {
//     const today = new Date();
//     const cardDueDate = new Date(dueDate);
//     return today > cardDueDate;
//   };


//   return (
//     <div ref={drop} className="rounded-xl w-72 bg-zinc-200 border p-4 flex-shrink-0">
//       <div className="flex items-center w-full">
//         <div className="flex justify-between px-3 w-full gap-3 mr-3">
//           {editIndex === index ? (
//             <input
//               type="text"
//               value={editedListName}
//               onChange={(e) => setEditedListName(e.target.value)}
//               className="border border-gray-400 p-2 rounded text-sm w-full"
//             />
//           ) : (
//             <div className="font-semibold text-sm">{list.name}</div>
//           )}
//           {editIndex === index ? (
//             <button className="text-blue-600 text-sm font-semibold" onClick={() => saveEditedListName(index)} title="Save">
//               <box-icon name="check"></box-icon>
//             </button>
//           ) : (
//             <button className="flex items-center justify-center" onClick={() => startEditingListName(index)} title="Edit list name">
//               <box-icon name="pencil" type="solid" color="#737171" size="sm"></box-icon>
//             </button>
//           )}
//         </div>
//         <button className="flex items-center" onClick={() => handleDeleteList(index)} title="Delete list">
//           <box-icon name="folder-minus" color="#737171"></box-icon>
//         </button>
//       </div>
//       <div className="flex flex-col gap-2 mt-4 max-h-72 overflow-y-auto overflow-hidden scrollbar-hide" ref={cardsref} id="cards">
//         {list.cards.map((card, cardIndex) => {
//             const isOverdue = getDueStatus(card[2]); // Check if the card is overdue
            
//         return(
//             <Card
//                 isOverdue={isOverdue}
//                 key={cardIndex}
//                 index={cardIndex}
//                 listIndex={index}
//                 card={card}
//                 moveCard={moveCard}
//                 handleEditCard={handleEditCard}
//             />
//             );
//         })}
//       </div>
//       <AddACard lists={lists} setLists={setLists} index={index} />
//     </div>
//   );
// };

// // Card component for drag-and-drop functionality
// const Card = ({isOverdue, index, listIndex, card, moveCard , handleEditCard}) => {
//   const [, drag] = useDrag({
//     type: 'CARD',
//     item: { index, listIndex },
//   });
  
//   const [, drop] = useDrop({
//     accept: 'CARD',
//     hover: (item) => {
//       if (item.listIndex === listIndex && item.index !== index) {
//         moveCard(item.index, index, listIndex);
//         item.index = index;
//       }
//     },
//   });

//   return (
//     <button
//       onClick={ ()=>handleEditCard({ index, listIndex })}
//       ref={(node) => drag(drop(node))}
//       className="border-2 border-transparent p-2 text-sm text-left shadow-md rounded-lg bg-gray-100 hover:border-blue-500"
//     >
//       <div>{card[0]} {  index}{ listIndex }</div>
//       {(card[2] != null || card[1] != null) && 
//         <div className="flex gap-2 mt-1 items-center">
//             {card[2] !== "" &&
//                     <div className={`flex gap-1 items-center rounded-sm justify-center px-[5px] ${isOverdue ? 'bg-red-200 hover:bg-opacity-40 hover:bg-red-900' : ''}` } title={` ${isOverdue ? "This card is past due." : "This card is due later."}`}>
//                         <div className="pb-[1px] " >
//                             <box-icon name='alarm' color={isOverdue ? 'brown' : '#737171'} size='xs'></box-icon>
//                         </div>
//                         <div className={`text-xs ${isOverdue ? 'text-red-700' : 'text-zinc-800'}`}>{card[2]}</div>
//                     </div>
//                 }

//                 {card[1] !== "" && 
//                 <button className="pb-[0.5px]" onClick={()=> handleEditCard({  index, listIndex })} title="This card has a description">
//                     <box-icon name='detail' color='#737171' size='xs'></box-icon>
//                 </button>
//                 }
//         </div>
      
//       }
//     </button>
//   );
// };

// export default BoardBox;

import React, { useEffect, useRef, useState } from "react";
import "boxicons";
import "boxicons/css/boxicons.min.css";
import NewListOrAddingList from "./NewListOrAddingList";
import AddACard from "./AddACard";
import UpdateCard from "./UpdateCard";

const BoardBox = ({ lists, setLists }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedListName, setEditedListName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cardINDEX, setCardINDEX] = useState(null);
  const [listIndex, setListIndex] = useState(null);

  const cardsRefs = useRef([]);

  const handleEditCard = ({ cardIndex, index }) => {
    setCardINDEX(cardIndex);
    setListIndex(index);
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
    <div className="relative">
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={handleClosePopup}
        ></div>
      )}
      <div
        className={`h-full w-full border rounded-md ${
          isPopupOpen ? "opacity-20" : "opacity-100"
        } transition-opacity duration-300`}
      >
        <div className="flex flex-cols gap-6 m-4 overflow-x-auto border pb-20 flex-nowrap items-start">
          {lists.map((list, index) => (
            <div
              key={index}
              className="rounded-xl w-72 bg-zinc-200 border p-4 flex-shrink-0"
            >
              <div className="flex items-center w-full">
                <div className="flex justify-between px-3 w-full gap-3 mr-3">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedListName}
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
                className="flex flex-col gap-2 mt-4 max-h-72 overflow-y-auto overflow-hidden scrollbar-hide"
                ref={(el) => (cardsRefs.current[index] = el)}
                id="cards"
              >
                {list.cards.map((card, cardIndex) => {
                  const isOverdue = getDueStatus(card[2]); // Check if the card is overdue

                  return (
                    <button
                      key={cardIndex}
                      onClick={() => handleEditCard({ cardIndex, index })}
                      className="border-2 border-transparent p-2 text-sm text-left shadow-md rounded-lg bg-gray-100 hover:border-blue-500"
                    >
                      <div className="">{card[0]}</div>
                      {(card[2] != null || card[1] != null) && (
                        <div className="flex gap-2 mt-1 items-center">
                          {card[2] !== "" && (
                            <div
                              className={`flex gap-1 items-center rounded-sm justify-center px-[5px] ${
                                isOverdue
                                  ? "bg-red-200 hover:bg-opacity-40 hover:bg-red-900"
                                  : ""
                              }`}
                              title={` ${
                                isOverdue
                                  ? "This card is past due."
                                  : "This card is due later."
                              }`}
                            >
                              <div className="pb-[1px] ">
                                <box-icon
                                  name="alarm"
                                  color={isOverdue ? "brown" : "#737171"}
                                  size="xs"
                                ></box-icon>
                              </div>
                              <div
                                className={`text-xs ${
                                  isOverdue
                                    ? "text-red-700"
                                    : "text-zinc-800"
                                }`}
                              >
                                {card[2]}
                              </div>
                            </div>
                          )}

                          {card[1] !== "" && (
                            <button
                              className="pb-[0.5px]"
                              onClick={() =>
                                handleEditCard({ cardIndex, index })
                              }
                              title="This card has a description"
                            >
                              <box-icon
                                name="detail"
                                color="#737171"
                                size="xs"
                              ></box-icon>
                            </button>
                          )}
                        </div>
                      )}
                    </button>
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

