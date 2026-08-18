"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import styles from "./transactions.module.css";

type Transaction = {
  id: string;
  timestamp: string;
  paymentName: string;
  category: string;
  method: string;
  amount: number;
  isExpense: boolean;
  currencySymbol: string;
};

// Generate mock data from Jan 2026 to Aug 2026
const mockTransactions: Transaction[] = [
  // Aug 2026
  { id: "1", timestamp: "2026-08-15T10:30:00Z", paymentName: "Imago Hills 2", category: "Food & Dining", method: "QRIS", amount: 122000, isExpense: true, currencySymbol: "Rp" },
  { id: "2", timestamp: "2026-08-06T14:15:00Z", paymentName: "FamilyMart", category: "Groceries", method: "QRIS", amount: 79100, isExpense: true, currencySymbol: "Rp" },
  { id: "3", timestamp: "2026-08-05T09:00:00Z", paymentName: "Top Up Flazz", category: "Transportation", method: "Bank Transfer", amount: 100000, isExpense: true, currencySymbol: "Rp" },
  { id: "4", timestamp: "2026-08-04T16:45:00Z", paymentName: "Gopay Topup", category: "E-Wallet", method: "Bank Transfer", amount: 300000, isExpense: true, currencySymbol: "Rp" },
  { id: "5", timestamp: "2026-08-01T08:00:00Z", paymentName: "Salary", category: "Income", method: "Bank Transfer", amount: 3000, isExpense: false, currencySymbol: "SG$" },
  // Jul 2026
  { id: "6", timestamp: "2026-07-28T18:20:00Z", paymentName: "Amazon", category: "Shopping", method: "Visa **1234", amount: 159.99, isExpense: true, currencySymbol: "SG$" },
  { id: "7", timestamp: "2026-07-15T12:00:00Z", paymentName: "Spotify", category: "Subscription", method: "PayPal", amount: 9.99, isExpense: true, currencySymbol: "SG$" },
  // Jun 2026
  { id: "8", timestamp: "2026-06-20T19:30:00Z", paymentName: "McDonald's", category: "Food", method: "Visa **1234", amount: 12.99, isExpense: true, currencySymbol: "SG$" },
  { id: "9", timestamp: "2026-06-05T10:00:00Z", paymentName: "Freelance Client", category: "Income", method: "Wire Transfer", amount: 1200, isExpense: false, currencySymbol: "SG$" },
  // May 2026
  { id: "10", timestamp: "2026-05-18T14:40:00Z", paymentName: "Netflix", category: "Subscription", method: "Credit Card", amount: 15.99, isExpense: true, currencySymbol: "SG$" },
  // Apr 2026
  { id: "11", timestamp: "2026-04-12T08:30:00Z", paymentName: "YouTube", category: "Subscription", method: "PayPal", amount: 7.99, isExpense: true, currencySymbol: "SG$" },
  // Mar 2026
  { id: "12", timestamp: "2026-03-25T16:10:00Z", paymentName: "Gym Membership", category: "Health", method: "Direct Debit", amount: 50.00, isExpense: true, currencySymbol: "SG$" },
  // Feb 2026
  { id: "13", timestamp: "2026-02-14T20:00:00Z", paymentName: "Valentine's Dinner", category: "Dining", method: "Visa **1234", amount: 150.00, isExpense: true, currencySymbol: "SG$" },
  // Jan 2026
  { id: "14", timestamp: "2026-01-05T11:20:00Z", paymentName: "New Year Sale", category: "Shopping", method: "Mastercard", amount: 300.00, isExpense: true, currencySymbol: "SG$" },
];

const MONTHS = [
  "August 2026",
  "July 2026",
  "June 2026",
  "May 2026",
  "April 2026",
  "March 2026",
  "February 2026",
  "January 2026"
];

const getMonthYearString = (dateObj: Date) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};

const getShortMonth = (dateObj: Date) => {
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return shortMonths[dateObj.getMonth()];
};

function formatAmount(amount: number, isExpense: boolean, symbol: string) {
  const formatted = amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${isExpense ? "-" : "+"} ${symbol} ${formatted}`;
}

export default function UserTransactions() {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0]);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((tx) => {
      const date = new Date(tx.timestamp);
      return getMonthYearString(date) === selectedMonth;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [selectedMonth]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Transaction History</h1>
        <div className={styles.filterContainer}>
          <select
            className={styles.filterSelect}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {MONTHS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className={styles.filterIcon} />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className={styles.desktopView}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Name</th>
                <th>Method</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                    No transactions found for this month.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const dateObj = new Date(tx.timestamp);
                  const formattedDate = `${dateObj.getDate()} ${getShortMonth(dateObj)} ${dateObj.getFullYear()}`;
                  return (
                    <tr key={tx.id} className={styles.row}>
                      <td>{formattedDate}</td>
                      <td className={tx.isExpense ? styles.expenseAmount : styles.incomeAmount}>
                        {formatAmount(tx.amount, tx.isExpense, tx.currencySymbol)}
                      </td>
                      <td>{tx.paymentName}</td>
                      <td>{tx.method}</td>
                      <td>{tx.category}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className={styles.mobileView}>
        {filteredTransactions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
            No transactions found for this month.
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const dateObj = new Date(tx.timestamp);
            const day = dateObj.getDate().toString().padStart(2, "0");
            const month = getShortMonth(dateObj);
            const year = dateObj.getFullYear();

            return (
              <div key={tx.id} className={styles.mobileCard}>
                <div className={styles.cardLeft}>
                  <span className={styles.cardDay}>{day}</span>
                  <span className={styles.cardMonth}>{month}</span>
                  <span className={styles.cardYear}>{year}</span>
                </div>
                <div className={styles.cardMiddle}>
                  <span className={styles.cardPaymentName}>{tx.paymentName}</span>
                  <span className={styles.cardCategory}>{tx.category}</span>
                  <span className={styles.cardMethod}>{tx.method}</span>
                </div>
                <div className={styles.cardRight}>
                  <span className={tx.isExpense ? styles.expenseAmount : styles.incomeAmount}>
                    {formatAmount(tx.amount, tx.isExpense, tx.currencySymbol)}
                  </span>
                  <ChevronRight className={styles.cardChevron} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}