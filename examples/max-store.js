class MaxStore {
  values = {}

  setValue (key, value) {
    if (this.values[key] === undefined || value > this.values[key]) {
      this.values[key] = value
      return true
    }
    
    return false
  }

  getValue (key) {
    return this.values[key] ?? null
  }

  hasValue (key) {
    return this.values[key] !== undefined
  }
}

export default MaxStore
