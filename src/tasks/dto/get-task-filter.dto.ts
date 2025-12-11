import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDTO {
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsOptional()
  @IsString()
  search: string;
}
