import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function DailyStreakCalendar() {
  const { language, user } = useApp();
  
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysBn = ['র', 'সো', 'ম', 'বু', 'বৃ', 'শু', 'শ'];
  
  const today = new Date().getDay();
  const streak = user?.watchStreak || 0;
  
  // Calculate which days are part of the streak
  const streakDays = Array(7).fill(false).map((_, index) => {
    const dayDiff = today - index;
    return dayDiff >= 0 && dayDiff < streak;
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="flame" size={20} color="#FF6B6B" />
        <Text style={styles.title}>
          {language === 'bn' ? 'দৈনিক স্ট্রিক' : 'Daily Streak'}
        </Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakCount}>{streak}</Text>
          <Text style={styles.streakLabel}>
            {language === 'bn' ? 'দিন' : 'days'}
          </Text>
        </View>
      </View>
      
      <View style={styles.calendar}>
        {days.map((day, index) => {
          const isToday = index === today;
          const isActive = streakDays[index];
          
          return (
            <View key={index} style={styles.dayContainer}>
              <Text style={[styles.dayLabel, isToday && styles.todayLabel]}>
                {language === 'bn' ? daysBn[index] : day}
              </Text>
              <View style={[
                styles.dayCircle,
                isActive && styles.activeDayCircle,
                isToday && styles.todayCircle,
              ]}>
                {isActive ? (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                ) : (
                  <View style={styles.emptyCircle} />
                )}
              </View>
            </View>
          );
        })}
      </View>
      
      <Text style={styles.motivationText}>
        {streak >= 7
          ? (language === 'bn' ? 'অসাধারণ! চালিয়ে যান!' : 'Amazing! Keep it up!')
          : streak >= 3
          ? (language === 'bn' ? 'দারুণ হচ্ছে!' : 'Great progress!')
          : (language === 'bn' ? 'প্রতিদিন ভিডিও দেখুন!' : 'Watch daily to build streak!')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    flex: 1,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    backgroundColor: 'rgba(255,107,107,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  streakCount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF6B6B',
  },
  streakLabel: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayContainer: {
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
  todayLabel: {
    color: '#6C3CE7',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayCircle: {
    backgroundColor: '#4ECDC4',
  },
  todayCircle: {
    borderWidth: 2,
    borderColor: '#6C3CE7',
  },
  emptyCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  motivationText: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
});
