---
title: 'Usage Meter: your Claude and ChatGPT limits in the menu bar'
description: 'A free macOS menu bar app that shows how much of your Claude and ChatGPT plan is left, and warns you before you run out.'
draft: true
---

<!--
Product page /usage-meter. Each "## Heading {#id}" is a section of the page: the code
between braces says where it goes, the text is what visitors see. Keep the codes.
Lists of links become buttons (the first is the main one). Title and description
above are the browser tab and the text when the page is shared.
-->

## Header {#header}

- [How it was designed](/projects/usage-meter/)
- [GitHub](https://github.com/josbez/claude-usage)

## How much of your plan is left, at a glance. {#hero}

Usage Meter shows your Claude and ChatGPT limits in the macOS menu bar, and warns you before you run out. So you never hit a limit halfway through a task.

- [Download for macOS](https://github.com/josbez/claude-usage/releases/latest/download/ClaudeUsage.dmg)
- [View source](https://github.com/josbez/claude-usage)

Free and open source · macOS 11 or later · Apple Silicon and Intel

## A face you notice, not a number you read. {#faces}

The face in the menu bar changes as your session fills up. A rocket means go. A skull means wait for the reset. Prefer something quieter? Switch to a monochrome ring that only takes on colour from 75%.

## Everything you need to know. Nothing else. {#features}

### Both limits, at a glance

The five-hour session and the weekly cap, each with the time it resets. The menu bar shows the source closest to a limit.

### Claude and ChatGPT

One card per plan, side by side. Use one, use both: a source you don’t use can be hidden.

### Pace, not just a percentage

The weekly bar shows how much of the week has passed behind how much you have used. Usage ahead of time means you’re spending fast.

### Warnings that matter

A notification at 80% and 95% of the session and 90% of the week. Once per window, never twice. You hear when a limit resets only if you were warned.

## Make it yours. {#settings}

Show everything in the menu bar, just the session, or only the icon. Pick the ring or the face, light or dark, and refresh every 1, 5 or 15 minutes. Behind the gear, out of the way until you need it.

## Private by design. {#privacy}

- Talks only to claude.ai, status.claude.com and GitHub.
- Uses the Claude desktop app’s existing sign-in. There is nothing to log in to.
- ChatGPT limits come from the Codex program on your Mac. Its sign-in is never read.
- Reads usage numbers, never your conversations.
- Usage history stays on your Mac. No account, no analytics, no tracking.

## Install in a minute. {#install}

1. [Download the app](https://github.com/josbez/claude-usage/releases/latest/download/ClaudeUsage.dmg) and open the disk image.
2. Drag **Usage Meter** to **Applications**.
3. Open Terminal and run: `bash "/Volumes/Usage Meter/install.sh"`
4. When the Keychain asks about _Claude Safe Storage_, choose **Always Allow**. Your numbers appear within seconds.

Needs macOS 11 or later and the [Claude desktop app](https://claude.ai/download), signed in. For the ChatGPT card: the ChatGPT app with Codex, or Codex, signed in.

## Questions. {#faq}

### Is this an official Anthropic or OpenAI app?

No. Usage Meter is an independent, open-source project. It is not affiliated with or endorsed by Anthropic or OpenAI.

### Why do I need to run a Terminal command?

The app is not notarized by Apple, so macOS blocks the first launch. The install script removes that block and makes Usage Meter start at login. Prefer to do it by hand? Open the app, then go to System Settings → Privacy & Security and click Open Anyway.

### Why does the Keychain ask about “Claude Safe Storage”?

That is where the Claude desktop app keeps the key to its sign-in. Usage Meter needs it to ask claude.ai for your usage numbers. Choose Always Allow so it doesn’t ask again.

### Do I need ChatGPT?

No. Without it you simply see the Claude card. The ChatGPT card appears when the ChatGPT app with Codex, or Codex itself, is installed and signed in.

### How does it update?

When there is a new version, the gear in the popover gets an orange dot. Open settings and click Update. Every update is signed, and the app refuses one without a valid signature.

### How do I uninstall it?

Settings → Uninstall…. It removes the app, its files and the login item.

## Know when you can keep going. {#final}

- [Download for macOS](https://github.com/josbez/claude-usage/releases/latest/download/ClaudeUsage.dmg)
- [View source](https://github.com/josbez/claude-usage)

Free and open source · MIT license

## Footer {#footer}

Made by [Jos Bezemer](/). [Read how it was designed →](/projects/usage-meter/)

Not affiliated with Anthropic or OpenAI. Claude is a trademark of Anthropic; ChatGPT is a trademark of OpenAI.
