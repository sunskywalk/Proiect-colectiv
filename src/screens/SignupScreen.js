import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

export default function SignupScreen({ navigation }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCreateAccount = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Handle account creation logic
        alert('Account Created!');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='EMAIL'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='USERNAME'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='PASSWORD'
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder='CONFIRM PASSWORD'
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
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
