import BoggLib from '../src/library';

describe('boggLib#initMatrix', () => {

  let boggLib;
  
  beforeEach(() => {
    boggLib = new BoggLib(3, 3);
  });

  it('validates that the matrix is the correct height', () => {
    let matrix = [
      ['d','o','g'],
      ['c','a','t']
    ]
    let result = boggLib.initMatrix(matrix);
    expect(result.message).toEqual('Matrix is not valid!');
  });

  it('validates that the matrix is the correct width', () => {
    let matrix = [
      ['d','o','g'],
      ['c','a'],
      ['s','d','f']
    ]
    let result = boggLib.initMatrix(matrix);
    expect(result.message).toEqual('Matrix is not valid!');
  });

});

describe('boggLib#possibleWords', () => {

  let boggLib;

  beforeEach(() => {
    boggLib = new BoggLib(2, 3);
  });

  it('returns an array of possible words', () => {
    let matrix = [
      ['d','o'],
      ['c','a']
    ]
    boggLib.initMatrix(matrix);
    let result = boggLib.possibleWords();
    expect(result).toEqual([ 'doa', 'doac', 'doc', 'doca', 'dca', 'dcao', 'dco', 'dcoa', 'dac', 'daco', 'dao', 'daoc', 'oac', 'oacd', 'oad', 'oadc', 'odc', 'odca', 'oda', 'odac', 'oca', 'ocad', 'ocd', 'ocda', 'cao', 'caod', 'cad', 'cado', 'cdo', 'cdoa', 'cda', 'cdao', 'coa', 'coad', 'cod', 'coda', 'acd', 'acdo', 'aco', 'acod', 'aod', 'aodc', 'aoc', 'aocd', 'ado', 'adoc', 'adc', 'adco' ]);
  });
});


describe('boggLib#scoringWords', () => {

  let boggLib;

  beforeEach(() => {
    boggLib = new BoggLib(2, 3);
  });

  it('returns an array of possible words', () => {
    let matrix = [
      ['d','o'],
      ['c','g']
    ];
    boggLib.initMatrix(matrix);
    let result = boggLib.scoringWords();
    expect(result).toEqual([ 'dog', 'doc', 'cog', 'cod', 'god' ]);
  });
});

// these are likely temporary, public for now but should be private later

describe('boggLib#getWord', () => {

  let boggLib;

  beforeEach(() => {
    boggLib = new BoggLib(3, 3);
  });

  it('returns a string with letters in an array of positions', () => {
    let matrix = [
      ['d','o','g'],
      ['c','a','t'],
      ['s','d','f']
    ];
    boggLib.initMatrix(matrix);
    let positions = [[0,0],[1,1],[2,2]];
    let result = boggLib.getWord(positions);
    expect(result).toEqual('daf');
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
    expect(words.length).toEqual(1369);
  });

  it('generate a shorter list of words starting from the second row and third column', () => {
    let positions = [[1,2]];
    let words = [];
    boggLib.initMatrix(matrix);
    boggLib.walkMatrix(positions, words);
    expect(words.length).toEqual(1031);
  });

});
