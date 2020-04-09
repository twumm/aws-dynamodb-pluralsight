const faker = require('faker')

const currentEpochTime = Math.floor(new Date() / 1000)
const secondsInADay = 86400

const users = {}
const jobs = {}
const jobApplications = {}

function generateUniqueJob