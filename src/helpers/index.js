export const getInitialsFromName = (name) => {
  const tokens = name.split(' ').map(t => t[0]);
  return tokens.join('');
}

export const toTitleCase = (name) => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};