import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  DatePickerAndroid,
  Alert,
  FlatList,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

//import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import TabNavigator from 'react-navigation'
//import { createTabNavigator } from '@react-navigation/tab';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'react-native-modal';


//Constantes
const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");
const background = require("./assets/slider1.jpg");
const backgroundQR = require("./assets/slider3.jpg");
const lockIcon = require("./assets/lock.png");
const personIcon = require("./assets/person.png");

const backgroundAbout = require("./assets/slider2.jpg");
const mark = require("./assets/lock.png");
const phoneIcon = require("./assets/lock.png");

//Pantallas
import ImageMenu  from './Forms/ImageMenu';
import Contact  from './Forms/Contact';
import About  from './Forms/About';
import Calendar  from './Forms/Calendar';
import CabOrder  from './Forms/CabOrder';
import Order  from './Forms/Order';
import Events  from './Forms/Events';
import Tickets  from './Forms/Tickets';
import EditOrder  from './Forms/EditOrder';
import Dietas  from './Forms/Dietas';
import Ingestas  from './Forms/Ingestas';
import News  from './Forms/News';
import ViewerPDF  from './Forms/ViewerPDF';
import Alergens  from './Forms/Alergens';
import Ingredients  from './Forms/Ingredients';

//Global
import * as GLOBAL from "./Global";


//Login
class Login extends  React.Component {

  // Initializes user and pass
    constructor(props) {
        super(props);   

        this.state = {
            username:" ", password:" ", visibleModal: null, textmodal:"Modal"
        }
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
      {this._renderButton('Aceptar', () => this.setState({ visibleModal: null }))}
    </View>
  );



//Funcion llamada a WebService ***********************************************
 webCall=(user, pass)=>{



try {
  console.log('begin')

  //Parametros de entrada
  const { navigation } = this.props;

  //Llamada a WebService
  const strCall ='https://webrestservice.seral-service.com/AppTPV/Users/001/' + user
  console.log(strCall);


   fetch(strCall)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,

             userJson: responseJson[0].IdUsuario,
             passJson: responseJson[0].Password,
             nameJson: responseJson[0].Nombre,
             idcocinaJson: responseJson[0].IdCocina,
             idclienteJson: responseJson[0].IdCliente
           }, function() {
             // In this block you can do something with new state.
            //const descriptions = this.state.dataSource.Response.Data.DataHolder.map(item => Object.values(item)[0]);

            console.log(this.state.userJson)
            console.log(this.state.passJson)
            console.log(this.state.nameJson)
            console.log(this.state.idcocinaJson)
            console.log(this.state.idclienteJson)

            //Compruebo contraseña
            if( this.state.passJson == pass ){
              //Variables globales
              GLOBAL.idUsuario=user;
              GLOBAL.Usuario=this.state.nameJson;
              GLOBAL.idCliente=this.state.idclienteJson;
              GLOBAL.idCocina=this.state.idcocinaJson;
              console.log('Cocina:' + GLOBAL.idCocina)
              console.log('Cliente:' + GLOBAL.idCliente)
              //Cambio de pantalla
              this.props.navigation.push('Home', {itemId:"1111",})          
            }
            else{
          
              //Alert.alert("Contraseña incorrecta")
              this.setState({ textmodal: "Contraseña incorrecta",visibleModal: 5})
            }

           });
         })
         .catch((error) => {
            //Alert.alert('Usuario no reconocido');
            this.setState({ textmodal: "Usuario no reconocido'",visibleModal: 5})
           console.error(error);
         });

  } catch (e) {
    //Alert.alert('Usuario no reconocido');
    this.setState({ textmodal: "Usuario no reconocido'",visibleModal: 5})
    console.log('Error')
  }


 }

  render() {
    return (
      <ImageBackground 
        style={[styles.background, styles.container]} 
        source={background}
        resizeMode="cover"
        blurRadius={2}
      >
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image
                source={personIcon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              placeholder="Usuario"
              style={styles.input}
              onChangeText={username => this.setState({username})}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image
                source={lockIcon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              style={styles.input}
              onChangeText={password => this.setState({password})}
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableOpacity activeOpacity={.5} onPress={() => this.webCall(this.state.username, this.state.password)}>
            <View style={styles.button}>
              <Text style={styles.buttonText} onPress={() => this.webCall(this.state.username, this.state.password)}>Conectar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5}>
            <View>
              <Text style={styles.forgotPasswordText}>¿Olvido la Contraseña?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container} />
        <Modal isVisible={this.state.visibleModal === 5} style={styles.bottomModal}>
          {this._renderModalContent()}
        </Modal>
      </ImageBackground>
    );
  }
}

