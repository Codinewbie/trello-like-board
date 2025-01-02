import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Card = ({ isOverdue, index, listIndex, card, lists, setLists, handleEditCard }) => {
    const [, drag] = useDrag({
        type: 'CARD',
        item: { index, listIndex },
    });

    const [, drop] = useDrop({
        accept: 'CARD',
        hover: (item) => {
            // If the card is dragged within the same list or across lists
            if (item.index !== index || item.listIndex !== listIndex) {
                moveCard(item.index, index, listIndex, item.listIndex);
                item.index = index;
                item.listIndex = listIndex; // Update the dragged item's listIndex
            }
        },
    });

    const moveCard = (dragIndex, hoverIndex, targetListIndex, draggedListIndex) => {
        const updatedLists = [...lists];

        // Remove the card from its original position
        const draggedCard = updatedLists[draggedListIndex].cards.splice(dragIndex, 1)[0];

        // Insert the card into its new position
        updatedLists[targetListIndex].cards.splice(hoverIndex, 0, draggedCard);

        setLists(updatedLists);
    };

    return (
        <button
            onClick={() => handleEditCard({ index, listIndex })}
            ref={(node) => drag(drop(node))}
            className="border-2 border-transparent p-2 text-sm text-left shadow-md rounded-lg bg-gray-100 hover:border-blue-500"
        >
            <div>
                {card[0]} 
            </div>
            {(card[2] != null || card[1] != null) && (
                <div className="flex gap-2 mt-1 items-center">
                    {card[2] !== "" && (
                        <div
                            className={`flex gap-1 items-center rounded-sm justify-center px-[5px] ${
                                isOverdue
                                    ? 'bg-red-200 hover:bg-opacity-40 hover:bg-red-900'
                                    : ''
                            }`}
                            title={` ${
                                isOverdue
                                    ? 'This card is past due.'
                                    : 'This card is due later.'
                            }`}
                        >
                            <div className="pb-[1px]">
                                <box-icon
                                    name="alarm"
                                    color={isOverdue ? 'brown' : '#737171'}
                                    size="xs"
                                ></box-icon>
                            </div>
                            <div
                                className={`text-xs ${
                                    isOverdue ? 'text-red-700' : 'text-zinc-800'
                                }`}
                            >
                                {card[2]}
                            </div>
                        </div>
                    )}

                    {card[1] !== "" && (
                        <button
                            className="pb-[0.5px]"
                            onClick={() => handleEditCard({ index, listIndex })}
                            title="This card has a description"
                        >
                            <box-icon name="detail" color="#737171" size="xs"></box-icon>
                        </button>
                    )}
                </div>
            )}
        </button>
    );
};

export default Card;
