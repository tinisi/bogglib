import Typo from 'typo-js';
import * as _ from 'lodash';

// assuming a square grid, tweaking this might make testing easier
const matrixSize = 4;

// this gives us 8 directions to search in (y and x coordinates to add to current position)
const adjacents = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];

export default {
  possibleWords: (matrix) => {
    // early out validation of the grid
    if ( !matrixIsValid(matrix) ) {
      return 'Not valid 4x4 matrix';
    }
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
  },
  // I would like these to be private, but exposing them for now to make more testable
  // recursive method to walk the matrix
  walkMatrix: (matrix, positions, words) => {
    return walkMatrix(matrix, positions, words);
  },
  // join together the x,y coordinates in the positions array to create a string
  getWord: (matrix, positions) => {
    return getWord(matrix, positions);
  }
}

// private helpers

function matrixIsValid(matrix) {
  let isValid = true;
  if ( matrix.length !== matrixSize) {
    isValid = false;
  } else {
    for ( let row of matrix ) {
      if ( row.length !==  matrixSize) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
}

function positionIsInBounds(position) {
  let maxIndex = matrixSize -1;
  let isValid = true;
  // less than zero is never valid
  if ( position[0] < 0 || position[1] < 0 ) {
    isValid = false;
  // this can be simple since we are using a constant to set grid size
  // obviously we could examine the number of rows and columns
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

function getWord(matrix, positions) {
  let word = [];
  for ( let position of positions ) {
    word.push(matrix[position[0]][position[1]]);
  }
  return word.join('');
}

function walkMatrix(matrix, positions, words) {

  // add the current word to the list
  words.push(getWord(matrix, positions));

  // each time we recurse, we start at the last y,x coordinate in the positions array
  let lastPosition = positions[positions.length -1];
  // loop over all 8 adjacent squares, and if they are valid add them to the array
  // and recurse again...
  for ( let adjacent of adjacents ) {
    let newY = (parseInt(lastPosition[0], 10) + parseInt(adjacent[0], 10));
    let newX = (parseInt(lastPosition[1], 10) + parseInt(adjacent[1], 10))
    let newPosition = [newY, newX];
    // only recurse if the adjacent position is valid and also has not been walked yet...
    if ( positionIsInBounds(newPosition) && positionIsNotUsed(newPosition, positions) ) {
      // create a NEW array (important!) by adding in the new position and recurse away
      let newPositions = positions.concat([newPosition]);
      walkMatrix(matrix, newPositions, words);
    }
  }

}
