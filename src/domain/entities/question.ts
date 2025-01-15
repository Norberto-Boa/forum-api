import { randomUUID } from "node:crypto";

export class Question {
  public id: string;
  public title: string;
  public description: string;

  constructor(id: string, title: string, description: string) {
    this.id = id ?? randomUUID();
    this.title = title;
    this.description = description;
  }
}
