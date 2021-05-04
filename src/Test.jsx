import React, {useState} from "react";
import AppContext from "contexts/AppContext.js";


export default function Component() {
    const [state, setState] = useState("negar");

    return (
        <AppContext.Provider value={{state: state, setState: setState}}>
            <div className="container">
                <div className="row">
                    <div className="col">negar</div>
                    <div className="col">negar</div>
                    <div className="col">negar</div>
                </div>
                <div className="row">
                    <div className="col">negar</div>
                    <div className="col">negar</div>
                    <div className="col">negar</div>
                </div>
                <div className="row">
                    <div className="col">one</div>
                    <div className="col">negar</div>
                    <div className="col">negar</div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="parent">
                            <div className="child">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet architecto commodi
                                consequatur consequuntur delectus dolorem doloribus ea enim ex expedita illum modi, optio
                                quam quo repudiandae sit. Fugit, labore!
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at atque
                                corporis cupiditate deleniti distinctio error est explicabo maiores maxime nihil numquam
                                officiis, optio praesentium, quia sed velit voluptatum!
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet animi consequatur,
                                consequuntur deleniti eligendi enim eos eveniet, id, itaque minus placeat quam recusandae
                                sequi tempore veniam voluptatibus. Repellendus, velit.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AppContext.Provider>
    );
}
