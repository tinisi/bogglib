import Typo from 'typo-js';

export default {
  possibleWords: (matrix) => {
    // so quick and dirty...
    // just returning a string for each "line" in the matrix
    let possibleWords = [];
    for ( let line of matrix ) {
      possibleWords.push(line.join(''));
    }
    return possibleWords;
  },
  scoringWords: (possibleWords) => {
    let scoringWords = [];
    let dictionary = new Typo("en_US");
    for ( let word of possibleWords ) {
      if ( dictionary.check(word) ) {
        scoringWords.push(word);
      }
    }
    return scoringWords;
  }
}
