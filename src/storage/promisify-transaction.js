const promisifyTransaction = (request) =>
  new Promise((resolve) => {
    const handleSuccess = (event) => {
      request.removeEventListener('success', handleSuccess);
      resolve(event.target.result);
    };
    request.addEventListener('success', handleSuccess);
  });

export default promisifyTransaction;
