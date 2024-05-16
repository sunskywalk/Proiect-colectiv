import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

export default function LoginForm({ navigation }) {
    const handleSignUp = () => {
        // Navigate to SignupScreen.js
        navigation.navigate('Signup');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='EMAIL OR USERNAME'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='PASSWORD'
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                />
            </View>
            <Pressable onPress={() => alert('Forgot Password?')}>
                <Text style={styles.forgetText}>Forgot Password?</Text>
            </Pressable>
            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => alert('Login Successful!')}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
            </View>
            <Text style={styles.footerText}>
                Don't Have an Account? 
                <Pressable onPress={handleSignUp}>
                    <Text style={styles.signup}> Sign Up</Text>
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
