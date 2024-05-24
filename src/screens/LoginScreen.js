import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next'; // Importă hook-ul useTranslation

export default function LoginForm({ navigation }) {
    const { t } = useTranslation(); // Folosește hook-ul useTranslation

    const handleSignUp = () => {
        // Navigate to SignupScreen.js
        navigation.navigate('Signup');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t('login_screen.login')}</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={t('login_screen.email_or_username')}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('login_screen.password')}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                />
            </View>
            <Pressable onPress={() => alert(t('login_screen.forgot_password'))}>
                <Text style={styles.forgetText}>{t('login_screen.forgot_password')}</Text>
            </Pressable>
            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => alert(t('login_screen.login_successful'))}>
                    <Text style={styles.buttonText}>{t('login_screen.login')}</Text>
                </Pressable>
            </View>
            <Text style={styles.footerText}>
                {t('login_screen.no_account')} 
                <Pressable onPress={handleSignUp}>
                    <Text style={styles.signup}> {t('login_screen.sign_up')}</Text>
                </Pressable>
            </Text>
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
    forgetText: {
        fontSize: 12,
        color: 'black',
        marginBottom: 20,
    },
    buttonView: {
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'black',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    footerText: {
        fontSize: 14,
        color: 'gray',
    },
    signup: {
        color: 'black',
    },
});
