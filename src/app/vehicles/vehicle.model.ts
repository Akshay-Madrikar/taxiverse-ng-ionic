export class Vehicle {
  constructor(
    public _id: string,
    public name: string,
    public imageUrl: string,
    public fuelType: string,
    public price: number,
    public fuelChecklist: string[],
    public availableFrom: Date,
    public availableTo: Date,
    public bookable?: number
  ) {}
}
