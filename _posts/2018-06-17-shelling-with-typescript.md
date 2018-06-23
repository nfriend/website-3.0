---
layout: post
title:  "Shell-ing With TypeScript"
date:   2018-06-17 04:59:12 -0300
image:  assets/img/shelling-with-typescript/shebang.jpg
---

<figure>
    <img src="{{ 'assets/img/shelling-with-typescript/shebang.jpg' | relative_url }}" alt="The shebang text for running scripts using ts-node." />
    <figcaption>Here's a TL;DR for my future self when I inevitably forget the correct shebang to use.</figcaption>
</figure>If you're like me, most of your time writing [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) scripts is spent Googling basic things like "how to loop in bash" while grumbling to yourself how easy this would be in a sane language like [TypeScript](https://www.typescriptlang.org/).

As it turns out, you _can_ write shell scripts using TypeScript, and it isn't even that hard!  Here's how:

## 1. Install dependencies

If you haven't already, download and install [node](https://nodejs.org/).

After node is installed, install both [TypeScript](https://www.npmjs.com/package/typescript) and [ts-node](https://www.npmjs.com/package/ts-node) globally using `npm`:

```bash
npm install typescript ts-node -g
```

## 2. Write your shell script in TypeScript

Create a new `.ts` file with a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) as its first line that points to `ts-node`:

```ts
#!/usr/bin/env ts-node
```

Then, add some TypeScript-y stuff:

```ts
#!/usr/bin/env ts-node

console.log('Hello from TypeScript!');
```

## 3. Make your script runnable

After saving your TypeScript file, you'll need to update its permissions to allow it to be executed:

```bash
chmod u+x your-shell-script.ts
```

## 4. Run your TypeScript file

You can now run the script as you would any other command-line utility:

```bash
> ./your-shell-script.ts
```

...which should result in a friendly message in your terminal:

```bash
> ./my-shell-script
Hello from TypeScript!
```

## 5. Prove to yourself that it's working

That seemed a bit too easy - shouldn't there be an intermediate build step in there somewhere?  As a sanity check, update your `.ts` file with something that _shouldn't_ compile:

```ts
#!/usr/bin/env ts-node

console.log('Hello from TypeScript!');

// TypeScript compiler error:
// Type '4' is not assignable to type 'string'.
var myStr: string = 4;
```

Rerunning your script will now result in something like this:

```bash
/Users/nathanfriend/.nvm/versions/node/v7.10.0/lib/node_modules/ts-node/src/index.ts:250
    return new TSError(diagnosticText, diagnosticCodes)
           ^
TSError: ⨯ Unable to compile TypeScript:
test.ts(5,5): error TS2322: Type '4' is not assignable to type 'string'.

    at createTSError (/Users/nathanfriend/.nvm/versions/node/v7.10.0/lib/node_modules/ts-node/src/index.ts:250:12)
    at getOutput (/Users/nathanfriend/.nvm/versions/node/v7.10.0/lib/node_modules/ts-node/src/index.ts:358:40)
    at Object.compile (/Users/nathanfriend/.nvm/versions/node/v7.10.0/lib/node_modules/ts-node/src/index.ts:546:11)
    at Module.m._compile (/Users/nathanfriend/.nvm/versions/node/v7.10.0/lib/node_modules/ts-node/src/index.ts:430:43)
    at Module._extensions..js (module.js:580:10)
    at Object.require.extensions.(anonymous function) [as .ts] (/Users/nathanfriend/.nvm/versions/node/v7.10.0/lib/node_modules/ts-node/src/index.ts:433:12)
    at Module.load (module.js:488:32)
    at tryModuleLoad (module.js:447:12)
    at Function.Module._load (module.js:439:3)
    at Function.Module.runMain (module.js:605:10)
```

This is good!  You shouldn't be able to run a TypeScript file if it contains compile-time errors.

### So where is that compile step?

There isn't one!  Well, not one that you have to explicitly run, anyway.  This is the magic of [ts-node](https://www.npmjs.com/package/ts-node) - it compiles and runs TypeScript files _on the fly_ much like regular node runs JavaScript files.