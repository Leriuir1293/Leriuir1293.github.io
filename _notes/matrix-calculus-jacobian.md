---
title: "Matrix Calculus: Jacobian and Chain Rule"
date: 2026-01-22
category: math
tags: [calculus, backprop]
summary: "How to differentiate vector-valued functions — essential for deriving backprop."
status: stable
---

When a scalar loss depends on vectors through multiple layers, the chain rule
generalizes via Jacobians.

## Jacobian

For $f: \mathbb{R}^n \to \mathbb{R}^m$, the Jacobian $J \in \mathbb{R}^{m \times n}$:

$$J_{ij} = \frac{\partial f_i}{\partial x_j}$$

## Chain Rule (Matrix Form)

If $y = f(u)$ and $u = g(x)$, then:

$$\frac{\partial y}{\partial x} = \frac{\partial y}{\partial u} \frac{\partial u}{\partial x}$$

Dimensions must align: if $y$ is scalar, we get a row vector times Jacobian.

## Example: Linear Layer

$y = Wx + b$, loss $L$ scalar:

$$\frac{\partial L}{\partial x} = W^T \frac{\partial L}{\partial y}$$

This is the foundation of backprop through fully-connected layers.

## Resources

- [Matrix Cookbook](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf) — keep this bookmarked
