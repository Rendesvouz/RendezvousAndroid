export const appointmentTextPrecedence = (propss) => {
  const textPreference =
    propss?.status == "request"
      ? "Pending"
      : propss?.status == "scheduled"
      ? "Accepted"
      : "Declined";

  return textPreference;
};

export const orderDetailsTextPrecedence = (propss) => {
  const textPreference = propss?.is_refunded
    ? "Refunded"
    : propss?.is_cancelled
    ? "Cancelled"
    : propss?.is_completed
    ? "Completed"
    : "In Progress";

  return textPreference;
};
