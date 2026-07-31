"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Lock, Eye, EyeOff, PieChart, Target, TrendingUp } from 'lucide-react';
import styles from './sign-in.module.css';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    {
      title: "Welcome!",
      text: "Manage your expenses and track your budget efficiently with BudgetBuddy.",
      icon: <PieChart size={160} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
    },
    {
      title: "Set Goals",
      text: "Create financial goals and let BudgetBuddy help you achieve them.",
      icon: <Target size={160} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
    },
    {
      title: "Insightful Analytics",
      text: "View beautiful charts and graphs to understand your spending habits.",
      icon: <TrendingUp size={160} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div className={styles.container}>
      {/* Left Panel*/}
      <div className={styles.leftPanel}>
        <div className={styles.brand}>
          <span>BudgetBuddy</span>
        </div>

        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className={styles.carouselSlide}>
                <div className={styles.illustrationContainer}>
                  {item.icon}
                </div>
                <div className={styles.leftContent}>
                  <h1 className={styles.welcomeTitle}>{item.title}</h1>
                  <p className={styles.welcomeText}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.carouselIndicators}>
          {carouselItems.map((_, index) => (
            <span
              key={index}
              className={index === activeIndex ? styles.activeDot : styles.dot}
              onClick={() => setActiveIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <div className={styles.mobileBrand}>
            <span>BudgetBuddy</span>
          </div>

          <h2 className={styles.loginTitle}>Log In</h2>
          <p className={styles.signupPrompt}>
            Don't have an account? <Link href="/sign-up" className={styles.linkBlue}>Create an account</Link>
          </p>
          <p className={styles.subtitle}>It will take less than a minute.</p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Username" className={styles.input} />
              <User className={styles.inputIcon} size={20} />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggleBtn}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.submitBtn}>Sign in</button>
              <label className={styles.rememberMe}>
                <input type="checkbox" /> Remember password
              </label>
            </div>

            <div className={styles.forgotPassword}>
              <Link href="/forgot-password" className={styles.linkBlue}>
                Forget your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
