---
layout: post
title:  "Smart Date Searching With Solr"
date:   2017-06-26 11:29:29 -0300
image:  assets/img/smart-date-searching-with-solr/solar-date.jpg
---

<img src="{{ 'assets/img/teal-deer.svg' | relative_url }}" style="height: 30px; margin-bottom: -10px; margin-right: 3px;" />TL;DR : I created a custom Solr filter that allows for more natural date searching.  [Here's the source](https://github.com/nfriend/toolbox/tree/master/NfDateFilter).

<hr />

Out of the box, [Solr](http://lucene.apache.org/solr/) comes with some pretty powerful date-searching capabilities.  For example, say you wanted to find records from the beginning of time until August 19, 1976.  Easy:

```
my_date_field:[* TO 1976-08-20T00:00:00}
```

Or maybe you only want records from last week?

```
my_date_field:[NOW-7DAY/DAY TO NOW]
```

<figure>
    <img src="{{ 'assets/img/smart-date-searching-with-solr/solar-date.jpg' | relative_url }}" alt="Two people on a date by the beach at sunset" />
    <figcaption>Solar dating.</figcaption>
</figure>

But what if you wanted to find all records with a date in the month of March?  Or on a Tuesday?  Or every July 4<sup>th</sup>?

Solr's default date-searching abilities can't handle specific queries like this.  Fortunately, there are a couple of ways around this.

## Option 1: Break dates into more consumable chunks

There's no reason you can't create more fields in your Solr core that present the same data in a friendlier format.  Afterall, denormalization is the whole point of Solr!

Say you have a field like this:

```xml
<!-- stores a person's date of birth (DOB) -->
<field name="dob" type="pdate" indexed="true" stored="true" />
```

By adding a new field for each "chunk" of data we want to search:

```xml
<!-- stores a person's date of birth (DOB) -->
<field name="dob" type="pdate" indexed="true" stored="true" />

<field name="dob_day" type="pint" indexed="true" stored="true" />
<field name="dob_month" type="pint" indexed="true" stored="true" />
<field name="dob_year" type="pint" indexed="true" stored="true" />
<field name="dob_day_of_week" type="string" indexed="true" stored="true" />
```

...you'll end up with a Solr core that can answer some pretty specific questions:

_Fetch all people born on Christmas, when Christmas fell on a Sunday:_

```
dob_month:12 AND dob_day:25 AND dob_day_of_week:sunday
```

_Find everyone born on a Tuesday in July during the 70's:_
```
dob:[1970-01-01T:00:00:00Z TO 1980-01-01T:00:00:00Z} AND
dob_day_of_week:tuesday AND
dob_month:7
```

With raw querying power like this, it's important to remember: it's not whether or not you *should*, it's whether or not you *can*.

<figure>
    <img src="{{ 'assets/img/smart-date-searching-with-solr/jurassic-park.jpg' | relative_url }}" alt="The Jurassic Park logo" />
    <figcaption>I mean, it worked out for these guys in the end.</figcaption>
</figure>

### But it's not perfect...

This solution has a couple of drawbacks:

1. Users of your new Solr core will now have a lot of homework to do before they submit data to your core.  They'll need to preprocess their dates, adding the additional chunks that you require.  Essentially, you've offloaded some of indexing work to your clients - and this logic will need to be rewritten for _each_ client that submits data to your Solr core.
2. Consumers of your Solr instance will need to be aware of which field to query.  An intuitive query like `dob:tuesday` won't work.

This brings us to option #2...

## Option 2: Create a custom Solr filter

If you're new to Solr, this suggestion may seem a bit extreme, but [Solr actually has very robust customization support](https://lucene.apache.org/solr/guide/6_6/solr-plugins.html).  I won't say that it's _easy_ - there are a lot of moving pieces, and a familiarity with Java development is required - but the process is sane once you've climbed the learning curve.

The upside of this solution is that it provides near limitless flexibility.  Custom filters allow you to intercept the indexing (or query analysis) process, giving you fine-grained control over how Solr breaks down your input into tokens.

Several months ago, I took the dive and created a custom Solr filter that allows dates to be searched like `dob:june` or `dob: 06`.  Without further ado, [here's the custom filter's source code](https://github.com/nfriend/toolbox/tree/master/NfDateFilter).

Here's the general idea:

- When indexing a field that uses my custom filter, Solr passes the string representation of the date (like `2018-06-26`) to my filter.
- The custom filter parses the date into a [regular Java `Date` object](https://docs.oracle.com/javase/8/docs/api/java/util/Date.html).
- Based on the date's month, I add a number of commonly-used abbreviations (like "january", "jan", or "01") to the list of tokens that users can use to pull up this record.
- A few other nice-to-have tokens are conditionally added. For example, dates with years like "1998" are augmented with a "98" token.

To use this filter, I add a reference to my `.jar` file in my core's `solrconfig.xml`:

```xml
<config>
  <lib path="${solr.install.dir:../../../..}/server/solr/cores/NfDateFilter.jar" />
</config>
```

... and define a Solr field in my core's `managed-schema` that uses this filter at index time:

```xml
<fieldType name="text_date" class="solr.TextField">
    <analyzer type="index">
        <tokenizer class="solr.WhitespaceTokenizerFactory"/>
        <filter class="io.nathanfriend.solr.NfDateFilterFactory"/>
    </analyzer>
    <analyzer type="query">
        <tokenizer class="solr.StandardTokenizerFactory"/>
        <filter class="solr.LowerCaseFilterFactory"/>
    </analyzer>
</fieldType>
```

Now any field that uses the `text_date` type can be searched in a more natural, human way:

```
my_date_field:jan
```

<figure>
    <img src="{{ 'assets/img/smart-date-searching-with-solr/solar-filters.jpg' | relative_url }}" alt="The Jurassic Park logo" />
    <figcaption>You can purchase solar filters like these in the <a href="https://amzn.to/2rsqAWq" style="cursor: pointer">NfDateFilter merchandise store!</a></figcaption>
</figure>

### Some caveats

- This filter requires that clients send their data to Solr in a very specific format: `yyyy-MM-dd`.  If the filter encounters a date string that deviates from this format, [it throws an exception](https://github.com/nfriend/toolbox/blob/master/NfDateFilter/NfDateFilter.java#L59).
- In its current form, this filter only allows for English month abbreviations.
- The filter doesn't allow for searching against the day of the week (i.e. "Tuesday" or "Friday"), although this would be trivial to add.

<hr />

Some related links:
- This very helpful pair of articles that describe the process of creating a custom Solr filter from scratch: [Part 1](https://solr.pl/en/2012/05/14/developing-your-own-solr-filter/) and [Part 2](https://solr.pl/en/2013/02/04/developing-your-own-solr-filter-part-2/)
- [This Stack Overflow question & answer](https://stackoverflow.com/a/40760407/1063392), which helped me understand the difference between the `DateRangeField` type and the non-range date types (`TrieDateField` and `DatePointField`), as well as how to use curly brackets (`{` and `}` ) in date range queries
- [Working with Dates](https://lucene.apache.org/solr/guide/6_6/working-with-dates.html), Solr's own guide on date indexing and searching