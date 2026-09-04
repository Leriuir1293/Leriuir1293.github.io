---
title: "Setting Up a Minimal ML Experiment Tracker"
date: 2026-03-05
categories: [engineering]
tags: [experiments, reproducibility]
summary: "You don't need a heavy MLOps stack to track runs — start with structured logs and naming conventions."
reading_time: 5
---

Before adopting Weights & Biases, MLflow, or a custom dashboard, establish habits that
work even in a plain Git repo.

## Minimum Viable Tracking

Every experiment run should record:

```
experiment_name/
├── config.yaml      # all hyperparameters
├── metrics.json     # final and intermediate metrics
├── stdout.log       # training log
└── README.md        # one-line description + date
```

## Naming Convention

Use descriptive, sortable names:

```
2026-03-05-baseline-lr1e4-bs32
2026-03-06-ablation-no-dropout
```

Date prefix makes chronological sorting trivial.

## Config Discipline

Serialize the *full* config at run start — not just CLI args. Include:

- Random seed
- Git commit hash (`git rev-parse HEAD`)
- Dataset version / path
- Model architecture identifier

```python
import json, subprocess, yaml

config["git_commit"] = subprocess.check_output(
    ["git", "rev-parse", "HEAD"], text=True
).strip()

with open("config.yaml", "w") as f:
    yaml.dump(config, f)
```

## When to Upgrade Tools

Consider W&B / MLflow when:

- You have >20 runs/week
- Multiple people share experiments
- You need live metric curves during training

Until then, structured folders plus Git are enough.

## Summary

Reproducibility starts with discipline, not infrastructure. Build the habit first;
scale tools when pain appears.
