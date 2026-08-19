"use client";

import React, { useState } from "react";
import { XCircle } from "lucide-react";
import styles from "./payment-methods.module.css";
import Modal from "../../../components/Modal/Modal";

type PaymentMethod = {
  id: string;
  methodName: string;
  cardNumber: string;
};

const initialMethods: PaymentMethod[] = [
  { id: "1", methodName: "MasterCard", cardNumber: "**** 7016" },
  { id: "2", methodName: "Visa", cardNumber: "**** 2817" },
  { id: "3", methodName: "Paypal", cardNumber: "example@yahoo.com" },
];

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
  const [methodToDelete, setMethodToDelete] = useState<PaymentMethod | null>(null);

  const handleDelete = (id: string) => {
    const method = methods.find(m => m.id === id);
    if (method) setMethodToDelete(method);
  };

  const confirmDelete = () => {
    if (methodToDelete) {
      setMethods(methods.filter(m => m.id !== methodToDelete.id));
      setMethodToDelete(null);
    }
  };

  const cancelDelete = () => {
    setMethodToDelete(null);
  };

  const handleAdd = () => {
    console.log("Add payment method clicked");
    alert("Add payment method action triggered.");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Methods</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Card Number</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method.id} className={styles.row}>
                <td className={styles.methodCell}>{method.methodName}</td>
                <td className={styles.cardCell}>{method.cardNumber}</td>
                <td className={styles.actionCell}>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(method.id)}>
                    <XCircle className={styles.deleteIcon} size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className={styles.addBtn} onClick={handleAdd}>
        Add payment method
      </button>

      <Modal
        isOpen={!!methodToDelete}
        onClose={cancelDelete}
        message={
          <>
            Are you sure you want to remove <strong>{methodToDelete?.methodName}</strong> from your payment methods?
          </>
        }
        actions={[
          { label: "No", onClick: cancelDelete, variant: "secondary" },
          { label: "Yes", onClick: confirmDelete, variant: "danger" }
        ]}
      />
    </div>
  );
}
