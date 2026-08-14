"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import styles from "./RecentTransactions.module.css";

type Transaction = {
  id: string;
  date: string;
  amount: number;
  isExpense: boolean;
  paymentName: string;
  category: string;
  method: string;
  currencySymbol?: string;
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "12 Apr",
    amount: 7.99,
    isExpense: true,
    paymentName: "YouTube",
    method: "PayPal",
    category: "Subscription",
    currencySymbol: "SG$",
  },
  {
    id: "2",
    date: "8 Apr",
    amount: 12.99,
    isExpense: true,
    paymentName: "McDonald",
    method: "Visa **1234",
    category: "Food",
    currencySymbol: "SG$",
  },
  {
    id: "3",
    date: "8 Apr",
    amount: 159.99,
    isExpense: true,
    paymentName: "Amazon",
    method: "Visa **1234",
    category: "Shopping",
    currencySymbol: "SG$",
  },
  {
    id: "4",
    date: "5 Apr",
    amount: 3000,
    isExpense: false,
    paymentName: "Salary",
    method: "Bank Transfer",
    category: "Income",
    currencySymbol: "SG$",
  },
  {
    id: "5",
    date: "1 Apr",
    amount: 1500000,
    isExpense: true,
    paymentName: "Car Dealership",
    method: "Bank Transfer",
    category: "Automotive",
    currencySymbol: "Rp",
  },
];

function formatTransactionAmount(
  amount: number,
  isExpense: boolean,
  currencySymbol = "SG$"
) {
  let formattedValue = "";
  const absAmount = Math.abs(amount);

  if (absAmount >= 1_000_000_000_000) {
    formattedValue = (absAmount / 1_000_000_000_000).toFixed(2) + " T";
  } else if (absAmount >= 1_000_000) {
    formattedValue = (absAmount / 1_000_000).toFixed(2) + " M";
  } else {
    formattedValue = absAmount.toLocaleString();
  }

  if (isExpense) {
    return `(${currencySymbol} ${formattedValue})`;
  }
  return `${currencySymbol} ${formattedValue}`;
}

export default function RecentTransactions() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent transactions</h3>
        <button className={styles.seeAllBtn}>
          See all <ChevronRight className={styles.btnIcon} />
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>PAYMENT NAME</th>
              <th>METHOD</th>
              <th>CATEGORY</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className={styles.row}>
                <td>{tx.date}</td>
                <td className={tx.isExpense ? "" : styles.incomeAmount}>
                  {formatTransactionAmount(tx.amount, tx.isExpense, tx.currencySymbol)}
                </td>
                <td>{tx.paymentName}</td>
                <td>{tx.method}</td>
                <td>{tx.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
