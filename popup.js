const on = document.querySelector(".overflow-on");
const off = document.querySelector(".overflow-off");

document.addEventListener("click", async (e) => {
  if (e.target.closest(".overflow-on")) {
    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: overflowOn,
    });

    on.classList.add("on-active");
    off.classList.remove("off-active");
  }

  if (e.target.closest(".overflow-off")) {
    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: overflowOff,
    });

    off.classList.add("off-active");
    on.classList.remove("on-active");
  }
});

function overflowOn() {
  const rootWidth = document.documentElement.getBoundingClientRect().width;

  [].forEach.call(document.querySelectorAll("*"), function (el) {
    el.style.outline =
      "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
    if (el.getBoundingClientRect().width > rootWidth) {
      console.error("Scroll Element", el);
    }
  });
}

function overflowOff() {
  [].forEach.call(document.querySelectorAll("*"), function (el) {
    el.style.outline = "";
  });
}
