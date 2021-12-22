import React from 'react'
import { StyleSheet, Text, TextInput, View, StatusBar, TouchableOpacity, ActivityIndicator} from 'react-native'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import withContext from '../Context_HOC'


class SignUp extends React.Component {

  constructor(props) {
    super(props);
  }

  state = { email: '', password: '', errorMessage: null, loading: false }

  handleSignUp = () => {
 
    const { email, password, loading } = this.state

    if( !email || !password ){
      this.setState({ errorMessage: 'Please verify empty fields' })
    
    }else{
      this.setState({ loading: !this.state.loading});

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {

          this.setState({ loading: !this.state.loading});
          
        }).catch(error => {

          this.setState({ loading: !this.state.loading});

          switch (error.code) {
            case 'auth/network-request-failed':
              this.setState({ errorMessage: 'Network request failed' })
              break;
          
            case 'auth/email-already-in-use':
              this.setState({ errorMessage: 'E-mail already in use' })
              break;
    
            case 'auth/weak-password':
              this.setState({ errorMessage: 'Weak password' })
              break;            

            case 'auth/invalid-email':
              this.setState({ errorMessage: 'Invalid E-mail' })
              break;            
    
            case 'auth/operation-not-allowed':
              this.setState({ errorMessage: 'Unauthorized operation' })
              break; 

            default:
              this.setState({ errorMessage: error.message })
              break;
          }
        })
    }

  }

  render() {
    const { loading } = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor="white" />

        <View style={styles.outterContainer}>
          <View>
            {
              loading &&
              <ActivityIndicator size="large" />
            }
          </View>
        <View style={{ flexDirection:'row' }}>
            <Text style={{  
              fontFamily:'Roboto-Bold', color:'black', fontSize:38, fontWeight:'bold'  }}>
              Sign Up
            </Text>
        </View>

          <View style={styles.innerContainer}>

          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}

          <TextInput
            placeholder={'E-mail'}
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder={'Password'}
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <View style={styles.ButtonStyling}>
            <TouchableOpacity onPress={this.handleSignUp}>
              <Text style={styles.ButtonText}>
              Sign-up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SecondaryButtonStyling}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.SecondaryButtonText}>
              Login
              </Text>
            </TouchableOpacity>
          </View>
        
        </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  hairline: {
    backgroundColor: '#3E3E3E',
    height: 0.5,
    width: 120
  },
  loginButtonBelowText1: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: '#3E3E3E'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor:'white'
  },
  ButtonStyling: {
    width: '100%',
    margin: 8,
    height: 40,
    justifyContent:'center',
    backgroundColor:'red',
    borderRadius:6,
  },

  SecondaryButtonStyling: {
    width: '100%',
    margin: 8,
    height: 40,
    justifyContent:'center',
    borderRadius:6,
  },
  SecondaryButtonText:{
    textAlign:'center',
    fontFamily:'Roboto-Light',
    fontSize: 18,
    fontWeight:'bold',
    color:'red'
  },

  ButtonText:{
    textAlign:'center',
    fontFamily:'Roboto-Light',
    fontSize: 18,
    fontWeight:'bold',
    color:'white'
  },

  textInput: {
    width: '100%',
    margin: 20,
    borderRadius:10,
    fontSize:18,
    height: 40,
    backgroundColor:'white',
    borderBottomWidth:1,
    borderBottomColor:'black'
  }
  ,
  outterContainer:{
    width: '90%',
    flexDirection:'column', 
  },
  innerContainer:{
    width: '95%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems:'center',
  }
})


export default withContext(SignUp)