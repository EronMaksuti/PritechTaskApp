export type TaskStatus = 'completed' | 'not_completed';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdDate: string;
}
