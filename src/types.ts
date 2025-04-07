// This file contains the TypeScript types used in the application.
// The Task type defines a task with an optional ID, a title, and a completion status.

export type Task = {
    id?: number;
    title: string;
    completed: boolean;
  };