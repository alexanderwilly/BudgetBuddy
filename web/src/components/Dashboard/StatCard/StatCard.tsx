import React from "react";
import styles from "./StatCard.module.css";

interface StatCardProps {
  title: string;
  amount: number;
  currencySymbol?: string;
}

function formatNumber(num: number): string {
  if (Math.abs(num) >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + " B";
  }
  return num.toLocaleString();
}

export default function StatCard({
  title,
  amount,
  currencySymbol = "$",
}: StatCardProps) {

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.amountContainer}>
        <span className={styles.currency}>{currencySymbol}</span>
        <span className={styles.amount}>{formatNumber(amount)}</span>
      </div>
    </div>
  );
}
