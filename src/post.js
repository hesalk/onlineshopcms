export default (data,url) => { 
    return fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: data
        })
    })
    .then(res=>res.json())

}