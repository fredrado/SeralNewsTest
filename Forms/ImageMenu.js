import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet, View, Platform, Text, Alert } from 'react-native';

class ImageComponent extends Component {

  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.imageHolder}>
        <Image source={{ uri: this.props.imageURI }} style={styles.image} />
        <View style={styles.textViewHolder}>
          <Text numberOfLines={1} style={styles.textOnImage}>
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}

export default class ImageMenu extends Component {

  constructor() {
    super();
    this.state = { imagesData: null, loading: true, gridView: false, btnText: 'Show Grid' }
  }

  //Carga al inicial pantalla
  componentDidMount() {
    //Menu en JSON --- En funcion del JSON carga una App u otra
    //SeralNews=http://seral-service.com/imagenes/News.json
    //SeralNews=http://seral-service.com/imagenes/Menu.json
    fetch('http://seral-service.com/imagenes/Menu.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ imagesData: responseJson, loading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeView = () => {
    this.setState({ gridView: !this.state.gridView }, () => {
      if (this.state.gridView) {
        this.setState({ btnText: 'Show List' });
      }
      else {
        this.setState({ btnText: 'Show Grid' });
      }
    });
  }

  //Al pulsar item
  GetItem (item_name) {
  

    switch(item_name) {
        //QR
        case "1":
          this.props.navigation.push('QR', {
                                itemId:"1111",
                              })
          break;
        //Menus
        case "2":
          this.props.navigation.push('Dietas', {
                          itemId:"1111",
                        })
          break;
        //Pedidos
        case "3":
          this.props.navigation.push('CabOrder', {
                itemId:"1111",
              })
          break;
        //Tickets
        case "4":
          this.props.navigation.push('Tickets', {
                itemId:"1111",
              })
          break;
        //Especiales
        case "5":
          this.props.navigation.push('Events', {
                itemId:"1111",
              })
          break;
        //Sobre nosortos
        case "6":
          this.props.navigation.push('About', {
                itemId:"1111",
              })
          break;
        //Noticias
        case "7":
          this.props.navigation.push('News', {
                        itemId:"1111",
                      })
          break;
        //Contacto
        case "8":
          this.props.navigation.push('Contact', {
                        itemId:"1111",
                      })
          break;
        //Codigo Menu
        case "9":
          this.props.navigation.push('CodeMenu', {
                        itemId:"1111",
                      })
          break;
        default:
          Alert.alert("Elemento no encotrado " + item_name);
    
    }

  }

  //<TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} onPress={this.changeView}>
    //  <Text style={styles.buttonText}>{this.state.btnText}</Text>
  //</TouchableOpacity>

  render() {
    return (
      <View style={styles.container} >
        {
          (this.state.loading)
            ?
            (<View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Please Wait...</Text>
            </View>)
            :
            (<View style={{ flex: 1 }}>

          
              <FlatList keyExtractor={(item) => item.id}
                key={(this.state.gridView) ? 1 : 0}
                numColumns={this.state.gridView ? 2 : 1}
                data={this.state.imagesData}
                renderItem={({ item }) =>
                <TouchableOpacity  onPress={ this.GetItem.bind(this, item.id)}>
                  <ImageComponent imageURI={item.download_url} name={item.author} code={item.id} />
                </TouchableOpacity>
                } />

            </View>)
        }
      </View>
    );
  }
}

//Estilos
const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    imageHolder: {
      margin: 5,
      height: 160,
      flex: 1,
      position: 'relative'
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover'
    },
    textViewHolder: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      paddingHorizontal: 10,
      paddingVertical: 13,
      alignItems: 'center'
    },
    textViewHolderUp: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      paddingHorizontal: 10,
      paddingVertical: 13,
      alignItems: 'center'
    },
    textOnImage: {
      color: 'white'
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadingText: {
      paddingTop: 10,
      fontSize: 18,
      color: 'black'
    },
    buttonDesign: {
      padding: 15,
      backgroundColor: '#e91e63'
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'stretch'
    }
  });