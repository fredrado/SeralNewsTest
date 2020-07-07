
  //Devuelve el nombre de la ingesta
  export function GetIngesta (item_name) {
     var valIngesta="Error"

     switch(item_name) {
        //Desayuno
        case "1":
          valIngesta= "Desayuno"
          break;
        //Comida
        case "2":
          valIngesta= "Comida";
          break;
        //Merienda
        case "3":
          valIngesta= "Merienda";
          break;
        //Cena
        case "4":
          valIngesta= "Cena";
          break;
        default:
          valIngesta= item_name;
          break;
    }

    return valIngesta;

  }
  
  //Devuelve fecha formateada
  export function GetFormatedDate (strDate) {
    var strSplitDate = String(strDate).split('-');
    var day1=strSplitDate[2]
    var mes1=strSplitDate[1]
    var anio1=strSplitDate[0]

    var MonthArray ="";

    if (day1 < 10) {
        day1 = '0' + day1;
    }
    if (mes1 < 10) {
        mes1 = '0' + mes1;
    }

    var date = new Date(anio1 + '-' + mes1 + '-' + day1);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
   
   switch (mm){
      case "01":
        MonthArray= "Enero";
        break;
      case "02":
        MonthArray= "Febrero";
        break;
      case "03":
        MonthArray= "Marzo";
        break;
      case "04":
        MonthArray= "Abril";
        break;
      case "05":
        MonthArray= "Mayo";
        break;
      case "06":
        MonthArray= "Junio";
        break;
      case "07":
        MonthArray= "Julio";
        break;
      case "08":
        MonthArray= "Agosto";
        break;
      case "09":
        MonthArray= "Septiembre";
        break;
      case 10:
        MonthArray= "Octubre";
        break;
      case 11:
        MonthArray= "Noviembre";
        break;
      case 12:
        MonthArray= "Diciembre";
        break;
      default:
        MonthArray= "Error";
   }

    
    //date =  dd + "/" + mm + "/" + yyyy;
    return dd + ' de ' + MonthArray + ' del ' + yyyy;

  }

    //Devuelve el nombre de la ingesta
  export function GetAlergeno (item_name) {
     var valAlergeno="Error"

     switch(item_name) {
        //Desayuno
        case "14":
          valAlergeno= "Altramuces"
          break;
        //Comida
        case "15":
          valAlergeno= "Apio";
          break;
        //Merienda
        case "16":
          valAlergeno= "Cacahuetes";
          break;
        //Cena
        case "17":
          valAlergeno ="Cereales con gluten";
          break;
        case "18":
          valAlergeno ="Crustaceos";
          break;
        case "19":
          valAlergeno ="Frutos con cascara";
          break;
        case "20":
          valAlergeno ="Huevos";
          break;
        case "21":
          valAlergeno ="Leche";
          break;
        case "22":
          valAlergeno ="Moluscos";
          break;
        case "23":
          valAlergeno ="Mostaza";
          break;
        case "24":
          valAlergeno ="Pescado";
          break;
        case "25":
          valAlergeno ="Granos de sesamo";
          break;
        case "26":
          valAlergeno ="Soja";
          break;
        case "27":
          valAlergeno ="Sulfitos";
          break;
        case "28":
          valAlergeno ="Alergico a las legumbres";
          break;

        default:
          valAlergeno= item_name;
          break;
    }

    return valAlergeno;

  }

