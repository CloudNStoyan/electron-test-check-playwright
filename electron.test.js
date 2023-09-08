const { _electron: electron } = require("playwright");
import { expect, test } from "@playwright/test";

let electronApp;
let appPath;

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ["main.js"] });
  appPath = await electronApp.evaluate(async ({ app }) => {
    return app.getAppPath();
  });
});

test.afterAll(async () => {
  await electronApp.close();
});

// (async () => {
//   // Launch Electron app.
// //   const electronApp = await electron.launch({ args: ['main.js'] });

//   // Evaluation expression in the Electron context.
// //   const appPath = await electronApp.evaluate(async ({ app }) => {
// //     // This runs in the main Electron process, parameter here is always
// //     // the result of the require('electron') in the main app script.
// //     return app.getAppPath();
// //   });

//   // Get the first window that the app opens, wait if necessary.
// //   const window = await electronApp.firstWindow();
// //   // Print the title.
// //   console.log(await window.title());

// //   // Capture a screenshot.
// //   await window.screenshot({ path: 'intro.png' });
// //   // Direct Electron console to Node terminal.
// //   window.on('console', console.log);
// //   // Click button.
// //   await window.click('text=Click me');
// //   // Exit app.
// //   await electronApp.close();

// })();

test("dwarf", async () => {
  const window = await electronApp.firstWindow();
  expect(await window.title()).toEqual("Hello Cats!");
  await window.screenshot({ path: "myscreenshot.png" });
  console.log(appPath);

  await window.pause();
});
