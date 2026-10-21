export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
}
