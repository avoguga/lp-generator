document
  .getElementById("landingPageForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    generateLandingPage();
  });

document
  .getElementById("sectionCount")
  .addEventListener("change", function (e) {
    updateSectionsInput(e.target.value);
  });

document.getElementById("exportBtn").addEventListener("click", function () {
  exportLandingPage();
});

function getFormValues() {
  return {
    title: document.getElementById("title").value,
    headerColor: document.getElementById("headerColor").value,
    bodyColor: document.getElementById("bodyColor").value,
    footerColor: document.getElementById("footerColor").value,
    fontChoice: document.getElementById("fontChoice").value,
    ctaText: document.getElementById("ctaText").value,
    sectionCount: parseInt(document.getElementById("sectionCount").value, 10),
  };
}

function generateSectionHtml(sectionNumber) {
  const sectionText = document.getElementById(
    "sectionText" + sectionNumber
  ).value;
  const sectionImageCheckbox = document.getElementById(
    "sectionImage" + sectionNumber
  );
  const sectionImageContent =
    sectionImageCheckbox && sectionImageCheckbox.checked
      ? '<img src="your-image-url.jpg" class="sectionImage" />'
      : "";
  return (
    '<section id="section' +
    sectionNumber +
    '" class="contentSection">' +
    '<p class="sectionText">' +
    sectionText +
    "</p>" +
    sectionImageContent +
    "</section>"
  );
}

function generateLandingPage() {
  const {
    title,
    headerColor,
    bodyColor,
    footerColor,
    fontChoice,
    ctaText,
    sectionCount,
  } = getFormValues();

  let pageContent =
    `<header id="pageHeader" style="background-color:${headerColor}; padding: 20px;"><h1>${title}</h1></header>` +
    `<main id="pageBody" style="background-color:${bodyColor};"><p id="ctaParagraph">${ctaText}</p>`;

  for (let i = 1; i <= sectionCount; i++) {
    pageContent += generateSectionHtml(i);
  }

  pageContent += `</main><footer id="pageFooter" style="background-color:${footerColor}; padding: 20px;"></footer>`;

  document.getElementById("preview").style.fontFamily = fontChoice;
  document.getElementById("preview").innerHTML = pageContent;
}

function updateSectionsInput(sectionCount) {
  let sectionsInputDiv = document.getElementById("sectionsInput");
  sectionsInputDiv.innerHTML = ""; // Clear previous content

  for (let i = 1; i <= sectionCount; i++) {
    sectionsInputDiv.innerHTML +=
      `<label for="sectionText${i}">Texto da Seção ${i}:</label><br>` +
      `<input type="text" id="sectionText${i}" name="sectionText${i}" class="sectionTextInput"/><br>` +
      `<label for="sectionImage${i}">Incluir Imagem na Seção ${i}?</label>` +
      `<input type="checkbox" id="sectionImage${i}" name="sectionImage${i}" class="sectionImageCheckbox"/><br><br>`;
  }
}

function exportLandingPage() {
  const { title, fontChoice } = getFormValues();
  const pageContent = document.getElementById("preview").innerHTML;

  const htmlContent = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>body { font-family: ${fontChoice}; }</style>
</head>
<body>${pageContent}</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "landing-page.html";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
