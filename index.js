const puppeteer = require("puppeteer");

const s_facebook_username = "ivy@secret-closet.com";
const s_facebook_password = "Comedown01";
//const liveUrl = 'https://www.facebook.com/scshop.tw/videos/234553863895583/';
const liveUrl = "https://www.dianping.com";
async function sleep(time) {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove();
    }, time * 1000);
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0,
    slowMo: 20
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(liveUrl);

  //输入关键词
  const input = await page.$("#J-search-input");
  await input.focus();
  await page.keyboard.type("健身房");

  const btnSearch = await page.$("#J-all-btn");
  await btnSearch.click();
  await sleep(3);
  const pages = await browser.pages();
  pages.forEach(async p => {
    console.log("Title：", await p.title());
  });


  
  const lastPage = pages[pages.length - 1];
  console.log(pages.length, await lastPage.title());
  //await lastPage.focus();
  const res = await lastPage.$$eval("h4", ls => {
    return ls.map(l => l.innerHTML);
  });
  console.log(res);
  console.log("H4", res.length);
})();
