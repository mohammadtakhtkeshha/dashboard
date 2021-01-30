import React, {useEffect} from "react";
import axios from "axios";

export default function Test() {
    useEffect(() => {
        fetch('http://sitesazyas.rbp/web/api/users/all')
            .then(function (response) {
                console.log(response)
            })
            .then((response)=>{
                console.log(response)

            });
        const config={
            headers:{
              'Authorization':  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjExYTk1Y2QyYWE1NzhkOWI0ODQ2OGQzODM5M2U2NDhkYTk3MTMxYTZjYmI0OTBhOWI1OWVmMDMxMjE0MDAwNWU0MzY1YjA4ODg0ODBhZDcyIn0.eyJhdWQiOiJkNWJmOTliNC0xNGY2LTQ0MTItYjgwYS0wN2RkZWRkZGI5MzAiLCJqdGkiOiIxMWE5NWNkMmFhNTc4ZDliNDg0NjhkMzgzOTNlNjQ4ZGE5NzEzMWE2Y2JiNDkwYTliNTllZjAzMTIxNDAwMDVlNDM2NWIwODg4NDgwYWQ3MiIsImlhdCI6MTYwNDczMzU1NCwibmJmIjoxNjA0NzMzNTU0LCJleHAiOjE2MDU1MzM1NTQsInN1YiI6IjY5Iiwic2NvcGVzIjpbImF1dGhlbnRpY2F0ZWQiLCJyZXN0X3VzZXIiXX0.h-WRDX89cNg20KRqUpyZUvRlC-1R1bNun7sJq4BShZhGRM4qDgiWEokC8FR9VFuxIPLE3vHow4Xc_dSJuxpiO8WCFWWFKrncbbRrh7CretaXPBfkVJsMwBi-c_DTpvA0Zz_5aJc5DPwwX9bAm-UNvrG7XY5NG-bMS7FTKGnGTbQOj5h1TIzYfL5EYWzaZ1pMfo3VOVWwaOYkGs5EAFSsDbK2-gDUVmlMI4O9jSMGIiOQNqs9sEIxU9Y61Iu-dlXn1fuaa8Rf1JXDhucE5HBL_Q8hXYyGbcJeuUT1S1Owx1K9Gt2VvanfW2AiTSMaZfIfFxNiIzO50ZtbS-faSS8vcdhjf3HNvYj1fV5mv4_XBRMPQfkySUxs4z0gb3lJjqxLMl3PXoG4aovl402T68yu32wzIdKC-H8hWbR7nnf_neiJvC_TtSLk0m5dRYClGown9gKPm_1F6bLHX-KmFJ3_heEQiZFGF5NkSzNb37HB0fw5-oKi1z-UL50vooWaeWU5AIRenn7DMzYZfXKsTMtN7uRKdtjbYwSeUcnvNc1wNY11Ua8XexKHWrGHTHb9Z1iG0uCl8I6nbslnQgcqCxp5aOSFaYYWtdnrwZ7oaXbTl-WCdGC7D8VPgv2x263aadkWw-AC7wIDdcFBwGbz248A1ttadoBwk-5th0DbMUceD54'
            }
        };
        axios.get('http://sitesazyas.rbp/web/last_comment/dashboard?_format=json',config).then(()=>{}).catch(()=>{});
    }, []);

    return (
        <div></div>
    );
}
