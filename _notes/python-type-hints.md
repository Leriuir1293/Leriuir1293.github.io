---
title: "Python Type Hints for Research Code"
date: 2026-02-18
category: programming
tags: [python, tooling]
summary: "Minimal type-hint patterns that improve readability without slowing iteration."
status: draft
---

Research code doesn't need full mypy strict mode, but lightweight type hints
pay off when revisiting experiments months later.

## Recommended Minimum

```python
from typing import Iterator
import torch
from torch import Tensor

def train_step(
    model: torch.nn.Module,
    batch: dict[str, Tensor],
    optimizer: torch.optim.Optimizer,
) -> float:
    ...
    return loss.item()
```

## Dataclasses for Configs

```python
from dataclasses import dataclass

@dataclass
class TrainConfig:
    lr: float = 1e-4
    batch_size: int = 32
    max_steps: int = 10000
```

Prefer dataclasses or simple dicts over sprawling global config objects.

## When to Skip Types

- One-off plotting scripts
- Notebook exploration cells
- Code you will delete within a week

## Tools

- `pyright` or `mypy` in CI (optional, lightweight)
- IDE inline hints (Cursor / VS Code) are often enough
