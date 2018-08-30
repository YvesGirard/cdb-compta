import { MailingListService } from './mail.service';
import { MailingListMemberService } from './member.service';

export const services: any[] = [
    MailingListService,
    MailingListMemberService,
];

export * from './mail.service';
export * from './member.service';