//Codigo de Menu
class CodeMenu extends  React.Component {

  // Initializes user and pass
    constructor(props) {
        super(props);   

        this.state = {
            code:" ", visibleModal: null, textmodal:"Modal"
        }
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
      {this._renderButton('Aceptar', () => this.setState({ visibleModal: null }))}
    </View>
  );



//Funcion llamada a WebService ***********************************************
webCall=(code)=>{

try {
  console.log('begin')

  //Parametros de entrada
  const { navigation } = this.props;

  //Llamada a WebService
  const strCall ='https://webrestservice.seral-service.com/AppMenus/CodeMenu/' + code
  console.log(strCall);


   fetch(strCall)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             urlJson: responseJson[0].Url

           }, function() {
             // In this block you can do something with new state.
            //const descriptions = this.state.dataSource.Response.Data.DataHolder.map(item => Object.values(item)[0]);
            console.log(this.state.urlJson)
             //Variables globales
            GLOBAL.MenuSource=code;

           });
         })
         .catch((error) => {
            //Compruebo clave
            this.setState({ textmodal: "Clave incorrecta",visibleModal: 5})
           console.error(error);
         });

  } catch (e) {
      //Error
      this.setState({ textmodal: "Clave incorrecta",visibleModal: 5})
      console.log('Error')
  }


 }

  render() {
    return (
      <ImageBackground 
        style={[styles.background, styles.container]} 
        source={background}
        resizeMode="cover"
        blurRadius={2}
      >
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image
                source={personIcon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              placeholder="Clave del Menu"
              style={styles.input}
              onChangeText={username => this.setState({username})}
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.push('ViewerPDF', {itemId:'1111'})}>
            <View style={styles.button}>
              <Text style={styles.buttonText} onPress={() => this.webCall(this.state.username, this.state.password)}>Menu español</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.push('ViewerPDF', {itemId:'1111'})}>
            <View style={styles.button}>
              <Text style={styles.buttonText} onPress={() => this.webCall(this.state.username, this.state.password)}>Menu ingles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.push('ViewerPDF', {itemId:'1111'})}>
            <View style={styles.button}>
              <Text style={styles.buttonText} onPress={() => this.webCall(this.state.username, this.state.password)}>Otros</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5}>
            <View>
              <Text style={styles.forgotPasswordText}>¿Olvido la Clave?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container} />
        <Modal isVisible={this.state.visibleModal === 5} style={styles.bottomModal}>
          {this._renderModalContent()}
        </Modal>
      </ImageBackground>
    );
  }
}


//Pantalla codigo QR
class ScreenQR extends React.Component {

constructor() {
    super();
    this.state = {
      date: new Date().getVarDate,
      dateText: 'Seleccione una fecha',
      
      //valueForQRCode: '442'
    }

    this.showDatePicker.bind(this);
  }
 

  //Selector de fecha
  showDatePicker = async (options) => {

    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        
        let date = new Date(year, month, day);
        let newState = {};
        newState['date'] = date;
        newState['dateText'] = date.toLocaleDateString("en-US");

       
        this.setState(newState);

        this.props.navigation.navigate('Add', {
              intDay: date.getDate(),
              intMonth: date.getMonth()+1,
              intYear: date.getFullYear(),
              otherParam: 'anything you want here',

             

            });
      }
    } catch ({code, message}) {
      console.warn(`error `, code, message);
    }
  };
  
  render() {
    
    const { navigation } = this.props;
    const valueForQRCode = GLOBAL.idUsuario; //navigation.getParam('itemId', '0');
    console.log(valueForQRCode)

    return (
      <ImageBackground 
        style={[styles.background, styles.container]} 
        source={backgroundQR}
        resizeMode="cover"
        blurRadius={2}
      >
      <View style={{  flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin:50, paddingLeft:20, paddingRight:20}}>

        <Text style={styles.nameText}>
            {GLOBAL.Usuario}
        </Text>

        <View style={{
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#ddd',
            borderBottomWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 90,
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: this.props.overflow ? this.props.overflow : 'hidden',
            width: 280,
            height: 280}}>
            <QRCode style={{alignItems: 'center', margin: 20, justifyContent: "center", textAlign: 'center'}}
                //QR code value
                value={valueForQRCode} //{navigation.getParam('itemId', '0')}
                //size of QR Code
                size={250}
                margin = {20}
                paddingLeft={150}

                //Color of the QR Code (Optional)
                color="black"
                //Background Color of the QR Code (Optional)
                backgroundColor="white"
              />
        </View>
        <Text style={styles.nameText}>
            Pase el codigo QR por el lector ...
        </Text>
      </View>
      </ImageBackground>
    );
  }
}


