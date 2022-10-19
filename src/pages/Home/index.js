import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Raleway_400Regular, Raleway_600SemiBold, Raleway_500Medium, Raleway_700Bold } from '@expo-google-fonts/raleway';
import firebase from '../../firebaseConnection';
import { useNavigation } from '@react-navigation/native'

export default function Home({route}){
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Raleway_400Regular,
        Raleway_600SemiBold,
        Raleway_500Medium,
        Raleway_700Bold
      });

      if (!fontsLoaded) {
        return null;
    }

    async function deslogar(){
        await firebase.auth().signOut()
        navigation.navigate('Login')

    }
   
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 24, fontFamily: 'Raleway_600SemiBold'}}>Seja bem vindo {route.params.adress}</Text>
            <TouchableOpacity
                style={styles.btnSignIn}
                onPress={deslogar}
                >
                    <Text style={styles.textBtn}>Sair Agora</Text>
                </TouchableOpacity>   
        </View>
    );
}

const styles = StyleSheet.create({
    btnSignIn: {
        width: 308,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#6A2EE8'
      },
      textBtn: {
        fontSize: 16,
        marginBottom: 3,
        fontFamily: 'Raleway_500Medium',
        color: '#fff'
    },
})