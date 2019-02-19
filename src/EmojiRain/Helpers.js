const camelCaseToSnakeCase = string => {
  return string.replace(/([A-Z])/g, function($1) {
    return '-' + $1.toLowerCase()
  })
}

const snakeCaseToCamelCase = string => {
  return string.replace(/(\-[a-z])/g, function($1) {
    return $1.toUpperCase().replace('-', '')
  })
}

const themeToThemeName = theme => {
  // FIXME: This is very hacky and might break in some browsers (untested)
  let themeName = theme.toString().split('.')
  themeName = themeName[themeName.length - 1].replace(')', '')
  return themeName
}

export { camelCaseToSnakeCase, snakeCaseToCamelCase, themeToThemeName }
