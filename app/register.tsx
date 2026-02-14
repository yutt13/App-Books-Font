// client/app/register.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    fullName: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.username || !form.password || !form.fullName) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: form.username,
        password: form.password,
        fullName: form.fullName
      });

      if (response.data.success) {
        Alert.alert("สำเร็จ", "สมัครสมาชิกเรียบร้อย! กรุณาเข้าสู่ระบบ");
        router.back();
      }

    } catch (error: any) {
      const message = error.response?.data?.message || "การสมัครสมาชิกล้มเหลว";
      Alert.alert("ผิดพลาด", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-emerald-50">
      <View className="px-6 pt-14 pb-10">

        {/* Header */}
        <View className="mb-10">
          <Text className="text-3xl font-semibold text-emerald-900 mb-2">
            สร้างบัญชีใหม่ ✨
          </Text>
          <Text className="text-emerald-600">
            สมัครสมาชิกเพื่อเริ่มใช้งานระบบห้องสมุด
          </Text>
        </View>

        {/* ชื่อ-นามสกุล */}
        <View className="mb-5">
          <Text className="text-emerald-800 mb-2 font-medium">
            ชื่อ-นามสกุล
          </Text>
          <TextInput 
            className="w-full bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm"
            placeholder="เช่น สมชาย ใจดี"
            placeholderTextColor="#94a3b8"
            value={form.fullName}
            onChangeText={(text) => setForm({...form, fullName: text})}
          />
        </View>

        {/* Username */}
        <View className="mb-5">
          <Text className="text-emerald-800 mb-2 font-medium">
            ชื่อผู้ใช้งาน
          </Text>
          <TextInput 
            className="w-full bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm"
            placeholder="ภาษาอังกฤษเท่านั้น"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            value={form.username}
            onChangeText={(text) => setForm({...form, username: text})}
          />
        </View>

        {/* Password */}
        <View className="mb-8">
          <Text className="text-emerald-800 mb-2 font-medium">
            รหัสผ่าน
          </Text>
          <TextInput 
            className="w-full bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm"
            placeholder="อย่างน้อย 6 ตัวอักษร"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm({...form, password: text})}
          />
        </View>

        {/* ปุ่ม Register */}
        <TouchableOpacity 
          className={`bg-emerald-600 p-4 rounded-2xl shadow-lg flex-row justify-center ${isLoading ? 'opacity-70' : ''}`}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
             <ActivityIndicator color="#fff" />
          ) : (
             <Text className="text-white text-center font-semibold text-lg">
               ยืนยันการสมัคร
             </Text>
          )}
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity onPress={() => router.back()} className="mt-6">
          <Text className="text-emerald-600 text-center">
            ยกเลิก
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
