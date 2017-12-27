let count = 0;

exports.value = () => {
  count = count;
  return count;
}

exports.increment = () => { 
  count = count + 1;
  return count; 
}

exports.reset = () => {
  count = 0;
  return count;
}