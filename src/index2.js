require('../server.babel')

import inquirer from 'inquirer'
import logger from './utils/logger'

// 监听输入
const promptList = [{
  type: 'input',
  message: '输入日期: yyyy/mm/dd',
  name: 'day',
  default: ''
}];

const inquirerQuestion = async () => {
  const answers = await inquirer.prompt(promptList)
  const {
    day
  } = answers
  const date = day ? new Date(`${day} 00:00:00`) : new Date()
  const currentYear = date.getFullYear().toString();
  const hasTimestamp = date - new Date(currentYear);
  const hasDays = Math.ceil(hasTimestamp / 86400000) + 1;
  logger.success(hasDays);
}

inquirerQuestion()
