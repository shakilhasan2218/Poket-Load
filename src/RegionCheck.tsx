import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';

interface RegionCheckProps {
  children: React.ReactNode;
}

export default function RegionCheck({ children }: RegionCheckProps) {
  const { t, isInBangladesh, checkingRegion } = useApp();
  
  if (checkingRegion) {
    return (
      <LinearGradient
        colors={['#6C3CE7', '#8B5CF6']}
        style={styles.container}
      >
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>{t('checkingLocation')}</Text>
        </View>
      </LinearGradient>
    );
  }
  
  if (!isInBangladesh) {
    return (
      <LinearGradient
        colors={['#6C3CE7', '#8B5CF6']}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="location-outline" size={64} color="#FF6B6B" />
          </View>
          <Text style={styles.title}>{t('regionRestricted')}</Text>
          <Text style={styles.subtitle}>
            This app is only available for users in Bangladesh.
          </Text>
          <Text style={styles.subtitleBn}>
            এই অ্যাপটি শুধুমাত্র বাংলাদেশের ব্যবহারকারীদের জন্য উপলব্ধ।
          </Text>
          
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>🇧🇩</Text>
            <Text style={styles.flagText}>Bangladesh Only</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
  
  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleBn: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 24,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  flag: {
    fontSize: 24,
  },
  flagText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
