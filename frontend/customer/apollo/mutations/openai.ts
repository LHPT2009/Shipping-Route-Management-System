import { gql } from "@apollo/client";

export const GET_CHAT_COMPLETION_MESSAGE = gql`
    mutation getChatCompletionMessage($input: GetChatCompletionAnswerInputDTO!) {
      getChatCompletionMessage(input: $input) {
          status
          message
          data
          error
      }
    }
`;
