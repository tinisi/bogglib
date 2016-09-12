import boggLib from '../src/library';

describe('boggLib#possibleWords', () => {
  it('returns an array of possible words', () => {
    let matrix = [
      ['d','o','g'],
      ['c','a','t'],
      ['s','d','f']
    ]
    let result = boggLib.possibleWords(matrix);
    expect(result).toEqual(['dog','cat', 'sdf']);
  });
});

describe('boggLib#scoringWords', () => {
  it('returns an array of possible words', () => {
    let possibleWords = ['dog','cat', 'sdf'];
    let result = boggLib.scoringWords(possibleWords);
    expect(result).toEqual(['dog','cat']);
  });
});
