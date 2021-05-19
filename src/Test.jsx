import React, {useState} from "react";
import AppContext from "contexts/AppContext.js";


export default function Component() {
    const [state, setState] = useState("negar");

    return (<div>
        <div className="fs1">
            <div>
                <span className="icon-neeegggaaarrr"><span className="path1"></span><span className="path2"></span><span
                    className="path3"></span><span className="path4"></span><span className="path5"></span><span
                    className="path6"></span><span className="path7"></span></span>
                <span className="mls"> icon-neeegggaaarrr</span>
            </div>
        </div>

    </div>);
}
