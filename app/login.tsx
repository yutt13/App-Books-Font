// app/login.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';
import { setCurrentUser } from '../constants/user';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: username,
        password: password
      });

      if (response.data.success) {
        if (response.data.user.role === 'admin') {
            Alert.alert(
                "เข้าสู่ระบบไม่ได้", 
                "บัญชีผู้ดูแลระบบ (Admin) กรุณาเข้าใช้งานผ่านปุ่ม 'สำหรับผู้ดูแลระบบ'"
            );
            return;
        }

        setCurrentUser({
            id: response.data.user.id,
            name: response.data.user.name,
            role: response.data.user.role
        });
        
        Alert.alert("สำเร็จ", `ยินดีต้อนรับ ${response.data.user.name}`);
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "เชื่อมต่อ Server ไม่ได้";
      Alert.alert("Login ล้มเหลว", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-emerald-50 px-6 justify-center">

      {/* Header */}
      <View className="mb-10">
        <Text className="text-3xl font-semibold text-emerald-900 mb-2">
          ยินดีต้อนรับกลับ 👋
        </Text>
        <Text className="text-emerald-600">
          กรุณาเข้าสู่ระบบเพื่อใช้งานระบบห้องสมุด
        </Text>
      </View>

      {/* Username */}
      <View className="mb-5">
        <Text className="text-emerald-800 mb-2 font-medium">
          ชื่อผู้ใช้งาน
        </Text>
        <TextInput
          className="w-full bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm"
          placeholder="username"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password */}
      <View className="mb-8">
        <Text className="text-emerald-800 mb-2 font-medium">
          รหัสผ่าน
        </Text>
        <TextInput
          className="w-full bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm"
          placeholder="password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className={`bg-emerald-600 p-4 rounded-2xl shadow-lg flex-row justify-center ${isLoading ? "opacity-70" : ""}`}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-semibold text-lg">
            เข้าสู่ระบบ
          </Text>
        )}
      </TouchableOpacity>

      {/* Register */}
      <View className="flex-row justify-center mt-8">
        <Text className="text-emerald-600">ยังไม่มีบัญชี? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text className="text-emerald-800 font-semibold">
            สมัครสมาชิก
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
