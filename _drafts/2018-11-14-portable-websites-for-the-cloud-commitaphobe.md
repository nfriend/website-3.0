---
layout: post
title:  "Portable Websites for the Cloud Commitaphobe"
date:   2018-11-14 18:18:11 -0300
---

<img src="{{ 'assets/img/teal-deer.svg' | relative_url }}" style="height: 30px; margin-bottom: -10px; margin-right: 3px;" />tl;dr: I rebuilt my website (the one you're on now) using Docker and NPM.  Now I can move it to a new cloud provider in about 15 minutes.  [Here's the source](https://github.com/nfriend/website-3.0-docker).

<hr />

As a software engineer, I get a _lot_ of free trials for cloud platforms like [AWS](https://aws.amazon.com/), [Azure](https://azure.microsoft.com/en-us/), [Digital Ocean](https://www.digitalocean.com/), and [Google Cloud](https://cloud.google.com/).  This, combined with a rather dominant personality streak of stinginess, means I move my personal website around... a _lot_.  Over the last several years, my website has lived at:

- My university's web server
- AWS
- Digital Ocean
- Back to AWS
- Azure
- Back to AWS
- Back to Azure
- Back to AWS

For a majority of these moves, the process of switching cloud providers was _painful_. My server was a mess of custom Apache configurations and required just the right mix of PHP extensions and Node versions to function properly.  And of course, each time I finished moving my site, I immediately forgot all of the steps and gotchas, leaving me to rediscover the entire process the next time around.

Finally, I decided to get my act together and build a (mostly) automated process for moving my website from one cloud provider to another.  I had just discovered [Docker](https://www.docker.com/) through a work project and was fascinated with how easy it made spinning up new infrastructure.  I decided to take the plunge and rebuild my server using Docker containers.  Below is a brief description of the process; you can also view [the source of this setup on GitHub](https://github.com/nfriend/website-3.0-docker).

## Dockerize everything

The first step involved refactoring each of my side [projects](/projects) to run in their own, dedicated container.  I was a little worried that getting some of my ancient PHP and MySQL projects to run in a modern Docker container would be difficult, but in fact it was surprisingly straight-forward.

### Let's Encrypt

Perhaps the trickiest part was 

## (Ab)Use NPM as a build artifact store

Content about using NPM to store build artifacts here.

Is there a better way to do this?  Almost certainly.  But this process is infinitely better than what I was doing before.  Previously, moving my server was an all-day ordeal.  Now, I can switch cloud providers in under 15 minutes (I've timed myself).