import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

interface BannerAdProps {
  position?: 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large';
}

export default function BannerAd({ position = 'bottom', size = 'medium' }: BannerAdProps) {
  const { t } = useApp();
  
  const getHeight = () => {
    switch (size) {
      case 'small': return 50;
      case 'medium': return 60;
      case 'large': return 90;
      default: return 60;
    }
  };
  
  return (
    <View style={[styles.container, { height: getHeight() }]}>
      <View style={styles.adContent}>
        <Ionicons name="megaphone-outline" size={20} color="#888" />
        <Text style={styles.adText}>{t('advertisement')}</Text>
        <Text style={styles.adSubtext}>Google AdMob Banner</Text>
      </View>
      <TouchableOpacity style={styles.closeButton}>
        <Ionicons name="close" size={16} color="#888" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  adContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  adText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  adSubtext: {
    fontSize: 10,
    color: '#aaa',
  },
  closeButton: {
    padding: 4,
  },
});
