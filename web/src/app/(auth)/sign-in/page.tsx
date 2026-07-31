"use client";

import React, { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { User, Lock, Eye, EyeOff, PieChart, Target, TrendingUp, Mail } from 'lucide-react';
import DOMPurify from 'dompurify';
import { toast } from "react-toastify";

import { api } from '@/app/api/axios';
import { useAuth } from '@/contexts/AuthContext';

import styles from './sign-in.module.css';


export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Sanitize user inputs
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    if (sanitizedEmail.trim() == '' || sanitizedPassword.trim() == '') {
      toast.warning('Enter your email and password!');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(sanitizedEmail)) {
      toast.warning('Enter a correct email address!');
      return;
    }

    try {
      const res = await api.post('/auth/login', {
        email: sanitizedEmail,
        password: sanitizedPassword
      });

      // Get user data
      const { user } = res.data;

      // Save to context
      login(user);

      toast.success('Login Success!');


    } catch (error: any) {
      if (error.response) {
        let message = 'A server error occurred';
        if (error.response.data?.detail) {
          message = error.response.data.detail;
        } else if (error.response.data?.message) {
          message = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          message = error.response.data;
        }
        toast.error(message);
      } else {
        toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }

  }

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

          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                onChange={(e) => { setEmail(e.target.value); }}
                value={email}
              />
              <Mail className={styles.inputIcon} size={20} />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.input}
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
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
              <button type="submit" className={styles.submitBtn}>Sign in</button>
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
