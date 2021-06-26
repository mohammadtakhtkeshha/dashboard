import React, { useState, useEffect, useContext } from 'react';
import { withNamespaces } from 'react-i18next';

import AppContext from 'contexts/AppContext';
import { StyledSettings} from 'assets/js/library/pages/settings/index';

import { getSettingsMethod, constSettingsName,constSettingsTags,constSettingsIcons} from './Index.js';
import SettingsName from "./partials/SettingsName.jsx";
import SettingsTag from "./partials/settingsTags/Index.jsx";
import SettingsIcons from "./partials/settingsIcon/Index.jsx";
import SettingsServices from "./partials/settingsServices/SettingsServices.jsx";

function Index({t}) {
  const { setLoading } = useContext(AppContext);
  const [settingsName, setSettingsName] = useState(constSettingsName);
  const [settingsIcons, setSettingsIcons] = useState(constSettingsIcons);
  const [settingsTags, setSettingsTags] = useState(constSettingsTags);

  useEffect(() => {
    getSettingsMethod(setLoading,setSettingsName,setSettingsTags,setSettingsIcons);
  }, [setLoading,setSettingsName,setSettingsTags,setSettingsIcons]); //Once

  return (<StyledSettings>
      <SettingsName settingsName={settingsName} setSettingsName={setSettingsName}/>
        <SettingsIcons settingsIcons={settingsIcons} setSettingsIcons={setSettingsIcons}/>
        <SettingsTag settingsTags={settingsTags} setSettingsTags={setSettingsTags}/>
      <SettingsServices/>
    </StyledSettings>);
}

export default withNamespaces('settings, translation')(Index);
