import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, language, user } = useApp();
  
  const navItems = [
    { key: 'home', label: language === 'bn' ? 'হোম' : 'Home', icon: 'home-outline', activeIcon: 'home', route: '/' },
    { key: 'rewards', label: language === 'bn' ? 'পুরস্কার' : 'Rewards', icon: 'gift-outline', activeIcon: 'gift', route: '/rewards' },
    { key: 'history', label: language === 'bn' ? 'ইতিহাস' : 'History', icon: 'time-outline', activeIcon: 'time', route: '/history' },
    { key: 'profile', label: language === 'bn' ? 'প্রোফাইল' : 'Profile', icon: 'person-outline', activeIcon: 'person', route: '/profile' },
  ];
  
  const isActive = (route: string) => {
    if (route === '/') return pathname === '/' || pathname === '/index';
    return pathname === route || pathname.startsWith(route + '/');
  };
  
  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const active = isActive(item.route);
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.navItem}
            onPress={() => router.push(item.route as any)}
          >
            <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
              <Ionicons
                name={active ? item.activeIcon as any : item.icon as any}
                size={22}
                color={active ? '#6C3CE7' : '#888'}
              />
            </View>
            <Text style={[styles.label, active && styles.activeLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 24,
    paddingTop: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 14,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(108,60,231,0.1)',
  },
  label: {
    fontSize: 10,
    color: '#888',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#6C3CE7',
    fontWeight: '600',
  },
});
