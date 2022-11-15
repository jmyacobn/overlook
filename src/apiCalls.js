const getData = (dataSource) => {
  return fetch(`http://localhost:3001/api/v1/${dataSource}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Sorry, we were unable to retreive your account information. Please try again.")
      }
      return response.json()
    })
}

const postData = (newBooking) => {
  return fetch('http://localhost:3001/api/v1/bookings', newBooking)
    .then(response => {
      if (!response.ok) {
        throw new Error("Sorry, your booking request did not go through. Please try again.")
      }
      return response.json()
    })
}

export { getData, postData }