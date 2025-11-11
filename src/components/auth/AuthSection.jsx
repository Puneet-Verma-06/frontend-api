import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import OtpModal from "./OtpModal";

export default function AuthSection({ onClose }) {
  const [screen, setScreen] = useState("login"); // "login" | "register" | "otp"
  const [regData, setRegData] = useState(null);

  if (screen === "register") {
    return (
      <RegisterModal
        onClose={onClose}
        onSwitchToLogin={() => setScreen("login")}
        onProceedOTP={(data) => {
          setRegData(data);
          setScreen("otp");
        }}
      />
    );
  }

  if (screen === "otp") {
    return (
      <OtpModal
        regData={regData}
        onClose={onClose}
        onBack={() => setScreen("register")}
      />
    );
  }

  return (
    <LoginModal
      onClose={onClose}
      onSwitchToRegister={() => setScreen("register")}
    />
  );
}
