export function formatToNaira(number: number): string {
  // Check if the input is a valid number
  if (isNaN(number)) {
    return 'Invalid number';
  }

  // Use Intl.NumberFormat for accurate formatting
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  return formatter.format(number);
}
