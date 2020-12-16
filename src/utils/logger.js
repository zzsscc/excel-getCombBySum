import colors from 'colors';

export default {
  info(msg) {
    console.log(`\n[Info] ${colors.white(msg)}`)
  },
  cyan(msg) {
    console.log(`\n[Cyan] ${colors.cyan(msg)}`)
  },
  success(msg) {
    console.log(`\n[success] ${colors.green(msg)}`)
  },
  warn(msg) {
    console.log(`\n[Warn] ${colors.yellow(msg)}`)
  },
  error(msg) {
    console.log(`\n[Error] ${colors.red(msg)}`)
  }
};
