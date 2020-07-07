
import React, {PureComponent } from 'react';
import { Button, View, Text, StyleSheet, Alert, ActivityIndicator, FlatList, TextInput, Picker,  TouchableOpacity, Image, List, SearchBar, YellowBox, Platform, DatePickerAndroid, KeyboardAvoidingView, StatusBar, WebView, Headers, ImageBackground, Dimensions  } from 'react-native';
import Constants from 'expo-constants';

//Global
import * as GLOBAL from "../Global";

const background = require("../assets/slider2.jpg");
const { width, height } = Dimensions.get("window");

export default class Dietas extends React.Component {


 constructor(props) {

   super(props);

   this.state = {

     isLoading: true

   }

   YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
  ]);

 }
 
  //Muestro detalle
 ShowIngesta(menu, nombremenu){
    //Parametros
    GLOBAL.MenuSel=menu
    GLOBAL.NombreMenuSel=nombremenu
    //Abro pantalla
    this.props.navigation.push('Calendar', {itemId:'1111'}) }
    
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
  

 //evuelvo valor
  GetItem (item_name) {
  
    Alert.alert('Elemento seleccionado: ' + item_name);
  
  }
 
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

  //Funcion llamada a WebService ***********************************************
 webCall=()=>{

  //Parametros de entrada
  const { navigation } = this.props;
  //const intDay = navigation.getParam('intDay', '0');
  //const intMonth = navigation.getParam('intMonth', '0');
  //const intYear = navigation.getParam('intYear', '0');
  
  //const strCall ='http://192.168.125.10:2732/AppMenus/Recetas/001/500215/50006/001/2/' + intDay + '/' + intMonth +'/' + intYear +'/';
  //const strCall ='https://webrestservice.seral-service.com:443/FirmaAlbaranes/Usuarios/50076'
  //const strCall ='https://webrestservice.seral-service.com/AppTPV/Users/001/1234'


  //Llamada a WebService
  const strCall ='https://webrestservice.seral-service.com/AppMenus/Dietas/001/' + GLOBAL.idCliente + '/' + GLOBAL.idCocina
 
  //fetch('https://host.com', options)


  return fetch(strCall)
  //return fetch('http://192.168.125.10:2732/AppMenus/Recetas/001/10152/26001/001/' + intDay + '/' + intMonth +'/' + intYear +'/')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson,
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });

 }

 //Carga al abrir el componente
 componentDidMount(){

   
  this.webCall();
  console.log(this.dataSource)

 }
 
 render() {
   if (this.state.isLoading) {
     return (

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <ActivityIndicator size="large" />
       </View>
       
     );

   }
 
   return (
 
     <View style={styles.container2}>
       <ImageBackground source={background} style={styles.background} resizeMode="cover" blurRadius={2}>
    
        <FlatList style={{flex:1}}
          data={ this.state.dataSource }

          renderItem={({item}) => 
          <TouchableOpacity activeOpacity={.5} onPress={this.ShowIngesta.bind(this, item.Codigo,  item.Descripcion)}>
            <View style={styles.listItem}>
                
                <View style={{alignItems:"center",flex:1}}  >
                  
                  <Text onPress={this.ShowIngesta.bind(this, item.Codigo,  item.Descripcion)}  
                                style={{height:35}}>{item.Descripcion}</Text>
                </View>
               
              </View>
             </TouchableOpacity>
            }

          keyExtractor={(item, index) => index.toString()}
          
          />
        </ImageBackground>
     </View>
   );
 }
}


//Estilos
const styles = StyleSheet.create({



  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
    backgroundColor: '#2980b6',
    padding: 8,
  },

   container2: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:60
  },

  listItem:{
    margin:5,
    padding:5,
    backgroundColor:"#FFF",
    width:"95%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5,
    opacity:0.7
  },

  paragraph: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    paragraph_2: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
  },
    paragraph_3: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  text: {
      color: '#4f603c'
   },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  box: {
    flex: 1,
    height: 100,
    backgroundColor: '#2980b6',
  },
  box2: {
    backgroundColor: 'green'
  },
  box3: {
    backgroundColor: 'orange'
  },
  two: {
    flex: 2
  },

 container2: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    },

  container3: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    },
  background: {
    width,
    height,
  },
  MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
 
},
 
imageView: {

    width: 55,
    height: 55 ,
    margin: 10,
    borderRadius : 7
 
},
 
textView: {

    width:'50%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
});

