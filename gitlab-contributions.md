---
layout: post
title: A Brief History of My GitLab Contributions
author:
    name: Nathan Friend
    url: https://nathanfriend.io
hideTimeToRead: true
hideComments: true
hideMorePosts: true
image: assets/img/gitlab-contributions/gitlab-logo.jpg
---

One of the coolest things about working at [GitLab](https://about.gitlab.com/)
is that _every_ line of code I write is source-available, and most of it
is open source.

<figure markdown="1">
![The GitLab logo](assets/img/gitlab-contributions/gitlab-logo.jpg)
</figure>

As a result, my public contributions to GitLab serve as an unusually detailed
record of the quality and nature of my professional work.

Below are some of the highlights of my time at GitLab, complete with links
to all the nitty-gritty details.

## Merge trains

One of the most interesting feature I helped build during my first year at
GitLab is
[merge trains](https://docs.gitlab.com/ee/ci/merge_request_pipelines/pipelines_for_merged_results/merge_trains/),
a conceptually simple feature with a _lot_ of behind-the-scenes complexity.
I wrote the majority of the frontend code for this feature; here's a list
of all the merge train-related merge requests I put together over the last year:

-   [!21572: Add example of .gitlab-ci.yml that uses only: [merge_requests] and excludes specific branches ](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/21572){:target="\_blank" rel="noopener noreferrer"}
-   [!21556: Show "merge immediately" dialog when MR's pipeline has not yet finished](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/21556)
-   [!21060: Add documentation for new "merge immediately" workflow for merge trains](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/21060)
-   [!20054: Add warning dialog when users click "Merge immediately" merge train option](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/20054)
-   [!15535: Resolve "Rename \`ATMTWPS\` to \`MTWPS\` in code"](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/15535)
-   [!14894: Fix the merge button dropdown](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/14894)
-   [!14097: Add merge train helper text to merge request widget](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/14097)
-   [!14064: Add merge train position indicator](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/14064)
-   [!12156: Update the merge request widget's "Merge" button to support merge trains](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/12156)
-   [!10803: Add "Allow merge trains" option to project settings page](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/10803)
