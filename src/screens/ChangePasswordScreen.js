import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changePassword } from '../services/authService';

export default function ChangePasswordScreen({ navigation }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { t } = useTranslation();

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert(t('change_password_screen.passwords_do_not_match'));
            return;
        }
        try {
            const token = 'Bearer your_jwt_token'; // You should get this token from your login state
            await changePassword(token, oldPassword, newPassword);
            alert(t('change_password_screen.password_changed'));
            navigation.navigate('Login');
        } catch (error) {
            alert(t('change_password_screen.change_failed'));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t('Change Password')}</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={t('change_password_screen.old_password')}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('change_password_screen.new_password')}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('change_password_screen.confirm_password')}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={handleChangePassword}>
                    <Text style={styles.buttonText}>{t('Change Password')}</Text>
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
