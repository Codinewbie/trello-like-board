import React, { useState, useEffect } from 'react';
import 'boxicons';
import 'boxicons/css/boxicons.min.css';

const UpdateCard = ({ setIsPopupOpen, lists, setLists, cardINDEX, listIndex }) => {
    const [cardDetails, setCardDetails] = useState([]);
    const [dateForComparison, setDateForComparison] = useState(null);

    useEffect(() => {
        const card = new Array(3);
        console.log(listIndex, cardINDEX); // Output 2 undefined means cardINDEX is showing error
        card[0] = lists[listIndex]?.cards?.[cardINDEX]?.[0] || "";
        card[1] = lists[listIndex]?.cards?.[cardINDEX]?.[1] || "";
        card[2] = lists[listIndex]?.cards?.[cardINDEX]?.[2] || "";
        setCardDetails(card);
    }, [lists, listIndex, cardINDEX]);

    const handleDeleteCard = () =>{
        const updatedLists = [...lists];
        updatedLists[listIndex].cards.splice(cardINDEX,1);
        setLists(updatedLists);
        setIsPopupOpen(false);
    }
    const formatToDisplay = (dateString) => {
        if (!dateString) return ""; // Return empty if dateString is invalid
        const date = new Date(dateString);
        if (isNaN(date)) return ""; // Handle invalid date
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }); // "Feb 2, 2024"
    };

    const handleUpdateCardDetails = () => {
        const updatedLists = [...lists];
        updatedLists[listIndex].cards[cardINDEX] = cardDetails;
        setLists(updatedLists);
        setCardDetails(null);
        setIsPopupOpen(false);
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
                            type="text"
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
                            value={dateForComparison ? dateForComparison.toISOString().split("T")[0] : ""}
                            onChange={(e) => {
                                const rawDate = e.target.value;
                                const formattedDate = formatToDisplay(rawDate);
                                setDateForComparison(new Date(rawDate));
                                const updatedDetails = [...cardDetails];
                                updatedDetails[2] = formattedDate;
                                setCardDetails(updatedDetails);
                            }}
                            className="border border-gray-400 p-2 rounded text-sm w-full"
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                        <div>
                            <button onClick={handleUpdateCardDetails} className="rounded-lg bg-blue-600 text-sm px-4 text-white p-2">Save</button>
                            <button onClick={() => setIsPopupOpen(false)} className="rounded-lg bg-zinc-200 text-sm px-4 p-2">Cancel</button>
                        </div>
                        <button onClick={handleDeleteCard}>Delete Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCard;
