export const shortenMoney = (amount: number | any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(amount);
};

export const formatNumber = (number: number) => {
  return number.toLocaleString();
};
