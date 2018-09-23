import { MemberService } from './member.service';
import { AttendanceService } from './attendance.service';

export const services: any[] = [MemberService, AttendanceService];

export * from './member.service';
export * from './attendance.service';

