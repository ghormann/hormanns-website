// Greg started experimenting with animated displays in 2001, which we count as year one.
export const yearsOfDisplay = new Date().getFullYear() - 2000;

export function yearCountInWords(n: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (n < 10) return ones[n];
  if (n < 20) return teens[n - 10];
  const tensDigit = Math.floor(n / 10);
  const onesDigit = n % 10;
  return onesDigit ? `${tens[tensDigit]}-${ones[onesDigit].toLowerCase()}` : tens[tensDigit];
}

export const yearsOfDisplayWords = yearCountInWords(yearsOfDisplay);
