import React, { useContext, useEffect } from 'react';

import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'


import localDB from '../database/asyncStorage'
import AppContext from '../AppContext'

export default function Loading(props) {

    const context = useContext(AppContext)
    
    useEffect(()=>{
 
        auth().onAuthStateChanged(async user => {
    
          if(user){
            await localDB.setValue('uid', user.uid);
            context.setUserID(user.uid)
            props.navigation.navigate('Main')
          }
    
          if ( !user )
            props.navigation.navigate('Login')
          
        })
    
        const listener = props.navigation.addListener('focus', async () => {
          let user = await localDB.getValue('uid');

          if(user){
            context.setUserID(user)
            props.navigation.navigate('Main')
          }else{
            props.navigation.navigate('Login')
          }
     
        });
 
        return listener;

    },[])
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>
    )
}
 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor:'white'
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });