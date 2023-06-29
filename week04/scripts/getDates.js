function setCopyrightDate(){
    year=new Date().getYear();
    if (year<1900)
      year+=1900;
    document.getElementById("currentYear").innerHTML = year;
  }
  
  setCopyrightDate();
  
  
  function lastModified(){
    let text = document.lastModified;
    document.getElementById("lastModified").innerHTML = text;
  }
  
lastModified();