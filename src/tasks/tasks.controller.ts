import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.taskService.createTask(createTaskDTO);
  }

  @Patch('/:id')
  updateTaskStatusById(@Param('id') id: string, @Body() body) {
    return this.taskService.updateTaskStatusById(id, body);
  }
}
