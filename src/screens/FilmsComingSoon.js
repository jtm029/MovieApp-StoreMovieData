import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, StatusBar} from 'react-native';
import Category from '../Components/Category'

const api_key = 'LHEEjsU7WC74YChhCWpzt9qQ2PE4goA05dDZsmQ5';
const endpoint = 'https://api-gate2.movieglu.com/';
const baseUrl = 'filmsComingSoon/?n=15';
const Authorization = 'Basic UEVSU18zMDo4eEV0VURtT0VHYlI=';
const api_version = 'v200';
const client = 'PERS_30';
const territory = 'US';

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

export default class FilmsComingSoon extends React.Component {
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

  for(i = 0; i < numItems; i++){
        posters.push(films[i].images.poster[1].medium.film_image);
  }

console.log(films);
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
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "black" translucent = {true}/>
      <ScrollView
            ref="_ScrollView"
            scrollEnabled
            horizontal
            scrollEventThrottle={16}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}>
        <Category imageUri={`${posters[0]}`} filmId={`${films[0].film_id}`}/>
        <Category imageUri={`${posters[1]}`} filmId={`${films[1].film_id}`}/>
        <Category imageUri={`${posters[2]}`} filmId={`${films[2].film_id}`}/>
        <Category imageUri={`${posters[3]}`} filmId={`${films[3].film_id}`}/>
        <Category imageUri={`${posters[4]}`} filmId={`${films[4].film_id}`}/>
        <Category imageUri={`${posters[5]}`} filmId={`${films[5].film_id}`}/>
        <Category imageUri={`${posters[6]}`} filmId={`${films[6].film_id}`}/>
        <Category imageUri={`${posters[7]}`} filmId={`${films[7].film_id}`}/>
        <Category imageUri={`${posters[8]}`} filmId={`${films[8].film_id}`}/>
        <Category imageUri={`${posters[9]}`} filmId={`${films[9].film_id}`}/>
        <Category imageUri={`${posters[10]}`} filmId={`${films[10].film_id}`}/>
        <Category imageUri={`${posters[11]}`} filmId={`${films[11].film_id}`}/>
        <Category imageUri={`${posters[12]}`} filmId={`${films[12].film_id}`}/>
        <Category imageUri={`${posters[13]}`} filmId={`${films[13].film_id}`}/>
        <Category imageUri={`${posters[14]}`} filmId={`${films[14].film_id}`}/>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  menu: {
    flex: 1,
    height: '110%',
    position: 'absolute',
    resizeMode: 'contain',
    marginLeft: '87%',
    bottom: 3,
  }
});
