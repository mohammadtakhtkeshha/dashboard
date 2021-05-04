import React, { useCallback, useEffect, useState } from "react"
// import AppContext from "contexts/AppContext.js"

export default function InsideTest() {
    // const appContext = useContext(AppContext)
    const [name, setName] = useState('name')

    const change = useCallback(() => {
        setName('shadi')
    }, [setName])

    useEffect(() => {
        change()
    }, [change])

    return (<>
        <div>
            {name}
        </div>
    </>)
}