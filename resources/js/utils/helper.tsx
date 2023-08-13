export function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 17)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export function stringAvatar(name: string) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .reduce((initials, curr) => initials.concat(curr[0]), '')
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  }
}

export const CATEGORY_COLOR = {
  transportation: '#0ea5e9',
  food: '#eab308',
  accomodation: '#10b981',
  miscellaneous: '#ef4444',
}
