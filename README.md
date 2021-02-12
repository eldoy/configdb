# ConfigDB
Config database in human readable YAML format.

### Install
`npm i configdb`

### Usage

**Set database name**

Default is `configdb.yml` if omitted.
```js
CONFIGDB_PATH = 'config.yml'
```

**Require library**
```js
const db = require('configdb')
```

**Create document**

`user` is the name of the model/collection in this example.
```js
const result = db('user').create({ email: 'vidar@example.com' })

// Returns an object with the id
{ id: 'ck2a5xf2c0000okk3dbvz4n3i' }
```

**Update documents**

Updates all matches.
```js
const result = db('user').update({ email: 'vidar@example.com' }, { email: 'hello@example.com' })

// Returns the number of changed documents
{ n: 1 }
```

**Delete documents**

Deletes all matches.
```js
const result = db('user').delete({ email: 'vidar@example.com' })

// Returns the number of deleted documents
{ n: 1 }
```

**Get a single document**
```js
const result = db('user').get({ email: 'vidar@example.com' })

// Returns the document as a javascript object
{ id: 'ck2a5xf2c0000okk3dbvz4n3i', email: 'vidar@example.com' }
```

**Get multiple documents**
```js
const result = db('user').find({ email: 'vidar@example.com' })

// Returns an array of the documents
[{ id: 'ck2a5xf2c0000okk3dbvz4n3i', email: 'vidar@example.com' }]
```

**Count documents**
```js
const result = db('user').count({ email: 'vidar@example.com' })

// Returns the count as an integer
2
```

**Clear collection**

Careful, this will wipe all your data for this collection.
```js
db('user').clear()
```

MIT licensed. Enjoy!
