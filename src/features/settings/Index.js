import {getSettings } from 'core/services/settings.service';

export const getSettingsMethod = (setLoading, setSettingsName,setSettingsTags,setSettingsIcons) => {
  setLoading(true);
  getSettings(setLoading).then(res => {
    setLoading(false);
    const settings = res.data;
    setSettingsName({
      site_name: settings.site_name,
      site_mail: settings.site_mail,
      site_slogan: settings.site_slogan,
    })
    setSettingsTags({
      site_front_desc:settings.site_front_desc , //description
      site_front_abs:settings.site_front_abs , //summary
      site_front_keys:settings.site_front_keys , //keywords
    })
    setSettingsIcons({logo:res.data.logos,favicon:res.data.fav})
  });
};

export const constSettingsName = {
  site_name: '',
  site_mail: '',
  site_slogan: '',
}

export const constSettingsTags = {
  site_front_desc: '', //description
  site_front_abs: '', //summary
  site_front_keys: '', //keywords
}

export const constSettingsIcons = {
  logo: '',
  favicon: '',
}
