"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Target,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  CircleDollarSign,
  Menu,
  User,
  PieChart,
  CreditCard,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const menuItems = [
  { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  { name: "Transactions", path: "/user/transactions", icon: ArrowRightLeft },
  { name: "Categories & Budgets", path: "/user/categories", icon: PieChart },
  { name: "Payment Methods", path: "/user/payment-methods", icon: CreditCard },
  { name: "Goals", path: "/user/goals", icon: Target },
  { name: "Settings", path: "/user/settings", icon: Settings },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <CircleDollarSign className={styles.logoIcon} />
          <h1 className={styles.logoText}>BudgetBuddy</h1>
        </div>
        <div className={styles.mobileActions}>
          <button className={styles.userAvatarBtnMobile}>
            <User className={styles.avatarIconMobile} />
          </button>
          <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
            <Menu className={styles.mobileMenuIcon} />
          </button>
        </div>
      </div>

      <div className={`${styles.sidebarContent} ${isMobileOpen ? styles.mobileOpen : ""}`}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    href={item.path}
                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Icon className={styles.navIcon} />
                    <span className={styles.navText}>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          <button onClick={toggleSidebar} className={styles.toggleBtn}>
            {isExpanded ? <PanelLeftClose className={styles.navIcon} /> : <PanelLeftOpen className={styles.navIcon} />}
            <span className={styles.navText}>Collapse</span>
          </button>
          <Link href="/logout" className={styles.navLink}>
            <LogOut className={styles.navIcon} />
            <span className={styles.navText}>Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
