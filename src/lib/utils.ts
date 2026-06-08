export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function clpFormat(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL');
}

export function slugToNombre(slug: string): string {
  return slug
    .split('-')
    .map(w => capitalize(w))
    .join(' ');
}
