import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MemberAddDialog } from '../entry/member-add-dialog.component';

import { Member } from '../model/member';
import { MemberService } from '../services/member.service';
import { MemberDataSource } from '../datasource/member.data-source';
import { tap, catchError, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Headers, Http } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, fromEvent } from 'rxjs';
//import { LoadingService } from '../services/loading.service';

@Component({
  moduleId: module.id,
  selector: 'cdb-members',
  templateUrl: 'members.component.html',
  styleUrls: ['members.component.css']
})

export class MembersComponent implements AfterViewInit, OnInit {

  members: Member[];
  displayedColumns = ['select', 'seqNo', 'Nom', 'email'];
  dataSource: MemberDataSource;
  membersCount: Number;
  selection: SelectionModel<number>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('search', {static: true}) search: ElementRef;

  ngOnInit(): void {
    this.dataSource = new MemberDataSource(this.memberService);
    this.dataSource.loadMembers();
    this.dataSource.count$.subscribe((data) => {
      if (this.membersCount != data)
        this.membersCount = data;
      //this.paginator.pageIndex = 0;
    });

    this.dataSource.members$.subscribe((data) => {
      console.log("dataSource.members$")
      console.log(data)
    });

    /*this.dataSource.loading$.subscribe((data) => {
      this.loadingService.loadingSubject.next(data);
    });*/

    this.membersCount = this.route.snapshot.data["membersCount"];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private memberService: MemberService,
    private http: HttpClient,
    //private loadingService: LoadingService,
  ) {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<number>(allowMultiSelect, initialSelection);

  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadMembersPage();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => {
          console.log(this.selection.selected);
          this.loadMembersPage();
          console.log(this.selection.selected);
        }
        ))
      .subscribe();
  }

  loadMembersPage() {
    this.dataSource.loadMembers(
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
    this.memberService.mailing().subscribe(val => console.log(val));
    let link = ['/member', member._id];
    this.router.navigate(link);
  }
  //members: Member[];
  //selectedHero: Hero;

  fileChange(event) {


    let fileList: FileList = event.target.files;
    console.log(event.target.files)

    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      let fileHeaders = new Headers({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      });

      console.log("request")

      this.dataSource.updateMembers(formData);

    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.membersCount;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() : true
      //this.dataSource.data.forEach(row => this.selection.select(row._id));
  }

  ajouterListe() {
    this.selection.selected.forEach((id) => {
      console.log(id);
    });
  }
}

