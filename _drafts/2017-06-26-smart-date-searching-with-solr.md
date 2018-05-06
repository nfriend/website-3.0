---
layout: post
title:  "Smart Date Searching With Solr"
date:   2017-06-26 11:29:29 -0300
---

Out of the box, [Solr](http://lucene.apache.org/solr/) comes with some pretty powerful date-searching capabilities.  For example, say you wanted to find records from the beginning of time until August 19, 1976.  Easy:

```
[* TO 1976-08-19]
```

Or maybe you only want records from last week?

```
[NOW-7DAY/DAY TO NOW]
```

But what if you wanted to find all records with a date in the month of March?  Or on a Tuesday?  Or every July 4<sup>th</sup>?




## TODO

- Snappier title
