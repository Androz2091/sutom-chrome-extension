function getPartieId () {
    return fetch('https://sutom.nocle.fr/js/instanceConfiguration.js')
    .then((res) => {
        return res.text()
            .then((content) => {
                const idPartie = content.match(/InstanceConfiguration.idPartieParDefaut = "(.*)";/)[1];
                return idPartie;
            });
    });
}

getPartieId().then((partieId) => {

    const date = new Date();
    const dateStr = date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0");

    console.log(partieId + "-" + dateStr);
    const id = btoa(partieId + "-" + dateStr);
    const txtUrl = "https://sutom.nocle.fr/mots/" + id + ".txt";

    fetch(txtUrl)
        .then((res) => {
            return res.text()
                .then((content) => {
                    const text = document.createTextNode(`Pss... le mot est ${content}`);
                    document.querySelector("#contenu").appendChild(text);
                });
        });

});