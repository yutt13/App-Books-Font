import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          📚 แจ้งเตือน
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          นี่คือหน้าต่าง Modal ของระบบ
        </ThemedText>

        <Link href="/" dismissTo style={styles.link}>
          <ThemedText type="link" style={styles.linkText}>
            กลับสู่หน้าหลัก
          </ThemedText>
        </Link>
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5', // emerald-50
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    marginTop: 10,
    backgroundColor: '#059669', // emerald-600
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  linkText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
