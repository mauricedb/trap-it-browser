export class DefaultOptions {
  // Do we need to trap unhandled errors?
  checkErrors: boolean = true;
  // Do we need to trap unhandled promise rejections?
  checkUnhandledRejections: boolean = true;
  // End point to send errors to
  url: string | null = null;
}
