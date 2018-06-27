global.table = {
  status: '',
  current: '',
  row1: ['','',''],
  row2: ['','',''],
  row3: ['','',''],
};

global.players = [];

module.exports = function (tab) {
  if ((tab.row1[0] === 'X' && tab.row1[1] === 'X' && tab.row1[2] === 'X') ||
      (tab.row2[0] === 'X' && tab.row2[1] === 'X' && tab.row2[2] === 'X') ||
      (tab.row3[0] === 'X' && tab.row3[1] === 'X' && tab.row3[2] === 'X') ||
      (tab.row1[0] === 'X' && tab.row2[0] === 'X' && tab.row3[0] === 'X') ||
      (tab.row1[1] === 'X' && tab.row2[1] === 'X' && tab.row3[1] === 'X') ||
      (tab.row1[2] === 'X' && tab.row2[2] === 'X' && tab.row3[2] === 'X') ||
      (tab.row1[0] === 'X' && tab.row2[1] === 'X' && tab.row3[2] === 'X') ||
      (tab.row3[0] === 'X' && tab.row2[1] === 'X' && tab.row1[2] === 'X') ||

      (tab.row1[0] === 'O' && tab.row1[1] === 'O' && tab.row1[2] === 'O') ||
      (tab.row2[0] === 'O' && tab.row2[1] === 'O' && tab.row2[2] === 'O') ||
      (tab.row3[0] === 'O' && tab.row3[1] === 'O' && tab.row3[2] === 'O') ||
      (tab.row1[0] === 'O' && tab.row2[0] === 'O' && tab.row3[0] === 'O') ||
      (tab.row1[1] === 'O' && tab.row2[1] === 'O' && tab.row3[1] === 'O') ||
      (tab.row1[2] === 'O' && tab.row2[2] === 'O' && tab.row3[2] === 'O') ||
      (tab.row1[0] === 'O' && tab.row2[1] === 'O' && tab.row3[2] === 'O') ||
      (tab.row3[0] === 'O' && tab.row2[1] === 'O' && tab.row1[2] === 'O')) {
    return true;
  }
}

