
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import tailwind from "tailwind-rn";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Navbar from './Nav/Navbar.js'
import Test from './Nav/test.js'
import Reviews from './Nav/Reviews'
import Home from './Home/Home'
import Profile from './Profile/Profile'
import EditProfile from './Profile/ProfileEdit'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Wash from './washService/PageOne/Wash.js';
import Confirmation from './washService/PageTow/Confirmation.js';
import axios from 'axios';
import NotificationUser from "./notification/notification"
import jwtDecode from 'jwt-decode';

import AsyncStorage from "@react-native-async-storage/async-storage"
const Stack = createNativeStackNavigator();



export default function Main({ route, navigation }) {
  const [userData, setUserData] = useState({})
  const [id, setID] = useState(1)
  useEffect(() => {

    AsyncStorage.getItem('auth').then((result) => {

      let userId = jwtDecode(result)
      console.log(userId.user_id , "zefzebfzefijzefze")
      axios.get(`https://haunted-cat-69690.herokuapp.com/users/${userId.user_id}`).then((result) => {
        setUserData(result.data.data[0])
      console.log(userId.user_id , "adzfazefzafea")
      console.log(result.data.data[0] , "data")
        console.log(result.data.data)

      }).catch((error) => {
        console.log(error)
      })

    }).catch((error) => {
      console.log(error)
    })
  }, [])


  const navi = useNavigationContainerRef();
  return (

    <NavigationContainer independent={true} ref={navi}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" >
          {props => (<Home navigation={navi} user={userData} />)}
        </Stack.Screen>

        <Stack.Screen name="Nav"  >
          {props => (<Navbar na={navigation} navigation={navi} />)}
        </Stack.Screen>

        <Stack.Screen name="Reviews"  >
          {props => (<Reviews navigation={navi} user={userData} />)}
        </Stack.Screen>

        <Stack.Screen name="Test" component={Test} />

        <Stack.Screen name="Wash" >
          {props => (<Wash navigation={navi} user={userData} />)}
        </Stack.Screen>

        <Stack.Screen name="Confirmation" component={Confirmation} />

        <Stack.Screen name="Profile" >
          {props => (<Profile navigation={navi} user={userData} />)}
        </Stack.Screen>

        <Stack.Screen name="EditProfile"  >
          {props => (<EditProfile navigation={navi} user={userData} />)}
        </Stack.Screen>
        <Stack.Screen name="NotificationUser"  >
        {props => (<NotificationUser navigation={navi} user={userData} />)}
        </Stack.Screen>
      </Stack.Navigator>
      <View style={tailwind('p-4 flex flex-row ')} >
        <View style={{ flex: 0.34, justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => { navi.navigate("Home") }}>
          <Text  >
            <Ionicons name="ios-home-sharp" size={30} color="black" />
          </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.33, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => { navi.navigate("NotificationUser")}}>
          <Text >
            <Text >
            <Ionicons name="notifications" size={30} color="black" />
            </Text>
          </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.33, justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => { navi.navigate("Nav") }}>      
               <Text   >
            <MaterialIcons name="menu" size={30} color="black" />
          </Text>
          </TouchableOpacity>
 
        </View>
      </View>
    </NavigationContainer>



  );
}




