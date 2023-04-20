import { IsNotEmpty, IsString, IsDate, MaxLength } from "class-validator";
export class CreateSummaryDto {
    @IsString()
    @IsNotEmpty()
    hText: string;

    @IsString()
    @IsNotEmpty()
    sText: string;
    
    @IsDate()
    @IsNotEmpty()
    date: Date;
}