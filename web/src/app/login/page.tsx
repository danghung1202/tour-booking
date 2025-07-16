"use client"

import { useState } from "react"
import LoginForm from "@/components/features/LoginForm"
import RegisterForm from "@/components/features/RegisterForm"
import styles from "./page.module.css"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{isLogin ? "Welcome Back" : "Join Unique Tours"}</h1>
          <p className={styles.subtitle}>
            {isLogin ? "Sign in to your account to continue" : "Create an account to start booking amazing tours"}
          </p>
        </div>

        <div className={styles.formWrapper}>{isLogin ? <LoginForm /> : <RegisterForm />}</div>

        <div className={styles.toggleSection}>
          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button type="button" onClick={toggleMode} className={styles.toggleButton}>
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>

        <div className={styles.guestSection}>
          <p className={styles.guestText}>Want to browse tours without an account?</p>
          <a href="/tours" className={styles.guestLink}>
            Continue as Guest
          </a>
        </div>
      </div>
    </div>
  )
}
