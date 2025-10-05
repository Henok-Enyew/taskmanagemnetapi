import { Injectable, Response } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id == id);
  }

  deleteTaskById(id: string) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    return 'detleted succefully';
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatusById(id: string, body) {
    const { status } = body;
    this.tasks.find((task) => {
      if (task.id == id) {
        task.status = status;
        return true;
      }
      return false;
    });

    return this.tasks.find((task) => task.id == id);
  }
}
