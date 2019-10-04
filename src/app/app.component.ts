import { Component, HostListener, OnInit } from '@angular/core';
// import puppeteer from 'puppeteer';

// import ws from 'ws';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = String(window.nw.require('fs').readFileSync('./package.json'));

  @HostListener('window:resize')
  updateVH() {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  ngOnInit() {
    this.updateVH();
    const win = window.nw.Window.get();
    win.moveTo(0, (window.screen as any).availTop);
    win.width = window.screen.width;
    window.nw.Window.get().showDevTools();
  }

  openDemo() {
    const puppeteer = window.nw.require('puppeteer');
    puppeteer.launch({
      headless: false,
      pipe: true,
      dumpio: true,
      defaultViewport: null,
      args: [
        '--disable-extensions',
        '--disable-popup-blocking',
        '--disable-crash-reporter',
        'https://google.com',
      ],
      env: {
        "GOOGLE_API_KEY": "no",
        "GOOGLE_DEFAULT_CLIENT_ID": "no",
        "GOOGLE_DEFAULT_CLIENT_SECRET": "no",
      },
      // ignoreDefaultArgs: ['--mute-audio', '--enable-automation', 'about:blank'],
      ignoreDefaultArgs: true,
    }).then(async browser => {
      const pages = await browser.pages();
      let page = pages[0];
      // await page.close(); page = null;
      if (!page) {
        page = await browser.newPage();
        pages.push(page);
      }
      await page.goto('https://google.com');
      await new Promise(r => setTimeout(r, 5000));
      await new Promise(r => setTimeout(r, 10000));
      await browser.close();
    });
  }
}
