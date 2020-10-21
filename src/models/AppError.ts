export class AppError {
  private id: string
  private message: string
  constructor (opts: { id: string, message: string}) {
    this.id = opts.id
    this.message = opts.message
  }
}
