import { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { login, useMyContextController } from '../context';

const Login = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [email, setEmail] = useState('2024802010348@student.tdmu.edu.vn');
    const [password, setPassword] = useState('123456');
    const [showpassword, setShowPassword] = useState(false);

    const hasErrorEmail = () => !email.includes('@');
    const hasErrorPassword = () => password.length < 6;

    const handleLogin = () => {
        login(dispatch, email, password);
    };

    useEffect(() => {
        console.log(userLogin);
        if (userLogin != null) {
            if (userLogin.role === 'admin') {
                navigation.navigate('Admin');
            } else if (userLogin.role === 'customer') {
                navigation.navigate('Customer');
            }
        }
    }, [userLogin]);

    const onSubmit = () => {
        login(dispatch, email, password);
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text
                style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: '#ff0066',
                    marginTop: 50,
                    marginBottom: 10,
                }}
            >
                Login
            </Text>

            <TextInput label="Email" value={email} onChangeText={setEmail} />
            <HelperText type="error" visible={hasErrorEmail}>
            </HelperText>

            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showpassword}
            />
            <HelperText type="error" visible={hasErrorPassword}>
            </HelperText>

            <Button style={{backgroundColor:'#FF3366'}} mode="contained"  onPress={handleLogin}>
                Login
            </Button>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Don't have an account?</Text>
                <Button onPress={() => navigation.navigate('Register')}>Create new account</Button>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => null}>Forgot Password</Button>
            </View>

        </View>
    );
};

export default Login;
