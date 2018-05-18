import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mail } from '../model/mail';
import { MailService } from '../services/mail.service';
import { MailDataSource } from '../datasource/mail.data-source';
import { tap } from 'rxjs/operators';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize, debounceTime, distinctUntilChanged  } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  moduleId: module.id,
  selector: 'cdb-mails',
  templateUrl: 'mails.component.html',
  styleUrls: ['mails.component.css']
})

export class MailsComponent implements AfterViewInit, OnInit {

  mails: Mail[];
  displayedColumns = [  '_id',
    'from',
    'to',
    'subject',
    'html'];
  dataSource: MailDataSource;
  mailsCount: Number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('search') search: ElementRef;

  ngOnInit(): void {
    this.dataSource = new MailDataSource(this.mailService);
    this.dataSource.loadMails();
    this.dataSource.count$.subscribe((data) => {
      if (this.mailsCount != data)
            this.mailsCount = data;
      //this.paginator.pageIndex = 0;
    });
    this.mailsCount = this.route.snapshot.data["mailsCount"];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private mailService: MailService,
    private authHttp: AuthHttp,
    private http: HttpClient,
  ) {
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadMailsPage();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadMailsPage())
      )
      .subscribe();
  }

  loadMailsPage() {
    this.dataSource.loadMails(
      this.search.nativeElement.value,
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
  }

  /*
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
  }*/

  /*gotoDetail(member: Member): void {
    this.memberService.mailing().subscribe(val => console.log(val));
    let link = ['/member', member._id];
    this.router.navigate(link);
  }*/
  //members: Member[];
  //selectedHero: Hero;



}

