import { profile } from '../data/profile'

export function printConsoleGreeting() {
  console.log(
    `%cHi. You opened the console, so you probably build things too.%c\n\nThis site's source: ${profile.sourceUrl}\nSay hello: ${profile.email}\nPress \` on the page for a terminal, or Ctrl/Cmd+K for the command menu.`,
    'color:#ff8a3d;font:600 14px "JetBrains Mono",monospace',
    'color:inherit;font:12px "JetBrains Mono",monospace',
  )
}
