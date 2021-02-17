export class Vehicle {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public fuelType: string,
    public price: number,
    public fuelChecklist: string[]
  ) {}
}
