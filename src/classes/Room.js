class Room {
    constructor(roomData) {
        this.roomNumber = roomData.number;
        this.roomType = roomData.roomType;
        this.bidet = roomData.bidet;
        this.bedSize = roomData.bedSize;
        this.bedCount = roomData.numBeds;
        this.roomCost = roomData.costPerNight;
    }
}
export default Room