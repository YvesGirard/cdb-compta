import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mail } from '../model/mail';
import { MailService } from '../services/mail.service';
import { MailDataSource } from '../datasource/mail.data-source';
import { tap ,  catchError, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of ,  fromEvent } from 'rxjs';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';
import { LoaderService } from '../loader/loader.service';


@Component({
  moduleId: module.id,
  selector: 'cdb-mails',
  templateUrl: 'mails.component.html',
  styleUrls: ['mails.component.css']
})

export class MailsComponent implements AfterViewInit, OnInit {

  mails: Mail[];
  displayedColumns = ['_id',
    'from',
    'to',
    'subject',
    'html',
    'action'];
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

    this.dataSource.loading$.subscribe((data) => {
      (data)?this.showLoader():this.hideLoader();
    });

    this.mailsCount = this.route.snapshot.data["mailsCount"];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private mailService: MailService,
    private http: HttpClient,
    private snackBarService: LoggerSnackbarService,
    private loaderService: LoaderService,
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


  send(mail: Mail): void {
    if (!mail || !mail._id) { return; }
    this.mailService.send(mail).then(() => this.snackBarService.info("Enregistré"));
  }

  /*
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

  gotoDetail(mail: Mail): void {
    let link = ['/mail', mail._id];
    this.router.navigate(link);
  }
  //members: Member[];
  //selectedHero: Hero;


  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}

