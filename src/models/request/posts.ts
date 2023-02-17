import {
  Allow,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreatePostModel {
  @MaxLength(30, { message: "title is too long" })
  @IsNotEmpty({ message: "title must be provided" })
  title: string;

  @MinLength(50, { message: "question is likely incomplete" })
  @MaxLength(1000, { message: "question is too long" })
  @IsNotEmpty({ message: "please ask a question" })
  question: string;

  @Allow()
  image?: File;

  @Allow()
  tags: string[];

  @Allow()
  space: number | [number] | [number, number] | [number, number, number];
}
