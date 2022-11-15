const getData = (dataSource) => {
  return fetch(`http://localhost:3001/api/v1/${dataSource}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Sorry, we were unable to retreive your account information. Please try again.')
      }
      return response.json()
    })
    .catch(err => {
      console.log(err)
      availableRooms.innerHTML = 'Oops, something went wrong. Please try again'
    })
}

const postData = (newBooking) => {
  return fetch('http://localhost:3001/api/v1/bookings', newBooking)
    .then(response => {
      if (!response.ok) {
        throw new Error('Sorry, your booking request did not go through. Please try again.')
      }
      return response.json()
    })
    .catch(err => {
      console.log(err)
      availableRooms.innerHTML = 'Oops, something went wrong. Please try again'
    })
}

export { getData, postData }