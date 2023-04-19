import { Injectable } from '@nestjs/common';
require('dotenv').config();

import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.APIKEY
});
const openai = new OpenAIApi(configuration);
import got from 'got';

@Injectable()
export class AppService {
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
      return response.data.choices[0].text;
    } catch(err) {
      return 'Tooltip generating failed';
    }
  }
}
