export const getInitialsFromName = (name) => {
  const tokens = name.split(' ').map(t => t[0]);
  return tokens.join('');
}