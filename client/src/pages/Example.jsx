import React, { useEffect, useState } from 'react'

const METHOD_MAP = {
    0: "GET",
    1: "POST"
}

const GET_OPTIONS = {
    method: 'GET',
}

const POST_OPTIONS = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        bodyVal: "bodyVal"
    })
}

const Example = () => {

    const [reqType, setReqType] = useState(0);
    const [resData, setResData] = useState("default");

    const fetchData = async () => {
        const url = METHOD_MAP[reqType] === 'GET' ? 'http://54.221.141.104/api/example?key=1234' : 'http://54.221.141.104/api/example';

        fetch(url, METHOD_MAP[reqType] === 'GET' ? GET_OPTIONS : POST_OPTIONS)
        .then((res) => {
            return res.json()
        })
        .then((val) => {
            setResData(val.resBody);
        })
        .catch((e)=>{
            console.log(e)
        });  
    }

    useEffect(() => {
        fetchData();
    }, [reqType]);



  return (
    <div>
        <span>Request Type: {METHOD_MAP[reqType]}</span> <br />
        <button onClick={() => {setReqType(reqType === 1 ? 0 : 1)}}>Change Request Type</button><br/>
        <span>Response Data: {JSON.stringify(resData)}</span>
    </div>
  )
}

export default Example