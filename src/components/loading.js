import React, {useCallback} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';



export default function Loading(){

    let [fontsLoaded] = useFonts({
        Raleway_400Regular,
      });

      if (!fontsLoaded) {
        return null;
    }

    return(
        <View style={styles.contender} >
            <Image source={require('../imgs/fruitall-logo.png')} style={styles.logo}/>
            <Text style={{ 
                fontSize: 16, 
                fontFamily: 'Raleway_400Regular', 
                color: '#0D0C38', 
                marginTop: 20,
                marginLeft: 41,
                marginRight: 41
            }}>Seu melhor mercado para suas frutas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contender: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 189,
        height: 76
    },
})