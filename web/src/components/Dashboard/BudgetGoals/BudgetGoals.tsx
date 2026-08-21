"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import styles from "./BudgetGoals.module.css";

type BudgetGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currencySymbol?: string;
};

const mockGoals: BudgetGoal[] = [
  {
    id: "1",
    name: "MacBook Pro",
    targetAmount: 2500,
    currentAmount: 750,
    currencySymbol: "SG$",
  },
  {
    id: "2",
    name: "New Car",
    targetAmount: 20000,
    currentAmount: 14600,
    currencySymbol: "SG$",
  },
  {
    id: "3",
    name: "iPhone 16 Pro Max",
    targetAmount: 1200,
    currentAmount: 1080,
    currencySymbol: "SG$",
  },
];

function formatFullAmount(amount: number, currencySymbol = "SG$") {
  return `${currencySymbol} ${amount.toLocaleString()}`;
}

export default function BudgetGoals() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Budget Goals</h3>
        <button className={styles.seeAllBtn}>
          See all <ChevronRight className={styles.btnIcon} />
        </button>
      </div>

      <div className={styles.goalsList}>
        {mockGoals.map((goal) => {
          const progressPercentage = Math.min(
            100,
            (goal.currentAmount / goal.targetAmount) * 100
          );
          const formattedTarget = formatFullAmount(goal.targetAmount, goal.currencySymbol);
          const formattedCurrent = formatFullAmount(goal.currentAmount, goal.currencySymbol);

          return (
            <div key={goal.id} className={styles.goalItem}>
              <div className={styles.goalHeader}>
                <span className={styles.goalName}>{goal.name}</span>
                <span className={styles.goalCurrent}>{formattedCurrent}</span>
              </div>
              <div
                className={styles.progressBarBg}
                title={`Target: ${formattedTarget} | Current: ${formattedCurrent}`}
              >
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${progressPercentage}%` }}
                >
                  <span className={styles.progressText}>
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className={styles.tooltip}>
                  Target: {formattedTarget} <br />
                  Current: {formattedCurrent}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
