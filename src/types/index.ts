export interface Task {
  completed: boolean;
  description: string;
  title: string;
  id: string;
  user_id: string;
  created_at: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}
