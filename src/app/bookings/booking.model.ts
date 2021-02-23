export class Booking {
  constructor(
    public id: string,
    public vehicleId: string,
    public vehicleName: string,
    public vehicleImage: string,
    public userId: string,
    public partnerCount: number,
    public bookedFrom: Date,
    public bookedTo: Date
  ) {}
}
