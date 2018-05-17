---
layout: post
title:  "Live Reloading An Angular 2+ App Behind NGINX"
date:   2018-05-14 10:02:56 -0300
image:  assets/img/live-reloading-an-angular-2-app-behind-nginx/nginx-angular.jpg
---

Not my snappiest title, but this topic is too near to my heart to obscure with puns. Tight feedback loops are one of my favorite aspects of front-end development.

<hr />

One of my favorite features of [Angular 2+](https://angular.io/) is the [Angular CLI](https://cli.angular.io/). The CLI cleanly replaces the hodge-podge of custom [gulp](https://gulpjs.com/), [grunt](https://gruntjs.com/), or [npm](https://docs.npmjs.com/files/package.json#scripts) scripts that power the build behind every [AngularJS](https://angularjs.org/) (Angular 1) app.

Perhaps the best feature of the CLI is the [`ng serve`](https://github.com/angular/angular-cli/wiki/serve) command. This command builds the app, serves it (using [webpack-dev-server](https://github.com/webpack/webpack-dev-server)), and then watches for changes to source files, incrementally rebuilding and reloading the app when changes are detected.

Unfortunately, it's pretty easy to break some features of this command. For example, say you use a local webserver like [NGINX](https://www.nginx.com/) to hide your app behind a URL like [https://localhost/my-app](). This common setup allows the app to communicate with a server hosted at a different domain or port without causing [cross-origin issues](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). However, it also blocks some of the traffic the `ng serve` feature uses to trigger the live reload feature, so your app will lose the ability to refresh itself when its source files are changed.

Fortunately, it's possible to proxy this live reload traffic and regain live reload functionality.

<figure>
    <img src="{{ 'assets/img/live-reloading-an-angular-2-app-behind-nginx/nginx-angular.jpg' | relative_url }}" alt="The NGINX G inside the Angular shield" />
    <figcaption>Another Angular shield mashup icon because there's not enough on the internet already.</figcaption>
</figure>

## 1. Serve your Angular 2+ app from a unique port

First, update your Angular project's `angular.json` file to `ng serve` on a unique port - one that isn't already in use by another Angular app. This step is optional if you only plan on working on a single Angular 2+ app.

```json
{
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "projects": {
        "my-project": {
            "architect": {
                "serve": {
                    "options": {
                        "port": 4201
                    }
                }
            }
        }
    }
}
```

Note: only relevant properties are shown in the example above.

## 2. Reverse proxy traffic to this port using NGINX

Next, update your `nginx.config` to map a friendly URL to your app:

```nginx
# proxy my-project traffic
location ^~ /my-project/ {
    proxy_pass http://127.0.0.1:4201/;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_http_version 1.1;
    proxy_cache_bypass $http_upgrade;
}
```

After restarting or reloading your NGINX instance (the simplest way is to run `nginx -s reload`) and starting up your Angular build (`ng serve`), you should be able to navigate to [https://localhost/my-project]() and view your app.

One quick tip: make sure you update the `<base>` tag in your app's `index.html` to point to your app's new home. Continuing the example from above, this tag should look like `<base href="/my-project/">`. If you forget to update your `<base>` tag, you'll end up with a blank screen and a lot of confusing errors in your developer tools.

## 3. Proxy live reload traffic

This is the most important step. The live reload feature of Angular 2+ communicates on the path [https://domain:port/sockjs-node/](), so we need to forward along this traffic as well:

```nginx
 # proxy traffic for ng serve live reload
location ^~ /sockjs-node/ {
    proxy_pass http://127.0.0.1:4201;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_http_version 1.1;
    proxy_cache_bypass $http_upgrade;
}
```

You'll need to restart or reload your NGINX instance again after making these changes.

## 4. Profit

Refresh your app. With your app on one screen and your editor on the other, make a change to a source file and hit <span class="keyboard-key">Ctrl</span>+<span class="keyboard-key">S</span>. Your app will refresh just like it did in pre-NGINX days!

<figure>
    <img src="{{ 'assets/img/live-reloading-an-angular-2-app-behind-nginx/pacman.jpg' | relative_url }}" alt="An NGINX G acting like Pacman, about to eat the Angular logo" />
    <figcaption>... wakka wakka wakka wakka wakka wakka wakka wakka...</figcaption>
</figure>

## A caveat

The observant reader will notice that the [/sockjs-node/]() NGINX proxy above is hardcoded to `127.0.0.1:4201`, which will only work for one app - the app hosted at port 4201. What if you have multiple Angular 2+ apps on the go? In this case, your NGINX proxies would look something like this:

```nginx
# proxy my-project-1 traffic
location ^~ /my-project-1/ {
    proxy_pass http://127.0.0.1:4201/;
    # etc...
}

# proxy my-project-2 traffic
location ^~ /my-project-2/ {
    proxy_pass http://127.0.0.1:4202/;
    # etc...
}

# proxy my-project-3 traffic
location ^~ /my-project-3/ {
    proxy_pass http://127.0.0.1:4203/;
    # etc...
}
```

All of these apps will attempt to use [/sockjs-node/]() to communicate with their respective `ng serve` live reload server. Unfortunately, our [/sockjs-node/]() NGINX proxy above will only route traffic to _one_ of these apps - meaning you can only use the live reload with one app at a time. In order to start working on a different app, you'll have to manually edit the port in your NGINX config. This is a pain, but it's better than not having live reload at all.

Know a way around this? Let me know in the comments. Or, even better, [answer my question on Stack Overflow.](https://stackoverflow.com/q/50335748/1063392)
