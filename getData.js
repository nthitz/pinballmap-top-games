const request = require('request')
const fs = require('fs')

const regionsEndpoint = 'https://pinballmap.com/api/v1/regions.json'
const delay = 400
let regionsProcessed = -1
let regions = null
request(regionsEndpoint, (error, response, body) => {
  console.log(body)
  regions = JSON.parse(body).regions
  console.log(regions.length)
  console.log(regions)
  fs.writeFileSync('./regions.json', JSON.stringify(regions))
  setTimeout(processNextRegion, delay)
})

function processNextRegion() {
  regionsProcessed++
  const region = regions[regionsProcessed]
  if (!region) {
    return
  }
  const regionLocationsEndpoint = `https://pinballmap.com/api/v1/region/${region.name}/locations.json`
  request(regionLocationsEndpoint, (error, response, body) => {
    const locations = JSON.parse(body).locations
    fs.writeFileSync(`./regions/${region.name}.json`, JSON.stringify(locations))
    console.log(region.name)

    setTimeout(processNextRegion, delay)
  })
}