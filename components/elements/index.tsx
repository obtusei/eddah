import { Link } from "expo-router";
import * as Haptics from "expo-haptics";

import {
  Button,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function EText({
  title,
  color,
  weight = "R",
  opacity = 1,
  size = 16,
  style,
}: {
  title: string;
  weight?: "B" | "R" | "L" | "M" | "S";
  opacity?: number;
  size?: number;
  color?: string;
  style?: any;
}) {
  return (
    <Text
      adjustsFontSizeToFit
      style={{
        ...style,
        fontFamily: `Comfortaa-${weight}`,
        fontSize: size,
        opacity: opacity,
        color: color || "#000",
      }}
    >
      {title}
    </Text>
  );
}

export function EButton({
  title,
  pv = 10,
  onPress,
  bg,
  color,
  style,
  disabled,
}: {
  title: string;
  pv?: number;
  onPress?: any;
  bg?: string;
  color?: string;
  style?: any;
  disabled?: boolean;
}) {
  return (
    <Pressable
      style={{
        ...style,
        borderRadius: 20,
        backgroundColor: bg || "black",
        paddingHorizontal: 12,
        paddingVertical: pv,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        onPress();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }}
      disabled={disabled}
    >
      <Text
        style={{
          fontFamily: "Comfortaa-R",
          color: color || "#fff",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export function ELink({
  href,
  title,
  alignItems = "center",
  pv = 10,
  onPress,
  bg,
}: {
  title: string;
  pv?: number;
  onPress?: any;
  bg?: string;
  href: string;
  alignItems?: "center" | "flex-start" | "flex-end";
}) {
  return (
    <Link href={href}>
      <View
        style={{
          backgroundColor: bg,
          padding: 12,
          paddingHorizontal: 24,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: alignItems,
        }}
      >
        <EText color="white" title={title} />
      </View>
    </Link>
  );
}

export function IconButton({
  activeBg,
  isActive = false,
  style,
  icon,
  size = 48,
  color,
  onPress,
  bg,
}: {
  style: any;
  activeBg?: string;
  isActive?: boolean;
  icon: string;
  size?: number;
  color: string;
  onPress: () => void;
  bg?: string;
}) {
  return (
    <Pressable
      style={{
        ...style,
        borderRadius: 20,
        backgroundColor: bg || "transparent",
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: "Comfortaa-R",
          color: "#fff",
        }}
      >
        <Icon name={icon} size={size} color={isActive ? activeBg : color} />
      </Text>
    </Pressable>
  );
}

export function IconText({ icon, size = 48, color, title, bg }) {
  return (
    <View
      style={{
        borderRadius: 20,
        backgroundColor: bg,
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Icon name={icon} size={size} color={color} />
      <Text
        style={{
          fontFamily: "Comfortaa-R",
          color: color,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
