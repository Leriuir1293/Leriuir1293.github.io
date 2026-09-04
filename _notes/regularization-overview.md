---
title: "Regularization Techniques Overview"
date: 2026-03-10
category: machine-learning
tags: [regularization, generalization]
summary: "L2, dropout, early stopping, and data augmentation — when to use each."
status: wip
---

Regularization combats overfitting by constraining model capacity or adding noise.

## L2 Weight Decay

Penalizes large weights: add $\lambda \|\theta\|_2^2$ to the loss.
Works well as a default for most neural networks.

## Dropout

Randomly zero activations during training. Effective in MLPs; less common in modern
Transformers (LayerNorm + residual connections provide implicit regularization).

## Early Stopping

Monitor validation metric; stop when it plateaus. Simple and often the best regularizer.

## Data Augmentation

Expand effective training set (images: flip/crop; text: back-translation).
Domain-specific augmentation usually beats generic tricks.

## Rule of Thumb

Start with: train/val split → early stopping → L2 → then consider dropout / augmentation.
