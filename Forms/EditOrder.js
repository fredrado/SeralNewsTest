import React from "react";
import{StyleSheet,View,ActivityIndicator,FlatList,Text,TouchableOpacity,Image, Button, ImageBackground, Dimensions} from "react-native";
import Constants from 'expo-constants';
import Modal from 'react-native-modal';

//Global
import * as GLOBAL from "../Global";

const { width, height } = Dimensions.get("window");


const background = require("../assets/slider2.jpg");

export default class EditOrder extends React.Component {


  constructor(props) {
  super(props)
  this.state = {
    loading: false,
    dataSource: [],
    visibleModal: null, 
    textmodal:"Modal"
   };
}

 _renderButton = (text, onPress) => (
    <TouchableOpacity activeOpacity={.5} onPress={onPress}>
      <View style={styles.buttonModal}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text> {this.state.textmodal}</Text>
      {this._renderButton('Aceptar', () => this.props.navigation.pop(4))}
    </View>
  );

 GetIngesta (item_name) {
     var valIngesta="Error"

     switch(item_name) {
        //QR
        case "1":
          valIngesta= "Desayuno"
          break;
        //Menus
        case "2":
          valIngesta= "Comida";
          break;
        //Pedidos
        case "3":
          valIngesta= "Merienda";
          break;
        //Tickets
        case "4":
          valIngesta= "Cena";
          break;
        default:
          valIngesta= item_name;
          break;
    }

    return valIngesta;

  }

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



UpdateOrder (receta) {

  var selected= this.state.selected
  //console.log(selected)
  //console.log(this.state.dataSource)

  //Recorro JSON
  for (let i in this.state.dataSource) {
    if (this.state.dataSource[i].isSelect == true) {
        console.log("Plato: " + this.state.dataSource[i].DescripcionPlato)
        //Grabo
        this.WebUpate	(this.state.dataSource[i].Plato)
    }
  }
  //Mensaje
  //alert("El pedido se ha grabado");
  this.setState({ textmodal: "El pedido se ha grabado",visibleModal: 5})
  //this.props.navigation.goBack() 
  //this.props.navigation.popToTop() 
  //this.props.navigation.pop(4) 
}

WebUpate(plato){

//Grabo
const webroute='https://webrestservice.seral-service.com/AppTPV/CreateOrder/001/' + GLOBAL.idUsuario + '/' + GLOBAL.idCliente + '/' + GLOBAL.idCocina + '/'
              + GLOBAL.DiaSel + '/' + GLOBAL.MesSel +'/' + GLOBAL.AnioSel + '/'  
              + GLOBAL.MenuSel + '/' + GLOBAL.IngestaSel + '/' + plato +'/1/'
console.log(webroute)
return fetch(webroute)
  .then(response => {

  if (response.ok) {
      //alert(response.url);
      return response;
  } else {
      alert('Error');
      let error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
  }
  },
  error => {
      let errmess = new Error(error.message);
      throw errmess;
});



}

componentDidMount() {this.fetchData();}

fetchData = () => {this.setState({loading: true});

//fetch("https://jsonplaceholder.typicode.com/photos")
//fetch("https://webrestservice.seral-service.com/AppTPV/Orders/001/DEMO/500347/50074/16/6/2020/001/2")
//fetch("https://webrestservice.seral-service.com/AppMenus/Recetas/001/500347/50074/001/2/30/06/2020")
fetch('https://webrestservice.seral-service.com/AppMenus/Recetas/001/' + GLOBAL.idCliente + '/' + GLOBAL.idCocina + '/' 
      + GLOBAL.MenuSel + '/' + GLOBAL.IngestaSel + '/' + GLOBAL.DiaSel + '/' + GLOBAL.MesSel +'/' + GLOBAL.AnioSel )
.then(response => response.json())
.then(responseJson => {
  responseJson = responseJson.map(item => {
    item.isSelect = false;
    item.selectedClass = styles.list;
  return item;
});


this.setState({
  loading: false,
  dataSource: responseJson,
});
}).catch(error => {this.setState({loading: false});
});
};

FlatListItemSeparator = () => <View style={styles.line} />;

selectItem = data => {
data.item.isSelect = !data.item.isSelect;
data.item.selectedClass = data.item.isSelect?
              styles.selected: styles.list;
const index = this.state.dataSource.findIndex(
  item => parseInt(data.item.id) === item.id
);
this.state.dataSource[index] = data.item;

this.setState({
  dataSource: this.state.dataSource, 
});
};


goToStore = () =>this.props.navigation.navigate("Expenses", {selected: this.state.selected,});


renderItem = data =>
 
