const db = require('../index.js')
const cuid = require('cuid')

describe('configdb', () => {
  beforeEach(function(done) {
    db('user').clear()
    done()
  })

  afterAll(function(done) {
    db('user').clear()
    done()
  })

  it('should create and find a user with an id', () => {
    const id = cuid()
    const result = db('user').create({ id, email: 'vidar@example.com' })
    expect(result.id).toBeDefined()
    const user = db('user').get({ id })
    expect(user.id).toBe(id)
  })

  it('should create and find a user without an id', () => {
    const first = db('user').create({ email: 'vidar@example.com' })
    expect(first.id).toBeDefined()
    const second = db('user').create({ email: 'vidar@example.com' })
    expect(second.id).toBeDefined()
    expect(second.id).not.toBe(first.id)
    const user = db('user').get({ id: second.id })
    expect(user.id).toBe(second.id)
    expect(user.email).toBe('vidar@example.com')
  })

  it('should find documents', () => {
    const first = db('user').create({ email: 'a@example.com' })
    expect(first.id).toBeDefined()
    const second = db('user').create({ email: 'b@example.com' })
    expect(second.id).toBeDefined()
    let result = db('user').find()
    expect(result.length).toBe(2)
    expect(result[0].id).toBe(first.id)
    expect(result[1].id).toBe(second.id)

    result = db('user').find({ id: second.id })
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(second.id)

    // Sort
    result = db('user').find({}, { sort: {} })
    expect(result[0].email).toBe('a@example.com')

    result = db('user').find({}, { sort: { email: 1 } })
    expect(result[0].email).toBe('a@example.com')

    result = db('user').find({}, { sort: { email: -1 } })
    expect(result[0].email).toBe('b@example.com')

    // Skip
    result = db('user').find({}, { skip: 0 })
    expect(result[0].email).toBe('a@example.com')
    expect(result.length).toBe(2)

    result = db('user').find({}, { skip: 1 })
    expect(result[0].email).toBe('b@example.com')
    expect(result.length).toBe(1)

    // Limit
    result = db('user').find({}, { limit: 0 })
    expect(result[0].email).toBe('a@example.com')
    expect(result.length).toBe(2)

    result = db('user').find({}, { limit: 1 })
    expect(result[0].email).toBe('a@example.com')
    expect(result.length).toBe(1)
  })

  it('should count documents', () => {
    const first = db('user').create({ email: 'vidar@example.com' })
    expect(first.id).toBeDefined()
    const second = db('user').create({ email: 'vidar@example.com' })
    expect(second.id).toBeDefined()
    let result = db('user').count()
    expect(result).toBe(2)

    result = db('user').count({ id: second.id })
    expect(result).toBe(1)
  })

  it('should update documents', () => {
    const first = db('user').create({ email: 'vidar@example.com' })
    expect(first.id).toBeDefined()
    const second = db('user').create({ email: 'vidar@example.com' })
    expect(second.id).toBeDefined()
    let update = db('user').update({}, { email: 'other@example.com' })
    expect(update.n).toBe(2)

    let result = db('user').find()
    expect(result.length).toBe(2)
    expect(result[0].email).toBe('other@example.com')
    expect(result[1].email).toBe('other@example.com')

    update = db('user').update({ id: second.id }, { email: 'third@example.com' })
    expect(update.n).toBe(1)
    result = db('user').get({ id: second.id })
    expect(result.email).toBe('third@example.com')
  })

  it('should delete documents', () => {
    const first = db('user').create({ email: 'vidar@example.com' })
    expect(first.id).toBeDefined()
    const second = db('user').create({ email: 'vidar@example.com' })
    expect(second.id).toBeDefined()
    expect(second.id).not.toBe(first.id)
    const user = db('user').delete({ id: second.id })

    let result = db('user').find()
    expect(result.length).toBe(1)
    expect(result[0].email).toBe('vidar@example.com')
  })
})
