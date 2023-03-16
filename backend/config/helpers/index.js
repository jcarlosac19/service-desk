function isNullOrUndefined(value){
  return  value === null || value === undefined || typeof value === 'undefined';
}
function isNullOrWhitespace(value){
  return isNullOrUndefined(value) || value?.toString().trim().length === 0;
} 

function getDiffInHours (dateInit, dateEnd) {
  const date1 = new Date(dateInit);
  const date2 = new Date(dateEnd);
  const diff = Math.abs(date2.getTime() - date1.getTime());
  return (diff / (1000 * 3600)).toFixed(2);
};

module.exports = { isNullOrWhitespace, getDiffInHours,  isNullOrUndefined};