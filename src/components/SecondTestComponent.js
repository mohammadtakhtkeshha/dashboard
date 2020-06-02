import React from 'react';
import useWindowDimenion from './../main/useWindowDimensions'

export default function SecondTestComponent() {
    const {width,height} = useWindowDimenion();
    return (<>
        your dimension is :{width}-{height}
    </>);
}