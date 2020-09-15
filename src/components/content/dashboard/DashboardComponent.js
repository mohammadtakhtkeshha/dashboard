import React, {useState, useEffect, useContext} from "react";
import UserChartComponent from "./partials/UserChartComponent";
import CommentDashboardComponent from "./partials/CommentDashboardComponent";
import CommentsChartComponent from "./partials/CommentsChartComponent";
import ContentChartComponent from "./partials/ContentChartComponent";
import ContentDashboardComponent from "./partials/ContentDashboardComponent";
import UserDashboardComponent from "./partials/UserDashboardComponent";
import dashboardService from "../../../core/services/dashboard.service.js";
import {withNamespaces} from "react-i18next";
import {primary} from "../../partials/Colors";
import swal from "sweetalert";
import {makeStyles} from "@material-ui/styles";
import storage from './../../../libraries/local-storage';
import i18next from "i18next";
import {useHistory} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";

const useStyles=makeStyles({
    confirmButton:{
        backgroundColor:primary,
    },
    swalBlock:{
        '& .swal-footer':{
            textAlign:'center'
        }
    }
});


function DashboardComponent({t}) {
    const [contents, setContents] = useState([]);
    const classes = useStyles();
    const lang = i18next.language;
    const context = useContext(AppContext);

    let getContentList = async () => {
        dashboardService.getContentLis().then((response) => {
            let contents = response.data.rows;
            setContents([...contents]);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getContentList();
    }, []);

    useEffect(() => {
        if(context.isLoginSuccess){
            swal({
                text: `${lang==='en'?JSON.parse(storage.get('user')).name:''} ${t('translation:welcome')} ${lang==='fa'?JSON.parse(storage.get('user')).name:''}`,
                timer:'1000',
                button: {
                    text:t('translation:yes'),
                    className: classes.confirmButton
                },
                className: classes.swalBlock
            });
            context.isLoginSuccess=false;
        }
    });

    return (
        <>
            <ContentChartComponent contents={contents}/>
            <ContentDashboardComponent/>
            <UserDashboardComponent/>
            <UserChartComponent/>
            <CommentDashboardComponent/>
            <CommentsChartComponent/>
        </>
    );
}

export default withNamespaces('translation')(DashboardComponent);
