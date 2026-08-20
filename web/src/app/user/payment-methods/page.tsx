"use client";

import React, { useState } from "react";
import { XCircle } from "lucide-react";
import styles from "./payment-methods.module.css";
import Modal from "../../../components/Modal/Modal";

type PaymentMethod = {
  id: string;
  methodName: string;
};

const initialMethods: PaymentMethod[] = [
  { id: "1", methodName: "MasterCard" },
  { id: "2", methodName: "Visa" },
  { id: "3", methodName: "Paypal" },
];

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
  const [methodToDelete, setMethodToDelete] = useState<PaymentMethod | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newMethodName, setNewMethodName] = useState("");

  const handleDelete = (id: string) => {
    // Handle payment method deletion
    const method = methods.find(m => m.id === id);
    if (method) setMethodToDelete(method);
  };

  const confirmDelete = () => {
    // Display confirmation pop up
    if (methodToDelete) {
      setMethods(methods.filter(m => m.id !== methodToDelete.id));
      setMethodToDelete(null);
    }
  };

  const cancelDelete = () => {
    // Cancel delete
    setMethodToDelete(null);
  };

  const handleAdd = () => {
    // Enable input field to add payment method
    setIsAdding(true);
  };

  const handleSaveAdd = () => {
    // Add new payment method
    console.log("Saving new method:", newMethodName);
    setIsAdding(false);
    setNewMethodName("");
  };

  const handleCancelAdd = () => {
    // Cancellation in adding new payment method
    setIsAdding(false);
    setNewMethodName("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Methods</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Method</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method.id} className={styles.row}>
                <td className={styles.methodCell}>{method.methodName}</td>
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

      {isAdding ? (
        <div className={styles.addForm}>
          <input
            type="text"
            placeholder="e.g. Visa, PayPal..."
            className={styles.addInput}
            value={newMethodName}
            onChange={(e) => setNewMethodName(e.target.value)}
            autoFocus
          />
          <div className={styles.addFormActions}>
            <button className={styles.saveBtn} onClick={handleSaveAdd}>Save</button>
            <button className={styles.cancelBtn} onClick={handleCancelAdd}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className={styles.addBtn} onClick={handleAdd}>
          Add payment method
        </button>
      )}

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
