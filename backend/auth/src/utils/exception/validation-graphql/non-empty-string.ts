import { Scalar } from '@nestjs/graphql';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

// @Scalar('NonEmptyString', () => NonEmptyStringScalar)

export const NonEmptyStringScalar = new GraphQLScalarType({
    description: 'Non empty string',
    name: 'NonEmptyString',
    parseValue(value: any): string {
        if (typeof value !== 'string' || value === '') {
            throw new GraphQLError('Please provide your');
        }
        return value;
    },

})
