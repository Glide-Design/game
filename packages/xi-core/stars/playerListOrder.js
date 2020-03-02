import { shuffle } from 'lodash/fp';

export default unsortedPlayers => {
  let messi;
  let neymarJr;
  let davidBeckham;
  let zinedineZidane;
  let players = [];

  unsortedPlayers.forEach(player => {
    switch (player.seoCode) {
      case 'leomessi':
        messi = player.starId;
        break;
      case 'neymarjr':
        neymarJr = player.starId;
        break;
      case 'davidbeckham':
        davidBeckham = player.starId;
        break;
      case 'zinedinezidane':
        zinedineZidane = player.starId;
        break;
      default:
        players.push(player.starId);
        break;
    }
  });

  return [messi, neymarJr, davidBeckham, zinedineZidane, ...shuffle(players)].filter(Boolean);
};
