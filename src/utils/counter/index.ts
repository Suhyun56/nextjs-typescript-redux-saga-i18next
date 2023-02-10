export const getRandomNumber = async () => {
  return new Promise((resolve, reject) => {
    let result = 0;
    setTimeout(() => {
      result = Math.floor(Math.random() * 10);
      if (result === 10 || result === 0) {
        reject(new Error("The result is 10."));
      } else {
        resolve(result);
      }
    }, 1000);
  });
};