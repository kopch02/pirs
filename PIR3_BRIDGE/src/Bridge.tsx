import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import { NativeModules } from 'react-native';


const App = () => {
    const [myInputText, setInputText] = useState('');
    
    const getCoords = async() => {
        const res = await NativeModules.Map.getCoords()
        console.log(res)
    }

    const InputChange = (text:string) => {
        setInputText(text)
    }

    const printText = () => {
        NativeModules.ModalWindow.showModal("modal",myInputText, (res:any) => {
            console.log(res)
        })
    }

    return (
        <View style={styles.main}>
            <Button title="координаты" onPress={getCoords}></Button>
            <TextInput placeholder='....' 
                style={{
                    borderColor:'black', 
                    borderRadius:10, 
                    borderWidth:2, 
                    width:'90%',
                    textAlign:'center'
                    }}
                onChangeText={InputChange}>

            </TextInput>
            <Button title="Текст" onPress={printText}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default App;
