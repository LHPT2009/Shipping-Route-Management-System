
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerErrorCode, unwrapResolverError } from '@apollo/server/errors';

export default function formatError(formattedError, error) {
    // Return a different error message
    if (formattedError.extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
        if (formattedError.message.includes("was not provided")) {
            let errorMessage = formattedError.message;
            console.log(errorMessage);
            let startIndex = errorMessage.indexOf('\"') + 1;
            let endIndex = errorMessage.indexOf('\"', startIndex);
            let result = errorMessage.substring(startIndex, endIndex).split('.')[1];
            return `Please provide valid input for ${result}`;
        }
        return formattedError.error.message;
    }

    return formattedError.message;
};