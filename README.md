# NeWtAb

A cool and simple new tab page built with Vite.

## Features

- Search with DuckDuckGo, Google, or Bing
- Custom quick links (saved locally)
- Remote banner image
- Remote announcements
- Live clock
- Settings modal
- Preferences saved using LocalStorage

## Installation

Clone the repository:

```bash
git clone https://github.com/crislazy/newtab.git
cd newtab
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Configuration

The project loads its banner and announcements from:

[https://raw.githubusercontent.com/crislazy/json-files/main/newtab.json](https://raw.githubusercontent.com/crislazy/json-files/main/newtab.json)

Example:

```json
{
  "banner": "https://example.com/banner.png",
  "announcement": "Welcome!"
}
```

If the file cant be reached, it uses a placeholder as a fallback.

## What I used

- Vite
- JavaScript
- HTML
- CSS

## License

MIT