---
title: "Gradient Descent: Core Intuition"
date: 2026-01-10
category: machine-learning
tags: [optimization, basics]
summary: "Why moving opposite to the gradient minimizes a loss function, and what can go wrong."
status: stable
---

Gradient descent iteratively updates parameters by stepping in the direction that most
rapidly *decreases* the loss — the negative gradient.

## Update Rule

For parameters $\theta$ and loss $L(\theta)$:

$$\theta \leftarrow \theta - \eta \nabla_\theta L(\theta)$$

where $\eta$ is the learning rate.

## Practical Notes

- **Learning rate** is the most important hyperparameter. Too large → divergence; too small → slow convergence.
- **Batch vs. stochastic:** full-batch uses all data (stable but expensive); SGD uses mini-batches (noisy but fast).
- **Momentum / Adam:** adaptive methods help when the loss landscape is ill-conditioned.

## Common Pitfalls

1. Not monitoring training *and* validation loss
2. Forgetting to shuffle mini-batches each epoch
3. Using the same learning rate across very different parameter groups

## References

- [Placeholder — add textbook or lecture link]
