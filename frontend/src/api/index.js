// 在 src/api/index.js 中
const modulesFiles = require.context(
  './modules',
  false,
  /\.js$/
)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default modules
