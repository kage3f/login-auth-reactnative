import React, {useEffect} from 'react';
import { View, Text } from 'react-native';

import FormRegister from '../../components/FormRegister'

export default function Register(){
   
    return(
        <View style={{flex:1, backgroundColor: '#FBFBFB'}}>
            <FormRegister/>
        </View>
    );
}