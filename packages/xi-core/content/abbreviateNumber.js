export default (number, maxPlaces, forcePlaces, forceLetter) => {
  number = Number(number);
  forceLetter = forceLetter || false;
  if(forceLetter !== false) {
    return annotate(number, maxPlaces, forcePlaces, forceLetter);
  }
  let abbr = '';
  if(number >= 1e12) {
    abbr = 'T';
  }
  else if(number >= 1e9) {
    abbr = 'B';
  }
  else if(number >= 1e6) {
    abbr = 'M';
  }
  else if(number >= 1e3) {
    abbr = 'K';
  }
  return annotate(number, maxPlaces, forcePlaces, abbr);
};
  
const annotate = (number, maxPlaces, forcePlaces, abbr) => {
  // set places to false to not round
  let rounded = number;
  switch(abbr) {
    case 'T':
    rounded = number / 1e12;
    break;
    case 'B':
    rounded = number / 1e9;
    break;
    case 'M':
    rounded = number / 1e6;
    break;
    case 'K':
    rounded = number / 1e3;
    break;
  }
  if(maxPlaces !== false) {
    let test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$');
    if(test.test(('' + rounded))) {
      rounded = rounded.toFixed(maxPlaces);
    }
  }
  if(forcePlaces !== false) {
    rounded = Number(rounded).toFixed(forcePlaces);
  }
  return rounded + abbr;
};