let addBtn = document.getElementById("addBtn");
let msg = document.querySelector(".msg");

addBtn.addEventListener("click", () => {
  msg.classList.toggle("show");
});

let inputFile = document.getElementById("inputFile");

let codeContent = "";
let codeLines = [];
let output = document.getElementById("output");

if (localStorage.getItem("code")) {
  codeContent = JSON.parse(localStorage.getItem("code"));
  output.textContent = codeContent;
  hljs.highlightElement(output);
} else {
  codeContent = [];
}

inputFile.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    codeContent = event.target.result;
    localStorage.setItem("code", JSON.stringify(codeContent));

    // تقسيم الكود حسب الأسطر
    codeLines = codeContent.split(/\r?\n/);

    // عرض الكود في الـ pre

    output.textContent = codeContent;

    // تلوين الكود باستخدام Highlight.js
    hljs.highlightElement(output);

    // إخفاء msg بعد الرفع
    msg.classList.remove("show");

    // الآن codeContent و codeLines جاهزين للاستخدام
  };
  reader.readAsText(file);
});

 