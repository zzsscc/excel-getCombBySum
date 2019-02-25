require('../server.babel')

import logger from './utils/logger'
import getCombBySum from './utils/index'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const sum = 10

logger.cyan(`arr: ${arr}`)
logger.cyan(`sum: ${sum}`)
const result = new getCombBySum(arr, sum, 3)
logger.success(`=> ${JSON.stringify(result)}`)
