export class Utilitaire {

  static convertoYYYY_MM_DD(theDate: string | null): string | null {
    if (!theDate) return null; // retourne null si date invalide
    const d = new Date(theDate);
    if (isNaN(d.getTime())) return null; // protège contre une date invalide
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static convertoYYYYMDD(theDate: string | null): string | null {
    if (!theDate) return null; // retourne null si date invalide
    const d = new Date(theDate);
    if (isNaN(d.getTime())) return null; // protège contre une date invalide
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
}
