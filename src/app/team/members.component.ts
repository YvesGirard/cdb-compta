import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MemberAddDialog } from '../entry/member-add-dialog.component';

import { Member } from '../model/member';
import { MemberService } from '../services/member.service';

@Component({
  moduleId: module.id,
  selector: 'cdb-members',
  templateUrl: 'members.component.html',
  styleUrls: ['members.component.css']
})

export class MembersComponent implements OnInit {

  members: Member[];
  displayedColumns = ['position', 'name'];
  dataSource = new MatTableDataSource(this.members);

  ngOnInit(): void {
    this.getMembers();
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private memberService: MemberService) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getMembers(): void {    
   this.memberService.getMembers().then(members => {
      console.log(members);
      this.members = members
      });
  }

  add(member: Member): void {
    if (!member) { return; }
    this.memberService.create(member)
      .then(member => {
        this.members.push(member);
      });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(MemberAddDialog, {
      width: '250px',
      data: { name: "toto", animal: "titi" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const tmpMember = new Member();
      Object.assign(tmpMember, result);
      this.add(tmpMember);
    });
  }

  //members: Member[];
  //selectedHero: Hero;

}

