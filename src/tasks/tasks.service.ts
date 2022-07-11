/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import {v4 as uuid} from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[]= [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
    const {status, search} = filterDto;

    let tasks = this.getAllTasks();

    //do something with status
    if (status){
      tasks = tasks.filter((task) => task.status === status);
    }

    //do something where title or description contains a word
    if (search){
      tasks = tasks.filter((task)=> {
        if (task.title.includes(search) || task.description.includes(search)){
          return true;
        }
        return false;
      })

    }
    //do something with search

    //return final result
    return tasks;

  }

  getTaskById(id: string): Task{
    return this.tasks.find((task)=>task.id === id)
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const {title, description} = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)

    return task; 
  }

  //cuando borro una tarea no retorno nada por eso el void
  //filtro el array y dejo solo las tareas que sean distinto id
  //que la que estoy borrando y asigno los valores filtrados al array
  deleteTaskByiD(id:string): void{
    this.tasks = this.tasks.filter((task)=> task.id !== id)
  }

  //buscar la tarea y actualizar el estado
  updateTaskStatus(id: string, status:TaskStatus){
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

}