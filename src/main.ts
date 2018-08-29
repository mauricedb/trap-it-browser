const windowErrorListener = (evt: ErrorEvent): void => {
  console.log(evt);
};

export const trapGlobalErrors = () => {
  window.addEventListener('error', windowErrorListener);
};
