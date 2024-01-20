import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {
  BehaviorSubject,
  Subject
} from 'rxjs';
import { AboutModel } from '../interfaces/About.interface';
import { ProjectModel } from '../interfaces/Project.interface';
import { WorkModel } from '../interfaces/Work.interface';
import { PageName } from '../enums/pages.enum';
import { UserDetailsModel } from '../interfaces/Users.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private aboutCachedData!: AboutModel;
  private portfolioCahchedData: ProjectModel[] = [];
  private workCachedData: WorkModel[] = [];

  private isFormSent$: Subject<void> = new Subject();
  private aboutSource: BehaviorSubject<AboutModel> = new BehaviorSubject(<AboutModel>{});
  private portfolioSource: BehaviorSubject<ProjectModel[]> = new BehaviorSubject(<ProjectModel[]>[]);
  private workSource: BehaviorSubject<WorkModel[]> = new BehaviorSubject(<WorkModel[]>[]);

  public readonly about$ = this.aboutSource.asObservable();
  public readonly portfolio$ = this.portfolioSource.asObservable();
  public readonly work$ = this.workSource.asObservable();

  constructor(private http: HttpClient, private fs: AngularFirestore) { }

  public async fetchAboutData() {
    if (!this.aboutSource.getValue().summery) {
      await this.fs
        .collection(PageName.About)
        .get().forEach(data => {
          data.docs.forEach(async (about: AboutModel | any) => {
            this.aboutCachedData = await about.data();
            this.aboutSource.next(this.aboutCachedData);
          })
        }
      )
    }
  }

  public async fetchPortfolioData() {
    await this.fs.collection(PageName.Portfolio).get().forEach(async data => {
      const portfolioData = await data.query.orderBy('chronology').get();
      portfolioData.docs.forEach(async (doc: ProjectModel | any) => {
        this.portfolioCahchedData.push(doc.data());
        this.portfolioSource.next(this.portfolioCahchedData);
      })
    })
  }

  public async fetchWorkExperienceData() {
    await this.fs.collection(PageName.Work).get().forEach(async data => {
      const orderByDate = await data.query.orderBy('date', 'desc').get();
      orderByDate.docs.forEach((work: WorkModel | any) => {
        this.workCachedData.push(work.data());
        this.workSource.next(this.workCachedData);
      });
    })
  }

  public async getChartsData(chosenExperience: WorkModel) {
    return (await this.fs.firestore.collection("charts").doc(chosenExperience.chart_ref).get()).data();
  }

  public cacheVerifier(pageName: string) {
    if (pageName === PageName.About && !this.aboutCachedData) {
      this.fetchAboutData();
    }
    else if (pageName === PageName.Portfolio && !this.portfolioCahchedData.length) {
      this.fetchPortfolioData();
    }
    else if (pageName === PageName.Work && !this.workCachedData.length) {
      this.fetchWorkExperienceData();
    }
  }

  public responseConfirmation(userData: UserDetailsModel): string {
    //Todo: reach api endpoint (firebase db >> godaddy domain > update microsoft365 account)
    // this.http.post('http://localhost:3000', userData).pipe(map(data => data)).subscribe(console.log)
    // this.isFormSent$.next();
    return 'Ok for now';
  }

}
