let admin = document.querySelector(".admin");
let pass = document.querySelector(".pass");
let login = document.querySelector("#login");
let select = document.querySelector(".select");
let showAccounts = document.querySelector("#showAccount");
let addAccount = document.querySelector("#addAccount");
let addAccountRow = document.querySelector("#formRow");
let logOut = document.querySelector("#logOut");
let btnLog = document.querySelector("#btnLog");

let mainRow = document.querySelector("#mainRow");
let mainTb = document.querySelector("#mainTb");

/////// sleketovanje dom elemenata potrebnih za opciju dodavanja user-a/klijenta
let clientAdd = document.querySelector("#clientAdd");
let depositAdd = document.querySelector("#depositAdd");
let ccAdd = document.querySelector("#ccAdd");
let btnAdd = document.querySelector("#btnAdd");

/////// selektovanje dom elemenata potrebnih za edit/delete
let showEditDelete = document.querySelector("#delete");
let editDelete = document.querySelector("#editRow");
let editTb = document.querySelector("#editTb");
let editForm = document.querySelector("#editFormRow");
let submitEditBtn = document.querySelector("#editSubmit");
let editClient = document.querySelector("#editFormName");
let editDeposit = document.querySelector("#editFormDeposit");
let editCC = document.querySelector("#editFormCCard");


////// proveravamo pri loadu stranice da li je admin vec logovan 
window.addEventListener("load", function () {
  let xml = new XMLHttpRequest();
  xml.open("get", "php_pages/checkLogStatus.php");
  xml.send();

  xml.onreadystatechange = function () {
    if (xml.readyState == 4 && xml.status == 200) {


      if (xml.responseText == "ok") {
        login.style.display = "none";
        mainRow.style.display = "block";
        select.style.display = "block";
        logOut.style.display = "block";
        showAll();
      } else {
        login.style.display = "block";
        mainRow.style.display = "none";
        select.style.display = "none";

      }

    }
  }
});


function showAll() {
  let xml = new XMLHttpRequest();
  xml.open("get", "php_pages/showAll.php");
  xml.send();

  xml.onreadystatechange = function () {
    if (xml.readyState == 4 && xml.status == 200) {
      let db = JSON.parse(xml.responseText);
      let text = "";

      db.forEach(function (e) {
        text = `<tr>
             <td>${e.id}</td>
             <td>${e.client}</td>
             <td>${e.deposit}</td>
             <td>${e.cc}</td>
            </tr>`;

        mainTb.innerHTML += text;
      });

    }
  }
}


function createEditTable() {
  let xml = new XMLHttpRequest();
  xml.open("get", "php_pages/showAll.php");
  xml.send();

  xml.onreadystatechange = function () {
    if (xml.readyState == 4 && xml.status == 200) {
      let db = JSON.parse(xml.responseText);
      let text = "";

      db.forEach(function (e, index) {
        text = `<tr>
             <td>${e.id}</td>
             <td>${e.client}</td>
             <td>${e.deposit}</td>
             <td>${e.cc}</td>
             <td> <button id='${e.id}' class='editB btn btn-warning form-control'> edit  </button> </td>
             <td> <button  class='deleteB btn btn-danger form-control'> delete </button> </td>
             </tr>`;


        editTb.innerHTML += text;
      });

    }
  }

}


btnLog.onclick = function () {


  if (admin.value != "" && pass.value != "") {
    let adminCheck = admin.value;
    let passCheck = pass.value;

    let fd = new FormData();
    fd.append("admin", adminCheck);
    fd.append("password", passCheck);

    let xml = new XMLHttpRequest();
    xml.open("post", "php_pages/login.php");
    xml.send(fd);

    xml.onreadystatechange = function () {
      if (xml.readyState == 4 && xml.status == 200) {

        // console.log(JSON.parse(xml.responseText));
        // console.log(xml.responseText);
        if (xml.responseText == "ok") {
          login.style.display = "none";
          mainRow.style.display = "block";
          select.style.display = "block";
          logOut.style.display = "block";
          showAll();
        } else if (xml.responseText == "try again") {
          alert("nesto je krenulo po zlu,proverite sifru i korisnicko ime i pokusajte ponovo");
          admin.value = "";
          pass.value = "";
        }



      }
    }

  } else {
    alert("popunite oba polja");
  }

}



