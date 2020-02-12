---
layout: post
title: My GitLab Contributions in a 🥜
author:
    name: Nathan Friend
    url: https://nathanfriend.io
hideTimeToRead: true
hideComments: true
hideMorePosts: true
image: assets/img/gitlab-contributions/gitlab-logo.jpg
---

One of the coolest things about working at [GitLab](https://about.gitlab.com/)
is that [_every_ line of code I write is source-available, and most of it is
open
source.](https://about.gitlab.com/blog/2016/07/20/gitlab-is-open-core-github-is-closed-source/)

<figure markdown="1">
![The GitLab logo](assets/img/gitlab-contributions/gitlab-logo.jpg)
</figure>

As a result, my public contributions to GitLab serve as an unusually detailed
record of my professional work:

-   [All merge requests authored by
    me](https://gitlab.com/gitlab-org/gitlab/-/merge_requests?scope=all&utf8=%E2%9C%93&state=merged&author_username=nfriend)
-   [All issues opened by
    me](https://gitlab.com/gitlab-org/gitlab/issues?author_username=nfriend&scope=all&sort=created_date&state=all&utf8=%E2%9C%93)
-   [All commits authored by me _(coming
    soon)_](https://gitlab.com/gitlab-org/gitlab/issues/14984)
-   [My recent GitLab.com activity](https://gitlab.com/users/nfriend/activity)

Below are some of the highlights of my time at GitLab, complete with links to
all the nitty-gritty details.

## Merge trains

One of the most interesting features I helped build during my first year at
GitLab is [merge
trains](https://docs.gitlab.com/ee/ci/merge_request_pipelines/pipelines_for_merged_results/merge_trains/),
a conceptually simple feature with a _lot_ of behind-the-scenes complexity. I
wrote the majority of the frontend code for this feature; here's a list of all
the merge train-related merge requests I put together:

-   [!21572: Add example of .gitlab-ci.yml that uses only: [merge_requests] and
    excludes specific
    branches](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/21572){:target="\_blank"
    rel="noopener noreferrer"}
-   [!21556: Show "merge immediately" dialog when MR's pipeline has not yet
    finished](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/21556)
-   [!21060: Add documentation for new "merge immediately" workflow for merge
    trains](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/21060)
-   [!20054: Add warning dialog when users click "Merge immediately" merge train
    option](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/20054)
-   [!15535: Resolve "Rename \`ATMTWPS\` to \`MTWPS\` in
    code"](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/15535)
-   [!14894: Fix the merge button
    dropdown](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/14894)
-   [!14097: Add merge train helper text to merge request
    widget](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/14097)
-   [!14064: Add merge train position
    indicator](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/14064)
-   [!12156: Update the merge request widget's "Merge" button to support merge
    trains](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/12156)
-   [!10803: Add "Allow merge trains" option to project settings
    page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/10803)

## GitLab Pages + Let's Encrypt

This feature was particularly fun to develop since I was part of the target
audience!

-   [!26438: Add Let's Encrypt option in Pages domain new/edit Haml
    form](https://gitlab.com/gitlab-org/gitlab-foss/-/merge_requests/26438)

## Releases page

Since I'm a part of the [Release Management
group](https://about.gitlab.com/handbook/product/categories/#release-management-group),
it should come as no surprise that I spend a _lot_ of time modifying the
[**Releases** page](https://docs.gitlab.com/ee/user/project/releases/).

### Associating Releases to Milestones

[As of GitLab 12.5, Releases can be associated with one or more
Milestones.](https://docs.gitlab.com/ee/user/project/releases/#releases-associated-with-milestones)
Developing this feature involved lots of small changes throughout the codebase:

-   [!16558: Add Release Links to Milestone List
    Page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/16558)
-   [!16562: Add milestones to release
    blocks](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/16562)
-   [!17091: Update release blocks to support multiple
    milestones](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/17091)
-   [!17150: Allow release blocks to be scrolled to using URL anchor
    tags](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/17150)
-   [!32360: Add \`id\` attribute to release
    blocks](https://gitlab.com/gitlab-org/gitlab-foss/-/merge_requests/32360)
-   [!17278: Add links to associated release(s) to the milestone detail page
    sidebar](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/17278)
-   [!19581: Document Milestone <> Release
    feature](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/19581)

### Allow Releases to be created and edited through the UI

When I joined GitLab, Releases could only be created or modified using the
[Release API](https://docs.gitlab.com/ee/api/releases/#create-a-release). This
(still ongoing!) effort helped make Releases simpler to use:

-   [!18033: Add "Edit Release"
    page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/18033)
-   [!18411: Add "edit" button to release blocks on Releases
    page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/18411)
-   [!19226: Update release blocks to look for correct property name in API
    response](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/19226)
-   [!19321: Update "Tag name" help text on Edit Release
    page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/19321)
-   [!19595: Add documentation for new "edit release"
    feature/page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/19595)
-   [!20075: Update "Edit release" page feature flag to be enabled by
    default](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/20075)
-   [!21425: Update the "Edit release" feature's version from 12.5 to 12.6 in
    the
    documentation](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/21425)
-   [!21767: Remove the `:release_search_filter` feature
    flag](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/21767)
-   [!23810: Remove test that references`release_edit_page` feature
    flag](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/23810)

### Add a "dedicated" Release page

Originally, the only way to view GitLab Releases was on the **Releases** page,
which showed _all_ Releases for a given project. This feature added a new page —
a **Release** page — that displayed a Release individually:

-   [!23792: Create backend route for dedicated Release
    page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/23792)
-   [!23816: Make titles on the Releases page link to dedicated Release
    page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/23816)
-   [!23896: Add "self" link to Release API
    response](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/23896)

### Releases page upgrades

Some modification to make the **Releases** page more valuable:

-   [!19451: Move release meta-data into footer on Releases
    page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/19451)
-   [!19448: Add issue stats to release blocks on the Releases
    page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/19448)

### Release searching

As part of our effort to make Releases more useful, we added the ability to
search for issues and merge requests by Release:

-   [!18761: Add "release" filter to issue
    search](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/18761)
-   [!19315: Add "release" filter to merge request
    search](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/19315)
-   [!19951: Update documentation for new "Release:"
    filter](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/19951)
-   [!20076: Update release search filter feature flag to be enabled by
    default](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/20076)

## Quality of life

Every once in a while I step outside the boundaries of the Release Management
group and fix something that bugs me:

-   [!20738: Add \`pngquant:compress\` and \`pngquant:lint\` rake
    tasks](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/20738)
-   [!16545: Suppress AJAX errors caused by browser
    navigation](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/16545)
-   [!27683: Make pipeline failure Slack notifications prettier and more
    informative](https://gitlab.com/gitlab-org/gitlab-foss/-/merge_requests/27683)
-   [!25925: Add core-js polyfill for
    Promise.finally()](https://gitlab.com/gitlab-org/gitlab-foss/-/merge_requests/25925)
-   [!594: Allow GlTooltip delay to be customized through
    localStorage](https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/594)
