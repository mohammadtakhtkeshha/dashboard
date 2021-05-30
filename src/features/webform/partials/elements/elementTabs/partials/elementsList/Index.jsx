import React, {useState} from "react";
import {ReactSortable} from "react-sortablejs";

const App = () => {
    const [state, setState] = useState([
        {id: 1, name: "shrek"},
        {id: 2, name: "fiona"},
    ]);

    return (<ReactSortable
        group="groupName"
        animation={200}
        delayOnTouchStart={true}
        delay={2}>
        {state.map((item) => (
            <div key={item.id}>{item.name}</div>
        ))}
    </ReactSortable>);
};

export default App
