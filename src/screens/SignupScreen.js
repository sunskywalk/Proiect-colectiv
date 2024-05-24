import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next'; // Importă hook-ul useTranslation

export default function SignupScreen({ navigation }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { t } = useTranslation(); // Folosește hook-ul useTranslation

    const handleCreateAccount = () => {
        if (password !== confirmPassword) {
            alert(t('signup_screen.passwords_do_not_match')); // Mesaj de eroare tradus
            return;
        }
        // Handle account creation logic
        alert(t('signup_screen.account_created')); // Mesaj de succes tradus
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t('signup_screen.create_account')}</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={t('signup_screen.email')}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('signup_screen.username')}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('signup_screen.password')}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('signup_screen.confirm_password')}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>{t('signup_screen.create_account')}</Text>
                </Pressable>
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
});
