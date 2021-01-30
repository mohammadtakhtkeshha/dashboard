import React, {useState, useEffect} from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import {StyledTreeTable} from "./StateFilterComponent";
import {toggleExpandedForAll} from "shared/helper.js"
import i18next from "i18next";

export default function StateFilterComponent({setOpenForm}) {
    const lang = i18next.language

    const editedTitle = (title) => {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>{title}</div>
                <div>title</div>
            </div>
        )
    }

    const [treeData, setTreeData] = useState([
        {title: editedTitle('Chicken'), children: [{title: 'Egg'}], expanded: true},
        {title: editedTitle('Fish'), children: [{title: 'fingerline'}], expanded: true},
        {
            title: editedTitle('numbers'),
            children: [{title: 'one', children: [{title: 'two'}], expanded: true}],
            expanded: true
        },
    ])

    useEffect(() => {
        toggleExpandedForAll({treeData, expanded: false})
    }, [])

    return (
        <div >
           <button onClick={()=>setOpenForm({show:true,id:''})}>button</button>
        </div>
    );
}


