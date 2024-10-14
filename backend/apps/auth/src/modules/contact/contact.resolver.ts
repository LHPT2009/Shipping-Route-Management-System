import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { Role } from './type/role.type';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { ContactEntity } from './entity/contact.entity';
import { CreateContactDto } from './dto/contact-create';


@Resolver(() => Role)
export class ContactResolver {
  constructor(private contactService: ContactService) { }

  // @Roles(ROLE.ADMIN)
  // @Permissions(PERMISSION.READ_LIST_ROLE)
  // @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<ContactEntity[]>)
  async getContacts(): Promise<ResponseDto<ContactEntity[]>> {
    return this.contactService.findAll();
  }

  @Mutation(() => ResponseDto<ContactEntity>)
  async createContact(
    @Args('input') input: CreateContactDto,
  ): Promise<ResponseDto<ContactEntity>> {
    return this.contactService.create(input);
  }

}