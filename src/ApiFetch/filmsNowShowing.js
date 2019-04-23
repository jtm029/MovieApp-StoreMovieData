import React from 'react';
import { StyleSheet, Animated, ScrollView, Text, View, Dimensions, ActivityIndicator, Image, StatusBar, ImageBackground } from 'react-native';

const api_key = 'Y5U7inFr6AaAofmeHmUcq7Rbjz8Gar5A7F6exih0';
const endpoint = 'https://api-gate2.movieglu.com/';
const baseUrl = 'filmsNowShowing/?n=25';
const Authorization = 'Basic UEVSU18yMzp0SkdxcEx3aXBzQWk=';
const api_version = 'v200';
const client = 'PERS_23';
const territory = 'US';
const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds
var FullDate = year+'-'+month+'-'+date+'T'+hours+':'+min+':'+sec+'Z';
var headers = {
    'api-version': `${api_version}`,
    'x-api-key': `${api_key}`,
    'Authorization': `${Authorization}`,
    'client': `${client}`,
    'territory': `${territory}`,
    'device-datetime': `${FullDate}`
}

export default class NowMovies extends React.Component {
    
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
  var films = ((movies || {}).films || {});
  var status = ((movies || {}).status || {});
  var posters = [];
  var numItems = status.count;
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE);
  animVal = new Animated.Value(0);

  for(i = 0; i < numItems; i++){
        posters.push(films[i].images.poster[1].medium.film_image);
  }

  let imageArray = []
  let barArray = []
  posters.forEach((image, i) => {
    console.log(image, i)
    const thisImage = (
      <Image key={`image${i}`} source={{uri: image}} style={{ width: deviceWidth }} />
    )
    imageArray.push(thisImage)


      const thisBar = (
        <View key={`bar${i}`} style={[ styles.track, {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,},]}>
          <Animated.View style={[styles.bar, {
            width: this.itemWidth,
            transform: [
              { translateX: 4 }, ],},]}/>
    </View>
  )
  barArray.push(thisBar)
})

    if(this.state.isLoading){ //Load activity if api fails to return
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    } 

    return (
      <View style={styles.container}>
          {imageArray}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4f0303',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    marginTop: 40,
    flexDirection: 'row',
  },
  image: {
    marginTop: '-30%',
    width: '100%',
    height: '49%',
  },
  image2: {
    opacity: 0.5,
    marginTop: 18,
    width: '100%',
    height: '100%',
  },
});
