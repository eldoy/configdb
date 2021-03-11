const match = require('../lib/match.js')

describe('match', () => {
  it('should match value', async () => {
    expect(match(2, 2)).toBe(true)
    expect(match('str', 'hello')).toBe(false)
  })

  it('should match regexp', async () => {
    expect(match(/example/, 'example')).toBe(true)
    expect(match(/5/, 'example')).toBe(false)
  })

  it('should match $eq', async () => {
    expect(match({ $eq: 2 }, 2)).toBe(true)
    expect(match({ $eq: 2 }, 3)).toBe(false)
  })

  it('should match $ne', async () => {
    expect(match({ $ne: 2 }, 2)).toBe(false)
    expect(match({ $ne: 2 }, 3)).toBe(true)
    expect(match({ $ne: 2 }, 1)).toBe(true)
  })

  it('should match $gt', async () => {
    expect(match({ $gt: 2 }, 2)).toBe(false)
    expect(match({ $gt: 2 }, 3)).toBe(true)
    expect(match({ $gt: 2 }, 1)).toBe(false)
  })

  it('should match $gte', async () => {
    expect(match({ $gte: 2 }, 2)).toBe(true)
    expect(match({ $gte: 2 }, 3)).toBe(true)
    expect(match({ $gte: 2 }, 1)).toBe(false)
  })

  it('should match $lt', async () => {
    expect(match({ $lt: 2 }, 2)).toBe(false)
    expect(match({ $lt: 2 }, 3)).toBe(false)
    expect(match({ $lt: 2 }, 1)).toBe(true)
  })

  it('should match $lte', async () => {
    expect(match({ $lte: 2 }, 2)).toBe(true)
    expect(match({ $lte: 2 }, 3)).toBe(false)
    expect(match({ $lte: 2 }, 1)).toBe(true)
  })

  it('should match $in', async () => {
    expect(match({ $in: [1, 2, 3] }, 2)).toBe(true)
    expect(match({ $in: [1, 2, 3] }, 1)).toBe(true)
    expect(match({ $in: [1, 2, 3] }, 3)).toBe(true)
    expect(match({ $in: [1, 2, 3] }, 0)).toBe(false)
    expect(match({ $in: [1, 2, 3] }, 5)).toBe(false)
  })

  it('should match $nin', async () => {
    expect(match({ $nin: [1, 2, 3] }, 2)).toBe(false)
    expect(match({ $nin: [1, 2, 3] }, 1)).toBe(false)
    expect(match({ $nin: [1, 2, 3] }, 3)).toBe(false)
    expect(match({ $nin: [1, 2, 3] }, 0)).toBe(true)
    expect(match({ $nin: [1, 2, 3] }, 5)).toBe(true)
  })
})