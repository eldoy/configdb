# ConfigDB
In-memory database with MongoDB-like API.

### Install
`npm i configdb`

### Usage

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

**Find multiple documents**

All documents.
```js
const result = db('user').find()

// Returns an array of the documents
[{ id: 'ck2a5xf2c0000okk3dbvz4n3i', email: 'vidar@example.com' }]
```

Find all documents by email.
```js
const result = db('user').find({ email: 'vidar@example.com' })
```

Sort ascending by email.
```js
const result = db('user').find({}, { sort: { email: 1 } })
```

Sort descending by email.
```js
const result = db('user').find({}, { sort: { email: -1 } })
```

Find all and skip.
```js
const result = db('user').find({}, { skip: 1 })
```

Find all and limit.
```js
const result = db('user').find({}, { limit: 1 })
```

**Count documents**
```js
const result = db('user').count({ email: 'vidar@example.com' })

// Returns the count as an integer
2
```

**Load collection**

```js
db('user').load([{ email: 'vidar@example.com' }])
```

**Clear collection**

Careful, this will wipe all your data for this collection.
```js
db('user').clear()
```

MIT licensed. Enjoy!
