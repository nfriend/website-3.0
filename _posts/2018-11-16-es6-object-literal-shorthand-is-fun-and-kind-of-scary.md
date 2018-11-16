---
layout: post
title:  "ES6 Object Literal Shorthand Is Fun And Kind Of Scary"
date:   2018-11-16 16:53:36 -0300
image:  assets/img/es6-object-literal-shorthand-is-fun-and-kind-of-scary/object-literal.jpg
---

<figure>
    <img src="{{ 'assets/img/es6-object-literal-shorthand-is-fun-and-kind-of-scary/object-literal.jpg' | relative_url }}" alt="An ES6 object literal with two emojis in it" />
</figure><br />One of the small but important features of ES6 is a shorthand syntax for creating object literals:

```ts
const person = { name, age, height, hairColor };
```

I can only assume this syntax sugar was added to the language because the ECMAScript gods were tired of looking at ES5 code like this: 

```ts
const person = {
    name: name,
    age: age,
    height: height,
    hairColor: hairColor
};
```

This seems like an obvious win - why would you want to write six lines of code when you could just write one?

## The kind of scary part

There's one downside to this syntax that's not immediately obvious.  Let's say you have some code like this:

```ts
getPerson() {
    const height = 182;

    // ... 100 more lines of code ...

    return { name, age, height, hairColor };
}
```

After working with this code a bit, you realize that it's not super clear what unit the `height` variable uses, so you decide to use your editor's auto-refactor feature to rename this variable from `height` to `heightInCm`:

```ts
getPerson() {
    const heightInCm = 182;

    // ... 100 more lines of code ...
```

But wait! By changing the name of an internal variable, you've now changed the _public_ interface of your function! 

```ts
    // ... 100 more lines of code ...

    return { name, age, heightInCm, hairColor };
}

```

If you're not using a compile-safe language like [TypeScript](https://www.typescriptlang.org/), you might forget to update the consumers of this function.  Or even if you _are_ using TypeScript, you might forget to update an HTML template that references this variable name. This has bitten me a few times in the past.

Like I said, it's only _kind_ of scary.