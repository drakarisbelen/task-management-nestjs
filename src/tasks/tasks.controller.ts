/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  
  @Get()
  // getAllTasks(): Task[] {
  //   return this.tasksService.getAllTasks();
  // }
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
    //if we have any filters defined call taskService.getTaskWithFilters
    if (Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    else{
      //otherwise, just get all tasks 
      return this.tasksService.getAllTasks();
    }
    
  }

  //busca x Id en el decorador GET
  //envio el "/:id"
  @Get("/:id")
  getTaskById(@Param('id') id: string): Task{
    return this.tasksService.getTaskById(id)

  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Task {
    console.log("createTaskDto ", createTaskDto);
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete("/:id")
  deteleTaskByiD(@Param('id') id: string): void{
    return this.tasksService.deleteTaskByiD(id)
  }

  
  @Patch("/:id/status")
  updateTaskStatus(
    @Param('id') id:string,
    @Body('status') status: TaskStatus): Task{
      return this.tasksService.updateTaskStatus(id, status)
  }
  
}
