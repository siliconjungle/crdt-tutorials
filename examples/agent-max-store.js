class AgentMaxStore {
  values = {}

  setValue (key, agentId, value) {
    this.values[key] ??= {}

    if (this.values[key][agentId] === undefined) {
      this.values[key][agentId] = value
      return true
    }

    if (value > this.values[key][agentId]) {
      this.values[key][agentId] = value
      return true
    }

    return false
  }

  getTotal (key) {
    if (this.values[key] === undefined) {
      return 0
    }

    let total = 0

    for (const [agentId, value] of Object.entries(this.values[key])) {
      total += value
    }
    
    return total
  }
  
  getAgentValue(key, agentId) {
    return this.values[key]?.[agentId] ?? 0
  }

  hasValue (key) {
    return this.values[key] !== undefined
  }
}

export default AgentMaxStore
