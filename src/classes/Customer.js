class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
    }
    getAllBookings(bookingData) {
        return bookingData.filter(booking => this.id === booking.userID)
    }
    getPastBookings(bookingData, currDate) {
        return this.getAllBookings(bookingData).filter(booking => booking.date < currDate)
    }
    getUpcomingBookings(bookingData, currDate) {
        return this.getAllBookings(bookingData).filter(booking => booking.date >= currDate)
    }
    getTotalCost(bookingData, roomData) {
        const costOfAllBookedRooms = this.getAllBookings(bookingData).reduce((totalCost, booking) => {
            let customerRoom = roomData.find(room => {
                return room.number === booking.roomNumber
            })
            totalCost += customerRoom.costPerNight
            return totalCost
        }, 0)
        return costOfAllBookedRooms
    }
}

export default Customer