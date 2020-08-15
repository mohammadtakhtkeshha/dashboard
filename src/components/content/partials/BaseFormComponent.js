import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import storage from "../../../libraries/local-storage";
import ReactPlayer from 'react-player'
import axios from "axios";
import {Box, CardMedia} from "@material-ui/core";
import {Link} from "react-router-dom";

import UploadVideo from "../../partials/UploadVideo";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            let url = `http://dash.webrbp.ir/vocabularies/tags`;
            let config = {
                headers: {
                    'Content-Type': 'application/hal+json',
                    'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
                    'Accept': 'application/hal+json'
                }
            }
           axios.get(url, config).then((res)=>{
               debugger
               if(active){
                   setOptions(res.data.map((key)=>key));
               }
           }).catch(()=>{});

        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    let uploadVideo=(e)=>{
        debugger
    }
    return (
      <div>
          <UploadVideo multiple={true} title="title" getFile={uploadVideo}/>
          <hr/>
          <br/>
          <hr/>
          <UploadVideo multiple={true} title="title" getFile={uploadVideo}/>
          <hr/>
          <br/>
          <div style={{cursor:"pointer"}}>negar</div>
      </div>
    );
}