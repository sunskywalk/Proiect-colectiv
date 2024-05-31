import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { login } from '../services/authService';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            // Save token and navigate to Home screen
            // For example, you can save the token in AsyncStorage or in a state management library
            alert(t('login_screen.login_successful'));
            navigation.navigate('Home');
        } catch (error) {
            alert(t('login_screen.login_failed'));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t('login_screen.login')}</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={t('login_screen.username')}
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('login_screen.password')}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>{t('login_screen.login')}</Text>
                </Pressable>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.linkText}>{t('Sign up')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={styles.linkText}>{t('login_screen.forgot_password')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputView: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonView: {
        width: '80%',
        marginBottom: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
