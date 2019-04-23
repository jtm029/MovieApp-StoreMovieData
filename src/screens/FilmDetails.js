import React from 'react';
import { StyleSheet, ImageBackground, Button, Dimensions, Text, View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const api_key = 'LHEEjsU7WC74YChhCWpzt9qQ2PE4goA05dDZsmQ5';
const endpoint = 'https://api-gate2.movieglu.com/';
const baseUrl = 'filmDetails/?film_id=';
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
var FullDate = year+'-'+month+'-'+date+'T'+hours+':'+min+':'+sec+'Z';
var headers = {
    'api-version': `${api_version}`,
    'x-api-key': `${api_key}`,
    'Authorization': `${Authorization}`,
    'client': `${client}`,
    'territory': `${territory}`,
    'device-datetime': `${FullDate}`
}

const getCinemas = () => {
  Actions.nearby()
}

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        isLoading: true,  //Set initial states
        movies: [],
    }
}

componentDidMount () { 
  return fetch(`${endpoint}${baseUrl}${this.props.Id}`, {
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

   playVideo() {
    this.refVideoPlayer && this.refVideoPlayer.seek(0);
    this.setState({isVideoPaused: false});
}

render() {
  const { movies } = this.state;
  var im = ((movies || {}).images || {});
  const pos = 1;
  var stil = im["still"];
  //var link = null;

  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Get the size of an object
var size = Object.size(stil);

  console.log(size);
  if(size === 0){
  //  link = im.poster = {};
  }
  else
   // link = stil = {};

    console.log(movies);
//    console.log(still["medium"]);
//console.log(movies);
    if(this.state.isLoading){ //Load activity if api fails to return
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    } 

    return (
      <View style={styles.container}>
      <Video source={{uri: `${movies.trailers.high[0].film_trailer}`}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       paused={this.state.isVideoPaused}    // This is ``falsy`` initially
       loop={true}
       autoplay={true}                
       onEnd={() => this.setState({isVideoPaused: true})}    
       style={styles.backgroundVideo} />
       <ImageBackground style={styles.image} source={{uri: `${movies.images.still[1].medium.film_image}`}}>
       <ImageBackground source={require('../screens/res/black.png')} style={styles.image2}>
       <Text style={styles.Title}>{movies.film_name}</Text>
       <Text style={styles.Text}>Advisory:  {movies.age_rating[0].age_advisory}</Text>
       <View style={{flexDirection: 'row'}}>
       <Text style={styles.Text}>Rated:  {movies.age_rating[0].rating}</Text>
       <Text style={styles.Text2}>Release Date: {movies.release_dates[0].release_date}</Text>
       </View>
       <Text style={styles.Text}>Duration:  {movies.duration_mins}mins</Text>
       <Text style={styles.Text}>Genre:  {movies.genres[0].genre_name}</Text>
       <Text style={styles.Title}>Cast</Text>
       <Text style={styles.Text}>• {movies.cast[0].cast_name}</Text>
       <Text style={styles.Text}>• {movies.cast[1].cast_name}</Text>
       <Text style={styles.Text}>• {movies.cast[2].cast_name}</Text>
       <TouchableOpacity style={styles.Button}>
       <Button title="Find Your Cinema" color='#5b000f' style={styles.Button} onPress={getCinemas}/>
       </TouchableOpacity >
       </ImageBackground>
      </ImageBackground>
        </View>
    );
  }
}
/*Get nearby cinema -> get cinema details and film show times for the cinema */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  Button: {
    // width: '100%', 
    //   height: 50, 
    //   backgroundColor: '#FF9800', 
    //   justifyContent: 'center', 
    //   alignItems: 'center',
    //   position: 'absolute',
    //   bottom: 0
    marginTop: '7%'
    
  },
  Text: {
    fontSize: 15,
    paddingTop : '3%',
    paddingLeft: '2%',
    color: 'white',
  },
  Text2: {
    fontSize: 15,
    paddingTop : '3%',
    paddingLeft: '2%',
    color: 'white',
    textAlign: 'right',
    flex:1,
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop : '1%',
    textAlign: 'center',
    color: 'white',
  },
  Title2: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop : '1%',
    textAlign: 'left',
    color: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    marginTop: '-100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    marginTop: '100%',
    width: deviceWidth,
    height: '100%',
  },
  image2: {
    width: deviceWidth,
    height: '100%',
    flex: 1
  },
});
