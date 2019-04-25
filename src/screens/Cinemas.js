import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, View, Dimensions, ActivityIndicator, StatusBar} from 'react-native';
import Video from 'react-native-video';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const api_key = '49AsdRz3X19fXjsiuQXJI6aahdkOxUwB8BxLC3OT';
const endpoint = 'https://api-gate2.movieglu.com/';
const baseUrl = 'cinemasNearby/?n=5';
const Authorization = 'Basic UEVSU18zNDpxOG5QSzd0eWRnY2Y=';
const api_version = 'v200';
const client = 'PERS_34';
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
var headers = {
  'Geolocation': `37.42;-122.08`,
  'api-version': `${api_version}`,
  'x-api-key': `${api_key}`,
  'Authorization': `${Authorization}`,
  'client': `${client}`,
  'territory': `${territory}`,
  'device-datetime': `${FullDate}`, }

class Cinemas extends Component {
  constructor(props){
    super(props);
    this.state = {
        isLoading: true,  //Set initial states
        movies: [],
    }
}

componentDidMount () { 
console.log(this.props.geo);
console.log(FullDate);

  return fetch(`${endpoint}${baseUrl}`, {
    method: 'GET',
    headers: headers })
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
        <View style={styles.movie}><Text style={styles.Text}>{movies.cinemas[0].cinema_name}</Text></View>
        <View style={styles.movie2}><Text style={styles.Text}>{movies.cinemas[1].cinema_name}</Text></View>
        <View style={styles.movie3}><Text style={styles.Text}>{movies.cinemas[2].cinema_name}</Text></View>
        <View style={styles.movie4}><Text style={styles.Text}>{movies.cinemas[3].cinema_name}</Text></View>
        <View style={styles.movie5}><Text style={styles.Text}>{movies.cinemas[4].cinema_name}</Text></View>
        </ImageBackground>
      </View>
    );
  }
}

export default Cinemas; 

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    flexDirection: 'column',
    backgroundColor: '#5b000f',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
    height: '100%'
  },
  Text: {
    fontSize: 15,
    paddingLeft: '0%',
    fontWeight: 'bold',
    paddingTop : '1%',
    textAlign: 'left',
    //justifyContent: 'center',
    color: 'white',
  },
  movie: {
    width: deviceWidth,
    height: '20%',
    backgroundColor: 'blue',
    borderWidth: 1.0,
    borderColor: 'white',
 },
 movie2: {
  width: deviceWidth,
  height: '20%',
  //backgroundColor: 'red',
  borderWidth: 1.5,
    borderColor: 'white',
},
movie3: {
  width: deviceWidth,
  height: '20%',
  backgroundColor: 'green'
},
movie4: {
  width: deviceWidth,
  height: '20%',
  backgroundColor: 'grey'
},
movie5: {
  width: deviceWidth,
  height: '20%',
  backgroundColor: 'black'
},
});