//Logo barra de tareas
function LogoTitle() {
  return (
      <Image
        style={{ width: 40, height: 40, marginLeft: width-70, marginTop: 5, resizeMode:"stretch"}}
        source={{uri:"http://seral-service.com/imagenes/logo.png"}}
      />
      
  );
}

//Navegador de pestañas
const TabStack = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Recetas" component={EditOrder} />
        <Tab.Screen name="Ingredientes" component={Ingredients} />
        <Tab.Screen name="Alergenos" component={Alergens} />
      </Tab.Navigator>
  );
}


//Navegador de pila
const Stack = createStackNavigator();
//Configuracion
//SeralNews= initialRouteName="Home"
//SeralMiMenu= initialRouteName="Login"
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          headerMode='none'
          name="Login"
          headerTitle="Conexion ..."
          component={Login}
           options={{
            title:"Conexion ...",
          }}
        />
        <Stack.Screen
          headerMode='screen'
          name="Home"
          title="Menu"
          component={ImageMenu}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Inicio",
          }}
        />
      <Stack.Screen
          name="QR"
          title="Codigo QR"
          component={ScreenQR}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Codigo QR",
          }}
        />
      <Stack.Screen
          name="Contact"
          title="Contacto"
          component={Contact}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Contacto",
          }}
        />
      <Stack.Screen
          name="About"
          title="Sobre nosostros"
          component={About}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Sobre nosotros",
          }}
        />
        <Stack.Screen
          name="CabOrder"
          title="Lista pedido"
          component={CabOrder}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Lista de  pedidos",
          }}
        />
        <Stack.Screen
          name="Order"
          title="Detalle pedido"
          component={Order}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Detalle pedido",
          }}
        />
        <Stack.Screen
          name="Events"
          title="Detalle pedido"
          component={Events}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Eventos",
          }}
        />
        <Stack.Screen
          name="Tickets"
          title="Detalle pedido"
          component={Tickets}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Tickets",
          }}
        />
        <Stack.Screen
          name="Dietas"
          title="Detalle pedido"
          component={Dietas}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Tipo de Menu",
          }}
        />
        <Stack.Screen
          name="Calendar"
          title="Pedido: Paso 2"
          component={Calendar}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Fecha",
          }}
        />
        <Stack.Screen
          name="Ingestas"
          title="Detalle pedido"
          component={Ingestas}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Ingesta",
          }}
        />
        <Stack.Screen
          name="EditOrder"
          title="Detalle pedido"
          component={EditOrder}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Recetas",
          }}
        />
        <Stack.Screen
          name="News"
          title="Detalle pedido"
          component={News}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Noticias Seral",
          }}
        />
        <Stack.Screen
          name="CodeMenu"
          title="Detalle pedido"
          component={CodeMenu}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Visualizar Menu",
          }}
        />
        <Stack.Screen
          name="ViewerPDF"
          title="Detalle pedido"
          component={ViewerPDF}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Visualizar Menu",
          }}
        />
        <Stack.Screen
          name="Tabs"
          title="Detalle pedido"
          component={TabStack}
          options={{
            headerRight: props => <LogoTitle {...props} />,
            title:"Recetas",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

//Estilos *******************************************************
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:0,
  },
  background: {
    width: null,
    height: null
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    backgroundColor: "transparent"
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d73352"
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#d73352",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:25
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18
  },
  forgotPasswordText: {
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center"
  },
  nameText: {
    fontSize: 18,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center",
    margin:40
  },


  list: {
    //paddingHorizontal: 5,
    backgroundColor:"white",
  },
  listContainer:{
    alignItems:'center'
  },

  /******** card **************/
  card:{
    marginHorizontal:5,
    marginVertical:5,
    flexBasis: '48%',
    borderRadius:10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 70,
    width: 70,
    alignSelf:'center'
  },
  title:{
    fontSize:16,
    flex:1,
    color:"#FFFFFF",
    fontWeight:'bold'
  },
  subTitle:{
    fontSize:12,
    flex:1,
    color:"#FFFFFF",
  },
  iconCard:{
    height: 20,
    width: 20, 
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

  textModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});