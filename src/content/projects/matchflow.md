---
title: Matchflow
tagline: A second screen for football that shows how a match is going, not just the score
description: 'A macOS menu bar app that follows your clubs, countries and competitions: the score, a bar that shows who is on top, and the flow of the match one click away.'
publishDate: '2026-10-18'
duration: '2026'
role: Product Designer, built with Claude Code
client: Personal project
isFeatured: true
draft: true
icon:
  src: './images/matchflow/app-icon.png'
  alt: 'Matchflow app icon: a football pitch split in two club colours, with the ball on the front line'
links:
  - text: Download the beta
    href: 'https://github.com/josbez/matchflow/releases/latest/download/Matchflow.dmg'
  - text: Product page
    href: '/matchflow/'
seo:
  title: 'Matchflow: a second screen for football in the macOS menu bar'
  description: 'Case study of Matchflow, a macOS menu bar app that shows the flow of a football match at a glance.'
  image:
    src: './images/matchflow/og.jpg'
    alt: 'Matchflow: follow the match from your menu bar'
---

![The Matchflow popover during Feyenoord – FC Utrecht: one match card with the score, the line "Feyenoord pressing", a momentum chart with bars up and down, links to line-ups and stats, the other matches and the live table.](./images/matchflow/popover-light.png) ![The line-ups page during Netherlands – Serbia: both teams on one pitch with live ratings, goals and cards beside the players, and the substitutes with who they replaced.](./images/matchflow/lineups.png)

_The popover during a live match, and the line-ups one click further. Screenshots from the Dutch version of the app._

## The Challenge

When you can't watch, a score app tells you the result, not how the match is going. A 1–1 can mean your club is pinned back in its own half, or pressing for the winner. The data that shows the difference exists: momentum per minute, shots and xG, ratings. Where it is shown, it looks like a trading terminal: dark, dense and built for analysts.

The goal was the opposite: one glance in the menu bar to know how the match is going, one click to understand why. Light, warm and calm, so it sits between other work instead of competing with it.

## My Role

A personal project. I wrote the product requirements and the specs, chose the visual direction, wrote the motion spec and the style guide, and made the product and design calls. The code was largely written by Claude Code. Version 0.2 took three days; version 0.4 took nine working days spread over two and a half weeks, with live tests during four real matches.

## Approach

**The bar is the dominance.** The menu bar shows the two club codes, the score and a thin tug-of-war bar underneath: the home colour fills from the left up to the home side's share of the momentum over the last ten minutes. At first a percentage sat next to it. Without explanation, "51%" could not be read: whose, and of what? The percentage went; the bar already said it. When the momentum turns for ten minutes, a small flame appears next to the side that took over. The same bar became the app icon: a pitch seen from above, split at the front line.

**From a favourite club to what you follow.** Version 0.2 had one favourite club, so the menu bar always knew which match to show. People follow more than that: a club, a national team, a whole competition. Version 0.4 lets you follow clubs, countries and competitions in three ordered lists, which raised the real question: with several matches live, which one gets the menu bar? The rule: live goes first, then the group, then your own order. A followed competition shows its most exciting live match, judged by the score, the minute, momentum swings and what is at stake in the table, and keeps it until full time instead of jumping between matches. The popover says why it shows this match, and lists the other followed matches that are on.

**The text never contradicts the score.** Each match card has one line about the flow. During a 2–5 it read "Evenly matched · possession 51–49": true by momentum, absurd next to the score. Now the momentum line is used only up to one goal apart; from two goals it says who is in control. The live table had the same problem. Its arrows compared with the data source's own order, which updates during some matches by its own rules, so a club losing 2–5 got a green arrow up. Now the table with and without the live matches is ranked by the same rule.

**One chart, one question.** Momentum bars and xG lines first shared one chart. After a live test the lines ran red over red bars and neither could be read. They split into two slides of the same card, momentum first and the xG race second, with a larger flow page behind both.

**Only show what is there.** The data comes from an unofficial source with no public API, and not every match has the same depth. When momentum, possession or ratings are missing, that part disappears. Nothing is estimated, and the data layer is kept separate so the source can be replaced.

**Match days beat test data.** Live tests during four matches changed the design. The score once showed 2–1 a quarter of an hour before the goal event arrived, so goals are announced when the score changes and the scorer follows. Mid-match the source sent an old copy from before kick-off, so the app now keeps the previous state instead of jumping back. During a VAR check the new score is held: a goal that stands is announced once, a disallowed one never. A test during Hajduk – Ajax found four more bugs, from the live table counting a match twice to attack-zone bars that made 22% look like 45%.

**Interrupt on your terms.** Notifications went from four levels to one switch per moment: goals, red cards, the line-up being known, a rival scoring in a way that moves your club, and a turn in the momentum. During a meeting in your calendar every notification waits, and one summary follows when it ends.

**Designing by removing.** Several ideas were built, looked at and taken out: club colours as dots beside the team codes, then as upright strips like a TV score bug, a soft colour wash across the match card, a line about what just happened that still read as live after full time. Stadium and referee are in the data but not on screen. Each added colour or detail without adding understanding.

**Measured, not assumed.** A design review measured every colour against WCAG 2.2 AA. The live minute reached 4.2:1, a club red on the dark chart 2.3:1. Club colours now shift in lightness, keeping their hue, until they reach 3:1 against the chart. The popover also measures the screen before it opens: on a small display the table scrolls, the match card stays put.

## Impact

Matchflow 0.4 is in beta on Apple Silicon and Intel Macs with macOS 15, with widgets in three sizes, keyboard shortcuts and signed self-updates. It follows clubs in six European leagues and national teams, and shows what else is live, the European cups included. More than two hundred tests run against real responses recorded during live matches. The criteria for 1.0 are set: two or three match days without new bugs. A native iPhone app with the live score on the lock screen comes after that, starting with a test of whether the data can be fetched from a server at all.

## Learnings

Removing was the most important design work. Most of what was built and taken out again was technically fine; it just didn't make the match easier to read.

The structure mattered more than the screens. Moving from one favourite club to things you follow changed one setting into a model with priorities, and the menu bar's single slot made every rule in that model visible.

And real conditions are the only honest test. The fixtures were correct, but match days showed how the data actually arrives: late, out of order, sometimes backwards.
