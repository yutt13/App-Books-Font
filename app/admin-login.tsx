// client/app/admin-login.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';
import { setCurrentUser } from '../constants/user';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      if (response.data.success) {
        if (response.data.user.role !== 'admin') {
          Alert.alert('เข้าสู่ระบบไม่ได้', 'บัญชีนี้ไม่มีสิทธิ์ผู้ดูแลระบบ');
          return;
        }
        
        setCurrentUser(response.data.user);
        router.replace('/(admin)');
      }
    } catch (error) {
      Alert.alert('ผิดพลาด', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <View className="flex-1 bg-emerald-50 justify-center px-6">
      
      <Text className="text-3xl font-semibold text-emerald-900 mb-2 text-center tracking-tight">
        Admin Portal
      </Text>

      <Text className="text-emerald-600 mb-10 text-center">
        ระบบจัดการห้องสมุด
      </Text>

      <View className="bg-white p-7 rounded-3xl shadow-xl border border-emerald-100">
        
        <Text className="mb-2 font-medium text-emerald-800">
          Username (Admin)
        </Text>
        <TextInput 
          className="bg-emerald-50 p-4 rounded-2xl mb-5 border border-emerald-200 text-slate-800"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholder="กรอกชื่อผู้ใช้"
          placeholderTextColor="#94a3b8"
        />
        
        <Text className="mb-2 font-medium text-emerald-800">
          Password
        </Text>
        <TextInput 
          className="bg-emerald-50 p-4 rounded-2xl mb-8 border border-emerald-200 text-slate-800"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="กรอกรหัสผ่าน"
          placeholderTextColor="#94a3b8"
        />

        <TouchableOpacity 
          className="bg-emerald-600 p-4 rounded-2xl shadow-md active:opacity-80"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-semibold text-base tracking-wide">
            เข้าสู่ระบบ Admin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="mt-6"
          onPress={() => router.back()}
        >
          <Text className="text-center text-emerald-500 font-medium">
            กลับหน้าหลัก
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
