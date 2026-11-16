/**
 * Splits a title into visually balanced lines for the masked line reveal.
 * Short titles become two lines; long ones three, so no line has to wrap.
 */
export function splitTitle(title: string, maxLine = 24): string[] {
  const words = title.split(" ");
  if (words.length < 3) return [title];
  const count = Math.min(words.length, Math.max(2, Math.ceil(title.length / maxLine)));
  const target = title.length / count;
  const lines: string[] = [];
  let current: string[] = [];
  for (const w of words) {
    const len = [...current, w].join(" ").length;
    if (current.length && len > target * 1.15 && lines.length < count - 1) {
      lines.push(current.join(" "));
      current = [w];
    } else current.push(w);
  }
  lines.push(current.join(" "));
  return lines;
}
