require('../server.babel')

import fs from 'fs'
import inquirer from 'inquirer'
import logger from './utils/logger'
import getCombBySum from './utils/index'

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const sum = 10

// logger.cyan(`arr: ${arr}`)
// logger.cyan(`sum: ${sum}`)
// const result = new getCombBySum(arr, sum, 3)
// logger.success(`=> ${JSON.stringify(result)}`)

// 配置默认的可选参数
let defaultParam = {
  targetCount: 3, // 操作数数量
  tolerance: 0 // 容差
}
// 是否使用默认配置
let useDefault = false

// 监听输入
const promptList = [{
  type: 'list',
  message: '是否使用默认配置:',
  name: 'useDefault',
  choices: [
    new inquirer.Separator(`将使用默认配置: 操作数数量 = ${defaultParam.targetCount}, 容差 = ${defaultParam.tolerance}`), // 添加分隔符
    'yes',
    new inquirer.Separator('不使用默认配置, 将自定义操作数数量和容差'), // 添加分隔符
    'no'
  ],
  filter: function (val) {
    return val === 'yes';
  },
  pageSize: 2 // 设置行数
}, {
  type: 'input',
  message: '复制文件完整路径:',
  name: 'file',
  default: '',
  validate: async (input) => {
    let result
    try {
      result = fs.readFileSync(input)
      logger.cyan(result)
      return true
    } catch (err) {
      logger.error(`读取文件失败, 请重新输入 ${err}`)
    }
  }
}, {
  type: 'input',
  message: '自定义操作数数量:',
  name: 'targetCount',
  default: '',
  when: function (answers) { // 当watch为true的时候才会提问当前问题
    return !answers.useDefault
  }
}, {
  type: 'input',
  message: '自定义容差:',
  name: 'tolerance',
  default: '',
  when: function (answers) { // 当watch为true的时候才会提问当前问题
    return !answers.useDefault
  }
}];
// /Users/dasouche/Downloads/progressBar.html
inquirer.prompt(promptList).then(answers => {
  logger.cyan(answers); // 返回的结果
  const { targetCount, tolerance } = answers
  if (targetCount && tolerance) {
    defaultParam = { targetCount: +targetCount, tolerance: +tolerance }
  }
  logger.cyan(`defaultParam: ${JSON.stringify(defaultParam)}`)
})
