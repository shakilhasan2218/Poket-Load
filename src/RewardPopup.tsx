import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

interface RewardPopupProps {
  visible: boolean;
  points: number;
  onClose: () => void;
  onNextVideo?: () => void;
}

export default function RewardPopup({ visible, points, onClose, onNextVideo }: RewardPopupProps) {
  const { t, user } = useApp();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(
    Array(12).fill(0).map(() => ({
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;
  
  useEffect(() => {
    if (visible) {
      // Reset animations
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      confettiAnims.forEach(anim => {
        anim.translateY.setValue(0);
        anim.translateX.setValue(0);
        anim.opacity.setValue(1);
      });
      
      // Coin animation
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Confetti animation
      confettiAnims.forEach((anim, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        
        Animated.parallel([
          Animated.timing(anim.translateX, {
            toValue: Math.cos(angle) * distance,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: Math.sin(angle) * distance + 50,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [visible]);
  
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const confettiColors = ['#FFD700', '#6C3CE7', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Confetti */}
          <View style={styles.confettiContainer}>
            {confettiAnims.map((anim, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.confetti,
                  {
                    backgroundColor: confettiColors[index % confettiColors.length],
                    transform: [
                      { translateX: anim.translateX },
                      { translateY: anim.translateY },
                    ],
                    opacity: anim.opacity,
                  },
                ]}
              />
            ))}
          </View>
          
          {/* Coin */}
          <Animated.View
            style={[
              styles.coinContainer,
              {
                transform: [
                  { scale: scaleAnim },
                  { rotate },
                ],
              },
            ]}
          >
            <View style={styles.coin}>
              <Ionicons name="star" size={40} color="#fff" />
            </View>
          </Animated.View>
          
          <Text style={styles.title}>{t('videoComplete')}</Text>
          <Text style={styles.subtitle}>{t('youEarned')}</Text>
          
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>+{points}</Text>
            <Text style={styles.pointsLabel}>{t('points')}</Text>
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>{t('yourPoints')}:</Text>
            <Text style={styles.totalPoints}>{user?.totalPoints || 0}</Text>
          </View>
          
          <View style={styles.buttons}>
            {onNextVideo && (
              <TouchableOpacity style={styles.nextButton} onPress={onNextVideo}>
                <Text style={styles.nextButtonText}>{t('nextVideo')}</Text>
                <Ionicons name="play-forward" size={20} color="#fff" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>{t('close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    maxWidth: 340,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  confettiContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
  },
  confetti: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  coinContainer: {
    marginBottom: 20,
  },
  coin: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 20,
  },
  points: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFD700',
  },
  pointsLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFD700',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 14,
    color: '#888',
  },
  totalPoints: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6C3CE7',
    paddingVertical: 14,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  closeButtonText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
});
