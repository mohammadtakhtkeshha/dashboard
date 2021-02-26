import dashboardService from "core/services/dashboard.service";

export const getContentList = async (setContents, setTotalLength, appContext) => {
    appContext.setLoading(true)
    dashboardService.getContentList(appContext.handleError).then((response) => {
        appContext.setLoading(false)
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
                    case "ویدیوها":
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
    }).catch((error) => {
    });
};

export const changeFormatMethod = (contents, setChunks, index) => {
    let newList = [];
    let currentArray = [...contents]
    let array1 = []
    let array2 = []
    const perPage = 3;
    let lastIndex = index + 3;

    // for (let i = index; i < currentArray.length; i ++) {
    //     // let sliced = currentArray.slice(i,  perPage+i);
    //     if(i < lastIndex){
    //         array1.push(currentArray[i])
    //     }else{
    //         array2.push(currentArray[i])
    //     }
    // }
    // let restCurrentArray = currentArray.splice(index + 3)
    // newList = [[...currentArray], [...restCurrentArray]]
    // setChunks(newList)

    setChunks([...contents])
}
