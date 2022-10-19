import React, {useState, useRef} from 'react'
import {Animated, View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts, Raleway_400Regular, Raleway_600SemiBold, Raleway_500Medium, Raleway_700Bold } from '@expo-google-fonts/raleway';
import firebase from '../firebaseConnection';
import { useNavigation, StackActions } from '@react-navigation/native'


export default function formLogin(){
    const marginAnim = useRef(new Animated.Value(157)).current;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [errorDetect, setErrorDetect] = useState(false)
    const [errorForm, setErrorForm] = useState('')

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

    async function logar(){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((value) => {
            navigation.dispatch(
                StackActions.replace('Home', { adress: value.user.email })
              )

            
        })
        .catch((error) => {
            setErrorDetect(true);
            if(error.code === 'auth/user-not-found'){
               setErrorForm('Usuario não encontrado');
            }
            if(error.code === 'auth/invalid-email'){
                setErrorForm('O endereço de e-mail não é valido');
            }
            if(error.code === 'auth/wrong-password'){
                setErrorForm('Senha incorreta');
            }
           })

    }

    function pressionou(){
        Animated.timing(marginAnim, {
            toValue: 40,
            duration: 1000,
            useNativeDriver: false
          }).start();
    }

    return(

    <ScrollView style={{flex: 1, backgroundColor: '#FBFBFB'}}>
        <Animated.View style={{marginTop: marginAnim}}>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../imgs/fruitall-logo.png')} style={styles.img} />
                <View>
                    <Text style={styles.titleTop}>Entrar</Text>
                </View>
            </View>

            <View style={{marginTop: 24, marginLeft: 26, marginRight: 26}}>
            <Text style={{fontSize: 16, fontFamily: 'Raleway_400Regular'}}>Endereço de email:</Text>
            <TextInput 
                placeholder='Digite seu endereço de e-mail'
                placeholderTextColor={'#bdbebd'}
                onPressIn={pressionou}
                style={styles.globalInput}
                onChangeText={(texto) => setEmail(texto)}
            />   
            </View> 

            <View style={{marginTop: 24, marginLeft: 26, marginRight: 26}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 16, fontFamily: 'Raleway_400Regular'}}>Senha:</Text>
                <TouchableOpacity onPress={() => setHidePass(!hidePass)}><Text style={styles.textRegister}>mostrar</Text></TouchableOpacity>
                
            </View>
            
                <TextInput 
                    placeholder='xxxxxxx'
                    secureTextEntry={hidePass ? true : false}
                    placeholderTextColor={'#bdbebd'}
                    style={styles.globalInput}
                    onChangeText={(texto) => setPassword(texto)}
                    onPressIn={pressionou}
                />   

                {errorDetect && (
                    <View style={{
                        marginTop: 25,
                        borderWidth: 1, 
                        borderColor: '#ff4040',
                        backgroundColor: '#f89a99',
                        borderRadius: 3,
                        padding: 10
                       }}>
                        <Text style={{
                          textAlign: 'center', 
                          fontSize: 16, 
                          fontFamily: 'Raleway_400Regular', 
                          color: '#ff4040'
                          }}>
                           {errorForm}</Text>
                      </View>
                )}
            </View> 

            

            <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                style={styles.btnSignIn}
                onPress={logar}
                >
                    <Text style={styles.textBtn}>Entrar Agora</Text>
                </TouchableOpacity>    
            <TouchableOpacity 
              style={{marginTop: 40, 
              alignItems: 'center'}}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.textRegister}>Ainda não tem uma conta?</Text>
              <Text style={styles.textRegister}>Crie Agora</Text>
            </TouchableOpacity> 
            </View>
           
                
    
            
        </Animated.View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    img: {
      width: 111,
      height: 44
    },
    titleTop: {
      fontSize: 24,
      marginTop: 34,
      marginLeft: 14,
      fontFamily: 'Raleway_600SemiBold'
    },
    globalInput: {
        marginTop: 13,
        width: 308,
        height: 55,
        fontFamily: 'Raleway_400Regular',
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        paddingLeft: 17
    },
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
        fontFamily: 'Raleway_500Medium',
        color: '#fff'
    },
    textRegister: {
        fontSize: 16,
        fontFamily: 'Raleway_700Bold',
        color: '#433FFF'
    }
});
