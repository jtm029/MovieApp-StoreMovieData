import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, ImageBackground, TouchableOpacity, Image, View,  Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const goSoon = () => {
    Actions.soon()
 }

 const goNearby = () => {
    Actions.nearby()
 }

 const goPurchase = () => {
    Actions.tickets()
 }

class Options extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: ``,
        }
      };

      
    render(){
        return(
            <View style={styles.container}>
            <ImageBackground source={require('./res/theatre.jpg')} style={{width: deviceWidth, height: '110%'}}>
                <View style={{marginTop: '30%'}}>
                <TouchableOpacity onPress={goSoon}>
                <Text style={styles.Text}>Films Coming Soon</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity>
                <Text style={styles.Text}>  Cinemas Nearby</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.Text}>  Purchase Tickets</Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
          );
    }
}

export default Options;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      //padding: 25,
     // width: deviceWidth,
    // flexDirection: 'column',
      height: '100%',
      width: deviceWidth
    },
    Text: {
      fontSize: 25,
     // paddingLeft: '0%',
      fontWeight: 'bold',
     // paddingTop : '15%',
     // textAlign: 'center',
     paddingLeft: '20%',
     marginTop: '15%',
     width: deviceWidth,
     // padding: 0,
      color: 'white',
    },
})