  <TouchableOpacity
    style={[styles.list, data.item.selectedClass]}      
    onPress={() => this.selectItem(data)}
  >
  <Image
    source={{ uri: "http://seral-service.com/imagenes/" + data.item.TipoPlato + ".png" }} //source={{ uri: data.item.thumbnailUrl }}
    style={{ width: 40, height: 40, margin: 2 }}
  />
  <View style={{alignItems:"flex-start",flex:1}}>
  <Text style={styles.boldText}>  {data.item.TipoPlato.charAt(0).toUpperCase() + data.item.TipoPlato.slice(1)}  </Text>
  <Text style={styles.lightText}>  {data.item.DescripcionPlato.charAt(0).toUpperCase() + data.item.DescripcionPlato.slice(1)}  </Text>
  </View>
</TouchableOpacity>

render() {
const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;

if (this.state.loading) {return (
<View style={styles.loader}>
 <ActivityIndicator size="large" color="purple" />
</View>
);
}
 return (
   <View style={styles.container}>
   <ImageBackground source={background} style={styles.background} resizeMode="cover" blurRadius={2}>
      <Text style={{marginTop:5, textAlign:'center',  color: "#FFF", fontSize: 18}}>
        {this.GetFormatedDate(GLOBAL.AnioSel + '-' + GLOBAL.MesSel + '-' + GLOBAL.DiaSel)} 
      </Text>
      <Text style={{marginTop:5, textAlign:'center',  color: "#FFF", fontSize: 18}}>
          Menu {GLOBAL.NombreMenuSel}
      </Text>
     <Text style={{marginTop:5, textAlign:'center',  color: "#FFF", fontSize: 18}}>
          {this.GetIngesta(GLOBAL.IngestaSel)}
      </Text>
      <FlatList 
        data={this.state.dataSource}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        renderItem={item => this.renderItem(item)}
        //keyExtractor={item => item.id.toString()}
        extraData={this.state}
      />
 </ImageBackground>
  
    <View style={styles.numberBox} >
      <Text style={styles.number} onPress={this.UpdateOrder.bind(this, itemNumber)} >{itemNumber}</Text>
    </View>

   <Modal isVisible={this.state.visibleModal === 5} style={styles.bottomModal}>
      {this._renderModalContent()}
    </Modal>  
</View>
);}}


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F7F7F7',
  //marginTop:60,
  //paddingTop: Constants.statusBarHeight,
  //padding: 8
  //flex: 1,
  //backgroundColor: "transparent",
  paddingVertical:1,
  //position: "relative"
 },

 background: {
    width,
    height,
  },
  
 title: {
  fontSize: 20,
  color: "#fff",
  textAlign: "center",
  marginBottom: 10
},

loader: {
  flex: 1, 
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff"
},

list: {
  paddingVertical: 5,
  margin: 5,
  padding:5,
  flexDirection: "row",
  backgroundColor: "#192338",
  justifyContent: "flex-start",
  alignItems: "center",
  opacity:0.7,
  borderRadius:5,
  zIndex: -1
},

lightText: {
  color: "#f7f7f7",
  //width: 200,
  paddingLeft: 15,
  fontSize: 12,
  textAlign:"center"
 },

boldText: {
  color: "#f7f7f7",
  fontWeight: 'bold',
  //width: 200,
  paddingLeft: 15,
  fontSize: 12,
  textAlign:"center"
 },

 line: {
  height: 0.5,
  width: "100%",
  backgroundColor:"rgba(255,255,255,0.5)"
},

icon: {
  position: "absolute",  
  bottom: 20,
  width: "100%", 
  left: 290, 
  zIndex: 1
},

numberBox: {
  position: "absolute",
  bottom: 75,
  width: 60,
  height: 60,
  borderRadius: 30,  
  left: width -70,
  zIndex: 3,
  backgroundColor: "#e3e3e3",
  justifyContent: "center",
  alignItems: "center",
  
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
  
    buttonModal: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white', //'#192338',//'white',
    color: 'white',
    opacity:0.7,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

number: {fontSize: 14,color: "#000", fontWeight: 'bold'},

selected: {backgroundColor: "green"},

});



