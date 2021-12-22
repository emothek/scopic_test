import React, { useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'

import withContext from '../Context_HOC'
import firestore from '@react-native-firebase/firestore';


const Main = (props) => {
    
    useEffect(()=>{
      const saveUserDetails = async () => {
        //console.warn(props.context.userID)
        if(!props.context.userID)
          return false;
          
        await firestore().collection('users').doc(props.context.userID).set({
            user: props.context.userID
        }).then(function(docRef) {
          console.log(docRef)
        }) 
      }
      saveUserDetails()
    }, [props.context.userID])

    return (
        <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor="white" />
        <View style={styles.outterContainer}>
 

            <View style={{ width:'80%', }}>
                <Text style={{  
                  fontFamily:'Roboto-Bold', 
                  color:'black', 
                  fontSize:38, 
                  textAlign:'center'  }}>
                  Welcome
                </Text>
            </View>

            <View style={{ flex:1,  width:'80%', justifyContent:'center' }}>
                <Text style={{  
                  fontFamily:'Roboto-Bold', 
                  color:'#3c6e71', 
                  fontSize:22, 
                  textAlign:'center'  }}>
                  Hi there! Nice to meet you  
                </Text>
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
                  onPress={()=> props.navigation.navigate('List') }>
                    <Text style={{ 
                      color:'white',
                      fontSize:20
                      }}>
                      List
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

export default withContext(Main)