import React from "react";
import styles from "./dashboard.module.css";
import StatCard from "@/components/Dashboard/StatCard/StatCard";
import ActivitySummary from "@/components/Dashboard/ActivitySummary/ActivitySummary";
import RecentTransactions from "@/components/Dashboard/RecentTransactions/RecentTransactions";
import BudgetGoals from "@/components/Dashboard/BudgetGoals/BudgetGoals";
import { User } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Header Area */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Hi Sophia, Here's the summary of your finances.</p>
        </div>
        <div className={styles.headerRight}>

          <button className={styles.userAvatarBtn}>
            <User className={styles.avatarIcon} />
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className={styles.content}>
        {/* Stat Cards */}
        <div className={styles.statsGrid}>
          <StatCard
            title="Income"
            amount={8000}
          />
          <StatCard
            title="Expense"
            amount={2814}
          />
          <StatCard
            title="Total Savings"
            amount={41000}
          />
        </div>

        {/* Activity Summary / Chart Placeholder */}
        <div className={styles.activitySection}>
          <ActivitySummary />
        </div>

        {/* Bottom Section: Transactions & Goals */}
        <div className={styles.bottomGrid}>
          <div className={styles.transactionsWrapper}>
            <RecentTransactions />
          </div>
          <div className={styles.goalsWrapper}>
            <BudgetGoals />
          </div>
        </div>
      </div>
    </div>
  );
}