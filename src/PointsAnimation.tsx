import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PointsAnimationProps {
  points: number;
  visible: boolean;
  onComplete?: () => void;
}

export default function PointsAnimation({ points, visible, onComplete }: PointsAnimationProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;
  
  useEffect(() => {
    if (visible) {
      // Reset values
      translateY.setValue(0);
      opacity.setValue(0);
      scale.setValue(0.5);
      
      // Animate
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -60,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.delay(500),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(scale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onComplete?.();
      });
    }
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateY },
            { scale },
          ],
          opacity,
        },
      ]}
    >
      <Ionicons name="star" size={20} color="#FFD700" />
      <Text style={styles.points}>+{points}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(108,60,231,0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#6C3CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  points: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
});
