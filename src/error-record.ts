export class ErrorRecord {
  public message: string;
  public name: string;
  public stack: string;
  public when: string;
  public secondsActive: number;

  constructor(error: Error, secondsActive) {
    this.message = error.message;
    this.name = error.name;
    this.stack = error.stack;
    this.secondsActive = secondsActive;

    this.when = new Date(Date.now()).toISOString();
  }
}
