import { chunkTableData } from './chunk';

describe('TGridComponent - helpers - chunk', () => {
  beforeEach(() => {});

  it('should correctly chunk data into equal subarrays', () => {
    expect(chunkTableData(3, 2, [1, 2, 3, 4, 5, 6])).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('should handle fewer elements than requested in chunks', () => {
    expect(chunkTableData(4, 3, [1, 2, 3, 4, 5])).toEqual([
      [1, 2, 3],
      [4, 5],
      [],
      [],
    ]);
  });

  it('should return empty chunks when data array is empty', () => {
    expect(chunkTableData(3, 2, [])).toEqual([[], [], []]);
  });

  it('should return an empty array when numChunks is zero', () => {
    expect(chunkTableData(0, 2, [1, 2, 3, 4, 5, 6])).toEqual([]);
  });

  it('should return chunks with zero elements when perChunk is zero', () => {
    expect(chunkTableData(3, 0, [1, 2, 3, 4, 5, 6])).toEqual([[], [], []]);
  });

  it('should handle single element per chunk', () => {
    expect(chunkTableData(3, 1, [1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  it('should handle single chunk with all elements', () => {
    expect(chunkTableData(1, 5, [1, 2, 3, 4, 5])).toEqual([[1, 2, 3, 4, 5]]);
  });

  it('should create chunks with mixed sizes', () => {
    expect(chunkTableData(3, 4, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9],
    ]);
  });

  it('should work with non-number elements', () => {
    expect(chunkTableData(2, 2, ['a', 'b', 'c', 'd', 'e'])).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
});
