import React from 'react';

import '../../App.css'
import {
    Switch,
    Route,
} from "react-router-dom";
import BaseFormComponent from './partials/BaseFormComponent';
import CustomizedForm from './partials/CustomizedForm';


function HeaderComponent() {
    return (
        <>
            <Switch>
                <Route path="/custom">
                    <CustomizedForm/>
                </Route>
                <Route path="/" exact>
                    <BaseFormComponent/>
                </Route>
            </Switch>
        </>
    );
}

export default HeaderComponent;