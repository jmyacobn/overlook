// ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~
import './css/styles.css'
import './images/5-stars.png'
import {getData, postData} from './apiCalls'
import Customer from './classes/Customer'

// ~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~
let allCustomers
let allRooms
let allBookings
let currentCustomer
let filteredRooms = []
// ~~~~~~~~~~~~~~~~~~~~Query Selectors~~~~~~~~~~~~~~~~~~~~
const greeting = document.querySelector('#greeting')
const cost = document.querySelector('#costSummary')
const pastBookings = document.querySelector('#pastBookingDisplay')
const upcomingBookings = document.querySelector('#upcomingBookingDisplay')
const submitButton = document.querySelector('#submitButton')
const selectedDate = document.querySelector('#checkInDate') 
const selectedRoom = document.querySelector('#roomType')
const availableRooms = document.querySelector('#availableRoomsDisplay')

// ~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', fetchData)
submitButton.addEventListener('click', displayAvailableRooms)
availableRooms.addEventListener('click', bookRoom)

// ~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~
function fetchData() {
    Promise.all([getData('customers'), getData('rooms'), getData('bookings')])
    .then(data => {
        allCustomers = data[0].customers
        allRooms = data[1].rooms
        allBookings = data[2].bookings
        currentCustomer = new Customer(allCustomers[0])
        displayCustomerData(currentCustomer, allRooms, allBookings)
    })
}

function displayCustomerData(currentCustomer, allRooms, allBookings) {
    greeting.innerText = `Welcome, ${currentCustomer.name}!`
    cost.innerHTML = `Your total cost of bookings is $${currentCustomer.getTotalCost(allBookings, allRooms).toFixed(2)}.`
    displayCardsByType("upcoming")
    displayCardsByType("past")
}

function displayAvailableRooms() {
    availableRooms.innerHTML = ''
    if (selectedDate.value !== "" && selectedRoom.value !== "all-rooms") {
        filterRoomsByType()
        filteredRooms.forEach(room => {
            availableRooms.innerHTML += availableRoomCards(room)
        })
    } else if (selectedDate.value !== "" && selectedRoom.value === "all-rooms") {
        findRoomsByDate()
        filteredRooms.forEach(room => {
            availableRooms.innerHTML += availableRoomCards(room)
        })
    } else if (selectedDate.value !== "" && selectedRoom.value !== "all-rooms" && !filteredRooms.length) {
        filterRoomsByType()
        availableRooms.innerHTML += `<p class="user-message">We are so sorry. The room type you selected is fully booked on that date. Please select a different room type.</p>`
    } else if(selectedDate.value !== "" && selectedRoom.value === "all-rooms" && !filteredRooms.length) {
        findRoomsByDate()
        availableRooms.innerHTML += `<p class="user-message">We are so sorry. We are fully booked on the date you selected. Please select a different check-in date.</p>`
    } else {
        availableRooms.innerHTML += `<p class="user-message">You must select a date to see avilable rooms.</p>`
    }
}

function bookRoom(event) {
    if(event.target.classList.contains('book-room')) {
        console.log(filteredRooms)
        filteredRooms.forEach(room => {
            const roomID = selectedDate.value + "-" + room.number
            console.log(selectedDate.value.split("-").join("/"))
            if(event.target.parentNode.id === roomID) {
                const customerBooking = {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify({"userID": currentCustomer.id, "date": selectedDate.value.split("-").join("/"), "roomNumber": room.number})
                }
                postData(customerBooking)
                    .then((response) => response)
                    .then(() => fetchData())
            }
        })
    }
}
// ~~~~~~~~~~~~~~~~~~~~Helper Functions~~~~~~~~~~~~~~~~~~~~
function findRoomsByDate() {
    const roomsFilteredByDate = allBookings.filter(booking => {
        const selectedDateReformatted = selectedDate.value.split("-").join("/")
        return (booking.date === selectedDateReformatted)
        }).map(bookedRoom => bookedRoom.roomNumber)
        const stuff = allRooms.reduce((acc, room) => {
            if(!roomsFilteredByDate.includes(room.number)) {
                acc.push(room)
            }
            return acc
        }, [])
        filteredRooms = stuff
}
function filterRoomsByType() {
    findRoomsByDate()
    const roomsFilteredByType = filteredRooms.reduce((acc, room) => {
        const selectedRoomReformatted = selectedRoom.value.split("-").join(" ")
        if(room.roomType === selectedRoomReformatted) {
            acc.push(room)
        }
        return acc
    }, [])
    filteredRooms = roomsFilteredByType
}

function displayCardsByType(type) {
    let userBookings
    if (type === "upcoming") {
        userBookings = currentCustomer.getBookingsByType(allBookings, getCurrentDate(), type)
        userBookings.forEach(booking => {
            allRooms.forEach(room => {
                if(booking.roomNumber === room.number) {
                    upcomingBookings.innerHTML += renderCards(booking, room)
                }
            })
        })
    } else {
        userBookings = currentCustomer.getBookingsByType(allBookings, getCurrentDate(), type)
        userBookings.forEach(booking => {
            allRooms.forEach(room => {
                if(booking.roomNumber === room.number) {
                    pastBookings.innerHTML += renderCards(booking, room)
                }
            })
        })
    }  
    if (type === "upcoming" && !userBookings.length) {
        upcomingBookings.innerHTML += `<p class="user-message">You do not have any upcoming reservations with us. Book now!</p>`
    } else if (type === "past" && !userBookings.length) {
        pastBookings.innerHTML += `<p class="user-message">You do not have any past reservations with us.</p>`
    }
}

function renderCards(booking, room) {
    return (`<article class="booking-card">
            <p>Date: ${booking.date}</p>
            <p>Room #${booking.roomNumber}</p>
            <p>${room.roomType.toUpperCase()}</p>
            <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
            <p>Bidet: ${displayBidetStatus(room)}</p>
            <p>$${room.costPerNight}</p>
        </article>`)
}

function availableRoomCards(room) {
    return (`<article class="booking-card" id="${selectedDate.value}-${room.number}">
        <p>Date: ${selectedDate.value}</p>
        <p>Room #${room.number}</p>
        <p>${room.roomType.toUpperCase()}</p>
        <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
        <p>Bidet: ${displayBidetStatus(room)}</p>
        <p>$${room.costPerNight}</p>
        <button class="book-room" label="book-room" type="button" id="bookRoom">Book Room</button>
    </article>`)
}

function getCurrentDate() {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currDate = `${year}/${month}/${day}`
    return currDate
}

function displayBidetStatus(room) {
    if (room.bidet) {
        return "Yes"
    } else {
        return "No"
    }
}