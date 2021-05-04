import {addSettings, getSettings} from "core/services/settings.service";
import {saveUserImage} from "core/services/user.service";
import {success} from "methods/swal";

export const getSettingsMethod = (appContext,setSettings,setLogo,setFavIcon) => {
    getSettings(appContext.handleError).then(res => {
        const settings = res.data
        settings.favicon = res.data.fav
        delete settings.fav
        settings.logo = res.data.logos
        delete settings.logos
        debugger
        // setLogo([`http://sitesazyas.rbp${settings.logos}`])
        setLogo([{id: 1, url: `http://sitesazyas.rbp${settings.logo}`}]);
        // setLogo([{id: 1, url:settings.logo}]);
        // setLogo([settings.logos])
        // setFavIcon([`http://sitesazyas.rbp${settings.fav}`])
        // setFavIcon([{id: 1, url:`http://sitesazyas.rbp${settings.fav}`}]);
        setFavIcon([{id: 1, url:settings.favicon}]);
        // setFavIcon([settings.fav])
        setSettings(settings)
    })
}

export const addSettingsMethod = (t,appContext,settings) => {
    appContext.setLoading(true)
    addSettings(settings, appContext.handleError).then(res => {
        appContext.setLoading(false)
        success(t('translation:successEdited'), t('translation:ok'))
    })
}


export const uploadFavIconMethod = (e, setSettings, setFavIcon, appContext) => {
    appContext.setLoading(true);
    saveUserImage(e, appContext.handleError).then((response) => {
                appContext.setLoading(false);
                const item = response.data;
                const baseUrl = process.env.REACT_APP_PICTURE_URL;
                let url = baseUrl + item.uri[0].url;
                setSettings(prevState => {
                    return {...prevState,favicon:url}
                });
            setFavIcon([{id: item.fid, url: url}]);
            }
        );
}

export const uploadLogoMethod = (e, setSettings, setLogo, appContext) => {
    appContext.setLoading(true);
    saveUserImage(e, appContext.handleError).then((response) => {
                appContext.setLoading(false);
                const item = response.data;
                const baseUrl = process.env.REACT_APP_PICTURE_URL;
                let url = baseUrl + item.uri[0].url;
                setSettings(prevState => {
                    return {...prevState,logo:url}
                });
            setLogo([{id: item.fid, url: url}]);
            }
        );
}


export const keyUpMethod = (e,appContext,addSettings) => {
    if(e.which === 13){
        addSettings()
    }
}
