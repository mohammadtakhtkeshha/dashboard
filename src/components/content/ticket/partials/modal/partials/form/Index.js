import contentService from "core/services/content.service";
import {getOrders} from "core/services/ticket.service";

export const uploadImgMethod = (e, multiple, setTicket, setImgsAndUrls, appContext) => {
    appContext.setLoading(true);
    if (e.length > 0) {
        for (let file of e) {
            contentService.uploadSingImg(file, appContext.handleError).then((response) => {
                appContext.setLoading(false);
                let item = response.data;
                let url = 'http://sitesazyas.rbp' + item.uri[0].url;
                if (multiple !== 'multiple') {
                    setImgsAndUrls([{id: item.fid[0].value, url: url}]);
                    setTicket(prevState => {
                        return {
                            ...prevState, field_image: [{
                                target_id: `${item.fid[0].value}`,
                                target_type: 'file',
                                "target_uuid": item.uuid[0].value,
                                "url": url
                            }]
                        }
                    });
                } else {
                    setImgsAndUrls(prevState => {
                        return [...prevState, {id: item.fid[0].value, url: url}]
                    });
                    setTicket(prevState => {
                        return {
                            ...prevState, field_images_gallery: [...prevState.field_images_gallery, {
                                "target_id": item.fid[0].value,
                                "target_type": 'file',
                                "target_uuid": item.uuid[0].value,
                                "url": url
                            }]
                        }
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

}

export const getOrderListMethod = (appContext, setOrderList) => {
    appContext.setLoading(true);
    getOrders(appContext.handleError).then(response => {
        appContext.setLoading(false);
        setOrderList(response.data.orders.order[0].lineitems.lineitem)
    })
}

export const handleErrorsMethod = (id, setErrors, t) => {
    if (id === "") {//register
        setErrors({
            message: {required: t('translation:requiredValid')},
            subject: {required: t('translation:requiredValid')}
        })
    }
}
