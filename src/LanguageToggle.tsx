import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useApp();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, language === 'en' && styles.activeButton]}
        onPress={() => setLanguage('en')}
      >
        <Text style={[styles.flag]}>EN</Text>
        <Text style={[styles.text, language === 'en' && styles.activeText]}>English</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, language === 'bn' && styles.activeButton]}
        onPress={() => setLanguage('bn')}
      >
        <Text style={[styles.flag]}>বাং</Text>
        <Text style={[styles.text, language === 'bn' && styles.activeText]}>বাংলা</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    padding: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  flag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C3CE7',
  },
  text: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  activeText: {
    color: '#6C3CE7',
  },
});
