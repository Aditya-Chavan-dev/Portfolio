import { useEffect, useState } from "react";
import { ref, onValue, runTransaction } from "firebase/database";
import { db } from "../lib/firebase";

export const useVisitorCount = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const countRef = ref(db, "visitors/count");
    runTransaction(countRef, (current) => (current || 0) + 1);
    const unsub = onValue(countRef, (snap) => setCount(snap.val()));
    return () => unsub();
  }, []);

  return count;
};

export const useStatus = () => {
  const [status, setStatus] = useState<string>("available");

  useEffect(() => {
    const statusRef = ref(db, "meta/status");
    const unsub = onValue(statusRef, (snap) => {
      if (snap.val()) setStatus(snap.val());
    });
    return () => unsub();
  }, []);

  return status;
};
