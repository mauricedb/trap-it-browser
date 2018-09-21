import { hashCode } from 'hash-code';

export class ErrorRecord {
  public message: string;
  public name: string;
  public stack: string | undefined;
  public fileName: string;
  public when: string;
  public secondsActive: number;
  public hashCode: string;

  constructor(error: Error, fileName: string, secondsActive: number) {
    this.message = error.message;
    this.name = error.name;
    this.stack = error.stack;
    this.fileName = fileName;
    this.secondsActive = secondsActive;

    this.when = new Date(Date.now()).toISOString();
    const errorHash = hashCode(this.message + this.fileName).toString(32);
    const stackHash = hashCode(this.stack).toString(32);
    this.hashCode = `${errorHash}:${stackHash}`;
  }
}
