// client/app/admin-login.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
    // KeyboardAvoidingView ช่วยให้แป้นพิมพ์ไม่บังช่องกรอก
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#f8fafc]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-7">
        
        <View className="mb-10 items-center">
          <View className="w-20 h-20 bg-emerald-100 rounded-[28px] items-center justify-center mb-5 shadow-sm">
             <Text className="text-4xl">🔐</Text>
          </View>
          <Text className="text-3xl font-bold text-[#064e3b] tracking-tighter">
            Admin Portal
          </Text>
          <Text className="text-slate-400 mt-2 font-medium text-center">
            กรุณาเข้าสู่ระบบเพื่อจัดการคลังหนังสือ
          </Text>
        </View>

        <View className="bg-white p-8 rounded-[35px] shadow-2xl shadow-emerald-900/10 border border-emerald-50/50">
          
          <View className="mb-6">
            <Text className="mb-2 ml-1 font-bold text-xs text-emerald-800 uppercase tracking-[1px]">
              Admin Username
            </Text>
            <TextInput 
              className="bg-slate-50 p-4 rounded-[20px] border border-slate-100 text-slate-800 focus:border-emerald-200"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor="#cbd5e1"
            />
          </View>
          
          <View className="mb-8">
            <Text className="mb-2 ml-1 font-bold text-xs text-emerald-800 uppercase tracking-[1px]">
              Password
            </Text>
            <TextInput 
              className="bg-slate-50 p-4 rounded-[20px] border border-slate-100 text-slate-800 focus:border-emerald-200"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#cbd5e1"
            />
          </View>

          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-emerald-600 py-4 rounded-[22px] shadow-lg shadow-emerald-600/20 items-center"
            onPress={handleLogin}
          >
            <Text className="text-white font-bold text-lg tracking-wide">
              Sign In to Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="mt-8 self-center"
            onPress={() => router.back()}
          >
            <Text className="text-slate-400 font-bold text-sm">
              กลับสู่หน้าหลักสำหรับ <Text className="text-emerald-500">สมาชิก</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}