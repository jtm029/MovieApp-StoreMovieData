import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, View, Dimensions, ActivityIndicator, StatusBar} from 'react-native';
import Video from 'react-native-video';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const api_key = 'LHEEjsU7WC74YChhCWpzt9qQ2PE4goA05dDZsmQ5';
const endpoint = 'https://api-gate2.movieglu.com/';
const baseUrl = 'cinemasNearby/?n=5';
const Authorization = 'Basic UEVSU18zMDo4eEV0VURtT0VHYlI=';
const api_version = 'v200';
const client = 'PERS_30';
const territory = 'US';
const deviceWidth = Dimensions.get('window').width;

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds
var CurrentDate = year+'-'+month+'-'+date;
var FullDate = year+'-'+month+'-'+date+'T'+hours+':'+min+':'+sec+'Z';
var Headers = {
  'api-version': `${api_version}`,
  'x-api-key': `${api_key}`,
  'Authorization': `${Authorization}`,
  'client': `${client}`,
  'territory': `${territory}`,
  
}

class Cinemas extends Component {
  constructor(props){
    super(props);
    this.state = {
        isLoading: true,  //Set initial states
        movies: [],
    }
}

componentDidMount () { 
  return fetch(`${endpoint}${baseUrl}`, {
    method: 'GET',
    headers: JSON.stringify({'api-version': `${api_version}`,
    'x-api-key': `${api_key}`,
    'Authorization': `${Authorization}`,
    'client': `${client}`,
    'territory': `${territory}`,
    'device-datetime': `${FullDate}`,
    'Geolocation': `${this.props.geo}`}) 
  })
      .then ((response) => response.json())
      .then ((responseJson) => {
          this.setState({  //If data return set these states
              isLoading: false,
              movies: responseJson,
          })
      })

      .catch((error) => {
         console.log(error);  //Log error if nothing is returned *Or device is not connected to WiFi*
      });
    }

  render() {
    const { movies } = this.state;
    console.log(movies);
    if(this.state.isLoading){ //Load activity if api fails to return
      return (
          <View style={styles.container}>
              <ActivityIndicator/>
          </View>
      )
  } 

    return (
        <View style={styles.container}>
        <ImageBackground source={require('../screens/res/theatre.jpg')} style={{width: deviceWidth, height: '110%'}}>
        <Text style={{color: 'white'}}>Latitude: {this.props.Id}</Text>
        <Text style={{color: 'white'}}>Longitude: {this.props.geo}</Text>
        </ImageBackground>
      </View>
    );
  }
}

export default Cinemas; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5b000f',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
    height: '100%'
  },
  Button: {
    position: 'absolute',
    bottom: 0,
    //marginBottom: '143%',
    width: deviceWidth,
    height: '9%', 
    borderWidth: 2,
    backgroundColor: '#5b000f', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: 20,
    paddingLeft: '0%',
    fontWeight: 'bold',
    paddingTop : '1%',
    textAlign: 'center',
    //justifyContent: 'center',
    color: 'white',
  },
});