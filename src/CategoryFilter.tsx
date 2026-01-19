import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'all', icon: 'apps', label: 'All', labelBn: 'সব' },
  { id: 'Nature', icon: 'leaf', label: 'Nature', labelBn: 'প্রকৃতি' },
  { id: 'Technology', icon: 'hardware-chip', label: 'Tech', labelBn: 'টেক' },
  { id: 'Food', icon: 'restaurant', label: 'Food', labelBn: 'খাবার' },
  { id: 'Fitness', icon: 'fitness', label: 'Fitness', labelBn: 'ফিটনেস' },
  { id: 'Travel', icon: 'airplane', label: 'Travel', labelBn: 'ভ্রমণ' },
  { id: 'Music', icon: 'musical-notes', label: 'Music', labelBn: 'মিউজিক' },
  { id: 'Comedy', icon: 'happy', label: 'Comedy', labelBn: 'কমেডি' },
  { id: 'Education', icon: 'school', label: 'Education', labelBn: 'শিক্ষা' },
  { id: 'Gaming', icon: 'game-controller', label: 'Gaming', labelBn: 'গেমিং' },
];

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const { language } = useApp();
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryButton, isSelected && styles.selectedButton]}
            onPress={() => onSelectCategory(category.id)}
          >
            <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
              <Ionicons
                name={category.icon as any}
                size={18}
                color={isSelected ? '#fff' : '#6C3CE7'}
              />
            </View>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {language === 'bn' ? category.labelBn : category.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  content: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  selectedButton: {
    backgroundColor: '#6C3CE7',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(108,60,231,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  selectedLabel: {
    color: '#fff',
  },
});
