import { sortTableData } from './sort';

interface TestObject {
  id: number;
  name: string;
  date: Date;
}
describe('TGridComponent - helpers - sort', () => {
  const testData: TestObject[] = [
    { id: 2, name: 'Charlie', date: new Date('2023-03-15') },
    { id: 1, name: 'Alice', date: new Date('2023-01-25') },
    { id: 3, name: 'Bob', date: new Date('2023-02-10') },
  ];

  it('should correctly sort data in ascending order based on a date property', () => {
    const sortedData = sortTableData<TestObject>('date', 'asc', testData);
    expect(sortedData).toEqual([
      { id: 1, name: 'Alice', date: new Date('2023-01-25') },
      { id: 3, name: 'Bob', date: new Date('2023-02-10') },
      { id: 2, name: 'Charlie', date: new Date('2023-03-15') },
    ]);
  });

  it('should correctly sort data in descending order based on a date property', () => {
    const sortedData = sortTableData<TestObject>('date', 'desc', testData);
    expect(sortedData).toEqual([
      { id: 2, name: 'Charlie', date: new Date('2023-03-15') },
      { id: 3, name: 'Bob', date: new Date('2023-02-10') },
      { id: 1, name: 'Alice', date: new Date('2023-01-25') },
    ]);
  });

  it('should correctly sort data in ascending order based on a date property', () => {
    const sortedData = sortTableData<TestObject>('date', 'asc', testData);
    expect(sortedData).toEqual([
      { id: 1, name: 'Alice', date: new Date('2023-01-25') },
      { id: 3, name: 'Bob', date: new Date('2023-02-10') },
      { id: 2, name: 'Charlie', date: new Date('2023-03-15') },
    ]);
  });

  it('should correctly sort data in descending order based on a date property', () => {
    const sortedData = sortTableData<TestObject>('date', 'desc', testData);
    expect(sortedData).toEqual([
      { id: 2, name: 'Charlie', date: new Date('2023-03-15') },
      { id: 3, name: 'Bob', date: new Date('2023-02-10') },
      { id: 1, name: 'Alice', date: new Date('2023-01-25') },
    ]);
  });
});
