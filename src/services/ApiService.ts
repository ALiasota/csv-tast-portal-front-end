import { Task } from "../types";

export interface User {
  id: number;
  title: string;
  description: string;
  userId: number;
}
class ApiService {
  baseUrl: string = "http://localhost:3000";
  private getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }

  async getTaskById(id: string) {
    const token = this.getToken();
    if (!token) {
      console.error("No token available");
      return false;
    }
    const response = await fetch(`${this.baseUrl}/task/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    return response.json();
  }

  async updateTask(id: string, taskData: Partial<Task>) {
    const token = this.getToken();
    if (!token) {
      console.error("No token available");
      return false;
    }
    const response = await fetch(`${this.baseUrl}/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return response.json();
  }
  async deleteTask(id: string) {
    const token = this.getToken();
    if (!token) {
      console.error("No token available");
      return false;
    }
    const response = await fetch(`${this.baseUrl}/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return response.json();
  }
  async getAllTasks(): Promise<Task[] | any> {
    const token = this.getToken();
    if (!token) {
      console.error("No token available");
      return false;
    }
    try {
      const response = await fetch(`${this.baseUrl}/task`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Token may be invalid or expired");
        return false;
      }

      return response.json();
    } catch (error) {
      console.error("Failed to fetch user", error);
      return false;
    }
  }

  async createTask(task: any) {
    const token = this.getToken();
    if (!token) {
      console.error("No token available");
      return false;
    }
    const response = await fetch(`${this.baseUrl}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return response.json();
  }

  async uploadTasksFromCsv(file: File): Promise<Task[] | unknown> {
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token available");
      return false;
    }

    const response = await fetch(`${this.baseUrl}/task/file`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to upload tasks");
    }
    return response.json();
  }

  async getUser() {
    const token = this.getToken();
    if (!token) {
      console.error("No token available");
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Token may be invalid or expired");
        return false;
      }

      return response.json();
    } catch (error) {
      console.error("Failed to fetch user", error);
      return false;
    }
  }

  async createUser(user: {
    username: string;
    email: string;
    password: string;
  }) {
    const response = await fetch(`${this.baseUrl}/auth/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return response.json();
  }

  async loginUser(credentials: { username: string; password: string }) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return response.json();
  }
}

export default new ApiService();
