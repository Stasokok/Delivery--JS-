const getData = () => {
    return fetch('https://test-6c7d2-default-rtdb.firebaseio.com/goods.json')
        .then((response) => {
             return response.json()
    })
}

export default getData