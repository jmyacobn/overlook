// ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~
import './css/styles.css'
import './images/5-stars.png'
import { getData, postData } from './apiCalls'
import Customer from './classes/Customer'

// ~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~
let allCustomers
let allRooms
let allBookings
let currentCustomer
let filteredRooms = []
let userID
let currDate
let selectedDateReformatted

// ~~~~~~~~~~~~~~~~~~~~Query Selectors~~~~~~~~~~~~~~~~~~~~
const greeting = document.querySelector('#greeting')
const cost = document.querySelector('#costSummary')
const pastBookings = document.querySelector('#pastBookingDisplay')
const upcomingBookings = document.querySelector('#upcomingBookingDisplay')
const submitButton = document.querySelector('#submitButton')
const selectedDate = document.querySelector('#checkInDate')
const selectedRoom = document.querySelector('#roomType')
const availableRooms = document.querySelector('#availableRoomsDisplay')
const loginButton = document.querySelector('#loginButton')
const loginPage = document.querySelector('#loginPage')
const loginError = document.querySelector('#loginError')
const header = document.querySelector('header')
const main = document.querySelector('main')
const password =document.querySelector('#password')

// ~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~
submitButton.addEventListener('click', displayAvailableRooms)
availableRooms.addEventListener('click', bookRoom)
loginButton.addEventListener('click', verifyUserLogin)
selectedDate.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    displayAvailableRooms()
  }
})
selectedRoom.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    displayAvailableRooms()
  }
})
password.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    verifyUserLogin()
  }
})

// ~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~
function verifyUserLogin() {
  userID = Number(username.value.slice(8))
  if (username.value.slice(0, 8) === 'customer' && userID > 0 && userID <= 50 && password.value === 'overlook2021') {
    fetchData(userID)
  } else if (username.value === '' || password.value === '') {
    loginError.innerText = `You must enter both a username and password.`
  } else if (password.value !== 'overlook2021' || (username.value.slice(0, 8) !== 'customer' && !userID > 0 && !userID <= 50)) {
    loginError.innerText = `Please enter valid username and password.`
  }
}

function fetchData(userID) {
  Promise.all([getData(`customers/${userID}`), getData('rooms'), getData('bookings')])
    .then(data => {
      allCustomers = data[0]
      allRooms = data[1].rooms
      allBookings = data[2].bookings
      currentCustomer = new Customer(allCustomers)
      displayCustomerData(currentCustomer, allRooms, allBookings)
    })
}

function displayCustomerData(currentCustomer, allRooms, allBookings) {
  hide([loginPage])
  show([header, main])
  greeting.innerText = `Welcome, ${currentCustomer.name}!`
  cost.innerHTML = `Your total cost of bookings is $${currentCustomer.getTotalCost(allBookings, allRooms).toFixed(2)}.`
  selectedDate.min = new Date().toLocaleDateString('en-ca')
  displayCardsByType('upcoming')
  displayCardsByType('past')
}

function displayAvailableRooms() {
  availableRooms.innerHTML = ''
  checkDate()
  if (filteredRooms.length === 0 && selectedDateReformatted >= currDate) {
    availableRooms.innerHTML += `<p class='user-message'>We are so sorry. There are no available rooms for your search criteria. Please try again.</p>`
  } else if (selectedDate.value !== '' && selectedDateReformatted >= currDate) {
    filteredRooms.forEach(room => {
      availableRooms.innerHTML += availableRoomCards(room)
    })
  } else if (selectedDate.value === '') {
    availableRooms.innerHTML += `<p class='user-message'>You must select a date to see avilable rooms.</p>`
  }
}

function bookRoom(event) {
  if (event.target.classList.contains('book-room')) {
    filteredRooms.forEach(room => {
      const roomID = selectedDate.value + '-' + room.number
      if (event.target.parentNode.id === roomID) {
        const customerBooking = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 'userID': currentCustomer.id, 'date': selectedDateReformatted, 'roomNumber': room.number })
        }
        postData(customerBooking)
          .then(() => {
            availableRooms.innerHTML = `<p class='user-message'>BOOKING CONFIRMED!</p>`
            setTimeout(() => {
              resetCustomerDashboard()
              fetchData(userID)
            }, 3000)
          })
      }
    })
  }
}

