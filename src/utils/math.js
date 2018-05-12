/** @description Return float fixed to desired precision, > 32 bit error
 *  @param {number} num Float to fix
 *  @param {number} precision Desired precision, or 6 if not specified
 *  @return {number}
*/
export function _toFixedFloat(num, precision = 6) {
  if (num && precision) {
    let prec = (Math.pow(10,precision));
    return ( ~~(num * prec) / prec);
  }
  return 0;
}

/** @description Return float fixed to desired precision
 *  @param {number} num Float to fix
 *  @param {number} precision Desired precision, or 6 if not specified
 *  @return {number}
*/
export function toFixedFloat(num, precision = 6) {
  if (num && precision) {
    return parseFloat( parseFloat( num ).toFixed( precision ) );
  }
  return 0;
}

/** @description Return absolute value of a number
 *  @param {number} n Number of wich get value without sign
 *  @return {number}
*/
export const fAbs = n => { let x = n; (x<0) && (x=~x+1); return x; };

/** @description Multiply two matrices
 *  @param {Array} m1 Matrix 1
 *  @param {Array} m2 Matrix 2
 *  @return {Array}
*/
export const multiplyMatrices = (m1, m2) => {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
    result[i] = [];
    for (var j = 0; j < m2[0].length; j++) {
      var sum = 0;
      for (var k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};
