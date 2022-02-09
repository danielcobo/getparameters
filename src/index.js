/**
 * Get function parameter names
 * (and their defualt values, if any)
 * @public
 * @param {function} func - function to get parameter names from
 * @returns {Array.string} - parameters
 */
module.exports = function getParameters(func) {
  const str = func
    .toString()
    .replace(/\/\*[^*]*\*\//g, '')
    .replace(/\/\/.*\n/g, '')
    .split('{')[0];
  //if includes => then () is optional for single parameter
  let arr;
  if (str.indexOf('=>') > -1 && str.indexOf('(') === -1) {
    //single param arrow function
    arr = [str.slice(0, str.indexOf('=>')).replace(/\s*/g, '')];
  } else {
    //look for () and split by ,
    arr = str
      .slice(str.indexOf('(') + 1, str.lastIndexOf(')'))
      .replace(/\s*/g, '')
      .split(',');
  }

  if (arr[0] === '') {
    arr = [];
  }
  return arr;
};
