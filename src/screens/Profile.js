import React from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'

import withContext from '../Context_HOC'

import auth from '@react-native-firebase/auth';
import localDB from '../database/asyncStorage';



const Profile = (props) => {

    const handleSignout = (Navigation) => {
      auth().signOut().then(async function() {
        await localDB.removeValue('uid');
        Navigation.navigate('Login')
        //RNRestart.Restart();
      }).catch(function(error) {
        console.warn(error);
      });
    }
    

    return (
        <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor="white" />
        <View style={styles.outterContainer}>
 

            <View style={{ flex:1 }}>

            </View>
 

            <View style={styles.innerContainer}>


                <TouchableOpacity
                  style={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'red',
                    height:40,
                    width:'80%',
                    borderRadius:5
                  }}
                  onPress={()=> {
                    handleSignout(props.navigation)
                  } }>
                    <Text style={{ 
                      color:'white',
                      fontSize:20
                      }}>
                      Log Out
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
      </View>
    )
}
 

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor:'white'
  },
  outterContainer:{
    width: '100%',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    flex: 5,
 
  },
  innerContainer:{
    width: '95%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems:'center',
  }
})

export default withContext(Profile)