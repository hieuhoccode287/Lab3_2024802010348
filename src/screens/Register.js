import React, { useState } from "react";
import { Alert, View, Platform } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import COLORS from "../../constants";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  const hasErrorName = () => name.trim() === "";
  const hasErrorEmail = () => !emailRegex.test(email);
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => passwordConfirm !== password;
  const hasErrorAddress = () => address.trim() === "";
  const hasErrorPhone = () => !phoneRegex.test(phone);

  const USERS = firestore().collection("USERS");

  const handleCreateAccount = () => {
    if (
      hasErrorName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      hasErrorAddress() ||
      hasErrorPhone()
    ) {
      Alert.alert("Please correct the errors before proceeding.");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        USERS.doc(email).set({
          name,
          email,
          address,
          phone,
          role: "customer",
        });
        navigation.navigate("Login");
        Alert.alert("Registered successfully");
      })
      .catch((error) => {
        const errorMessage = error.code === 'auth/email-already-in-use'
          ? "Email is already in use"
          : "An error occurred during registration";
        Alert.alert(errorMessage);
      });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 10 }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.select({ android: 100, ios: 0 })}
    >
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            alignSelf: "center",
            color: COLORS.pink,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Create New Account
        </Text>
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
        />
        <HelperText type="error" visible={hasErrorName()}>
          Full name cannot be empty
        </HelperText>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
        <HelperText type="error" visible={hasErrorEmail()}>
          Invalid email address
        </HelperText>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
        />
        <HelperText type="error" visible={hasErrorPassword()}>
          Password must be at least 6 characters
        </HelperText>
        <TextInput
          label="Confirm Password"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry={!showPasswordConfirm}
          right={<TextInput.Icon icon="eye" onPress={() => setShowPasswordConfirm(!showPasswordConfirm)} />}
        />
        <HelperText type="error" visible={hasErrorPasswordConfirm()}>
          Passwords do not match
        </HelperText>
        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={{ marginBottom: 10 }}
        />
        <HelperText type="error" visible={hasErrorAddress()}>
          Address cannot be empty
        </HelperText>
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          style={{ marginBottom: 10 }}
        />
        <HelperText type="error" visible={hasErrorPhone()}>
          Invalid phone number
        </HelperText>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Button mode="contained" onPress={handleCreateAccount}>
            Create New Account
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;
