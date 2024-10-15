import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatHistoryManager } from './dto/chat-history-manager';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './dto/chat-completion-answer.dto';
import { ResponseDto } from 'common/response/responseDto';
import { STATUS, STATUS_CODE } from 'common/constants/status';
import { systemOverview } from './openai.training';
import { CreateContactDto } from '../contact/dto/contact-create';

const DEFAULT_TEMPERATURE = 1
const DEFAULT_MODEL = 'gpt-4o-mini'

@Injectable()
export class OpenaiService implements OnModuleInit {
    private readonly chatHistory: ChatHistoryManager;
    private readonly chat: ChatOpenAI;

    constructor(
    ) {
        this.chatHistory = new ChatHistoryManager("đọc nội dung");
        this.chat = new ChatOpenAI({
            temperature: DEFAULT_TEMPERATURE,
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: DEFAULT_MODEL,
        })

        this.chatHistory.addAiMessage(systemOverview);
    }

    async onModuleInit() {

    }

    async checkInfoContact(data: CreateContactDto): Promise<GetChatCompletionAnswerOutputDTO> {
        this.chatHistory.addHumanMessage(data.description)
        const result = await this.chat.predictMessages(
            this.chatHistory.chatHistory,
        );

        const aiMessage = result.content;

        return GetChatCompletionAnswerOutputDTO.getInstance(aiMessage);
    }
}
