//This is an example of Tab inside Navigation Drawer in React Native//
import React from 'react';
//import react in our code.
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FileSystem, Alert, Icon, Image, Share, Request, Headers, RNFetchBlob, WebView, } from 'react-native';
//import RNFetchBlob from 'rn-fetch-blob';

// import all basic components
import PDFReader from 'rn-pdf-reader-js';
//import PDFView from 'react-native-view-pdf';


import GLOBAL from '../Global';
import LinearGradient from 'expo-linear-gradient';
//import {decode as atob, encode as btoa} from 'base-64'


export default class ViewerPDF extends React.Component {

  makeDowload() {
   
     
  }
  
  render() {
    
    return (
    <View style={styles.container2}>
        <View style={{flex: 1, flexDirection: 'row', height:  50, justifyContent:'space-around'}}>
        <PDFReader style={styles.pdfStyle}
              source={{ uri:"http://www.seral-service.com/Tripticos/Español/AS2.pdf" }}
        /> 
      </View>
    </View>
      
    );
  }
}

const styles = StyleSheet.create({

  container2: {
    flexDirection:'column',
    justifyContent: 'center',
    flex: 1,
    padding: 8,
    //alignItems: 'center',
    backgroundColor: 'white', //'#2c3e50',
  },
  pdfStyle:{
    flex:8,
    //flexGrow:13,
    //height:500,
    borderRadius : 7,
    marginTop: 10
  }, 


  });
