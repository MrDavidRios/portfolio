---
title: 'Offline YouTube Audio on iPhone with yt-dlp, SyncTrain, and Infuse'
excerpt: 'A simple three-tool workflow to download audio from YouTube videos on my Mac and listen offline on my iPhone.'
publishDate: 'Apr 13 2026'
tags: ['workflow', 'automation', 'ios']
---

I wanted a way to download long YouTube videos as audio — lectures, interviews, podcasts — and listen to them offline on my iPhone during my commute. No streaming, no internet required.

Here's the simple setup I landed on using three tools.

## The Tools

- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)** — a command-line tool that downloads audio from YouTube. Install with `brew install yt-dlp`.
- **[SyncTrain](https://apps.apple.com/app/synctrain/id1668378926)** — a Syncthing client for macOS and iOS. It keeps a shared folder in sync between my Mac and iPhone over WiFi.
- **[Infuse](https://apps.apple.com/app/infuse-7/id1136220934)** — a media player on iPhone that plays the synced audio files.

## How It Works

I added a shell function to my `~/.zshrc`:

```sh
dwn-yt-audio() {
  yt-dlp -f "ba" -o '~/path/to/synctrain/Offline-Audio/%(title)s.%(ext)s' "$1"
}
```

The `-f "ba"` flag tells yt-dlp to grab the best available audio-only format. The output goes directly into a folder that SyncTrain watches.

To download something, I just run:

```sh
dwn-yt-audio "https://www.youtube.com/watch?v=VIDEO_ID"
```

SyncTrain picks up the new file and syncs it to my iPhone over my local network. Then I open Infuse and play it — on the subway, on a walk, wherever.

## Why This Setup

I looked into building an iOS app or running a home media server, but for my needs this is far simpler. There's no server to maintain, no app to build, and the files are fully offline on my phone before I leave the house. A 2-hour audio file is only about 110 MB at 128kbps, so syncing is fast over WiFi.

The whole thing is just: one command, one sync, one player.
