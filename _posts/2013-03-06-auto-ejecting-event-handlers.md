---
layout: post
title:  "Auto-Ejecting Event Handlers"
date:   2013-03-06 18:32:00 -0300
image:  assets/img/auto-ejecting-event-handlers/ejection-seat.jpg
alert:
    info:
        title: Heads up!
        message: This is an old post - it may contain out-of-date information!
---

It's often necessary to remove an event handler once the target event has fired and the handler code has been executed. Most JavaScript libraries provide this functionality stock - for example, jQuery users can make use of the [`.off()`](http://api.jquery.com/off/) function, which takes a string event name (e.g. `"click"` or `"hover"`) and a reference to the victim handler function.

<figure>
    <img src="{{ 'assets/img/auto-ejecting-event-handlers/ejection-seat.jpg' | relative_url }}" alt="A test of a cockpit ejection seat" />
    <figcaption>Self-ejecting event handlers are approximately as exciting as self-ejecting cockpit seats.</figcaption>
</figure>

Unfortunately, obtaining a reference to the original handler function can be tricky. For example, many JavaScript developers choose to code simple event handlers inline, using anonymous functions:

```JavaScript
$("#my-target-element").on("click", function() { alert("This element was clicked"); });
```

How will a developer be able to obtain a reference to this anonymous handler if it needs to be removed in the future? It's actually quite simple. Included in every function execution context is a reference to both the function's calling function and the function itself, via `arguments.caller` and `arguments.callee`, respectively. Using these references, it's easy to have the handler remove itself once it has finished executing:

```JavaScript
$("#my-target-element").on("click", function() {
    alert("This element was clicked");
    // remove itself
    $("#my-target-element").off("click", this.callee);
});
```

**Note:** It's recommended that the usage of arguments.callee be avoided by naming all anonymous handlers and referring to them by name (see the [MDN discussion and explanation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee). The 5th edition of ECMAScript disallows its usage when running in strict mode.

<figure>
    <iframe width="500" height="315" src="https://www.youtube.com/embed/WdmA43T0yag" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <figcaption>A more cinematic demonstration of event handlers ejecting themselves.</figcaption>
</figure>
