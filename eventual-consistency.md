# Eventual consistency
## What is eventual consistency?

Let's say we have three peers connecting to each other in a distributed system - James, Greg and Mike.
Eventual consistency means that regardless of the order in which changes arrive at each of the peers, they should all end up with the same state given the same set of changes.

## So what are some concrete examples?

### `|=`:

The bitwise `or` operator is eventually consistent in that if any bit has been flipped, it will always be flipped regardless of how many changes are applied to it.
This method isn't particularly useful, but I can see it being an efficient way to store things like whether or not pieces of terrain have been destroyed in a game.
With this method, the bits can never be un-set.

### `Math.max`:

`Math.max` is quite possibly the easiest to understand eventual consistency method. Regardless of how many values are handed into the function, you'll always end up with the highest value.
`Math.max` doesn't even need any versioning metadata. This method is useful for values that can only ever increment.

### `Math.min`:

`Math.min` works very similarly to the `Math.max`, the main difference is that it will always choose the lowest value. This is useful for values that can only ever decrement.

### Using `Math.max` and `Math.min` together:

If you store both a max value and a min value and add them together, then you're able to have a value that gets both higher and lower.

### Storing a separate `Math.max` per agent:

This method is particularly useful for things like shopping carts where each agent can buy any number of items and the total number of purchases needs to be tracked.

### Cycling through values using `Math.max`:

`Math.max` can also be used for storing the selections of items from a fixed set of choices. For example, storing which react an agent has done on a post or the selection of variants of a product added to the cart.

Let's say that an agent is reacting to a post, there are 4 possible states it can be in "no react", "like", "love" and "sad". "no react" is represented by the value 0, "like" is 1, "love" is 2 and "sad" is 3.

If you use modulus with the value, you can determine which of the states should be selected.

### Lamport clocks:

We've currently been using `Math.max` and `Math.min` to select the highest and lowest values in a consistent fashion. Lamport clocks do the same trick, but rather than checking the highest value,
they're comparing which value has the highest "sequence" number. The sequence number is just a monotonically increasing value that increments every time a change is made.

This separation of the version from the value allows us to extend the ruleset to work with any kind of value regardless of how the data changes.

Lamport clocks require a consistent set of rules for tie-breaking such as highest value, lowest value, highest agent id, etc.
