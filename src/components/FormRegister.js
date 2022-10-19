import React, {useState} from 'react'
import {View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, TurboModuleRegistry} from 'react-native';
import { useFonts, Raleway_400Regular, Raleway_600SemiBold, Raleway_500Medium, Raleway_700Bold } from '@expo-google-fonts/raleway';
import firebase from '../firebaseConnection';
import { useNavigation } from '@react-navigation/native'

export default function formRegister(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('')
    const [hidePass, setHidePass] = useState(true);
    const [alertPassword, setAlertPassword] = useState(false);
    const [sucessRegister, setSucessRegister] = useState(false);
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
        if(password != verifyPassword){
            setAlertPassword(true);
            setErrorDetect(false)
            return;
        }

        setAlertPassword(false);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((value) => {
            setSucessRegister(true);
            setTimeout(() => {
                navigation.navigate('Login');
            }, 3000)
        })
        .catch((error) => {
         setErrorDetect(true);
         if(error.code === 'auth/weak-password'){
            setErrorForm('Sua senha deve ter pelo menos 6 caracteres');
         }
         if(error.code === 'auth/email-already-in-use'){
            setErrorForm('Email já em uso, escolha outro');
         }
         if(error.code === 'auth/invalid-email'){
            setErrorForm('Email invalido, verifique os campos');
         }
        })

    }


    return(
        <ScrollView style={{flex: 1, backgroundColor: '#FBFBFB'}}>
            <View style={{marginTop: 124, alignItems: 'center'}}>
                <Image 
                source={require('../imgs/fruitall-logo.png')}
                style={{width: 111, height: 44}}
                />
                <Text style={{
                marginTop: 33, 
                fontSize: 24, 
                fontFamily: 'Raleway_600SemiBold'
                }}>Crie a sua conta</Text>
            </View>

            <View style={{marginTop: 24, marginLeft: 26, marginRight: 26}}>
            <Text style={{fontSize: 16, fontFamily: 'Raleway_400Regular'}}>Endereço de email:</Text>
            <TextInput 
                placeholder='Digite seu endereço de e-mail'
                placeholderTextColor={'#bdbebd'}
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
                />   
            </View> 

            <View style={{marginTop: 24, marginLeft: 26, marginRight: 26}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 16, fontFamily: 'Raleway_400Regular'}}>Confirme a senha:</Text>
                <TouchableOpacity onPress={() => setHidePass(!hidePass)}><Text style={styles.textRegister}>mostrar</Text></TouchableOpacity>
                
            </View>
                <TextInput 
                    placeholder='xxxxxxx'
                    secureTextEntry={hidePass ? true : false}
                    placeholderTextColor={'#bdbebd'}
                    style={styles.globalInput}
                    onChangeText={(texto) => setVerifyPassword(texto)}
                />   

                {alertPassword && (
                    <View style={{
                        marginTop: 25,
                        borderWidth: 1, 
                        borderColor: '#ff4040',
                        backgroundColor: '#f89a99',
                        borderRadius: 3,
                        padding: 5
                       }}>
                        <Text style={{
                          textAlign: 'center', 
                          fontSize: 16, 
                          fontFamily: 'Raleway_400Regular', 
                          color: '#ff4040'
                          }}>
                           As senhas não coincidem. Verifique e tente novamente.</Text>
                      </View>
                )}

                {errorDetect && (
                    <View style={{
                        marginTop: 25,
                        borderWidth: 1, 
                        borderColor: '#ff4040',
                        backgroundColor: '#f89a99',
                        borderRadius: 3,
                        padding: 5
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

                {sucessRegister && (
                    <View style={{
                        marginTop: 25,
                        borderColor: '#008000',
                        backgroundColor: '#32fa00',
                        borderRadius: 3,
                        padding: 15
                       }}>
                        <Text style={{
                          textAlign: 'center', 
                          fontSize: 16, 
                          fontFamily: 'Raleway_400Regular', 
                          color: '#006618'
                          }}>
                           Cadastro efetuado com sucesso...</Text>
                      </View>
                )}
            </View> 

    

            <View style={{alignItems: 'center', marginBottom: 30}}>
                <TouchableOpacity
                style={styles.btnSignIn}
                onPress={logar}
                >
                    <Text style={styles.textBtn}>Inscreva-se Agora</Text>
                </TouchableOpacity>    
                <TouchableOpacity 
                style={{marginTop: 40, 
                alignItems: 'center'}}
                onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.textRegister}>Já tem alguma conta?</Text>
                    <Text style={styles.textRegister}>Faça seu login agora mesmo</Text>
                </TouchableOpacity> 
            </View>
        </ScrollView>
        
    );
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
