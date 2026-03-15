const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp) / 10) || 1;
};

module.exports = { calculateLevel };