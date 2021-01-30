import React, {useState} from 'react';
import 'react-sortable-tree/style.css';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
// import SortableTree from 'react-sortable-tree';
// import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
// import SortableTree from 'react-sortable-tree/dist/index.cjs.js';
// import SortableTree from 'react-sortable-tree';
import SortableTree from 'react-sortable-tree/dist/index.esm.js';
import styled from "styled-components";
import {makeStyles} from "@material-ui/styles";
const StyledButton = styled.button`
border:1px solid red;
`

const StyledDiv = styled.div`
border:1px solid blue;
display:flex;
justify-content:space-between;
`
const myclasses = ()=>({
    test:{
        '& .rst__rowLabel':{
            width: '100%',
            padding: '0!important',
        }

    }
})
const useClasses = makeStyles(myclasses)
export default function Tree() {
    const classes=useClasses()
    const [treeData, setTreeData] = useState([
        {id:"1",title: 'Chicken', children: [{title: 'Egg'}]},
        {id:"2",title: 'Fish', children: [{title: 'fingerline'}]},
    ])

    const renderButton = (title) => {
        return title === 'Web Content' ? <button>Your button</button> : 'negar'
    }

    const setTreeDataMethod = (treeData) => {
       setTreeData(treeData)
    }

    return (
        <div style={{height: 400}}>
            <SortableTree
                treeData={treeData}
                slideRegionSize={100}
                getNodeKey={({ node }) => node.id}
                scaffoldBlockPxWidth={44}
                className={classes.test}
                generateNodeProps={({node, path}) => ({
                    title: (
                        <StyledDiv>
                        {/*<a href={node.url}>*/}
                            {node.title}
                            {/*{renderButton(node.title)}*/}
                            <StyledButton>{node.id}</StyledButton>
                        {/*</a>*/}
                        </StyledDiv>
                    ),
                })}
                onChange={treeData => {
                    setTreeDataMethod(treeData)
                }}
            />
        </div>
    );
}
