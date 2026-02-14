// app/_layout.tsx
import { Stack } from 'expo-router';
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ecfdf5', // emerald-50
          borderBottomWidth: 0,       // ตัดเส้นล่าง iOS
          elevation: 0,               // ตัดเงา Android
        },
        headerShadowVisible: false,   // ปิดเงา header (รองรับ version ใหม่)
        headerTintColor: '#065f46',   // emerald-800
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        contentStyle: {
          backgroundColor: '#ecfdf5', // พื้นหลังทั้งแอป
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'หน้าหลัก' }}
      />
      <Stack.Screen
        name="login"
        options={{ title: 'เข้าสู่ระบบ' }}
      />
      <Stack.Screen
        name="register"
        options={{ title: 'สมัครสมาชิก' }}
      />
    </Stack>
  );
}
