let admin = document.querySelector(".admin");
let pass = document.querySelector(".pass");
let login = document.querySelector("#login");

let btnLog = document.querySelector("#btnLog");


let mainRow = document.querySelector("#mainRow");
let select = document.querySelector(".select");



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
  

}
