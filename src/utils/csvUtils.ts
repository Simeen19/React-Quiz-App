export function generateCSV(name: string, score: number, total: number) {
    const csvContent = `Name,Score,Total\n${name},${score},${total}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
  
    link.href = url;
    link.download = `${name.replace(/\s+/g, "_")}_quiz_result.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
  