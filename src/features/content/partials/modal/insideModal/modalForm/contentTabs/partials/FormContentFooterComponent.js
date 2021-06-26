import { editContent, registerContent } from 'core/services/content.service';
import { removeHourFromMiladiDate, toShamsiDate } from 'methods/commons';

export const registerMethod = (lang, contentsContext, setLoading, id, contentype) => {
  let currentRequest;
  if (id !== '') {
    currentRequest = editContent(contentsContext.content, id, setLoading);
  } else {
    currentRequest = registerContent(contentsContext.content, setLoading);
  }
  currentRequest.then(response => {
    setLoading(false);
    let contents = response.data;
    const dateAndHour = contents.created[0].value;
    const justDate = removeHourFromMiladiDate(dateAndHour);
    const date = lang === 'fa' ? toShamsiDate(justDate) : justDate;
    contents.created[0].value = date;
    contentsContext.getRegisteredContent(response.data);
  });
};

export const changeStepMethod = (step, contentype, value, setValue) => {
  if (step === 'plus') {
    switch (contentype) {
      case 'article':
        let articleCurrentValue;
        if (value === 1) {
          articleCurrentValue = value + 2;
        } else if (value === 4) {
          articleCurrentValue = 0;
        } else {
          articleCurrentValue = value + 1;
        }
        setValue(articleCurrentValue);
        break;
      case 'page':
        let currentValue;
        if (value === 1) {
          currentValue = value + 2;
        } else if (value === 3) {
          currentValue = 0;
        } else {
          currentValue = value + 1;
        }
        setValue(currentValue);
        break;
      default:
        if (value === 4) {
          setValue(0);
        } else {
          const currentValue = value + 1;
          setValue(currentValue);
        }
    }
  } else {
    switch (contentype) {
      case 'article':
        let articleCurrentValue;
        if (value === 0) {
          articleCurrentValue = 4;
        } else if (value === 3) {
          articleCurrentValue = 1;
        } else {
          articleCurrentValue = value - 1;
        }
        setValue(articleCurrentValue);
        break;
      case 'page':
        let currentValue;
        if (value === 3) {
          currentValue = value - 2;
        } else if (value === 0) {
          currentValue = 3;
        } else {
          currentValue = value - 1;
        }
        setValue(currentValue);
        break;
      default:
        if (value === 0) {
          setValue(4);
        } else {
          const currentValue = value - 1;
          setValue(currentValue);
        }
    }
  }
};
