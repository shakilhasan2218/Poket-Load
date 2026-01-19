import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

interface InterstitialAdProps {
  visible: boolean;
  onClose: () => void;
  onWatchComplete?: () => void;
  isRewarded?: boolean;
}

export default function InterstitialAd({ 
  visible, 
  onClose, 
  onWatchComplete,
  isRewarded = false 
}: InterstitialAdProps) {
  const { t, addPoints } = useApp();
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  
  useEffect(() => {
    if (visible) {
      setCountdown(5);
      setCanSkip(false);
      progress.setValue(0);
      
      // Animate progress bar
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start();
      
      // Countdown timer
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            if (isRewarded && onWatchComplete) {
              addPoints(5);
              onWatchComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [visible]);
  
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={canSkip ? onClose : undefined}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.adBadge}>
              <Ionicons name="megaphone" size={14} color="#fff" />
              <Text style={styles.adBadgeText}>{t('advertisement')}</Text>
            </View>
            {canSkip ? (
              <TouchableOpacity style={styles.skipButton} onPress={onClose}>
                <Text style={styles.skipText}>{t('close')}</Text>
                <Ionicons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            ) : (
              <View style={styles.countdown}>
                <Text style={styles.countdownText}>{countdown}s</Text>
              </View>
            )}
          </View>
          
          <View style={styles.adContent}>
            <View style={styles.adPlaceholder}>
              <Ionicons name="play-circle" size={80} color="#6C3CE7" />
              <Text style={styles.adTitle}>
                {isRewarded ? t('watchAdForBonus') : 'Video Advertisement'}
              </Text>
              <Text style={styles.adSubtitle}>Google AdMob Interstitial</Text>
              {isRewarded && (
                <View style={styles.rewardBadge}>
                  <Ionicons name="gift" size={16} color="#FFD700" />
                  <Text style={styles.rewardText}>+5 {t('points')}</Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  adBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(108,60,231,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#6C3CE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  countdown: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  countdownText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  adContent: {
    padding: 40,
    alignItems: 'center',
  },
  adPlaceholder: {
    alignItems: 'center',
    gap: 12,
  },
  adTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  adSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  rewardText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '700',
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6C3CE7',
  },
});
