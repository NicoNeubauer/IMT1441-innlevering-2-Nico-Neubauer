const tr = document.createElement("tr");
const tabel = document.getElementById("table1")
const studenterdiv = document.getElementById("kontakt1")
const search1 = document.getElementById('search')

fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/getAll.php?store=nicon')
 .then(res=>res.json())
 .then(data=>{

  search1.addEventListener('input', e=>{ //denne kodebiten sørger for at når søkefeltet er tomt vises det ikke no på siden 
if(e.target.value!=""){ // når søkefeltet er ikke lik ingenting vises infoen
  visStudenter(data.data.filter(filter));
}else{
  tabel.innerHTML=""; // men når den er lik inngenting altså tom vises ikke noe
}
});
 
function filter(kontakt) { //denne filterfunsjoen gjør at vi kan søke på fornavn eller etternavn
const namel = kontakt.lastName.toLowerCase().indexOf(search1.value.toLowerCase())>-1; //etternavn søk
const namef = kontakt.givenName.toLowerCase().indexOf(search1.value.toLowerCase())>-1; //fornavn søk
return namel||namef; //denne viser resutat av søket
}

function visStudenter(data) { //visStudenter funsjonen lager <td> ellementer for infoen som skal vises fra serveren
  tabel.innerHTML = '';
  data.forEach(kontakt=>{ // for eatch at vi får med alle
    const tr = document.createElement('TR');
    tr.innerHTML = `<td>${kontakt.givenName}</td> <td>${kontakt.lastName}</td> <td>${kontakt.Email}</td> <td>${kontakt.studyProgramme}</td>`;
    tabel.appendChild (tr); //henger den i DOMen
    
  });
}
});

