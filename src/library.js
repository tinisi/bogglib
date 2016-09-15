import Typo from 'typo-js';
import * as _ from 'lodash';

// this gives us 8 directions to search in (y and x coordinates to add to current position)
const adjacents = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];

class BoggLib {

  constructor(matrixSize, minWordSize) {
    this.matrixSize = matrixSize;
    this.minWordSize = minWordSize;
    this.matrix = [[]];
  }

  initMatrix(matrix) {
    let err = null;
    // early out validation of the grid
    if ( !this.matrixIsValid(matrix) ) {
      err = new Error('Matrix is not valid!');
    } else {
      this.matrix = matrix;
    }
    return err;
  }

  matrixIsValid(matrix) {
    let isValid = true;
    if ( matrix.length !== this.matrixSize) {
      isValid = false;
    } else {
      for ( let row of matrix ) {
        if ( row.length !==  this.matrixSize) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  }

  scoringWords() {
    let dictionary = new Typo("en_US");
    let possibleWords = this.findPossibleWords(this.matrix, this.minWordSize);
    let scoringWords = [];
    for ( let word of possibleWords ) {
      if ( dictionary.check(word) ) {
        scoringWords.push(word);
      }
    }
    return scoringWords;
  }

  findPossibleWords() {
    let possibleWords = [];
    // we need to walk the matrix, starting from each square
    this.matrix.forEach((row, rowIndex) => {
      row.forEach((column, colIndex) => {
        this.walkMatrix([[rowIndex,colIndex]], possibleWords);
      });
    });
    return _.uniq(possibleWords);
  }

  // recursive method to walk the boggle board
  walkMatrix(positions, words) {
    // add the current word to the list
    if ( positions.length >= this.minWordSize) {
      words.push(getWord(this.matrix, positions));
    }

    // each time we recurse, we start at the last y,x coordinate in the positions array
    let lastPosition = positions[positions.length -1];
    // loop over all 8 adjacent squares, and if they are valid add them to the array
    // and recurse again...
    for ( let adjacent of adjacents ) {
      let newY = (parseInt(lastPosition[0], 10) + parseInt(adjacent[0], 10));
      let newX = (parseInt(lastPosition[1], 10) + parseInt(adjacent[1], 10))
      let newPosition = [newY, newX];
      // only recurse if the adjacent position is valid and also has not been walked yet...
      if ( positionIsInBounds(this.matrixSize, newPosition) && positionIsNotUsed(newPosition, positions) ) {
        // create a NEW array (important!) by adding in the new position and recurse away
        let newPositions = positions.concat([newPosition]);
        this.walkMatrix(newPositions, words);
      }
    }
  }

}

// private helpers

// join together the x,y coordinates in the positions array to create a string
function getWord(matrix, positions) {
  let word = [];
  for ( let position of positions ) {
    word.push(matrix[position[0]][position[1]]);
  }
  return word.join('');
}

// determine if a given y,x position is in the grid
function positionIsInBounds(matrixSize, position) {
  let maxIndex = matrixSize -1;
  let isValid = true;
  // less than zero is never valid
  if ( position[0] < 0 || position[1] < 0 ) {
    isValid = false;
  // this can be simple since we are using a class property to set grid size
  // and we can trust this because the matrix is validated in initMatrix() method
  // obviously we could examine the number of rows and columns instead
  } else if ( position[0] > maxIndex || position[1] > maxIndex ) {
    isValid = false;
  }
  return isValid;
}

function positionIsNotUsed(newPosition, positions) {
  let foundIndex = positions.findIndex((position) => {
    return _.isEqual(newPosition, position);
  });
  return (foundIndex === -1);
}

export default BoggLib;
