export function chunkTableData<T>(
  numChunks: number,
  perChunk: number,
  data: T[]
) {
  return Array(numChunks)
    .fill(null)
    .map((_, index) => {
      const start = index * perChunk;
      const end = start + perChunk;

      return data.slice(start, end);
    });
}
