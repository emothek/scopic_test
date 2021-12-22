import React from 'react'
import { StyleSheet, Text, TextInput, ActivityIndicator,
    View, StatusBar, TouchableOpacity } from 'react-native'

import auth from '@react-native-firebase/auth'; 
//import { TouchableOpacity } from 'react-native-gesture-handler'
import withContext from '../Context_HOC'


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', 
    errorMessage: null, loading: false  };
  }
  

  handleLogin = () => {
    const { email, password, loading } = this.state

    if(email && password){
        this.setState({ loading: !this.state.loading});

      auth()
        .signInWithEmailAndPassword(email, password)
        .then( async (user) => {
            this.setState({ loading: !this.state.loading});
        })
        .catch(error => {
            this.setState({ errorMessage: error.message })
            this.setState({ loading: !this.state.loading});
        })
    }
  }

 
  render() {
      const { loading } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor="white" />

        <View>
          <Text style={{  
            paddingTop:50,
            fontFamily:'Roboto-Bold', fontSize:38, fontWeight:'bold'  }}>
            Scopic
          </Text>
        </View>
  
        <View style={styles.outterContainer}>
 
            {
              loading &&
              <ActivityIndicator size="large" />
            }
  

            <View>
                <Text style={{  
                  fontFamily:'Roboto-Bold', fontSize:38, fontWeight:'bold', color:'black'  }}>
                  Sign In
                </Text>
            </View>
            <View style={styles.innerContainer}>

                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}

                <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder={'Your E-mail address'}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                />

                <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder={'Your Password'}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                />

                <View style={styles.ButtonStyling}>
                    <TouchableOpacity onPress={this.handleLogin}>
                    <Text style={styles.ButtonText}>
                        Login
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.SecondaryButtonStyling}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text style={styles.SecondaryButtonText}> 
                      Sign-up
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
  ButtonText:{
    textAlign:'center',
    fontFamily:'Roboto-Light',
    fontSize: 18,
    fontWeight:'bold',
    color:'white'
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
    flex:1,
    justifyContent:'center',
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

export default withContext(Login)