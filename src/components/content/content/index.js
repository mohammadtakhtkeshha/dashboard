export function multiAction(selectedCheckBoxes,currentContents,status) {
    for (let selected of selectedCheckBoxes) {
        let currentContent = currentContents.filter(item => item.nid === selected);
        let index = currentContents.indexOf(currentContent[0]);
        switch(status) {
            case 'true':
                currentContents[index].status = status;
                break;
            case 'false':
                currentContents[index].status = status;
                break;
            default:
                currentContents.splice(index, 1);
        }
    }
    return currentContents;
}

export default {multiAction};