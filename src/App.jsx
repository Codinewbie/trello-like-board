import React, { useEffect, useState } from "react";
import BoardBox from "./components/BoardBox";
import Header from "./components/Header";
import "./index.css";
import bg4 from "/src/images/bg4.jpg";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const storedLists = localStorage.getItem("lists");
        if (storedLists && storedLists !== "[]") {
            setLists(JSON.parse(storedLists));
        }
    }, []);

    useEffect(() => {
        if (lists.length > 0) {
            localStorage.setItem("lists", JSON.stringify(lists));
        }
    }, [lists]);
    return (
      <DndProvider backend={HTML5Backend}>
            <div
                className="bg-red-200 text-xl min-h-screen bg-center bg-cover"
                style={{ backgroundImage: `url(${bg4})` }}
            >
                <Header setLists={setLists} />
                <BoardBox lists={lists} setLists={setLists} />
            </div>
            </DndProvider>
    );
}

export default App;
