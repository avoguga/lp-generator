document.getElementById('landingPageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obter valores do formulário
    var title = document.getElementById('title').value;
    var headerColor = document.getElementById('headerColor').value;
    var bodyColor = document.getElementById('bodyColor').value;
    var footerColor = document.getElementById('footerColor').value;

    // Atualizar a pré-visualização
    var preview = document.getElementById('preview');
    preview.innerHTML = '<h1 style="background-color:' + headerColor + '">' + title + '</h1>' +
                        '<div style="background-color:' + bodyColor + '; height: 200px;"></div>' +
                        '<div style="background-color:' + footerColor + '; height: 50px;"></div>';
});

document.getElementById('exportBtn').addEventListener('click', function() {
    // Obter o HTML da pré-visualização
    var title = document.getElementById('title').value;
    var headerColor = document.getElementById('headerColor').value;
    var bodyColor = document.getElementById('bodyColor').value;
    var footerColor = document.getElementById('footerColor').value;

    var htmlContent = '<!DOCTYPE html>\n' +
                      '<html lang="pt-br">\n' +
                      '<head>\n' +
                      '    <meta charset="UTF-8">\n' +
                      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
                      '    <title>' + title + '</title>\n' +
                      '</head>\n' +
                      '<body style="background-color:' + bodyColor + ';">\n' +
                      '    <header style="background-color:' + headerColor + '; padding: 20px;">\n' +
                      '        <h1>' + title + '</h1>\n' +
                      '    </header>\n' +
                      '    <footer style="background-color:' + footerColor + '; padding: 20px;">\n' +
                      '    </footer>\n' +
                      '</body>\n' +
                      '</html>';

    // Criar um Blob com o conteúdo HTML
    var blob = new Blob([htmlContent], {type: 'text/html'});
    var url = URL.createObjectURL(blob);

    // Criar um link e disparar o download
    var downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'landing-page.html';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});
