import React, { useState } from 'react';
import 'boxicons';
import 'boxicons/css/boxicons.min.css';
import { RxCross2 } from "react-icons/rx";


const AddACard = ({lists , setLists , index}) => {
   const [isHovered, setIsHovered] = useState(false);
   const [isAddingCard , setIsAddingCard]  = useState(false);
   const [cardDetails, setCardDetails] = useState([]);

   const handleAddCardClick = () => {
        setIsAddingCard(true); // Show input field when "Add a list" is clicked
    };

    const handleKeyPress = (e) => {
        // Check if the Enter key (key code 13) is pressed
        if (e.key === 'Enter') {
          handleSaveCard(); // Trigger the button click handler
        }
      };
    const handleSaveCard = () => {
        if (cardDetails[0].trim() !== '') {
        let updatedLists = [...lists];
        updatedLists[index].cards.push(cardDetails);
        setLists(updatedLists);
        }
        setCardDetails([]);
        setIsAddingCard(false);
    };
    const handleCancel = () => {
        setCardDetails([]);
        setIsAddingCard(false); // Hide the input field and reset
    };

   
  return (  
    <React.Fragment>
         {!isAddingCard ? (
            <div className = "w-full  px-2 pb-2 ">
            <button
                className="rounded-lg  mt-2 p-1 flex gap-2 w-full items-center text-zinc-500 hover:text-indigo-900  hover:bg-black bg-opacity-20 hover:bg-opacity-20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleAddCardClick}
            >
                <box-icon
                    name="plus"
                    color={isHovered ? "indigo" : "gray"} // Change color based on hover state
                ></box-icon>
                <div className="text-sm font-semibold">Add a card</div>
            </button>
            </div>
        ) : (
            <div className=" w-full px-2 rounded-xl mt-2  pb-2 gap-2 flex flex-col">
            <textarea
                type="text"
                value={cardDetails[0]}
                onKeyDown={handleKeyPress}
                onChange={(e) =>{
                    const title = e.target.value;
                    cardDetails[0] = title;
                    setCardDetails(cardDetails);
                }}
                placeholder="Enter a link or paste a link"
                className="border border-gray-400 p-2 text-top w-full rounded-lg text-sm"
            />
            <div className="flex items-center gap-3 ">
                <button
                className="bg-blue-600 text-white text-sm px-3 h-8 rounded"
                onClick={handleSaveCard}
                >
                Add card 
                </button>
                <button className="flex justify-center items-center h-8 w-8 rounded-md hover:bg-gray-300" onClick={handleCancel} >
                <RxCross2 />
                </button>
            </div>
            </div>
        )}
        </React.Fragment>
        
  );
};
export default AddACard;
