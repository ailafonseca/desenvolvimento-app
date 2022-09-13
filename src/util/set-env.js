const yenv = require('yenv');

export default function setEnv() {
  console.log('teste');
  const env = yenv();

  process.env = {
    ...process.env,
    ...env,
  };

  return process.env;
}
