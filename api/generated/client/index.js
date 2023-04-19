
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  findSync
} = require('./runtime/data-proxy')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.13.0
 * Query Engine version: 1e7af066ee9cb95cf3a403c78d9aab3e6b04f37a
 */
Prisma.prismaVersion = {
  client: "4.13.0",
  engine: "1e7af066ee9cb95cf3a403c78d9aab3e6b04f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "generated\\client",
    "client",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

/**
 * Enums
 */

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.TestScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email'
};

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});


exports.Prisma.ModelName = {
  Test: 'Test'
};

const compressedDMMF = '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'
const decompressedDMMF = decompressFromBase64(compressedDMMF)
// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(decompressedDMMF)
exports.Prisma.dmmf = JSON.parse(decompressedDMMF)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Code\\Craftex\\api\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [
      "deno"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "..\\..\\.env",
    "schemaEnvPath": "..\\..\\.env"
  },
  "relativePath": "..\\..\\prisma",
  "clientVersion": "4.13.0",
  "engineVersion": "1e7af066ee9cb95cf3a403c78d9aab3e6b04f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "dataProxy": true,
  "postinstall": false
}
config.dirname = dirname
config.document = dmmf

config.inlineSchema = 'Ly8gVGhpcyBpcyB5b3VyIFByaXNtYSBzY2hlbWEgZmlsZSwKLy8gbGVhcm4gbW9yZSBhYm91dCBpdCBpbiB0aGUgZG9jczogaHR0cHM6Ly9wcmlzLmx5L2QvcHJpc21hLXNjaGVtYQoKZ2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgICAgICAgID0gInByaXNtYS1jbGllbnQtanMiCiAgcHJldmlld0ZlYXR1cmVzID0gWyJkZW5vIl0KICBvdXRwdXQgICAgICAgICAgPSAiLi4vZ2VuZXJhdGVkL2NsaWVudCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgID0gInBvc3RncmVzcWwiCiAgdXJsICAgICAgID0gZW52KCJEQVRBQkFTRV9VUkwiKQp9Cgptb2RlbCBUZXN0IHsKICBpZCAgICBTdHJpbmcgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBuYW1lICBTdHJpbmcKICBlbWFpbCBTdHJpbmcKfQo='
config.inlineSchemaHash = '6b67785457f10104e821d371e8deeace0d25ae50a01a40c303f40cf990a4680d'

config.inlineDatasources = {
  "db": {
    "url": {
      "fromEnvVar": "DATABASE_URL",
      "value": null
    }
  }
}


const { warnEnvConflicts } = require('./runtime/data-proxy')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})


const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

