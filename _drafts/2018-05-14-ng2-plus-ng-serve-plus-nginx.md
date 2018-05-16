---
layout: post
title:  "ng2 + ng serve + NGINX"
date:   2018-05-14 10:02:56 -0300
---

One of my favorite features of [Angular 2+](https://angular.io/) is the [Angular CLI](https://cli.angular.io/). The CLI cleanly replaces the hodge-podge of custom [gulp](https://gulpjs.com/), [grunt](https://gruntjs.com/), or [npm](https://docs.npmjs.com/files/package.json#scripts) scripts that power the builds behind every [AngularJS](https://angularjs.org/) (Angular 1) app.

Perhaps the best feature is of the CLI is the [`ng serve`](https://github.com/angular/angular-cli/wiki/serve) command.  This command builds the app, serves the app (using [webpack-dev-server](https://github.com/webpack/webpack-dev-server)), and then watches for changes to source files, incrementally rebuilding and reloading the app when changes are detected.

Unfortunately, it's pretty easy to break this command.  For example, say you use a local webserver like [NGINX](https://www.nginx.com/) to hide your app behind a URL like https://localhost/my-app.  This setup allows you to channel traffic from the app to a server hosted at a different domain or port without working around [cross-origin issues](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). The live-reload featu