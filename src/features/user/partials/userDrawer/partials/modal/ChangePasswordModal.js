import { registerChangePass } from 'core/services/user.service';
import { success } from 'methods/swal';
import { remove } from 'libraries/local-storage';
import i18next from 'i18next';

export const registerChangePassMethod = (body, setLoading, setOpenObserveProfile, setErrors) => {
  setLoading(true);
  registerChangePass(body, setLoading)
    .then(res => {
      setLoading(false);
      setOpenObserveProfile(false);
      success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
      remove(process.env.REACT_APP_TOKEN_KEY);
    })
    .catch(error => {
      if (error.response.status === 422) {
        setErrors(prevState => {
          return { ...prevState, expassword: i18next.t('users:wrongExpassword') };
        });
      }
    });
};
