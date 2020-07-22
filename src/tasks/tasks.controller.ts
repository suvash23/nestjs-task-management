import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()

  // createTask(@Body() body) {
  //   console.log('Body', body);
  // }
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string
  // ): Task {
  //   //console.log('title', title);
  //   //console.log('description', description);
  //   return this.tasksService.createTask(title, description);
  // }

  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //console.log('title', title);
    //console.log('description', description);
    return this.tasksService.createTask(createTaskDto);
  }
}
