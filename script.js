document
  .getElementById("landingPageForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Obter valores do formulário
    var title = document.getElementById("title").value;
    var headerColor = document.getElementById("headerColor").value;
    var bodyColor = document.getElementById("bodyColor").value;
    var footerColor = document.getElementById("footerColor").value;
    var fontChoice = document.getElementById("fontChoice").value;
    var ctaText = document.getElementById("ctaText").value;
    var sectionCount = document.getElementById("sectionCount").value;

    // Estruturar a página
    var preview = document.getElementById("preview");
    preview.style.fontFamily = fontChoice;
    preview.innerHTML =
      '<header id="pageHeader" style="background-color:' +
      headerColor +
      '; padding: 20px;">' +
      "<h1>" +
      title +
      "</h1></header>" +
      '<main id="pageBody" style="background-color:' +
      bodyColor +
      ';">' +
      '<p id="ctaParagraph">' +
      ctaText +
      "</p>";

    // Adicionar seções
    for (var i = 1; i <= sectionCount; i++) {
      var sectionText = document.getElementById("sectionText" + i).value;
      var sectionImageCheckbox = document.getElementById("sectionImage" + i);
      var sectionImageContent =
        sectionImageCheckbox && sectionImageCheckbox.checked
          ? '<img src="your-image-url.jpg" class="sectionImage" />'
          : "";

      preview.innerHTML +=
        '<section id="section' +
        i +
        '" class="contentSection">' +
        '<p class="sectionText">' +
        sectionText +
        "</p>" +
        sectionImageContent +
        "</section>";
    }

    preview.innerHTML +=
      '</main><footer id="pageFooter" style="background-color:' +
      footerColor +
      '; padding: 20px;"></footer>';
  });

// Evento para adicionar campos das seções
document
  .getElementById("sectionCount")
  .addEventListener("change", function (e) {
    var sectionCount = e.target.value;
    var sectionsInputDiv = document.getElementById("sectionsInput");
    sectionsInputDiv.innerHTML = ""; // Limpar conteúdo anterior

    for (var i = 1; i <= sectionCount; i++) {
      sectionsInputDiv.innerHTML +=
        '<label for="sectionText' +
        i +
        '">Texto da Seção ' +
        i +
        ":</label><br>" +
        '<input type="text" id="sectionText' +
        i +
        '" name="sectionText' +
        i +
        '" class="sectionTextInput"/><br>' +
        '<label for="sectionImage' +
        i +
        '">Incluir Imagem na Seção ' +
        i +
        "?</label>" +
        '<input type="checkbox" id="sectionImage' +
        i +
        '" name="sectionImage' +
        i +
        '" class="sectionImageCheckbox"/><br><br>';
    }
  });

document.getElementById("exportBtn").addEventListener("click", function () {
  var title = document.getElementById("title").value;
  var headerColor = document.getElementById("headerColor").value;
  var bodyColor = document.getElementById("bodyColor").value;
  var footerColor = document.getElementById("footerColor").value;
  var fontChoice = document.getElementById("fontChoice").value;
  var ctaText = document.getElementById("ctaText").value;
  var sectionCount = document.getElementById("sectionCount").value;

  var htmlContent =
    "<!DOCTYPE html>\n" +
    '<html lang="pt-br">\n' +
    "<head>\n" +
    '    <meta charset="UTF-8">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    "    <title>" +
    title +
    "</title>\n" +
    "</head>\n" +
    '<body style="font-family:' +
    fontChoice +
    ';">\n' +
    '    <header style="background-color:' +
    headerColor +
    '; padding: 20px;">\n' +
    "        <h1>" +
    title +
    "</h1>\n" +
    "    </header>\n" +
    '    <main id="pageBody" style="background-color:' +
    bodyColor +
    ';">';

  htmlContent += '<p id="ctaParagraph">' + ctaText + "</p>";

  for (var i = 1; i <= sectionCount; i++) {
    var sectionText = document.getElementById("sectionText" + i).value;
    var sectionImageCheckbox = document.getElementById("sectionImage" + i);
    var sectionImageContent =
      sectionImageCheckbox && sectionImageCheckbox.checked
        ? '<img src="your-image-url.jpg" class="sectionImage" />'
        : "";

    htmlContent +=
      '<section id="section' +
      i +
      '" class="contentSection">' +
      '<p class="sectionText">' +
      sectionText +
      "</p>" +
      sectionImageContent +
      "</section>";
  }

  htmlContent +=
    "    </main>\n" +
    '    <footer style="background-color:' +
    footerColor +
    '; padding: 20px;">\n' +
    "    </footer>\n" +
    "</body>\n" +
    "</html>";

  // Criar um Blob com o conteúdo HTML
  var blob = new Blob([htmlContent], { type: "text/html" });
  var url = URL.createObjectURL(blob);

  // Criar um link e disparar o download
  var downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "landing-page.html";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});
