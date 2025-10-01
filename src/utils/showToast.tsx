import { toast } from "react-toastify";
import type { statusType } from "@/types";

export type messageType = string | string[];

export const showToast = (status: statusType, message: messageType) => {
  const content = Array.isArray(message) ? (
    <ul className="list-disc pl-5">
      {message.map((msg, idx) => (
        <li key={idx}>{msg}</li>
      ))}
    </ul>
  ) : (
    message
  );

  toast[status](content);
};