// ~~~~~~~~~~~~~~~~~~~~Helper Functions~~~~~~~~~~~~~~~~~~~~
function findRoomsByDate() {
  const roomsFilteredByDate = allBookings.filter(booking => {
    return (booking.date === selectedDateReformatted)
  }).map(bookedRoom => bookedRoom.roomNumber)
  const roomsByDate = allRooms.reduce((acc, room) => {
    if (!roomsFilteredByDate.includes(room.number)) {
      acc.push(room)
    }
    return acc
  }, [])
  filteredRooms = roomsByDate
}
function filterRoomsByType() {
  findRoomsByDate()
  const roomsFilteredByType = filteredRooms.filter(room => {
    const selectedRoomReformatted = selectedRoom.value.split('-').join(' ')
    if (room.roomType === selectedRoomReformatted) {
      return room
    } else if (selectedRoomReformatted === 'all rooms') {
      return room
    }
  })
  filteredRooms = roomsFilteredByType
}

function displayCardsByType(type) {
  let userBookings
  if (type === 'upcoming') {
    userBookings = currentCustomer.getBookingsByType(allBookings, getCurrentDate(), type)
    userBookings.forEach(booking => {
      allRooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          upcomingBookings.innerHTML += renderCards(booking, room)
        }
      })
    })
  } else {
    userBookings = currentCustomer.getBookingsByType(allBookings, getCurrentDate(), type)
    userBookings.forEach(booking => {
      allRooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          pastBookings.innerHTML += renderCards(booking, room)
        }
      })
    })
  }
  if (type === 'upcoming' && !userBookings.length) {
    upcomingBookings.innerHTML += `<p class='user-message'>You do not have any upcoming reservations with us. Book now!</p>`
  } else if (type === 'past' && !userBookings.length) {
    pastBookings.innerHTML += `<p class='user-message'>You do not have any past reservations with us.</p>`
  }
}

function resetCustomerDashboard() {
  selectedDate.value = ''
  selectedRoom.value = 'all-rooms'
  availableRooms.innerHTML = `<p class='user-message'>Select a date and room type to search available rooms.</p>`
}

function renderCards(booking, room) {
  return (`<article class='booking-card' tabindex='0'>
                <p>Date: ${booking.date}</p>
                <p>Room #${booking.roomNumber}</p>
                <p>${room.roomType.toUpperCase()}</p>
                <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
                <p>Bidet: ${displayBidetStatus(room)}</p>
                <p>$${room.costPerNight}</p>
            </article>`)
}

function availableRoomCards(room) {
  return (`<article class='booking-card' id='${selectedDate.value}-${room.number}' tabindex='0'>
                <p>Date: ${selectedDate.value}</p>
                <p>Room #${room.number}</p>
                <p>${room.roomType.toUpperCase()}</p>
                <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
                <p>Bidet: ${displayBidetStatus(room)}</p>
                <p>$${room.costPerNight}</p>
                <button class='book-room' label='book-room' type='button' id='bookRoom' tabindex='0'>Book Room</button>
            </article>`)
}

function getCurrentDate() {
  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  currDate = `${year}/${month}/${day}`
  return currDate
}

function checkDate() {
  getCurrentDate()
  selectedDateReformatted = selectedDate.value.split('-').join('/')
  if(selectedDateReformatted >= currDate) {
    filterRoomsByType()
  } else if(selectedDate.value !== '' && selectedDateReformatted < currDate) {
    availableRooms.innerHTML = ''
    availableRooms.innerHTML = `<p class='user-message'>The date you selected has passed. Please choose another date.</p>`
  }
}

function hide(elem) {
  elem.forEach((currElem) => {
      currElem.classList.add('hidden')
  })
}

function show(elem) {
  elem.forEach((currElem) => {
      currElem.classList.remove('hidden')
  })
}

function displayBidetStatus(room) {
  if (room.bidet) {
    return 'Yes'
  } else {
    return 'No'
  }
}