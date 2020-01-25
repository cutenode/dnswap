#!/usr/bin/env node

const { spawn } = require('child_process') // need this for executing commands
const commander = require('commander') // CLI framework
const commands = require('../data/commands.json') // the macOS command values are defined here
const pjson = require('../package.json') // used for program version

const program = new commander.Command() // instantiate commander

program.version(pjson.version) // set the CLI version to be the same as the module version

program
  .option('-g, --google', 'set custom DNS to Google Public DNS') 
  .option('-c, --cloudflare', 'set custom DNS to CloudFlare 1.1.1.1 DNS')
  .option('-e, --empty', 'set custom DNS to defaults (provided by your network setup)')

program.parse(process.argv) // process arguments passed to the CLI and enable Commander to give us easy access to them

if(program.google) {
  const result = spawn(commands.root, [commands.set, commands.wifi, commands.google.first, commands.google.second]) // runs the relevant macOS command to set up google DNS

  result.stdout.on('data', (data) => { // spit out the result of the command to the user if we're successful
    console.log(`${data}`)
    process.exitCode = 0 // set the exit code as a positive one since we know it succeeded 
  })
  
  result.stderr.on('data', (data) => { // spit out the result of the command to the user if there's an error
    console.error(`${data}`)
    process.exitCode = 1 // set the exit code as a negative one since we know there was a problem
  })

  return
}

if(program.cloudflare) {
  const result = spawn(commands.root, [commands.set, commands.wifi, commands.cloudflare.first, commands.cloudflare.second]) // runs the relevant macOS command to set up CloudFlare DNS

  result.stdout.on('data', (data) => { // spit out the result of the command to the user if we're successful
    console.log(`${data}`)
    process.exitCode = 0 // set the exit code as a positive one since we know it succeeded 
  })
  
  result.stderr.on('data', (data) => { // spit out the result of the command to the user if there's an error
    console.error(`${data}`)
    process.exitCode = 1 // set the exit code as a negative one since we know there was a problem
  })
  
  return
}


if(program.empty) {
  const result = spawn(commands.root, [commands.set, commands.wifi, commands.empty]) // runs the relevant macOS command to unset any custom DNS servers

  result.stdout.on('data', (data) => { // spit out the result of the command to the user if we're successful
    console.log(`${data}`)
    process.exitCode = 0 // set the exit code as a positive one since we know it succeeded 
  })
  
  result.stderr.on('data', (data) => { // spit out the result of the command to the user if there's an error
    console.error(`${data}`)
    process.exitCode = 1 // set the exit code as a negative one since we know there was a problem
  })

  return
}

if(!program.google && !program.cloudflare && !program.empty) { // do this when none of our arguments are passed - basically, on `dnswap`
  const result = spawn(commands.root, [commands.get, commands.wifi])

  result.stdout.on('data', (data) => {// spit out the result of the command to the user if we're successful
    console.log(`${data}`)
    process.exitCode = 0 // set the exit code as a positive one since we know it succeeded 
  })
  
  result.stderr.on('data', (data) => { // spit out the result of the command to the user if there's an error
    console.error(`${data}`)
    process.exitCode = 1 // set the exit code as a negative one since we know there was a problem
  })

  return
}