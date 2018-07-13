import { JournalLine } from './journal-line';

export interface Journal {
    _id: string;
    journal_id: string;
    accounting_dt: Date;
    descr: string;
    journal_line: JournalLine[];
  }
  