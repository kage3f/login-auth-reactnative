import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import FormLogin from '../../components/FormLogin';
import Loading from '../../components/loading';



export default function Login(){
    const [loading, setLoading] = useState(true);

    let [fontsLoaded] = useFonts({
        Raleway_400Regular,
      });

      if (!fontsLoaded) {
        return null;
    }

    setTimeout(() => {
      setLoading(false);
    }, 4000)

    return(
        <View style={styles.container}>
           {loading ? (<Loading/>) : (<FormLogin/>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB'
    }
})