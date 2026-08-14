"use client";

import React, { useState } from "react";
import styles from "./ActivitySummary.module.css";
import { ChevronDown } from "lucide-react";

type DataPoint = { label: string; income: number; expense: number };

const mockData: Record<string, DataPoint[]> = {
  "7days": [
    { label: "Wed 12/8", income: 2000, expense: 500 },
    { label: "Thu 13/8", income: 1500, expense: 800 },
    { label: "Fri 14/8", income: 3000, expense: 1200 },
    { label: "Sat 15/8", income: 500, expense: 2000 },
    { label: "Sun 16/8", income: 200, expense: 3000 },
    { label: "Mon 17/8", income: 2500, expense: 400 },
    { label: "Tue 18/8", income: 1800, expense: 600 },
  ],
  "1month": [
    { label: "Week 1", income: 4000, expense: 2000 },
    { label: "Week 2", income: 3500, expense: 1500 },
    { label: "Week 3", income: 5000, expense: 2500 },
    { label: "Week 4", income: 2000, expense: 3000 },
    { label: "Week 5", income: 6000, expense: 1000 },
  ],
  "6months": [
    { label: "Mar 26", income: 18000, expense: 12000 },
    { label: "Apr 26", income: 22000, expense: 15000 },
    { label: "May 26", income: 25000, expense: 18000 },
    { label: "Jun 26", income: 21000, expense: 19000 },
    { label: "Jul 26", income: 19000, expense: 20000 },
    { label: "Aug 26", income: 15000, expense: 12000 },
  ],
  "YTD": [
    { label: "Jan", income: 15000, expense: 10000 },
    { label: "Feb", income: 16000, expense: 11000 },
    { label: "Mar", income: 18000, expense: 12000 },
    { label: "Apr", income: 22000, expense: 15000 },
    { label: "May", income: 25000, expense: 18000 },
    { label: "Jun", income: 21000, expense: 19000 },
    { label: "Jul", income: 19000, expense: 20000 },
    { label: "Aug", income: 15000, expense: 12000 },
  ],
  "1year": [
    { label: "Sep", income: 14000, expense: 9000 },
    { label: "Oct", income: 16000, expense: 10000 },
    { label: "Nov", income: 15000, expense: 12000 },
    { label: "Dec", income: 25000, expense: 20000 },
    { label: "Jan", income: 15000, expense: 10000 },
    { label: "Feb", income: 16000, expense: 11000 },
    { label: "Mar", income: 18000, expense: 12000 },
    { label: "Apr", income: 22000, expense: 15000 },
    { label: "May", income: 25000, expense: 18000 },
    { label: "Jun", income: 21000, expense: 19000 },
    { label: "Jul", income: 19000, expense: 20000 },
    { label: "Aug", income: 15000, expense: 12000 },
  ],
};

const formatCurrency = (value: number) => {
  return "SG$ " + value.toLocaleString();
};

export default function ActivitySummary() {
  const [timeRange, setTimeRange] = useState("6months");

  const data = mockData[timeRange];

  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.income, d.expense))
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Activity Summary</h3>
        <div className={styles.controls}>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotIncome}`}></span>
              Income
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotExpense}`}></span>
              Expense
            </span>
          </div>
          <div className={styles.dropdownContainer}>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={styles.dropdown}
            >
              <option value="7days">7 days</option>
              <option value="1month">1 month</option>
              <option value="6months">6 months</option>
              <option value="YTD">YTD</option>
              <option value="1year">1 year</option>
            </select>
            <ChevronDown className={styles.chevronIcon} />
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.gridLines}>
          <div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div>
        </div>

        <div className={styles.barsArea}>
          {data.map((item, index) => {
            const incomeHeight = (item.income / maxVal) * 100;
            const expenseHeight = (item.expense / maxVal) * 100;

            return (
              <div key={index} className={styles.barGroup}>
                <div className={styles.bars}>
                  <div
                    className={`${styles.bar} ${styles.barIncome}`}
                    style={{ height: `${incomeHeight}%` }}
                    title={`Income: ${formatCurrency(item.income)}`}
                  >
                    <div className={styles.tooltip}>Income: {formatCurrency(item.income)}</div>
                  </div>
                  <div
                    className={`${styles.bar} ${styles.barExpense}`}
                    style={{ height: `${expenseHeight}%` }}
                    title={`Expense: ${formatCurrency(item.expense)}`}
                  >
                    <div className={styles.tooltip}>Expense: {formatCurrency(item.expense)}</div>
                  </div>
                </div>
                <span className={styles.xLabel}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
