---
layout: post
title:  Shell-ing With TypeScript
date:   2019-06-17 04:59:12 -0300
image:  assets/img/shelling-with-typescript/sdfasdf.png
---

If you're like me, most of your time writing command-line utilities in a language like [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) or [DOS Batch](https://en.wikipedia.org/wiki/Batch_file) is spent Googling basic things like "how to loop in bash" while grumbling to yourself how easy this would be in a sane language like [TypeScript](https://www.typescriptlang.org/).  

Fortunately, you can, using a cool project called [ts-node](https://github.com/TypeStrong/ts-node)!  And it's not even that hard.  Here's how:

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

Then, do some TypeScript-y stuff:

```ts
#!/usr/bin/env ts-node

console.log('Hello, TypeScript!');
```

## 3. Make your script runnable

After saving your TypeScript file, you'll need to update its permissions to allow the file to be executed:

```bash
sudo chmod u+x ./my-shell-script.ts
```

## 4. Run your TypeScript script

You can now run the script as you would any other command-line utility:

```bash
> ./my-shell-script
```

You'll be greeted with a friendly message from TypeScript:

```bash
> ./my-shell-script
Hello, TypeScript!
```

## 5. Prove to yourself that it's working

That seemed a bit easy - shoudn't there be a intermediate build step in there somewhere?  Let's try updating our `.ts` file with something that _shouldn't_ compile:

```ts
#!/usr/bin/env ts-node

console.log('Hello, TypeScript!');

var myStr: string = 4;
```

