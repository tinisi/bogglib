import BoggLib from '../src/library';

describe('boggLib#possibleWords', () => {

  let boggLib;
  
  beforeEach(() => {
    boggLib = new BoggLib(4, 3);
  });

  it('validates that the matrix is the correct height', () => {
    let matrix = [
      ['d','o','g','s'],
      ['c','a','t','s']
    ]
    let result = boggLib.initMatrix(matrix);
    expect(result.message).toEqual('Matrix is not valid!');
  });

  it('validates that the matrix is the correct width', () => {
    let matrix = [
      ['d','o','g','s'],
      ['c','a','t'],
      ['s','d','f','s'],
      ['q','w','e','r']
    ]
    let result = boggLib.initMatrix(matrix);
    expect(result.message).toEqual('Matrix is not valid!');
  });

});

describe('boggLib#possibleWords', () => {

  let boggLib;
  
  beforeEach(() => {
    boggLib = new BoggLib(4, 3);
  });

  it('returns an array of possible words', () => {
    let matrix = [
      ['d','o','g','s'],
      ['c','a','t','s'],
      ['s','d','f','s'],
      ['b','i','r','d']
    ]
    boggLib.initMatrix(matrix);
    let result = boggLib.possibleWords();
    expect(result).toEqual(['dogs','cats', 'sdfs', 'bird']);
  });
});

describe('boggLib#scoringWords', () => {

  let boggLib;

  beforeEach(() => {
    boggLib = new BoggLib(4, 3);
  });

  it('returns an array of possible words', () => {
    let possibleWords = ['dogs','cats', 'sdfs', 'bird'];
    let result = boggLib.scoringWords(possibleWords);
    expect(result).toEqual(['dogs','cats', 'bird']);
  });
});

// these are likely temporary, public for now but should be private later

describe('boggLib#getWord', () => {

  let boggLib;

  beforeEach(() => {
    boggLib = new BoggLib(4, 3);
  });

  it('returns a string with letters in an array of positions', () => {
    let matrix = [
      ['d','o','g','s'],
      ['c','a','t','s'],
      ['s','d','f','s'],
      ['b','i','r','d']
    ];
    boggLib.initMatrix(matrix);
    let positions = [[0,0],[1,1],[2,2],[3,3]];
    let result = boggLib.getWord(positions);
    expect(result).toEqual('dafd');
  });
});

describe('boggLib#walkMatrix', () => {

  let boggLib;

  beforeEach(() => {
    boggLib = new BoggLib(3, 3);
  });

  let matrix = [
    ['d','o','g'],
    ['c','a','t'],
    ['s','d','f']
  ];

  it('generate a long list of words starting from the first position', () => {
    let positions = [[0,0]];
    let words = [];
    boggLib.initMatrix(matrix);
    boggLib.walkMatrix(positions, words);
    console.log(words);
    expect(words.length).toEqual(1369);
  });

  it('generate a shorter list of words starting from the second row and third column', () => {
    let positions = [[1,2]];
    let words = [];
    boggLib.initMatrix(matrix);
    boggLib.walkMatrix(positions, words);
    console.log(words);
    expect(words.length).toEqual(1031);
  });

});
