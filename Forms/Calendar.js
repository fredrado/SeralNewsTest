import { Calendar } from 'react-native-calendars';
import { View, ImageBackground, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import React from 'react';

//Global
import * as GLOBAL from "../Global";

const { width, height } = Dimensions.get("window");

const background = require("../assets/slider2.jpg");


export default class CalendarSelector extends React.Component {

  // Initializes testval and testItem.
    constructor(props) {
        super(props);   

        this.state = {
            testval:"2020-7-2", currentval:"2020-07-02"
        }
    }

  //Muestro detalle
 ShowIngesta(strDate){
    var strSplitDate = String(strDate).split('-');
    var day1=strSplitDate[2]
    var mes1=strSplitDate[1]
    var anio1=strSplitDate[0]


    //Parametros
    GLOBAL.DiaSel=day1
    GLOBAL.MesSel=mes1
    GLOBAL.AnioSel=anio1
    //Abro pantalla
    this.props.navigation.push('Ingestas', {itemId:'1111'}) }
    
GetFormatedDate (strDate) {
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

  render() {
    return (
      <View style={{ flex: 1 }}>
       <ImageBackground source={background} style={styles.background} resizeMode="cover" blurRadius={2}>
     
        <Text style={{marginTop:5, textAlign:'center',  color: "#FFF", fontSize: 18}}>
            Menu {GLOBAL.NombreMenuSel}
        </Text>
        <Calendar style={{margin: 10,  borderRadius:5, opacity:0.9}}
          // Initially visible month. Default = Date()
          startDate={this.state.currentval}
          endDate={this.state.currentval}
          current={this.state.currentval}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2020-07-02'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2030-12-31'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            console.log('selected day', day);
            this.setState({
            testval:day.year +'-'+ day.month +'-'+ day.day, currentval:day.dateString
            });
          }}
          theme={{
            activeDayColor: {},
            monthTitleTextStyle: {
              color: '#6d95da',
              fontWeight: '300',
              fontSize: 16,
            },
              activeDayTextStyle: {
              color: 'white',
            },
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
        />
         <Text style={{marginTop:5, textAlign:'center',  color: "#FFF", fontSize: 18}}>
            {this.GetFormatedDate(this.state.testval)} 
        </Text>
        <TouchableOpacity activeOpacity={.5} onPress={this.ShowIngesta.bind(this,this.state.testval)}>
          <View style={styles.button}>
            <Text style={styles.buttonText} onPress={this.ShowIngesta.bind(this,this.state.testval)} >Siguiente</Text>
          </View>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,

  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color:"white",
  },
  button: {
    backgroundColor: "#d73352",
    paddingVertical: 15,
    marginVertical: 15,
    marginHorizontal:15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius:25
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
    textAlign:"center",
  }
 
});
