import React, {Component} from 'react';
import { StyleSheet, Image, Text, ImageBackground, Button, View,  Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer, DrawerActions } from 'react-navigation';


const deviceWidth = Dimensions.get('window').width;

class Purchase extends Component {  
    render(){
        return(
            <View>
                <Text>Heyy</Text>
            </View>
          );
    }
}

export default Purchase;

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
     // width: '100%',
     position: 'absolute',
     resizeMode: 'contain',
     marginLeft: '87%',
     bottom: 3,
    // marginBottom: '8%',
    // marginRight: '80%'
  
    }
  });
  