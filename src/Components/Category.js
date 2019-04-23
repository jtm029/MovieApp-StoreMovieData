import React, {Component} from 'react';
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View,  Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get('window').width;

      const getDetails = (props) => {
         Actions.details({Id: props})
      }

class Category extends Component {
    render(){      
        return(
            <View style={styles.container}>
                <ImageBackground source={{uri: this.props.imageUri}} style={styles.image} >
            <ImageBackground source={require('../screens/res/shadow.png')} style={styles.image2}>
            <TouchableOpacity style={styles.Button} onPress={() => getDetails(this.props.filmId)}>
            <Text style={styles.Text}>Film Trailer and Details</Text>
            </TouchableOpacity>
            </ImageBackground>
            </ImageBackground>
            </View>
          );
}
}

export default Category;

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
    image: {
      marginTop: '-10%',
      width: deviceWidth,
      height: '100%',
    },
    image2: {
      width: deviceWidth,
      height: '100%',
      flex: 1
    },
  });