import { uploadSingImg } from 'core/services/content.service';
import { getOrders } from 'core/services/ticket.service';
import i18next from 'i18next';

export const uploadImgMethod = (e, multiple, setTicket, setImgsAndUrls, setLoading) => {
  setLoading(true);
  if (e.length > 0) {
    for (let file of e) {
      uploadSingImg(file, setLoading).then(response => {
        setLoading(false);
        let item = response.data;
        let url = process.env.REACT_APP_API_URL + item.uri[0].url;
        if (multiple !== 'multiple') {
          setImgsAndUrls([{ id: item.fid[0].value, url: url }]);
          setTicket(prevState => {
            return {
              ...prevState,
              field_image: [
                {
                  target_id: `${item.fid[0].value}`,
                  target_type: 'file',
                  target_uuid: item.uuid[0].value,
                  url: url,
                },
              ],
            };
          });
        } else {
          setImgsAndUrls(prevState => {
            return [...prevState, { id: item.fid[0].value, url: url }];
          });
          setTicket(prevState => {
            return {
              ...prevState,
              field_images_gallery: [
                ...prevState.field_images_gallery,
                {
                  target_id: item.fid[0].value,
                  target_type: 'file',
                  target_uuid: item.uuid[0].value,
                  url: url,
                },
              ],
            };
          });
        }
      });
    }
  } else {
    // contentsContext.setContent(prevState => {
    //     return {
    //         ...prevState, field_image: ''
    //     }
    // });
  }
};

export const getOrderListMethod = (setLoading, setOrderList) => {
  setLoading(true);
  getOrders(setLoading).then(response => {
    setLoading(false);
    setOrderList(response.data.orders.order[0].lineitems.lineitem);
  });
};

export const handleErrorsMethod = (id, setErrors) => {
  if (id === '') {
    //register
    setErrors({
      message: { required: i18next.t('translation:requiredValid') },
      subject: { required: i18next.t('translation:requiredValid') },
    });
  }
};
