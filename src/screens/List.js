import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Modal, FlatList, Animated, Dimensions,
    Switch, StatusBar, Pressable, TextInput } from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import withContext from '../Context_HOC'
import localDB from '../database/asyncStorage';
import firestore from '@react-native-firebase/firestore';


const Width = Dimensions.get('window').width



function ListItem({data, setListState, saveData}){
    const { title } = data
    const height = new Animated.Value(70)

    const animatedDelete=() => {
      Animated.timing(height,{
          toValue: 0,
          duration: 350,
          useNativeDriver:false
      }).start(() => {
          setListState(prevState => prevState.filter(e => e.id !== data.id))
          saveData(data, true)
        }
      )
    }

    const swipeRight = (progress,dragX) =>{
      const scale = dragX.interpolate({
        inputRange:[-200,0],
        outputRange:[1,0.5],
        extrapolate:'clamp'
      })
      return(
        <Animated.View style={{backgroundColor:'red',width:"100%",justifyContent:'center'}}>
          <Animated.Text
            style={{marginLeft:'auto',marginRight:50, color:'white', fontSize:15, fontWeight:'bold',transform:[{scale}]}}>
              Delete Item
          </Animated.Text>
        </Animated.View>
      )
    }

    return(
      <Swipeable renderRightActions={swipeRight} rightThreshold={-200} onSwipeableOpen={animatedDelete}>
        <Animated.View style={{flex:1,flexDirection:'row', height:70, alignItems:'center',borderBottomWidth:0.5,backgroundColor:'white'}}>
          <Text
            style={{
              fontSize:18,
            }}>
              {title}
            </Text>
        </Animated.View>
      </Swipeable>
    )
  }




const List = (props) => {



    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {

      setIsEnabled(previousState => !previousState)
    };
    const [modalVisible, setModalVisible] = useState(false);

    const [newEntry, setNewEntry] = useState('');
    const [textLength, setTextLength] = useState(0);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [ListState, setListState] = useState([]);
    const [docRef, setDocRef] = useState(null);

    const [newItem, setNewItem] = useState(null)

    const saveData = async (newItem, remove) => {
      
      if(!isEnabled){
        // asyncStorage
        if(remove){
          // setListState(prevState => prevState.filter(e => e.id !== data.id))
          let updatedList = ListState.filter(el => el.id !== newItem.id)
          localDB.setValue('List', JSON.stringify(updatedList))
        }else{
          localDB.setValue('List', JSON.stringify([...ListState, newItem]))
        }
      }else if(isEnabled){

        if(remove){
          firestore().collection("users").doc(props.context.userID)
            .collection('list').doc(newItem.docRef)
            .delete().then(() => {
              console.log("Document successfully deleted!");
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
            
        }else{
          // firestore
          await firestore().collection('users')
            .doc(props.context.userID).collection('list').add({
              id: newItem.id,
              title: newItem.title
            }).then(function(docRef) {

              console.log(docRef.id)
              if(docRef.id)
                setDocRef(docRef.id)
              else  
                setDocRef(null)

            }) 
        }

      }
    }


    useEffect(() => {
      const readData = async ()=>{
        setListState([])
        if(isEnabled){
          // read from Firebase (firestore)
          let initialQuery = firestore()
            .collection('users/'+props.context.userID+'/list');

          let snapshot = await initialQuery.get();
          let data = snapshot.docs.map(document => {
            let id = document.id;
            return {...document.data(), docRef: id}; 
          });

          console.log(data)
          setListState(data)

        }else if(!isEnabled){
          // read from asyncStorage
          let listAsyncStorage = await localDB.getValue('List')

          if(listAsyncStorage){
            //console.log(JSON.parse(listAsyncStorage)[2]);
            setListState(JSON.parse(listAsyncStorage))
          }
        }
      }
      readData();
    }, [isEnabled])


    return (
        <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor="white" />
        <View style={styles.outterContainer}>


        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>New entry</Text>
                    <TextInput
                        style={{fontSize:18, width:'100%'}}
                        placeholder='Input here...'
                        onChangeText={text=> {
                            setNewEntry(text);
                            setTextLength(text.length);
                        }}
                    />

                    <View style={{width:'100%', marginBottom:40}}>
                        <Text style={{color: textLength > 40 ? 'red' : 'black', textAlign:'right'}}>
                            {textLength}/40
                        </Text>
                        {
                            error &&
                            <Text style={{color:'red', textAlign:'center'}}>
                                {errorMessage}
                            </Text>
                        }
                    </View>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            if(textLength > 40){
                                setError(true)
                                setErrorMessage('Text should not exceed 40 characters !')
                            }else if(textLength === 0){
                                setError(true)
                                setErrorMessage('Text cannot be empty')
                            }else{
                                setError(false)
                                let newItem = {id: Math.floor(Date.now() * Math.random()), title: newEntry};
                                setNewItem(newItem)
                                // save the entry
                                setListState(prevState => [...prevState, newItem])

                                // update database (firebase / asyncStorage)
                                saveData(newItem)
                                // close the modal (popup)
                                setModalVisible(!modalVisible)
                            }
                        }}
                        >
                        <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>

            <View style={{
                width:'80%',
                flex:1,
                marginTop:40,
                alignItems:'center' }}>

                  {/* <Text>
                    {JSON.stringify(ListState)}
                  </Text>  */}
                <Switch
                    style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />

                <View style={{marginTop:50}}>
                  <SafeAreaView style={styles.container}>
                    <FlatList
                      style={{
                        width:Width - 100
                      }}
                      data={ListState}
                      renderItem={({item}) =><ListItem data={item} setListState={setListState} saveData={saveData}/>}
                    />
                  </SafeAreaView>

                </View>
            </View>


            <View style={styles.innerContainer}>


                <Pressable
                  style={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'red',
                    height:50,
                    width:50,
                    borderRadius:50
                  }}
                  onPress={() => setModalVisible(true)}>
                    <Text style={{
                      color:'white',
                      fontSize:32
                      }}>
                      +
                    </Text>
                </Pressable>
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
    backgroundColor:'white',
  },

  outterContainer:{
    width: '100%',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    flex: 5,

  },
  innerContainer:{
    width: '80%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems:'flex-end',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width:'80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    width:'80%',
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:18,
    marginBottom: 15,
    textAlign: "center"
  }
})

export default withContext(List)