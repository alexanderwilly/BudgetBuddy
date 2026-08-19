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

function formatAmount(amount: number, isExpense: boolean, symbol: string = "SG$") {
  const formatted = amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${isExpense ? "-" : "+"} ${symbol} ${formatted}`;
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
              <th>PAYMENT NAME</th>
              <th>CATEGORY</th>
              <th>METHOD</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className={styles.row}>
                <td>{tx.date}</td>
                <td>{tx.paymentName}</td>
                <td>{tx.category}</td>
                <td>{tx.method}</td>
                <td className={tx.isExpense ? styles.expenseAmount : styles.incomeAmount}>
                  {formatAmount(tx.amount, tx.isExpense, tx.currencySymbol || "SG$")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
