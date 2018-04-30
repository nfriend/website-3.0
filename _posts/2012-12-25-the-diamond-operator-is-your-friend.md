---
layout: post
title:  "The Diamond Operator Is Your Friend"
date:   2012-12-25 02:49:32 -0300
alert:
    info:
        title: Heads up!
        message: This is an old post - it may contain out-of-date information!
---

Java 7 introduced a new operator - `<>` - referred to as the "diamond" operator. This new keystroke-saving syntax allows you to maintain the benefits of compile-time generics without typing out long strings of redundant type parameters. Prior to Java 7, creating and initializing a variable with nested type parameters was an arduous task:

```Java
HashMap<TreeSet<TreeMap<String, Integer>>, Double> myTerribleDataStructure =
    new HashMap<TreeSet<TreeMap<String, Integer>>, Double>();
```

The diamond operator greatly simplifies this unnecessary complexity. The following is semantically identical to the above example:

```Java
HashMap<TreeSet<TreeMap<String, Integer>>, Double> myTerribleDataStructure = new HashMap<>();
```

Note that this is _not_ the same as:

```
HashMap<TreeSet<TreeMap<String, Integer>>, Double> myTerribleDataStructure = new HashMap();
```

Without the diamond operator, `myTerribleDataStructure` is initialized to the raw `HashMap` type instead of its type-specific counterpart.
