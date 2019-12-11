const fs = require('fs')
const machines = JSON.parse(fs.readFileSync('./machines.json'))
const regions = JSON.parse(fs.readFileSync('./regions.json'))

const machinesById = {}
machines.forEach(machine => {
  machinesById[machine.id] = machine
})
const machineCount = {}

regions.forEach(region => {
  const regionLocations = JSON.parse(fs.readFileSync('./regions/' + region.name + '.json'))
  regionLocations.forEach(location => {
    const machines = location.location_machine_xrefs
    machines.forEach(machine => {
      const id = machine.machine_id
      if (!(id in machineCount)) {
        machineCount[id] = 0
      }
      machineCount[id] ++
    })
  })
})

const ids = Object.keys(machineCount)

ids.sort((a, b) => {
  const aCount = machineCount[a]
  const bCount = machineCount[b]
  return bCount - aCount
})

ids.forEach(id => {
  console.log(machinesById[id].name + ', ' + machineCount[id])
})