import { Command} from 'commander'

function createCli(){
  const program = new Command('create')
  program.option('-nb, --no-browser', 'output extra debugging')
  program.action(() => {
    console.log('hello world')
  })
  program.parse(process.argv)
}

export { createCli }