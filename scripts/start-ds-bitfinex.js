process.env.DEBUG = 'bfx:hf:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const HFDB = require('bfx-hf-models')
const os = require('os')
const fs = require('fs')
const DataServer = require('bfx-hf-data-server')
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')

const os = require('os')
var dir = `${os.homedir()}/.honeyframework`;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const dbBitfinex = new HFDB({
  schema: HFDBBitfinexSchema,
  adapter: HFDBLowDBAdapter({
    dbPath: `${os.homedir()}/.honeyframework/hf-bitfinex.json`,
  }),
})

const dsBitfinex = new DataServer({
  port: 23521,
  db: dbBitfinex,
})

dsBitfinex.open()
