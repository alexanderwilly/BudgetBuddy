"use client";

import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";
import styles from "./payment-methods.module.css";
import Modal from "../../../components/Modal/Modal";
import { api } from "../../api/axios";
import { toast } from "react-toastify";

type PaymentMethod = {
  id: string;
  methodName: string;
};

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [methodToDelete, setMethodToDelete] = useState<PaymentMethod | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newMethodName, setNewMethodName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get("/payment-methods/");
        const fetchedMethods = response.data.map((item: { id: string; name: string }) => ({
          id: item.id,
          methodName: item.name,
        }));
        setMethods(fetchedMethods);
      } catch (error) {
        console.error("Failed to fetch payment methods:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleDelete = (id: string) => {
    // Handle payment method deletion
    const method = methods.find(m => m.id === id);
    if (method) setMethodToDelete(method);
  };

  const confirmDelete = async () => {
    // Display confirmation pop up
    if (methodToDelete) {
      try {
        await api.delete(`/payment-methods/${methodToDelete.id}`);
        setMethods(methods.filter(m => m.id !== methodToDelete.id));
        toast.success("Payment method deleted successfully");
      } catch (error) {
        console.error("Failed to delete payment method:", error);
        toast.error("Failed to delete payment method");
      } finally {
        setMethodToDelete(null);
      }
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

  const handleSaveAdd = async () => {
    if (!newMethodName.trim()) return;
    setIsSaving(true);
    try {
      const response = await api.post("/payment-methods/add", {
        name: newMethodName
      });
      
      const newMethod = {
        id: response.data.id,
        methodName: response.data.name
      };
      
      setMethods([...methods, newMethod]);
      setIsAdding(false);
      setNewMethodName("");
    } catch (error) {
      console.error("Failed to add payment method:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelAdd = () => {
    // Cancellation in adding new payment method
    setIsAdding(false);
    setNewMethodName("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Methods</h1>
      
      {isLoading ? (
        <p className={styles.loadingText}>Loading payment methods...</p>
      ) : methods.length === 0 ? (
        <p className={styles.emptyText}>No payment methods available yet.</p>
      ) : (
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
      )}

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
            <button className={styles.saveBtn} onClick={handleSaveAdd} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button className={styles.cancelBtn} onClick={handleCancelAdd} disabled={isSaving}>
              Cancel
            </button>
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
