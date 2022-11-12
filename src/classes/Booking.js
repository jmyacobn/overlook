class Booking {
    constructor(bookingData) {
        this.bookingID = bookingData.id;
        this.userID = bookingData.userID;
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
    }
}
export default Booking