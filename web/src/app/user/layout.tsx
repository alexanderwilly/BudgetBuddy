import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
