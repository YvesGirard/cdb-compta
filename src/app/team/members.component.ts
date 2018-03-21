import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MemberAddDialog } from '../entry/member-add-dialog.component';

import { Member } from '../model/member';
import { MemberService } from '../services/member.service';
import { MemberDataSource } from '../datasource/member.data-source';


@Component({
  moduleId: module.id,
  selector: 'cdb-members',
  templateUrl: 'members.component.html',
  styleUrls: ['members.component.css']
})

export class MembersComponent implements OnInit {

  members: Member[];
  displayedColumns = ['seqNo', 'Nom'];
  dataSource : MemberDataSource;

  ngOnInit(): void {
    this.dataSource = new MemberDataSource(this.memberService);
    this.dataSource.loadMembers();
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private memberService: MemberService) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   // this.dataSource.filter = filterValue;
  }

  add(member: Member): void {
    if (!member || !member.name) { return; }
    this.dataSource.creatMember(member);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(MemberAddDialog, {
      width: '250px',
      data: { name: "toto", animal: "titi" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);

      const tmpMember = new Member();
      Object.assign(tmpMember, result);
      this.add(tmpMember);
    });
  }

  gotoDetail(member: Member): void {
    let link = ['/member', member._id];
    this.router.navigate(link);
  }
  //members: Member[];
  //selectedHero: Hero;

}

