
export default (url,filter,l,s) => { 
    return fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            filter: filter,
            //fields: {fieldA: 1, fieldB: 1},
            limit: l,
            skip: s,
            //sort: {_created:-1},
            //populate: 1, // resolve linked collection items
            //lang: 'de' // return normalized language fields (fieldA_de => fieldA)
        })
    })
    .then(res=>res.json())
}