import boggLib from '../src/library';

describe('boggLib#possibleWords', () => {
  it('returns an array of possible words', () => {
    let result = boggLib.possibleWords();
    expect(result).toEqual(['dog','cat', 'fee']);
  });
});

describe('boggLib#scoringWords', () => {
  it('returns an array of possible words', () => {
    let result = boggLib.scoringWords();
    expect(result).toEqual(['dog','cat']);
  });
});
