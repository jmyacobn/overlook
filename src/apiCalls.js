const getData = (dataSource) => {
    return fetch(`http://localhost:3001/api/v1/${dataSource}`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`${response.status}`)
            }
            return response.json()
        })
}

export default getData