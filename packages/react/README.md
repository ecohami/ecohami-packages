# Ecohami React

## Publish

1. Set your GitHub token:

```bash
export GITHUB_TOKEN=JustChangeMe
```

2. Publish the package:

```bash
pnpm publish --access public
```

## pnpm link for development

1. Check if the package is linked:

```bash
pnpm list --global --depth=0
```

2. Go to the local package directory:

```bash
cd path/to/local/package
```

3. Link the package globally:

```bash
pnpm link --global
```

4. Link the package in your project:

```bash
pnpm link --global @ecohami/react
```

5. Verify the link:

```bash
pnpm list --global --depth=0
```
