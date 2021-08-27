---
layout: post
title: Herding Gits
date: 2021-08-26 19:42:44 -0400
image: assets/img/herding-gits/git-mosaic.png
---

Juggling multiple Git identities can be tricky.

<figure>
    <img src="{{ 'assets/img/herding-gits/git-mosaic.png' | relative_url }}" alt="A screenshot of the Git logo" />
</figure>

For example, at [Stripe](https://stripe.com/), we encourage developers to create
a separate GitHub account for Stripe-related open source activity. For me, this
means I now own both a [`nfriend`](https://github.com/nfriend/) _and_ a
[`nfriend-stripe`](https://github.com/nfriend-stripe/) GitHub profile.

While setting up my dev environment, I had a few goals:

- Use both Git identities on the same machine
- Sign commits with separate GPG keys
- Connect to remotes using different SSH keys
- Have all of this 👆 happen automatically without me having to think about it

**Good news!** This is possible with a little `.gitconfig` magic ✨

## The setup

_Note: The instructions below rely on Git's [conditional
includes](https://git-scm.com/docs/git-config#_conditional_includes), which are
only available in Git 2.13 and beyond._

### 1. Set up separate SSH and GPG keys for each identity

I won't go into details since this is already covered in great detail by other
tutorials. GitHub's tutorials are particularly well-presented:

- [Generating a new SSH key and adding it to the
  ssh-agent](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Signing
  commits](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/signing-commits)

### 2. Create separate directories for each identity

For example, a `~/github-personal` and a `~/github-work` directory.

### 3. Create a `.gitconfig_include` file in each

Inside each of these new directories, create a new file named
`.gitconfig_include` with the following content:

```ini
[user]
  name = Your Name
  email = your-name@example.com
  signingkey = 0123456789ABCDEF

[core]
  sshCommand = ssh -i ~/.ssh/id_rsa_example -F /dev/null
```

Update each file with the name, email, and signing key for the corresponding Git
identity.

Additionally, update the command in the `sshCommand` option to reference the
appropriate key file.

### 4. Reference these files from the global `.gitconfig`

In your global `.gitconfig` (i.e. `~/.gitconfig`), configure Git to
conditionally include the correct `.gitconfig_include` file based on the current
directory:

```ini
[includeIf "gitdir:~/github-personal/"]
  path = ~/github-personal/.gitconfig_include

[includeIf "gitdir:~/github-work/"]
  path = ~/github-work/.gitconfig_include
```

### 5. Test it!

Create a test project with both identities. Ensure you can:

1. Clone the repository from the remote
1. Make a commit
1. Push the commit to the remote

If you're using a web UI like GitLab or GitHub, check to see that your commits
are being signed correctly and are labeled as "Verified":

<figure>
    <img src="{{ 'assets/img/herding-gits/commit-verified.png' | relative_url }}" alt="A screenshot of GitLab showing a 'Verified' label next to a commit" />
</figure>
<br />

## Helpful links

Some things I found helpful while setting this up:

- Setting `.gitconfig` settings on a per-directory basis:
  [https://stackoverflow.com/a/48088291/1063392](https://stackoverflow.com/a/48088291/1063392)
- Using Git's `core.sshCommand` configuration to select an SSH key:
  [https://superuser.com/a/912281/144803](https://superuser.com/a/912281/144803)

## Feedback

Thoughts? Let me know in [this GitLab
issue](https://gitlab.com/nfriend/website-3.0/-/issues/7)!
