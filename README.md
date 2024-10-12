# Auto Bookmark on Like for X

## Goal

A Chrome extension that automatically bookmarks posts/tweets when you like them on X (formerly Twitter), with the ability to toggle this feature on/off. This saves you a click and makes liked content searchable via text in your bookmarks, unlike X's native liked-only tweets which aren't searchable.

## Description

Auto Bookmark on Like for X is a Chrome extension that automatically bookmarks posts when you like them on X (formerly Twitter). This extension enhances your X experience by seamlessly saving content you enjoy for later reference.

## Features

- Automatically bookmarks posts when you like them
- Removes bookmarks when you unlike a post
- Visual indicator to show if the extension is active
- Toggle extension on/off with a single click

## Installation

1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Look for the indicator in the bottom left corner of X:
   - ✅ Auto-bookmark on like is active
   - 🛑 Auto-bookmark on like is inactive
2. Click the indicator to toggle the feature on or off.
3. When active, liking a post automatically bookmarks it, making it searchable in your browser bookmarks.
4. Unliking a post removes the bookmark.

## Permissions

This extension requires the following permissions:

- `activeTab`: To interact with the current X tab
- `scripting`: To inject and run scripts on X pages
- `storage`: To save the extension's active/inactive state

## Compatibility

This extension works on:

- twitter.com
- x.com

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This extension is not affiliated with, endorsed by, or sponsored by X Corp. (formerly Twitter, Inc.).
