
import React, { useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// screens 
// import EbookViewer from './screens/EbookViewer'
// import EbookContainer from './screens/EbookContainer'
// import EbookDetails from './screens/EbookDetails'

import Signup from './screens/Signup'
import Login from './screens/Login'
import Loading from './screens/Loading'

import Main from './screens/Main'
import List from './screens/List'
import Profile from './screens/Profile'

// app context (state)
import AppContext from './AppContext'

const Stack = createStackNavigator(); 

export default function AppNavigation(props) {

  //const { isConnected } = useContext(NetworkContext)
  const { userID } = useContext(AppContext)

  return (
 
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Loading" 
        
        >

          <Stack.Screen name="Login" component={Login} 
            options={() => ({ headerShown: false })}/>
          <Stack.Screen name="Signup" component={Signup} 
            options={() => ({ headerShown: false })}/>
          <Stack.Screen name="Loading" component={Loading} 
            options={() => ({ headerShown: false })} />
          <Stack.Screen name="Main" component={Main}
            options={() => ({ headerShown: false })} />

          <Stack.Screen name="List" component={List}
            options={
              ({ navigation }) => ({
                headerTitleContainerStyle: {
                  alignItems:'center',
                  flex:4
                },
                headerLeftContainerStyle: {
                  alignItems:'center',
                  left:5,
                  padding:10,
                  flex:1
                },
                headerRightContainerStyle: {
                  alignItems:'center',
                  right:5,
                  padding:10,
                  flex:1
                },
                headerLeft: () => (
                  <TouchableOpacity
                  onPress={()=> navigation.goBack()}>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'red'}}>Back</Text>
                  </TouchableOpacity>
                ),
                headerTitle: props => (
                  <View {...props}>
                    <Text style={{
                      fontSize:20, 
                      fontWeight:'bold'
                      }}>
                      List
                    </Text>
                  </View>
                ),
                headerRight: () => (
                  <TouchableOpacity
                  onPress={()=> navigation.navigate('Profile')}>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'red'}}>Profile</Text>
                  </TouchableOpacity>
                ),
              })
            }
          />


          <Stack.Screen name="Profile" component={Profile} 
          options={
            ({ navigation }) => ({
              headerTitleContainerStyle: {
                alignItems:'center',
                flex:4
              },
              headerLeftContainerStyle: {
                alignItems:'center',
                left:5,
                padding:10,
                flex:1
              },
              headerLeft: () => (
                <TouchableOpacity
                onPress={()=> navigation.goBack()}>
                  <Text style={{fontSize:18, fontWeight:'bold', color:'red'}}>Back</Text>
                </TouchableOpacity>
              ),
              headerTitle: props => (
                <View {...props}>
                  <Text style={{
                    fontSize:20, 
                    fontWeight:'bold'
                    }}>
                    Profile
                  </Text>
                </View>
              )
            })
          }
          />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
 