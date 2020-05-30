const sqlite3 = require('sqlite3').verbose();
const pdfFiller   = require('pdffiller');

let db = new sqlite3.Database('./sqlite.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected');
});
db.serialize(function() {
    db.each("SELECT * FROM demo", function(err, row) {

        // A REMPLIR EN FONCTION DE TES CHAMPS
        // "champ_dans_le_PDF" : row.nomDeLaColonneSQLite
        const data = {
          "firstname": row.firstname,
          "lastname": row.lastname,
        };

        pdfFiller.fillForm("input.pdf", `output/${row.firstname}_${row.lastname}.pdf`, data, function(err) {
            if (err) console.error(err.message);
            console.log(`Created pdf/${row.firstname}_${row.lastname}.pdf`);
        });
    });
});
db.close();
