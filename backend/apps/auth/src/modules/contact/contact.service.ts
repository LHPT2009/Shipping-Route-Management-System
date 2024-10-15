import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS_CODE, STATUS } from '../../../../../common/constants/status';
import { ContactEntity } from './entity/contact.entity';
import { CreateContactDto } from './dto/contact-create';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';
import { validPhone } from 'common/exception/validation/phone.validation';
import { validEmail } from 'common/exception/validation/email.validation';
import { OpenaiService } from '../openai/openai.service';
import { ProducerService } from '../kafka/producer.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private openaiService: OpenaiService,
    private producerService: ProducerService,
    private userService: UserService,
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
    const checkAi = await this.openaiService.checkInfoContact(createContactDto);
    const parts = checkAi.aiMessage.split('//');
    const firstPart = parts[0].trim();
    const secondPart = parts[1].trim();
    if (firstPart === 'INAPPROPRIATE') {
      throw new CustomValidationError('Feedback have wrong', { description: [secondPart] });
    }

    // After filter by openAI, we will check if the email has been sent in the last 24 hours and save it to database
    const getContactByEmail: ContactEntity = await this.contactRepository.createQueryBuilder("contact")
      .where("contact.email = :email", { email: createContactDto.email })
      .getOne();

    if (getContactByEmail && new Date().getTime() - getContactByEmail.created_at.getTime() < 86400000) {
      throw new CustomValidationError('Validation failed', { email: ['You have already sent the contact. Please be patient, we’ll reach out to you soon.'] });
    } else {
      const contact = new ContactEntity(
        createContactDto.fullname,
        createContactDto.email,
        createContactDto.phone_number,
        createContactDto.title,
        createContactDto.description,
        new Date(),
      );

      await this.contactRepository.delete({ email: createContactDto.email });
      await this.contactRepository.save(contact);

      // Send email to admin by Kafka
      const infoAdmin = await this.userService.findInfoByID("1")
      const item = {
        title: "FEEDBACK FROM USER",
        content: `There are users sending feedback to our website.<br><br>
        Title: ${contact.title}<br>
        Name: ${contact.fullname}<br>
        Phone number: ${contact.phone_number}<br>
        Description: ${contact.description}<br><br>
        Hope you will respond to users as soon as possible.<br>
        `,
        button: "Go to Dashboard",
        verifyToken: "",
        email: `${infoAdmin.data.email}`,
        username: `ADMIN`,
        url: process.env.DASHBOARD_ADMIN_URL,
        typemail: "contact"
      };

      const itemString = JSON.stringify(item);

      await this.producerService.produce({
        topic: 'send-mail',
        messages: [
          {
            value: itemString
          }
        ]
      });

      // Send email to user by Kafka
      const itemmail2 = {
        title: "THANK YOU FOR FEEDBACK",
        content: `Thank you for sharing, your problem will be solved soon.<br><br>
        Title: ${contact.title}<br>
        Name: ${contact.fullname}<br>
        Phone number: ${contact.phone_number}<br>
        Description: ${contact.description}<br>
        `,
        button: "Go to S-Routing",
        verifyToken: "",
        email: `${contact.email}`,
        username: `${contact.fullname}`,
        url: process.env.HOMEPAGE_CLIENT_URL,
        typemail: "contact"
      };

      const itemmail2String = JSON.stringify(itemmail2);

      await this.producerService.produce({
        topic: 'send-mail',
        messages: [
          {
            value: itemmail2String
          }
        ]
      });

      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, contact, []);
    }

  }
}
