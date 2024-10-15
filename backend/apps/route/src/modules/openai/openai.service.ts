import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatHistoryManager } from './dto/chat-history-manager';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './dto/chat-completion-answer.dto';
import { ResponseDto } from 'common/response/responseDto';
import { STATUS, STATUS_CODE } from 'common/constants/status';
import { systemOverview } from './openai.training';

const DEFAULT_TEMPERATURE = 1
const DEFAULT_MODEL = 'gpt-4o-mini'

@Injectable()
export class OpenaiService implements OnModuleInit {
    private readonly chatHistory: ChatHistoryManager;
    private readonly chat: ChatOpenAI;

    constructor(
    ) {
        this.chatHistory = new ChatHistoryManager("You will be a virtual assistant named S-Routing AI Chatbot Assistant.");
        this.chat = new ChatOpenAI({
            temperature: DEFAULT_TEMPERATURE,
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: DEFAULT_MODEL,
        })

        this.chatHistory.addAiMessage(systemOverview);
    }

    async onModuleInit() {

    }

    async getAiModelAnswer(data: GetChatCompletionAnswerInputDTO): Promise<ResponseDto<GetChatCompletionAnswerOutputDTO>> {
        this.chatHistory.addHumanMessage(data.message)
        const result = await this.chat.predictMessages(
            this.chatHistory.chatHistory,
        );

        const aiMessage = result.content;

        this.chatHistory.addAiMessage(aiMessage);

        return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, GetChatCompletionAnswerOutputDTO.getInstance(aiMessage), []);
    }
}
