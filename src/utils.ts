// utils/markGiftAsOpened.ts
export const markGiftAsOpened = (id: number) => {
  const opened = JSON.parse(localStorage.getItem("openedGifts") || "{}");
  opened[id] = true;
  localStorage.setItem("openedGifts", JSON.stringify(opened));
};
