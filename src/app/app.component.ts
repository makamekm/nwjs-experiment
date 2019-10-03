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
    console.log("Hello World!", );
    puppeteer.launch({
      headless: false,
      ignoreDefaultArgs: ['--mute-audio', '--enable-automation'],
    }).then(async browser => {
      const blank = (await browser.pages())[0];
      await blank.close();
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto('https://google.com');
      await new Promise(r => setTimeout(r, 5000));
      await browser.close();
    });
  }
}
