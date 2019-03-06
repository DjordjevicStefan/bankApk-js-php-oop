let admin = document.querySelector(".admin");
let pass = document.querySelector(".pass");
let login = document.querySelector("#login");
let select = document.querySelector(".select");
let showAccounts = document.querySelector("#showAccount");
let logOut = document.querySelector("#logOut");

let btnLog = document.querySelector("#btnLog");


let mainRow = document.querySelector("#mainRow");
let mainTb = document.querySelector("#mainTb");



// showAccounts.onclick = function(){
//   showAll();
// }


////// proveravamo pri loadu stranice da li je admin vec logovan 
window.addEventListener("load", function(){
  let xml = new XMLHttpRequest();
  xml.open("get", "php_pages/checkLogStatus.php");
  xml.send();
  
  xml.onreadystatechange = function(){
    if (xml.readyState == 4 && xml.status == 200) {
     
       
      if (xml.responseText == "ok") {
        login.style.display = "none" ;
        mainRow.style.display = "block" ;
        select.style.display = "block" ;
        logOut.style.display = "block";
        showAll();
      } else {
        login.style.display = "block" ;
        mainRow.style.display = "none" ;
        select.style.display = "none" ;

      }
   


    } 
  
  
  }
});


btnLog.onclick = function(){

    
   if (admin.value !="" && pass.value !="") {
       let adminCheck = admin.value ;
       let passCheck = pass.value ;

       let fd = new FormData();
       fd.append("admin", adminCheck);
       fd.append("password", passCheck);

       let xml = new XMLHttpRequest();
       xml.open("post", "php_pages/login.php");
       xml.send(fd);

       xml.onreadystatechange = function(){
           if (xml.readyState == 4 && xml.status == 200) {

            // console.log(JSON.parse(xml.responseText));
            // console.log(xml.responseText);
            if (xml.responseText == "ok") {
                login.style.display = "none" ;
                mainRow.style.display = "block" ;
                select.style.display = "block" ;
                logOut.style.display = "block" ;
                showAll();
             } else if(xml.responseText == "try again") {
                 alert("nesto je krenulo po zlu,proverite sifru i korisnicko ime i pokusajte ponovo");
                 admin.value = ""  ;
                 pass.value = "";
             }
            

               
           }  
       }
       
     } else {
       alert("popunite oba polja");
   }

}


function showAll(){
  let xml = new XMLHttpRequest();
  xml.open("get", "php_pages/showAll.php");
  xml.send();

  xml.onreadystatechange = function(){
      if (xml.readyState == 4 && xml.status == 200) {
         let db = JSON.parse(xml.responseText);
         let text = ""; 
      
         db.forEach(function(e) {
           text = `<tr>
             <td>${e.id}</td>
             <td>${e.client}</td>
             <td>${e.deposit}</td>
             <td>${e.cc}</td>
            </tr>`;

            mainTb.innerHTML += text ;
         });

      }
  }
}
