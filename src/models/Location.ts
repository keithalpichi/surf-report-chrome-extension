
type Coords = Pick<Coordinates, 'longitude' | 'latitude'>
type LocationOpts = {
  id?: string
  name: string
  coordinates: Coords
}
export class Location {
  private _id: string
  public name: string
  private _coordinates: Coords
  constructor (opts: LocationOpts) {
    this._id = this.generateId(opts.coordinates.latitude, opts.coordinates.longitude)
    this.name = opts.name
    this._coordinates = opts.coordinates
  }

  get id (): string {
    return this.id
  }

  private generateId (lat: number, long: number): string {
    return `${lat}:${long}`
  }

  get coordinates (): Coords {
    return this._coordinates
  }

  set coordinates (newCoords: Coords) {
    this._id = this.generateId(newCoords.latitude, newCoords.longitude)
    this._coordinates = newCoords
  }
}
