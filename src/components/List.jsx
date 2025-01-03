import React, { useRef, useEffect, useState } from 'react';
import "boxicons";
import "boxicons/css/boxicons.min.css";
import { useDrag, useDrop } from 'react-dnd';
import Card from './Card';
import AddACard from './AddACard';

const List = ({ index, list, handleEditCard, lists, setLists }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedListName, setEditedListName] = useState('');
  const cardsRefs = useRef([]);

  const moveList = (fromIndex, toIndex) => {
    const updatedLists = [...lists];
    const [movedList] = updatedLists.splice(fromIndex, 1);
    updatedLists.splice(toIndex, 0, movedList);
    setLists(updatedLists);
  };

  const [, drag] = useDrag({
    type: 'LIST',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'LIST',
    hover: (item) => {
      if (item.index !== index) {
        moveList(item.index, index);
        item.index = index;
      }
    },
  });

  const getDueStatus = (dueDate) => {
    const today = new Date();
    const cardDueDate = new Date(dueDate);
    return today > cardDueDate;
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
    setEditedListName('');
  };

  const handleDeleteList = (index) => {
    const afterDeleting = [...lists];
    afterDeleting.splice(index, 1);
    setLists(afterDeleting);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      saveEditedListName(index);
    }
  };

  useEffect(() => {
    if (index !== null && cardsRefs.current[index]) {
      const container = cardsRefs.current[index];
      container.scrollTop = container.scrollHeight;
    }
  }, [lists]);

  return (
    <div ref={(node) => drag(drop(node))} key={index} className="rounded-xl w-72 bg-zinc-200 border flex-shrink-0">
      <div className="flex items-center w-full px-4 pt-4">
        <div className="flex justify-between pr-3 pl-1 w-full gap-3 ">
          {editIndex === index ? (
            <input
              type="text"
              value={editedListName}
              onKeyDown={(e) => handleKeyPress(e, index)}
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
              <box-icon name="pencil" type="solid" color="#737171" size="sm"></box-icon>
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
          const isOverdue = card[2] ? getDueStatus(card[2]) : false;
          return (
            <Card
              isOverdue={isOverdue}
              key={cardIndex}
              index={cardIndex}
              listIndex={index}
              card={card}
              handleEditCard={handleEditCard}
              lists={lists}
              setLists={setLists}
            />
          );
        })}
      </div>
      <AddACard lists={lists} setLists={setLists} index={index} />
    </div>
  );
};

export default List;