btnAdd.onclick = function () {
  if (clientAdd.value != "" && ccAdd.value != "" && depositAdd.value != "") {
    let fd = new FormData();

    // let test1 = clientAdd.value;
    // let test2 = depositAdd.value;
    // let test3 = ccAdd.value ;

    fd.append("client", clientAdd.value);
    fd.append("deposit", depositAdd.value);
    fd.append("cc", ccAdd.value);

    let xml = new XMLHttpRequest();
    xml.open("post", "php_pages/create.php");
    xml.send(fd);

    xml.onreadystatechange = function () {
      if (xml.readyState == 4 && xml.status == 200) {

        if (JSON.parse(xml.responseText) == "nope") {
          alert("doslo je do greske, pokusajte ponovo");
        } else {
          mainRow.style.display = "block";
          addAccountRow.style.display = "none";
          mainTb.innerHTML = "";
          showAll();
        }


      }

    }


  } else {
    alert("popunite sva polja pa pritisnite dugme!!");
    clientAdd.value = "";
    ccAdd.value = "";
    depositAdd.value = "";

  }
}

showAccounts.onclick = function () {
  login.style.display = "none";
  mainRow.style.display = "block";
  addAccountRow.style.display = "none";
  editDelete.style.display = "none";
  editForm.style.display = "none";
}

addAccount.onclick = function () {
  
  editForm.style.display = "none";
  editDelete.style.display = "none";
  mainRow.style.display = "none";
  login.style.display = "none";
  addAccountRow.style.display = "block";
  clientAdd.value = "";
  ccAdd.value = "";
  depositAdd.value = "";
}

/////// edit delete funkcionalnost i se vezano za taj view. mora se lepse ispisati ovaj deo koda !!!!
showEditDelete.onclick = function () {
  editDelete.style.display = "block";
  addAccountRow.style.display = "none";
  mainRow.style.display = "none";
  editTb.innerHTML = "";
  createEditTable();

function addListeners() {

  editDelete.addEventListener("click", function (e) {

      ///// funkcionalnost za delete dugme!!
      ///////////// !!! na ovom primeru pogledaj kako se proverava da li je sve proslo dobro sa server strane !!!!!!!
      if (e.target.className == "deleteB btn btn-danger form-control") {
         
         
        // let answer =   prompt("are you sure you want to delete this client? type yes if you are 100% sure");
        
        //// testiramo da li je polje popunjeno i da li u njemu stoji yes
        if (answer == "yes" && answer != null ) {
           let fd = new FormData();
           let clientId = e.target.parentElement.previousElementSibling.firstElementChild.id ;

           fd.append("id",clientId);

           let xml = new XMLHttpRequest();
           xml.open("post", "php_pages/delete.php");
           xml.send(fd) ;

           xml.onreadystatechange = function () {
            if (xml.readyState == 4 && xml.status == 200) {
                 if (JSON.parse(xml.responseText== "nope")) {
                   alert("doslo je do greske na server strani");
                 } else {
                  editTb.innerHTML = "";
                  editDelete.style.display = "none";
                  createEditTable();
                 }
      
            }
      
          }

          
        } 
        // else {
        //   alert("client isn't deleted!");
        // }
        

         
         
      }

      
      
      
      ///// logika i funckionalnost za edit user/client
      if (e.target.className == "editB btn btn-warning form-control") {
        
        ////// na klik edit dugmeta moramo da sklonimo sve ostale view a da prikazemo edit user view
        editDelete.style.display = "none";
        addAccountRow.style.display = "none";
        mainRow.style.display = "none";
        editForm.style.display = "block";

        let fd = new FormData();
        let id = e.target.id;
        fd.append("id", id);


        let xml = new XMLHttpRequest();
        xml.open("post", "php_pages/showOne.php");
        xml.send(fd);
        xml.onreadystatechange = function () {
          if (xml.readyState == 4 && xml.status == 200) {
            let user = JSON.parse(xml.responseText);
            if (user.client != "" && user.deposit != "" && user.cc != "") {
              editClient.value = user.client;
              editDeposit.value = user.deposit;
              editCC.value = user.cc;
              let clientId = user.id ;

              submitEditBtn.onclick = function () {
                let fd = new FormData();

                fd.append("client", editClient.value);
                fd.append("deposit", editDeposit.value);
                fd.append("cc", editCC.value);
                fd.append("id", clientId);
                

                let xml = new XMLHttpRequest();
                xml.open("post", "php_pages/edit.php");
                xml.send(fd);
                xml.onreadystatechange = function () {
                  if (xml.readyState == 4 && xml.status == 200) {

                    if (JSON.parse(xml.responseText)=="nope") {
                      alert("doslo je do greske pri povezivanju sa bazom, pokusajte ponovo");
                    } else {
                      login.style.display = "none";
                      mainRow.style.display = "block";
                      addAccountRow.style.display = "none";
                      editDelete.style.display = "none";
                      editForm.style.display = "none";
                    }
                  }
                }
              }

            } else {
              alert("doslo je do greske sa povlacenjem podataka iz baze za datog klijenta");

            }

          }

        }
      }  


    });


  }
  /////// dodajemo event listenere na ceo editDelete view
  addListeners();


}