function mudarCss(nomeCor, valorCor) {
    const cssMain  = document.getElementsByTagName('link')[5];
    cssMain.href = 'css/'+nomeCor+'.css';

    const btnAlteraCor = document.getElementById("btnAlteraCor");
    btnAlteraCor.style = "color: " + valorCor + ";";
}