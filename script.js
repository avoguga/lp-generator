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
    `sectionText${sectionNumber}`
  ).value;
  const sectionImageCheckbox = document.getElementById(
    `sectionImage${sectionNumber}`
  );
  let sectionImageContent = "";

  if (sectionImageCheckbox && sectionImageCheckbox.checked) {
    const imageUrlInput = document.getElementById(
      `sectionImageUrl${sectionNumber}`
    );
    const imageDataURL = imageUrlInput.getAttribute("data-url"); // Usar o Data URL armazenado
    if (imageDataURL) {
      sectionImageContent = `<img src="${imageDataURL}" class="sectionImage" />`;
    }
  }

  return (
    `<section id="section${sectionNumber}" class="contentSection">` +
    `<p class="sectionText">${sectionText}</p>` +
    sectionImageContent +
    `</section>`
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
  sectionsInputDiv.innerHTML = "";

  for (let i = 1; i <= sectionCount; i++) {
    sectionsInputDiv.innerHTML +=
      `<label for="sectionText${i}">Texto da Seção ${i}:</label><br>` +
      `<input type="text" id="sectionText${i}" name="sectionText${i}" class="sectionTextInput"/><br>` +
      `<label for="sectionImage${i}">Incluir Imagem na Seção ${i}?</label>` +
      `<input type="checkbox" id="sectionImage${i}" name="sectionImage${i}" class="sectionImageCheckbox" onchange="toggleImageInput(${i})"/><br>` +
      `<input type="file" id="sectionImageUrl${i}" name="sectionImageUrl${i}" class="sectionImageUrlInput" style="display:none;"/><br><br>`;
  }
}

function toggleImageInput(sectionNumber) {
  const checkbox = document.getElementById(`sectionImage${sectionNumber}`);
  const fileInput = document.getElementById(`sectionImageUrl${sectionNumber}`);

  if (checkbox.checked) {
    fileInput.style.display = "block";
    fileInput.onchange = function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // Armazenar o Data URL no atributo data-url do input para uso posterior
          fileInput.setAttribute("data-url", e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      }
    };
  } else {
    fileInput.style.display = "none";
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
    <style>
    /* Reset básico de CSS */
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${fontChoice};
    }
    /* Adicione outros estilos globais ou resets aqui */
    </style>
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
