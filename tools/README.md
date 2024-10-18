# Ecohami Tools

Collection of tools and scripts.

# Setup

## Get tools

In the target repo:

```bash
git subtree add --prefix=tools git@github.com:ecohami/ecohami-tools.git main --squash
```

It will fetch the repo in `tools/` folder.

## Update tools

To update the code with `main` in target repo:

```bash
git subtree pull --prefix=tools git@github.com:ecohami/ecohami-tools.git main --squash
```