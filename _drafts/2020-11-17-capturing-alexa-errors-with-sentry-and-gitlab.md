---
layout: post
title: 'Capturing Alexa Errors with Sentry and GitLab'
date: 2020-11-16 13:36:10 -0300
image: assets/img/capturing-alexa-errors-with-sentry-and-gitlab/uh-oh.jpg
---

Diagnosing issues with your deployed Alexa skill can be tricky.

<figure>
    <img src="{{ 'assets/img/capturing-alexa-errors-with-sentry-and-gitlab/uh-oh.jpg' | relative_url }}" alt="The Amazon Echo logo with a speech bubble saying &quot;Uh oh&quot;" />
    <figcaption>"Hmm, I don't know that one"</figcaption>
</figure>

Most users who run into issues will simply uninstall your skill. A few unusually
inspired users may even leave helpful reviews like this:

<figure>
    <img class="bordered" src="{{ 'assets/img/capturing-alexa-errors-with-sentry-and-gitlab/this-skill-is-broken.png' | relative_url }}" alt="An Amazon reveiw that says &qout;This skill is broken&qout;" />
</figure>

How do you go about figuring out what's wrong?

Fortunately, by plugging a few open-source tools together, you can get great visiblity into what's going wrong.

## 1. Implement an `ErrorHandler` in your skill code

First, we need a way to globally catch errors in our Alexa skill. The ASK SDK
provides an `ErrorHandler` interface that does just this. Create a new file for
your `ErrorHandler` implementation:

```ts
// lambda/src/handlers/ErrorHandler.ts

import * as Alexa from 'ask-sdk-core';

export class ErrorHandler implements Alexa.ErrorHandler {
  canHandle() {
    // Handle _all_ exceptions
    return true;
  }
  handle(handlerInput: Alexa.HandlerInput, error: Error) {
    console.log(`~~~~ Error handled: ${error.stack}`);

    const speech = 'Sorry, something went wrong! Can please you try again?';

    return handlerInput.responseBuilder
      .speak(speech)
      .reprompt(speech)
      .getResponse();
  }
}
```

(I'm using [TypeScript](https://www.typescriptlang.org/) in this example.)

Next, register this error handler in your skill's entrypoint:

```ts
// lambda/src/index.ts

import * as Alexa from 'ask-sdk-core';
import { ErrorHandler } from './handlers/ErrorHandler';

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(/* ...your request handlers here...  */)
  .addErrorHandlers(new ErrorHandler()) // ← add this
  .lambda();
```

This already gets us pretty close! If anything goes wrong, we'll have a nice
stack trace in CloudWatch, and the user will get a polite message informing them
something went wrong.

## 2. Ship error details to Sentry

[Sentry](https://sentry.io/welcome/) is an open-source monitoring platform that
does a great job of tracking and organizing software errors.

After creating a free account, create a new Sentry project with the "Node.js"
platform option. Install the dependencies it recommends:

```bash
yarn add @sentry/node @sentry/tracing
```

We'll need to set up Sentry with the tracking info it needs on every request. We
can do this by creating a new [request
interceptor](https://developer.amazon.com/blogs/alexa/post/0e2015e1-8be3-4513-94cb-da000c2c9db0/what-s-new-with-request-and-response-interceptors-in-the-alexa-skills-kit-sdk-for-node-js):

```ts
// lambda/src/interceptors/SentryInterceptor.ts

import * as Alexa from 'ask-sdk-core';
import * as Sentry from '@sentry/node';

export class SentryInterceptor implements Alexa.RequestInterceptor {
  async process() {
    Sentry.init({
      dsn: '<your DSN here>',
      tracesSampleRate: 1.0,
    });
  }
}
```

(Your Sentry DSN will be provided to you when setting up your Sentry project.)

Don't forget to register this interceptor, similar to how we registered our
`ErrorHandler` above:

```ts
// lambda/src/index.ts

import * as Alexa from 'ask-sdk-core';
import { ErrorHandler } from './handlers/ErrorHandler';

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(/* ...your request handlers here...  */)
  .addRequestInterceptors(new SentryInterceptor()) // ← add this
  .addErrorHandlers(new ErrorHandler())
  .lambda();
```

Finally, in the error handler we created earlier, send the error to Sentry:

```ts
// lambda/src/handlers/ErrorHandler.ts

import * as Alexa from 'ask-sdk-core';
import * as Sentry from '@sentry/node'; // ← add this

export class ErrorHandler implements Alexa.ErrorHandler {
  canHandle() {
    // Handle _all_ exceptions
    return true;
  }
  handle(handlerInput: Alexa.HandlerInput, error: Error) {
    console.log(`~~~~ Error handled: ${error.stack}`);

    Sentry.captureException(error); // ← also add this

    const speech = 'Sorry, something went wrong! Can please you try again?';

    return handlerInput.responseBuilder
      .speak(speech)
      .reprompt(speech)
      .getResponse();
  }
}
```

That's it! Now all that's left is to...

## 4. Test it!

In your `LaunchRequest` handler, do something silly like this:

```ts
const anObject: any = {};
anObject.aMethodThatDoesntExist();
```

(Explicitly specifying `any` here, otherwise TypeScript won't let us get away
with this!)

Deploy your skill and give it a spin!

```bash
❯ ask dialog
User  > Open my neat skill
Alexa > Sorry, something went wrong! Can please you try again?
```

Jump back into your Sentry project - you should now be the proud owner of a new
issue:

<figure>
    <img class="bordered" src="{{ 'assets/img/capturing-alexa-errors-with-sentry-and-gitlab/sentry-screenshot.png' | relative_url }}" alt="A screenshot of the Sentry dashboard with a new issue" />
</figure><br>

## 3. Integrate Sentry with GitLab _(optional)_

If you host you skill's code on [GitLab](https://about.gitlab.com/) you can take
advantage of GitLab's [first-class Sentry
integration](https://docs.gitlab.com/ee/operations/error_tracking.html) to see
error details directly in your GitLab project:

1. From your GitLab project, navigate to **Settings > Operations**
1. Expand the **Error tracking** section
1. Check the **Active** checkbox
1. Assuming you are using Sentry's hosted solution, enter `https://sentry.io/`
   in the **Sentry API URL** field
1. Paste your Sentry auth token into the **Auth Token** field. To generate an
   auth token in Sentry:
   1. Navigate to your Sentry dashboard
   1. Click the ▼ next to your name and select **API keys**
   1. Click **Create New Token**
   1. Leave the default scopes as they are and click **Create Token**
   1. Copy the big string of gibberish
1. Jump back to GitLab and click **Connect** and select your Sentry project
1. Click **Save changes**

That's it! Navigate to **Operations > Error Tracking**. You should see the same
set of Sentry errors displayed directly inside your GitLab project.

<figure>
    <img class="bordered" src="{{ 'assets/img/capturing-alexa-errors-with-sentry-and-gitlab/gitlab-error-tracking-screenshot.png' | relative_url }}" alt="A screenshot of GitLab's Error Tracking page showing an issue's details" />
</figure><br>

## Source

See this code in action at [https://gitlab.com/nfriend/days-until](https://gitlab.com/nfriend/days-until), or give my
[Days Until](https://www.amazon.com/dp/B0759KJ8D2) skill a try for yourself!
