// The following creates a bit-set CRDT where all of the bits start off as 1.
// The only operation that can be sent is to clear a bit, making it eventually consistent.
// This would be particularly useful for destructible terrain like in the Worms games or in Voxel engines.
export const create = (bits) =>
  new Uint32Array(Math.ceil(bits / 32)).fill(4294967295)

export const clear = (bitset, i) => {
  const elementIndex = Math.floor(i / 32)
  const bitIndex = i % 32

  bitset[elementIndex] = bitset[elementIndex] & ~(1 << bitIndex)
}

export const get = (bitset, i) => {
  const elementIndex = Math.floor(i / 32)
  const bitIndex = i % 32

  const value = bitset[elementIndex] & (1 << bitIndex)
  return value != 0
}
