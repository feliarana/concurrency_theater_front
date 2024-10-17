export const translateStatus = (status) => {
  const statusTranslations = {
    available: "disponible",
    reserved: "reservado",
    cancelled: "cancelado",
    purchased: "comprado"
  };
  return statusTranslations[status] || status;
};