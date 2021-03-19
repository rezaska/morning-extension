export default function getMillisecondsToStartTime(startTime) {
  const currentTime = new Date();
  const numOfHours = parseInt(startTime.slice(0, 2)) - currentTime.getHours();
  const numOfMinutes = parseInt(startTime.slice(3, 5)) - currentTime.getMinutes();
  const numOfSeconds = numOfHours * 3600 + numOfMinutes * 60 - currentTime.getSeconds();
  return numOfSeconds >= 0 ? numOfSeconds * 1000 : (numOfSeconds + 24 * 3600) * 1000;
};