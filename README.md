# ConfigDB
Config database in human readable YAML format.

### Install
With Node.js:
`npm i configdb`

### Usage
```js
// Require library
const db = require('wavedb')()

// Create document, 'user' is the name of the model/collection
const result = await db('user').create({ email: 'vidar@example.com' })

// Returns an object with the id
{ id: 'ck2a5xf2c0000okk3dbvz4n3i' }

// Update documents, changes all matches
const result = await db('user').update({ email: 'vidar@example.com' }, { email: 'hello@example.com' })

// Returns the number of changed documents
{ n: 1 }

// Delete documents, deletes all matches
const result = await db('user').delete({ email: 'vidar@example.com' })

// Returns the number of deleted documents
{ n: 1 }

// Get a single document
const result = await db('user').get({ email: 'vidar@example.com' })

// Returns the document as a javascript object
{ id: 'ck2a5xf2c0000okk3dbvz4n3i', email: 'vidar@example.com' }

// Get multiple documents
const result = await db('user').find({ email: 'vidar@example.com' })

// Returns an array of the documents
[{ id: 'ck2a5xf2c0000okk3dbvz4n3i', email: 'vidar@example.com' }]

// Count documents
const result = await db('user').count({ email: 'vidar@example.com' })

// Returns the count as an integer
2

// Clear collection. WARNING: will wipe all your data for this collection
await db('user').clear()

```
MIT licensed. Enjoy!
