# About the project
Xomad Web App components, utilities, and design system are maintained here, with API docs and ___tutorials included (TODO: low priority)___.


# Environment
- Node 14 (theplug compatible)
- Angular 9
- Nx 9

## Monorepo
This repo build with [Nx Workspace](https://nx.dev/). To find out what is the pros and cons, see [https://monorepo.tools/](https://monorepo.tools/)

### Projects
**Apps:**
- Xomad-doc: the documentation uses [Storybook](https://storybook.js.org/)

**Libraries:**
- @xomad/web-core: all components, utilities and design system for @xomad system (currently: theplug, clorox, omo)


# Structure
## xomad-doc (TODO)

## @xomad/web-core
This library is inspired by @angular/material, see their source to catch up the structure
```
@xomad
└── web-core
    ├── components // components, directives, pipes,..
    ├── icons // icomoon, material icons setup,...
    ├── services // all public services
    ├── styles // all styles you want to expose to attach to another project (for e.g attach to angular.json application)
    ├── theming // the design system
    ├── types // interfaces, models, types, enums, const...
    └── utils // all utilities
)
```


# How to run
Make sure your nodejs is in v.14 (recommended) or another node which can deal with the project
```
  nvm use 14
```

To run the application:
```
    npm run app:doc
```
<sup>[WIP] To run the documentation
```
  npm run app:storybook
```

# Deployment
This repo is in Experimental phase so it does not support build with Jenkins. However, the repo is now build and deploy to [Nexus](https://nexus.internal.xomad.com/) with the name <ins>@xomad/web-core</ins>

To release new version, just update the version of <code>libs/@xomad/web-core/package.json:18</code> 

Then run
```
    npm publish
```
