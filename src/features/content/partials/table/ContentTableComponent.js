export const allCheckboxHandlerMethod = (e,contentsContext,page,setSelectedCheckBoxes) =>{
    const isChecked = e.currentTarget.checked;
    const currentchunkCheckBox = contentsContext.chunkContents[page];
    const ids = currentchunkCheckBox.map(content => content.nid);
    isChecked ? setSelectedCheckBoxes([...ids]) : setSelectedCheckBoxes([]);
}
