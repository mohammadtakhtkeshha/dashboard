export const adjustDepartemanMethod = (departemanList,setDepartmentNames) => {
    if(departemanList.length>0){
        let departmentNames=[]
        for(let item of departemanList){
            let obj= {id: item.id,name:item.name}
            departmentNames.push(obj)
        }
        setDepartmentNames(departmentNames)
    }
}
