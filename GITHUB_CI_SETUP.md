# GitHub CI/CD Setup Instructions

This document explains how to set up the GitHub Actions workflow and branch protection rules for the Kontexto project.

## 1. GitHub Actions Workflow Setup

### Create the workflow file
1. Create the directory: `.github/workflows/` in the repository root
2. Create file: `.github/workflows/frontend-ci.yml`
3. Copy the content from `frontend-ci.yml` (provided in the root directory)

### Workflow Features
- **Automatic triggering**: Runs on push/PR to main/develop branches
- **Path filtering**: Only runs when frontend files change (`code/frontend/**`)
- **Parallel jobs**: Tests and linting run in parallel for faster CI
- **Node.js setup**: Uses Node 20 with pnpm caching
- **Complete validation**: Type checking, testing, and building

## 2. Branch Protection Rules Setup

### Navigate to repository settings:
1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Branches** in the left sidebar
4. Click **Add rule** next to "Branch protection rules"

### Configure protection rule for `main` branch:
- **Branch name pattern**: `main`
- ✅ **Require a pull request before merging**
  - ✅ Require approvals (1 approval minimum recommended)
  - ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - **Select required status checks**: 
    - `test` (from frontend-ci workflow)
    - `lint` (from frontend-ci workflow)
- ✅ **Require conversation resolution before merging**
- ✅ **Include administrators** (enforces rules for all users)

## 3. Required Status Checks

The following checks must pass for PRs to be merged:

### Frontend Tests (`test` job)
- Dependencies installation
- TypeScript type checking
- Unit test execution (all 9 component tests)
- Production build verification

### Code Quality (`lint` job)
- Dependencies installation
- Code linting (when configured)
- Code formatting validation

## 4. Developer Workflow

### Before creating a PR:
```bash
cd code/frontend
pnpm install
pnpm test --run    # All tests must pass
pnpm type-check    # TypeScript must compile
pnpm build         # Production build must succeed
```

### PR Process:
1. Create feature branch from `main`
2. Make changes and commit
3. Push branch and create PR
4. GitHub Actions runs automatically
5. All status checks must pass (green checkmarks)
6. Get required approvals
7. Merge when all conditions met

## 5. Troubleshooting

### Common CI Failures:

**Test failures:**
- Check test output in GitHub Actions logs
- Run tests locally: `pnpm test --run`
- Fix failing tests before pushing

**Type checking failures:**
- Run `pnpm type-check` locally
- Fix TypeScript errors
- Ensure all imports are properly typed

**Build failures:**
- Run `pnpm build` locally
- Check for missing dependencies
- Verify all assets are properly referenced

### Debugging CI Issues:
1. Check the **Actions** tab in GitHub
2. Click on the failing workflow run
3. Expand the failing job to see detailed logs
4. Fix issues locally and push again

## 6. Maintenance

### Updating Dependencies:
- Test changes locally first
- Update `pnpm-lock.yaml` if needed
- Verify CI passes with new dependencies

### Adding New Tests:
- Follow existing patterns in `tests/spec/`
- Use proper `data-testid` attributes
- Include in test coverage documentation
- Verify tests pass in CI

### Modifying Workflow:
- Test changes in feature branch first
- Consider impact on PR merge requirements
- Update documentation if workflow changes

## 7. Security Considerations

- Branch protection enforces code review
- All changes must pass automated tests
- Administrators follow same rules
- Secret values should use GitHub Secrets
- Dependencies are verified during CI

This setup ensures code quality, prevents broken code in main branch, and maintains project stability through automated testing.