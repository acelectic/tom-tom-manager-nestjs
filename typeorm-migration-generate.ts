import { exec } from 'child_process'

console.log({
  argv: process.argv,
})
const command = `yarn ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ${process.argv[2]}/${process.argv[4]} -d ${process.argv[3]}`

;(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr)
    }
    console.log(stdout)
  }))()
