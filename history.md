# History

History is a list of changes that have happened to a dataset over time. It is useful for many reasons, such as:

- It gives insights into how data changes over time (useful for analytics).
- Allows agents to rewind / fastforward time. (useful for re-writing history and viewing the process of the creators).
- Makes more complex merging behaviours possible as you have access to more data.
- Reduces the data you need to send on connection to ensure both parties have up to date data. (You only need to send the immediate parents in the history, the rest can be derived).

## Local-history

The local-history is the order in which operations have arrived at a particular agent. This can be useful as you can map between global-history and local-history, allowing an agent to reference changes by a sequence number rather than needing their agent id as well.

If you're building a centralised application, the local-history of the server can be used as an efficient way for clients to receive all changes since a specific version.

## Global-history

The global-history is an eventually-consistent ordering of changes. Those changes can be implemented in a number of different ways.

### Lamport clocks

One of the simpler approaches is to just use lamport-clocks and store all of the changes that have occurred. Lamport clocks lose information, such as which elements the change is being parented off.

### Parents

If each change sends the list of parents that their change is based off, then much less information is lost. This can also be used for efficiently bringing peers up to date on connection. (vector-clocks can be derived by looking at the history).

## Branches

CRDTs don't need to automatically merge everything, they can implement a branching system similar to GIT. This can be achieved with vector-clocks or a history storing the parents.

## Transactions

It's possible to implement transactions by grouping together a list of changes under a single version and only allowing it to be merged if all operations at that point in time are able to be merged. The difficulty in transactions is that as changes are implemented in the past it may invalidate the transaction and lead to knock-on changes becoming invalidated.

## Undo / Redo stack

In many applications (text editors, whiteboards, etc), it's useful to be able to undo and redo actions. In a collaborative application, it becomes more complicated to reason about what it means to undo / redo. In most cases I'd suggest having a local undo / redo stack of changes that a particular agent has made. This means that if two agents are changing a document at the same time, they won't undo / redo each others work.

## Optimisations

### Culling values

If you don't need to know what value existed in the past, but you need to know if merges were possible you can keep a history of versions and cull the history of values.

### Culling versions

You need to keep around the versions as long as you'd like to be able to merge things at that point in time. If it suits your purposes you can choose to cull all versions that are not still in use past a certain point in time.

### Compressig history
There are many methods of compressing the history (as it can grow quite large over time), but one of the most effective methods is to run-length encode the history. Often an agent will make many changes in a row without receiving changes from a peer which allows for changes to be compressed to really small sizes.
