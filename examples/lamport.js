export const shouldSet = ([seq, agentId], [seq2, agentId2]) =>
  seq > seq2 || (seq === seq2 && agentId2 > agentId)

class LamportStore {
  documents = {}
  versions = {}

  constructor (onOps) {
    this.onOps = onOps
  }

  applyOps(ops, source) {
    const filteredOps = []

    for (let op of ops) {
      const { id, version, value } = op

      const currentVersion = this.versions[id]
      if (currentVersion === undefined || shouldSet(currentVersion, version)) {
        filteredOps.push(op)
        this.versions[id] = version
        this.documents[id] = value
      }
    }

    if (filteredOps.length > 0) {
      this.onOps(filteredOps, source)
    }
  }

  getSnapshotOps() {
    return Object.entries(this.documents).map(([id, value]) => ({
      id,
      version: this.versions[id],
      value
    }))
  }
}

export default LamportStore
