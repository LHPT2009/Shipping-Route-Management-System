import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS_CODE, STATUS } from '../../../../../common/constants/status';
import { ContactEntity } from './entity/contact.entity';
import { CreateContactDto } from './dto/contact-create';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';
import { validPhone } from 'common/exception/validation/phone.validation';
import { validEmail } from 'common/exception/validation/email.validation';

@Injectable()
export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
  ) { }

  async findAll(): Promise<ResponseDto<ContactEntity[]>> {
    try {
      const contacts = await this.contactRepository.find();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, contacts, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async create(createContactDto: CreateContactDto): Promise<ResponseDto<ContactEntity>> {

    if (!validEmail(createContactDto.email)) {
      throw new CustomValidationError('Invalid input', { email: ['Email is invalid'] });
    }
    
    if (!validPhone(createContactDto.phone_number)) {
      throw new CustomValidationError('Invalid input', { phone_number: ['Phone number is invalid'] });
    }

    // Filter rude comments by openAI
    // -----------------
    // ------------------

    // After filter by openAI, we will check if the email has been sent in the last 24 hours and save it to database
    const getContactByEmail: ContactEntity = await this.contactRepository.createQueryBuilder("contact")
      .where("contact.email = :email", { email: createContactDto.email })
      .getOne();

    if (getContactByEmail) {
      if (new Date().getTime() - getContactByEmail.created_at.getTime() < 86400000) {
        throw new CustomValidationError('Validation failed', { email: ['You have already sent the contact. Please be patient, we’ll reach out to you soon.'] });
      }
    } else {
      const contact = new ContactEntity(
        createContactDto.fullname,
        createContactDto.email,
        createContactDto.phone_number,
        createContactDto.title,
        createContactDto.description,
        new Date(),
      );
      await this.contactRepository.save(contact);

      // Send email to admin by Kafka
      // -----------------
      // ----------------

      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, contact, []);
    }

  }
}
