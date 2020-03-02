export default durationInSeconds => {
  let durationText = '';
  if (durationInSeconds) {
    durationText =
      (Math.floor(durationInSeconds / 60) < 10 ? '0' : '') +
      Math.floor(durationInSeconds / 60) +
      ':' +
      (durationInSeconds % 60 < 10 ? '0' : '') +
      (Number.parseInt(durationInSeconds % 60, 10));
  }

  return durationText;
};
