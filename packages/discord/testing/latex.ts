import puppeteer from "puppeteer";
import fs from 'fs'

export async function generateLatex(question:string) {
  let html = `
  <html>
    <head>
    <style>
        body {
            height: max-content;
            font-size: 40px;
            width: max-content;
            color: white;
        }
    </style>
    </head>

    <body>
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        CommonHTML: { linebreaks: { automatic: true } },
        "HTML-CSS": { linebreaks: { automatic: true } },
        SVG: { linebreaks: { automatic: true } }
    });
    MathJax.Hub.Queue(["Rerender",MathJax.Hub])
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_SVG-full"></script>
    ${question}
  </body>
</html>
  `;

  fs.writeFileSync('./testing.html',html)

  const browser = await puppeteer.launch(
    {headless: "new"}
  );
  const page = await browser.newPage();
  await page.goto(`data:text/html,${html}`);
  const content = await page.$("body");

  if (content != null) {
    const imageBuffer = await content.screenshot({
      path:'./testing.png',
      omitBackground: true,
    });

    await page.close();
    await browser.close();
    return imageBuffer;
  }
  return null
}

// generateLatex(`
// \\begin{bmatrix}
// a & b \\\\ 
// c & d 
// \\end{bmatrix}
// `);