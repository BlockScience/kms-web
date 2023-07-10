# KMS Web
Install Node.js to use Vite + React environment.
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
(Instructions from https://github.com/nodesource/distributions)

Install dependencies.
```bash
cd ~/kms-api/frontend
npm install
```

### For Development
```bash
npm run dev
```

### For Production
```bash
npm run build
```

### Contributing
We are using pre-commit hooks in aid of a clean and consistent codebase. For hooks to run automatically you can run 
```bash
pre-commit install
```
You can also run it manually on all files with
```bash
pre-commit run --all-files
```

### Deployment Testing Checklist
1. Onboarding/Tour is up to date (and working for all states)
2. Shortcuts are up to date
