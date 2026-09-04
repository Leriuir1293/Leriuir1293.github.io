---
title: "Transformer Self-Attention Cheat Sheet"
date: 2026-02-05
category: deep-learning
tags: [transformer, attention, nlp]
summary: "Quick reference for Q/K/V, scaling, and multi-head attention."
status: wip
---

Self-attention lets each token attend to every other token in a sequence.

## Scaled Dot-Product Attention

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

| Symbol | Meaning |
|--------|---------|
| $Q$ | Query — "what am I looking for?" |
| $K$ | Key — "what do I contain?" |
| $V$ | Value — "what information do I pass?" |
| $d_k$ | Key dimension (for scaling) |

## Multi-Head Attention

Run $h$ parallel attention heads, concatenate, then project:

```
MultiHead(Q,K,V) = Concat(head_1, ..., head_h) W_O
```

Each head can learn different relational patterns (syntax, coreference, etc.).

## Implementation Tips

- Use fused kernels (FlashAttention) when sequence length is large
- Watch memory: attention is $O(n^2)$ in sequence length
- Pre-LN vs. Post-LN affects training stability
