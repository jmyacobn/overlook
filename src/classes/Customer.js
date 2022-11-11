class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
    }
    getAllBookings(bookingData) {
        const bookedRooms = bookingData.filter(booking => {
          return this.id === booking.userID
        })
        return bookedRooms
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