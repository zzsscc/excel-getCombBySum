require('../server.babel')

import fs from 'fs'
import xlsx from 'node-xlsx';
import inquirer from 'inquirer'
import logger from './utils/logger'
import getCombBySum from './utils/index'
// import { async } from 'rxjs/internal/scheduler/async';

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const sum = 10

// logger.cyan(`arr: ${arr}`)
// logger.cyan(`sum: ${sum}`)
// const result = new getCombBySum(arr, sum, 3)
// logger.success(`=> ${JSON.stringify(result)}`)

// 配置默认的可选参数
let defaultParam = {
  targetCount: 0, // 操作数数量
  tolerance: 0 // 容差
}
// 是否使用默认配置
let useDefault = false
let xlsxData = null
let datasArr = []


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
    try {
      xlsxData = xlsx.parse(input);
      return true
    } catch (err) {
      logger.error(`读取文件失败, 请重新输入 ${err}`)
      return false
    }
  }
}, {
  type: 'input',
  message: '取第几列的数据:',
  name: 'column',
  default: '',
  filter: (val) => { // 序列那列去掉
    return +val - 1
  }
}, {
  type: 'input',
  message: '从第几行开始:',
  name: 'startRow',
  default: '',
  filter: (val) => { // 表头那行去掉
    return +val - 1
  }
}, {
  type: 'input',
  message: '自定义操作数数量:',
  name: 'targetCount',
  default: '',
  when: function (answers) { // 当useDefault为false的时候才会提问当前问题
    return !answers.useDefault
  }
}, {
  type: 'input',
  message: '自定义容差:',
  name: 'tolerance',
  default: '',
  when: function (answers) { // 当useDefault为false的时候才会提问当前问题
    return !answers.useDefault
  }
}, {
  type: 'input',
  message: '目标总值:',
  name: 'targetSum',
  default: ''
}];

// /Users/dasouche/Downloads/客户消费明细表2014（瑞安）.xls
const inquirerQuestion = async () => {
  const answers = await inquirer.prompt(promptList)
  // logger.cyan(answers); // 返回的结果
  const {
    column,
    startRow,
    targetCount,
    tolerance
  } = answers
  if (targetCount && tolerance) {
    defaultParam = {
      targetCount: +targetCount,
      tolerance: +tolerance
    }
  }

  // 拿数据
  for (let i = +startRow; i < xlsxData[0].data.length; i += 1) { // excel文件里的表格一般有标题所以不一定从0开始
    const row = xlsxData[0].data[i];
    if (row && row.length > 0) {
      datasArr.push(row[+column])
      // id: row[22], // row[22]对应表格里W这列
    }
  }
  datasArr = Array.from(new Set(datasArr))
  logger.cyan(datasArr)

  const rule = { ...defaultParam, ...answers }
  logger.cyan(`rule: ${JSON.stringify(rule)}`)
  const result = new getCombBySum(datasArr, +rule.targetSum, rule.targetCount, rule.tolerance)
  fs.writeFileSync('./index.txt', JSON.stringify(result));
  logger.success(`=> ${JSON.stringify(result)}`)
}
inquirerQuestion()
