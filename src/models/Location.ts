type LocationOpts = {
  id?: string
  coordinates: Coordinates
}

export class Location {
  private _id: string
  private _coordinates: Coordinates
  constructor (opts: LocationOpts) {
    this._id = this.generateId(opts.coordinates.latitude, opts.coordinates.longitude)
    this._coordinates = opts.coordinates
  }

  private generateId (lat: number, long: number): string {
    return `${lat}:${long}`
  }

  get coordinates (): Coordinates {
    return this._coordinates
  }

  set coordinates (newCoords: Coordinates) {
    this._id = this.generateId(newCoords.latitude, newCoords.longitude)
    this._coordinates = newCoords
  }
}
