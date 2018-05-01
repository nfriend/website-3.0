---
layout: post
title:  "Beware The Regex Pointer"
date:   2012-12-13 23:18:30 -0300
image:  assets/img/beware-the-regex-pointer/mad-regex.jpg
alert:
    info:
        title: Heads up!
        message: This is an old post - it may contain out-of-date information!
---

<figure>
    <img src="{{ 'assets/img/beware-the-regex-pointer/mad-regex.jpg' | relative_url }}" alt="A regular expression with an angry face in it" />
    <figcaption>Do not feed the wild regex.</figcaption>
</figure>

Those familiar with JavaScript regular expressions will remember that a variety of modifiers can be appended to the end of an object's declaration to make the expression behave in different ways. For example:

```JavaScript
var pattern = /(your pattern here)/i;
```

will match the given pattern in a case insensitive way. One of these modifiers is the _g_ modifier - it tells the object to perform a global search when matching the pattern. When the `string.match(pattern)` method is called, an array of every match in the string is returned (as opposed to just the first match, as is the case when the modifier is omitted). However, this modifier has a tricky catch that is not immediately apparent. If the `.test()` method is called on a regex object created with the _g_ modifier, some strange results can be produced. Take this example:

```JavaScript
var str = "Mississippi";
var pattern = /iss/g;
alert(str.test(pattern));
alert(str.test(pattern));
alert(str.test(pattern));
```

The first two executions of the `.test()` method return `true`, as expected. The third time around, however, this method returns `false`.

Why the seemingly inconsistent behavior? Each JavaScript regex object contains an internal pointer that indicates at what index in the string the object should begin its search. When the `.test()` method successfully finds a match, it moves that pointer to the index of the character directly after the successful match. The next time `.test()` is called, the string is searched again _starting at this index_. If no match is found, the pointer is returned to the beginning of the string. This is probably not the desired behavior when using `.test()`; in most cases it is best to simply remove the _g_ modifier.

<figure>
    <img src="{{ 'assets/img/beware-the-regex-pointer/pointer-dog.jpg' | relative_url }}" alt="A dog of the Pointer breed" />
    <figcaption>A Pointer.  Probably named Regex.</figcaption>
</figure>

_Really_ strange results start cropping up when the same regex object is used to test multiple strings:

```JavaScript
var str1 = "Mississippi";
var str2 = "Kiss me, baby.";
var pattern = /iss/g;
alert(str1.test(pattern));
alert(str2.test(pattern));
```

The first test of `str1` against `pattern` will return `true`, as expected. The second test on `str2` will fail since the internal pointer is no longer set to start at the beginning of its input string; the pointer is now set to 4 since the last successful match was found at indices 0 through 3.  One way to mitigate this pitfall is to manually reset the pointer by explicitly setting the object's `lastIndex` property to 0 between each test. The following code returns `true` for both tests:

```JavaScript
var str1 = "Mississippi";
var str2 = "Kiss me, baby.";
var pattern = /iss/g;
alert(str1.test(pattern));
 
//reset the lastIndex property from 4 (the index of 
//the next character after the last successful match) to 0
pattern.lastIndex = 0;
 
alert(str2.test(pattern));
```