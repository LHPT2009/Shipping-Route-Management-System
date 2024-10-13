import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './dto/chat-completion-answer.dto';
import { OpenaiService } from './openai.service';

@Resolver(() => { })
export class OpenaiResolver {
    constructor(
        private openaiService: OpenaiService
    ) { }

    @Mutation(() => ResponseDto<GetChatCompletionAnswerOutputDTO>)
    async getChatCompletionMessage(@Args('input') input: GetChatCompletionAnswerInputDTO): Promise<ResponseDto<GetChatCompletionAnswerOutputDTO>> {
        return this.openaiService.getAiModelAnswer(input);
    }
}
