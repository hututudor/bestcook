export interface HasID {
  id: string;
}

export interface HasTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseGetById<T> {
  (id: string): Promise<T | null>;
}

export interface DatabaseGetByField<T, F> {
  (field: F): Promise<T | null>;
}

export interface DatabaseSave<T> {
  (model: T): Promise<T>;
}

export interface DatabaseRemove<T> {
  (model: T): void;
}
