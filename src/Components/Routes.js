import React from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Text, Image, TouchableOpacity, View,  Dimensions } from 'react-native';
import Home from '../screens/Home.js';
import Options from '../screens/Options';
import FilmDetails from '../screens/FilmDetails.js';
import FilmsComingSoon from '../screens/FilmsComingSoon';
import Cinemas from '../screens/Cinemas';
import Purchase from '../screens/Purchase';

const deviceWidth = Dimensions.get('window').width;

const goOptions = () => {
   Actions.options()
}

const HomeScreen = () => {
   return (
      <View style={{width: deviceWidth }}>
     <View style={{ marginTop: 8 , flex: 1}}>
     <TouchableOpacity onPress={goOptions}>
       <Image source={require('../screens/res/hmenu.png')}
              style={{ width: 65, height: 45 }} />
              </TouchableOpacity>
              <Text style={{ marginLeft: 165, width: deviceWidth, fontSize: 20, marginTop: -35, color: 'white', fontWeight: 'bold'}}>Films Now Showing</Text></View>
     </View>
   );
 };

 const ComingScreen = () => {
   return (
      <View style={{width: deviceWidth }}>
     <View style={{ marginTop: 8 , flex: 1}}>
      <Text style={{ marginLeft: 100, width: deviceWidth, fontSize: 20, marginTop: 12, color: 'white', fontWeight: 'bold'}}>Films Coming Soon</Text></View>
     </View>
   );
 };


const Routes = () => (
   <Router navigationBarStyle={{ backgroundColor: '#5b000f' , marginTop: '6%'}} navBarButtonColor='white'>
      <Scene key = "root">
         <Scene key = "home" component = {Home} renderTitle={() => { return <HomeScreen />; }} initial = {true}/>
         <Scene key = "details" component = {FilmDetails} title = "" />
         <Scene key = "options" component = {Options} title = "Options" />
         <Scene key = "soon" component = {FilmsComingSoon} renderTitle={() => { return <ComingScreen />; }}/>
         <Scene key = "nearby" component = {Cinemas} title = "Nearby" />
         <Scene key = "tickets" component = {Purchase} title = "Tickets" />
      </Scene>
   </Router>
)
export default Routes