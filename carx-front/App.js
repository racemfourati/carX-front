
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import test from "./src/components/Nav/test"
import LogIn from './src/components/login/login.js';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/components/Main'
import ChangePhoto from './src/components/Profile/changeImage'
import AsyncStorage from "@react-native-async-storage/async-storage"

import ProfileEdit from "./src/components/Profile/ProfileEdit"
const Stack = createNativeStackNavigator();


export default function App() {
  const nav = useNavigationContainerRef()
  const [AppReady, setAppReady] = useState(null)
  const [spinner, setSpinner] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState('')



  setTimeout(() => {
    setSpinner(true)
  }, 500)
  useEffect(async () => {
    const data = await AsyncStorage.getItem("auth")
    setStoredCredentials(JSON.parse(data))
    if (data) {

      nav.navigate("Main")
    } else if (data == null) {
      nav.navigate("Login")
    }
  }, [])
  return (
    
    <>
    
      {
        spinner == false
          ?
          <>
            <View style={[styles.container, {

              flexDirection: "column"
            }]}>

              <View style={{ flex: 6, justifyContent: "center" }} >
                <ActivityIndicator color="#D9AF91" bool="true" size="large" style={{ textAlign: "center" }} />
                <Text style={{ textAlign: "center" }}>loading...</Text>
              </View>

            </View>

          </>
          :
          <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{ headerShown: false }}  >
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="Login" component={LogIn} />
            </Stack.Navigator>
          </NavigationContainer>
      }

    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

