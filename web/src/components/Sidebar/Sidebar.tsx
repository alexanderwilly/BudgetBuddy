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
  CircleDollarSign
} from "lucide-react";
import styles from "./Sidebar.module.css";

const menuItems = [
  { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  { name: "Transactions", path: "/user/transactions", icon: ArrowRightLeft },
  { name: "Goals", path: "/user/goals", icon: Target },
  { name: "Settings", path: "/user/settings", icon: Settings },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.header}>
        {isExpanded ? (
          <div className={styles.logoContainer}>
            <CircleDollarSign className={styles.logoIcon} />
            <h1 className={styles.logoText}>BudgetBuddy</h1>
          </div>
        ) : (
          <CircleDollarSign className={styles.logoIconCollapsed} />
        )}
      </div>

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
                >
                  <Icon className={styles.navIcon} />
                  {isExpanded && <span className={styles.navText}>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <button onClick={toggleSidebar} className={styles.toggleBtn}>
          {isExpanded ? <PanelLeftClose /> : <PanelLeftOpen />}
          {isExpanded && <span>Collapse</span>}
        </button>
        <Link href="/logout" className={styles.navLink}>
          <LogOut className={styles.navIcon} />
          {isExpanded && <span className={styles.navText}>Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
