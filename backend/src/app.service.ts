import { Inject, Injectable } from '@nestjs/common';
require('dotenv').config();

import { Configuration, OpenAIApi } from 'openai';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { SummaryService } from './service/summary.service';
const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.APIKEY
});


const openai = new OpenAIApi(configuration);

@Injectable()
export class AppService {
  @Inject(SummaryService)
  private readonly summaryService : SummaryService;
  // constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAIText(qus : string): Promise<string> {
    try{
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${qus}\n\nTl;dr`,
        temperature: 0.7,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 1,
      });

      let summary : CreateSummaryDto = new CreateSummaryDto();
      summary.hText = qus;
      summary.sText = response.data.choices[0].text; 
      summary.date = new Date();
      const newSummary = await this.summaryService.createSummary(summary);      
      newSummary.save();

      return response.data.choices[0].text;
    } catch(err) {
      console.log(err);
      return 'Tooltip generating failed';
    }
  }
}
