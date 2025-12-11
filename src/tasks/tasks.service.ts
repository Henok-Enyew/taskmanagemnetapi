import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task | undefined {
    const found = this.tasks.find((task) => task.id == id);

    if (!found) {
      throw new NotFoundException(`Task with id - ${id} not found`);
    }

    return found;
  }

  deleteTaskById(id: string) {
    const found: any = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id != found.id);
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

  updateTaskStatusById(id: string, status: TaskStatus) {
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
