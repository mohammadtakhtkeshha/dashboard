import React, {useEffect, useState} from 'react'
import moment from 'jalali-moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function TestComponent() {
    const users = [
        {id: '1', name: 'one', date: '1990/05/13'},
        {id: '2', name: 'two', date: '1990/02/01'},
        {id: '3', name: 'three', date: '1990/02/11'},
        {id: '1', name: 'behnaz', date: '1990/04/20'},
        {id: '1', name: 'akbar', date: '1990/11/15'},
        {id: '1', name: 'shahin', date: '1990/04/14'},
        {id: '1', name: 'shahin', date: '1990/04/14'},
        {id: '1', name: 'monir', date: '1990/06/9'},
        {id: '1', name: 'somaye', date: '1990/12/7'},
    ];
    const [data , setData]=useState([]);

    useEffect(() => {
        setData(custom());
    }, [])

    let numberOfUserWithSameDate = () => {
        return users.reduce((initial, currentValue) => {
            let date = currentValue.date;
            let month = date.substr(0, 7);
            if (!initial[month]) {
                initial[month] = {name:month,uv:1,pv: 2400, amt: 2400};
            }else{
                initial[month].uv++;
                // initial[month].pv++;
                // initial[month].amt++;
            }
            return initial;
        }, {});
    }

    let getDateOfUser = (date) => {
        let mah;
        let year;
        let month;
        year = date.substr(0, 4);
        month = date.substr(5, 2);
        switch (month) {
            case '01':
                mah = 'فروردین';
                break;
            case '02':
                mah = 'اردیبهشت';
                break;
            case '03':
                mah = 'خرداد';
                break;
            case '04':
                mah = 'تیر';
                break;
            case '05':
                mah = 'مرداد';
                break;
            case '06':
                mah = 'شهریور';
                break;
            case '07':
                mah = 'مهر';
                break;
            case '08':
                mah = 'آبان';
                break;
            case '09':
                mah = 'آذر';
                break;
            case '10':
                mah = 'دی';
                break;
            case '11':
                mah = 'بهمن';
                break;
            case '12':
                mah = 'اسفند';
        }

        return (`${year} ${mah}`);
    }

    let custom=()=>{
        let arr=Object.entries(numberOfUserWithSameDate());
        let newArr=[];
        for(let item of arr){
            for(let part of item){
                if(typeof part === 'object'){
                    part.name=getDateOfUser(part.name);
                    newArr.push(part);
                }
            }
        }
        return newArr;
    }

    return (
        <div>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                {/*<Tooltip />*/}
            </LineChart>
        </div>
    );
}