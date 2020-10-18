// require('webextension-polyfill/dist/browser-polyfill')
import { browser } from 'webextension-polyfill-ts'

function openHomePage (): void {
  browser.tabs.create({
    'url': './index.html'
  })
}
browser.browserAction.onClicked.addListener(openHomePage)
