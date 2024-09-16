import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const App = () => {
    const [messages, setMessages] = useState<any>()

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'имя твоего собеседника',
                    avatar: 'https://public-static.tinkoffjournal.ru/business-secrets/uploads/2023/04/9U7vAlfc-1.png',
                },
                image: "https://public-static.tinkoffjournal.ru/business-secrets/uploads/2023/04/9U7vAlfc-1.png",
                // video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                sent: true,
                received: false,
                pending: false,
                quickReplies: {
                    type: 'checkbox', // or 'checkbox',
                    keepIt: true,
                    values: [
                      {
                        title: '😋 Yes',
                        value: 'yes',
                      },
                      {
                        title: '📷 Yes, let me show you with a picture!',
                        value: 'yes_picture',
                      },
                      {
                        title: '😞 Nope. What?',
                        value: 'no',
                      },
                    ],
                  },
            },
            {
                _id:2,
                text: 'системное сообщение',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'system',
                },
                system:true,
            }
        ])
    }, [])

    const onSend = useCallback((messages:any = []) => {
        messages[0].received = true
        messages[0].sent = true
        setMessages((previousMessages: any) =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    return (
        <SafeAreaProvider style={styles.main}>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name:'супер тест'
            }}
            isTyping={true}
            placeholder='напишите'
            loadEarlier={true}
            showUserAvatar={true}
            renderUsernameOnMessage={true}
            />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    main: {
        padding:10
    }
})

export default App;
