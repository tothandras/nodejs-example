const logger = require('./common/logger')
const catchErrors = require('./common/catch-errors')

// catch unhandled exceptions
catchErrors()

// intercept console calls & use custom JSON logger
logger.interceptConsole()

const semver = require('semver')
const pkg = require('./package.json')

// validate Node version requirement
const runtime = {
  expected: semver.validRange(pkg.engines.node),
  actual: semver.valid(process.version),
}
const valid = semver.satisfies(runtime.actual, runtime.expected)
if (!valid) {
  console.error(
    `expected Node.js version ${runtime.expected}, but found ${runtime.actual}, please update or change your runtime!`
  )
  process.exit(1)
}

// start process
console.log('starting process', {
  service: pkg.name,
  pid: process.pid,
  node: process.version,
})

require('./server')
