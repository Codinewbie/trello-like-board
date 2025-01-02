import React, { useState, useEffect } from 'react';
import 'boxicons';
import 'boxicons/css/boxicons.min.css';

const UpdateCard = ({ setIsPopupOpen, lists, setLists, cardINDEX, listIndex }) => {
    const [cardDetails, setCardDetails] = useState([]);

    useEffect(() => {
        const card = new Array(3);
        console.log(listIndex, cardINDEX); // Output 2 undefined means cardINDEX is showing error
        card[0] = lists[listIndex]?.cards?.[cardINDEX]?.[0] || "";
        card[1] = lists[listIndex]?.cards?.[cardINDEX]?.[1] || "";
        card[2] = lists[listIndex]?.cards?.[cardINDEX]?.[2] || "";
        setCardDetails(card);
    }, [lists, listIndex, cardINDEX]);

    const handleKeyPress = (e) => {
        // Check if the Enter key (key code 13) is pressed
        if (e.key === 'Enter') {
          handleUpdateCardDetails(); // Trigger the button click handler
        }
      };
    const handleDeleteCard = () => {
        const updatedLists = [...lists];
        updatedLists[listIndex].cards.splice(cardINDEX, 1);
        setLists(updatedLists);
        setIsPopupOpen(false);
    };

    const handleUpdateCardDetails = () => {
        const updatedLists = [...lists];
        updatedLists[listIndex].cards[cardINDEX] = cardDetails;
        setLists(updatedLists);
        setCardDetails(null);
        setIsPopupOpen(false);
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Adjust for local time zone
        return localDate.toISOString().split("T")[0]; // Return in "YYYY-MM-DD" format for input
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' }; // "Aug 20, 2024"
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-8 h-96 w-96 rounded-lg gap-5 shadow-lg flex flex-col">
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={cardDetails[0]}
                            onChange={(e) => {
                                const title = e.target.value;
                                const updatedDetails = [...cardDetails];
                                updatedDetails[0] = title;
                                setCardDetails(updatedDetails);
                            }}
                            className="border border-gray-400 p-2 rounded text-sm w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={cardDetails[1]}
                            onChange={(e) => {
                                const description = e.target.value;
                                const updatedDetails = [...cardDetails];
                                updatedDetails[1] = description;
                                setCardDetails(updatedDetails);
                            }}
                            className="border border-gray-400 p-2 rounded text-sm w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Due Date</label>
                        <input
                            type="date"
                            onKeyDown={handleKeyPress}
                            value={formatDateForInput(cardDetails[2])} // Format for input field (YYYY-MM-DD)
                            onChange={(e) => {
                                const rawDate = e.target.value;
                                const formattedDate = formatDateForDisplay(rawDate); // Format as "Aug 20, 2024"
                                const updatedDetails = [...cardDetails];
                                updatedDetails[2] = formattedDate; // Store formatted date
                                setCardDetails(updatedDetails);
                            }}
                            className="border border-gray-400 p-2 rounded text-sm w-full"
                        />
                       
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="flex gap-3">
                            <button  onClick={handleUpdateCardDetails} className="rounded-lg bg-blue-600 text-sm px-4 text-white p-2 hover:bg-blue-800">
                                Save
                            </button>
                            <button onClick={() => setIsPopupOpen(false)} className="rounded-lg bg-zinc-200 hover:bg-zinc-400 text-sm px-4 p-2">
                                Cancel
                            </button>
                        </div>
                        <button onClick={handleDeleteCard} className="rounded-lg bg-red-200 text-sm px-4 text-red-800 hover:bg-red-800 hover:bg-opacity-30 p-2">
                            Delete Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCard;
