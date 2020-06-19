import React, {useState} from "react";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
const useStyles = makeStyles({
    content:{
        backgroundColor:'red',
        '& .block':{
            backgroundColor:'white',
        }
    }
});
export default function ContentDashboardComponent() {
    const classes=useStyles();
    const [contents,setContent]=useState([
        {title:'one',type:'one'},
        {title:'two',type:'one'},
        {title:'three',type:'three'},
        {title:'four',type:'four'},
        {title:'five',type:'five'},
        {title:'six',type:'one'},
        {title:'seven',type:'two'},
        {title:'eight',type:'two'},
        ]);

    let customizedContents=()=>{
        return contents.reduce((initial,currentValue)=>{
            let key=currentValue.type;
            if(!initial[key]){
                initial[key]=[];
            }
            initial[key].push(currentValue);
            return initial;
        },{});
    }

    let numb=()=>{
        let contents=Object.entries(customizedContents());
        let arr=[...contents];
        let length;
        for(let content of contents){
            for(let part of content){
                // if(typeof part === 'array'){
                //     arr.push(part.length);
                // }
            }
        }
        return arr;

    }
    console.log(numb());
    return (
        <>
        <div className={classes.content}>
            {contents.map(content=>(
                <Box className="block">
                    <Box className="content">
                        {content.title}
                    </Box>
                    <Box className="chart">
                chart
                    </Box>
                </Box>
            ))}

        </div>
        </>
    );

}