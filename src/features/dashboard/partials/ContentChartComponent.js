import dashboardService from "core/services/dashboard.service";

export const getContentList = async (setContents, setTotalLength, appContext,setIsRequestSuccess) => {
    appContext.setLoading(true)
    dashboardService.getContentList(appContext.handleError).then((response) => {
        appContext.setLoading(false)
        setIsRequestSuccess(true)
        let contents = response.data;
        let num = 0;
        setContents(prevState => {
            for (let content of contents) {
                switch (content.type) {
                    case "مقاله":
                        prevState[1].number = parseInt(content.number);
                        num += parseInt(content.number)
                        break;
                    case "اخبار":
                        prevState[0].number = parseInt(content.number)
                        num += parseInt(content.number)
                        break;
                    case "ویدئوها":
                        prevState[2].number = parseInt(content.number)
                        num += parseInt(content.number)
                        break;
                    case "صداها":
                        prevState[3].number = parseInt(content.number)
                        num += parseInt(content.number)
                        break;
                    case "تصاویر":
                        prevState[4].number = parseInt(content.number)
                        num += parseInt(content.number)
                        break;
                    default:
                        prevState[5].number = parseInt(content.number)
                        num += parseInt(content.number)
                }
            }
            return [...prevState]
        });
        setTotalLength(num);
    });
};

