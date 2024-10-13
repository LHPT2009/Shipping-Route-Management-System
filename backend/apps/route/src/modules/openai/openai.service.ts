import { Injectable } from '@nestjs/common';
import { ChatHistoryManager } from './dto/chat-history-manager';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './dto/chat-completion-answer.dto';
import { ResponseDto } from 'common/response/responseDto';
import { STATUS, STATUS_CODE } from 'common/constants/status';

const DEFAULT_TEMPERATURE = 1
// const DEFAULT_MODEL = 'gpt-3.5-turbo'
const DEFAULT_MODEL = 'gpt-4o-mini'

@Injectable()
export class OpenaiService {
    private readonly chatHistory: ChatHistoryManager;
    private readonly chat: ChatOpenAI;

    constructor() {
        this.chatHistory = new ChatHistoryManager("Đây là hệ thống chat vào bạn cho tên là lily");
        this.chat = new ChatOpenAI({
            temperature: DEFAULT_TEMPERATURE,
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: DEFAULT_MODEL,
        })
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
