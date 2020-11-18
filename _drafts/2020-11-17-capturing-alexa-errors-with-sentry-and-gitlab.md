---
layout: post
title: 'Capturing Alexa Errors with Sentry and GitLab'
date: 2020-11-16 13:36:10 -0300
image: assets/img/capturing-alexa-errors-with-sentry-and-gitlab/uh-oh.jpg
---

Diagnosing issues with a live Alexa skill can be tricky.

<figure>
    <img src="{{ 'assets/img/capturing-alexa-errors-with-sentry-and-gitlab/uh-oh.jpg' | relative_url }}" alt="The Amazon Echo logo with a speech bubble saying &quot;Uh oh&quot;" />
</figure>

Most users who run into issues will simply uninstall your skill. A few unusually
inspired users may even leave helpful reviews like this:

<figure>
    <img class="bordered" src="{{ 'assets/img/capturing-alexa-errors-with-sentry-and-gitlab/this-skill-is-broken.png' | relative_url }}" alt="An Amazon review that says &qout;This skill is broken&qout;" />
</figure>

How do you go about figuring out what's wrong?

By plugging a few open source tools together, you can get great visibility into
what's going wrong.

## 1. Implement an `ErrorHandler` in your skill code

First, you'll need a way to globally catch errors in your Alexa skill. The ASK
SDK provides an `ErrorHandler` interface that does just this. Create a new file
for your `ErrorHandler` implementation:

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

    const speech = 'Sorry, something went wrong! Can you please try again?';

    return handlerInput.responseBuilder
      .speak(speech)
      .reprompt(speech)
      .getResponse();
  }
}
```

(I'm using [TypeScript](https://www.typescriptlang.org/) in this example, but a
vanilla JS implementation shouldn't be much different.)

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

This already gets you pretty close! If anything goes wrong, you'll have a nice
stack trace in your [CloudWatch](https://aws.amazon.com/cloudwatch/) logs, and
the user will get a polite message informing them something went wrong.

## 2. Ship error details to Sentry

[Sentry](https://sentry.io/welcome/) is an open source monitoring platform that
does a great job of tracking and organizing software errors.

After creating a free account at [https://sentry.io](https://sentry.io/), create
a new Sentry project with the "Node.js" platform option. Install the
dependencies it recommends:

```bash
yarn add @sentry/node @sentry/tracing
```

Next, set up `@sentry/node` with the tracking info it needs. You can do this at
the beginning of every Alexa request by creating a new [request
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

(Your [Sentry DSN](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)
will be provided to you when setting up your Sentry project.)

Don't forget to register this interceptor, similar to how you registered your
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

Finally, in the error handler you created earlier, send the error to Sentry:

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

    const speech = 'Sorry, something went wrong! Can you please try again?';

    return handlerInput.responseBuilder
      .speak(speech)
      .reprompt(speech)
      .getResponse();
  }
}
```

That's it! Now all that's left is to...

## 3. Test it!

In your `LaunchRequest` handler, do something silly like this:

```ts
const anObject: any = {};
anObject.aMethodThatDoesntExist();
```

(I'm explicitly specifying `any` here, otherwise TypeScript won't let me get
away with this!)

Deploy your skill and give it a spin!

```bash
❯ ask dialog
User  > Open <your skill name here>
Alexa > Sorry, something went wrong! Can you please try again?
```

Jump back into your Sentry project - you should now be the proud owner of a new
issue:

<figure>
    <img class="bordered" src="{{ 'assets/img/capturing-alexa-errors-with-sentry-and-gitlab/sentry-screenshot.png' | relative_url }}" alt="A screenshot of the Sentry dashboard with a new issue" />
</figure><br>

## 4. Integrate Sentry with GitLab _(optional)_

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
set of Sentry errors nicely displayed inside your GitLab project.

<figure>
    <img class="bordered" src="{{ 'assets/img/capturing-alexa-errors-with-sentry-and-gitlab/gitlab-error-tracking-screenshot.png' | relative_url }}" alt="A screenshot of GitLab's Error Tracking page showing an issue's details" />
</figure><br>

## Source

See this code in action at
[https://gitlab.com/nfriend/days-until](https://gitlab.com/nfriend/days-until),
or give my [Days Until](https://www.amazon.com/dp/B0759KJ8D2) skill a try for
yourself.
