# Node Package Manager (npm)

npm is the default package manager for Node.js. It lets you **install**, **update**, and **share** reusable code packages. npm comes bundled with Node.js.

---

## 1. `package.json`

Running `npm init` (or `npm init -y`) creates a `package.json` file that:

- stores **name**, **version**, **description**
- lists **dependencies** (runtime) and **devDependencies** (development-only)
- defines **scripts** (easy command shortcuts)
- can include **author**, **license**, and other metadata
- can set `"type": "module"` to use ESModules

> Note: `package.json` is plain JSON (no comments).  
> `package-lock.json` is generated automatically—commit it to your repo.
> The package.json file is used to manage how external packages are used, so it's important to also add this to the repository of a project

## 2. Usefull commands

## Initialize a project

- `npm init` — interactive wizard that creates a `package.json`.
- `npm init -y` — creates a `package.json` with default values.

## Install packages

- `npm install <package>` — installs a package and adds it to `dependencies`.
- `npm install -D <package>` — installs a package as a `devDependency`.
- `npm install` — installs everything listed in `package.json` (uses `package-lock.json` if present).

## Uninstall / Update

- `npm uninstall <package>` — removes a package and updates `package.json`.
- `npm update <package>` — updates a package to the latest version allowed by its semver range.

## Run scripts

- `npm start` — runs the `start` script (shortcut for `npm run start`).
- `npm run dev` — runs the custom `dev` script.

## Security checks

- `npm audit` — scans installed packages for known vulnerabilities.
- `npm audit fix` — applies available, safe fixes automatically.

## Publish (for library authors)

- `npm publish` — publishes the current package to the npm registry (requires an npm account and a valid `package.json`).
