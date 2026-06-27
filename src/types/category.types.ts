export interface CategoryEntity {
  id: string;
  title: string;
  parentId: string | null;
  children?: CategoryEntity[];
}
