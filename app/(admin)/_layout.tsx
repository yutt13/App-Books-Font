// client/app/(admin)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import "../../global.css";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ecfdf5', // เขียวอ่อนแบบ minimal
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: '#065f46', // เขียวเข้มอ่านง่าย
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },

        tabBarActiveTintColor: '#059669', // เขียว modern
        tabBarInactiveTintColor: '#94a3b8', // เทา soft
        tabBarStyle: {
          height: 70,
          paddingBottom: 12,
          paddingTop: 12,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'จัดการสมาชิก',
          tabBarLabel: 'สมาชิก',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-book"
        options={{
          title: 'เพิ่มหนังสือ',
          tabBarLabel: 'เพิ่มหนังสือ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="borrowed-list"
        options={{
          title: 'รายการยืมค้าง',
          tabBarLabel: 'กำลังยืม',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
