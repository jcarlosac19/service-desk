function isNullOrWhiteSpace(element){
  if(
    element === null ||
    typeof element === 'undefined' ||
    element.toString().trim() === ''
  ){  
    return true;
  }
  return false;
}

module.exports = { isNullOrWhiteSpace };