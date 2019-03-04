let admin = document.querySelector(".admin");
let pass = document.querySelector(".pass");
let login = document.querySelector("#login");

let btnLog = document.querySelector("#btnLog");


btnLog.onclick = function(){
   if (admin.value !="" && pass.value !="") {
    //    let adminCheck = admin.value ;
    //    let passCheck = pass.value ;

    //    let fd = new FormData();
    //    fd.append("admin", adminCheck);
    //    fd.append("password", passCheck);

    //    let xml = new XMLHttpRequest();
    //    xml.open("post", "php_pages/login.php");
    //    xml.send(fd);

    //    xml.onreadystatechange = function(){
    //        if (xml.readyState == 4 && xml.status == 200) {
              
    //          if (xml.responseText == true) {
    //             login.style.display = "none" ;
    //          } else {
    //              alert("nesto je krenulo po zlu");
    //          }
            

               
    //        } else {
    //            alert("pogrsna lozinka ili korisncko ime");
    //            admin.value = ""  ;
    //            pass.value = "";
    //        }

    //    }
       
    console.log("test");
    


   } else {
       alert("popunite oba polja");
   }

}
