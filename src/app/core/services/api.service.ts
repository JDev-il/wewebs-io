import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAction, FirebaseOperation, SnapshotAction } from '@angular/fire/compat/database/interfaces';
import { DocumentReference, AngularFirestore, AngularFirestoreDocument, fromCollectionRef, QueryDocumentSnapshot, QuerySnapshot, SnapshotOptions } from '@angular/fire/compat/firestore';

import {
  BehaviorSubject,
  Subject,
  map,
} from 'rxjs';
import { AboutModel } from '../interfaces/About.interface';
import { ProjectModel } from '../interfaces/Project.interface';
import { WorkModel } from '../interfaces/Work.interface';

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

  async fetchAboutData() {
    if (!this.aboutSource.getValue().summery) {
      await this.fs
        .collection('about')
        .get().forEach(data => {
          data.docs.forEach(async (about: AboutModel | any) => {
            this.aboutCachedData = await about.data();
            this.aboutSource.next(this.aboutCachedData);
          })
        })
    }
  }

  async fetchPortfolioData() {
    await this.fs.collection('portfolio').get().forEach(async data => {
      const portfolioData = await data.query.orderBy('chronology').get();
      portfolioData.docs.forEach(async (doc: ProjectModel | any) => {
        this.portfolioCahchedData.push(doc.data());
        this.portfolioSource.next(this.portfolioCahchedData);
      })
    })
  }


  async fetchWorkExperienceData() {
    await this.fs.collection('work').get().forEach(async data => {
      const orderByDate = await data.query.orderBy('date', 'desc').get();
      orderByDate.docs.forEach((work: WorkModel | any) => {
        this.workCachedData.push(work.data());
        this.workSource.next(this.workCachedData);
      });
    })
  }


  async getChartsData(chosenExperience: WorkModel) {
    return (await this.fs.firestore.collection("charts").doc(chosenExperience.chart_ref).get()).data()
  }

  cacheVerifier(pageName: string) {
    if (pageName === 'about' && !this.aboutCachedData) {
      this.fetchAboutData();
    }
    else if (pageName === 'portfolio' && !this.portfolioCahchedData.length) {
      this.fetchPortfolioData();
    }
    else if (pageName === 'work' && !this.workCachedData.length) {
      this.fetchWorkExperienceData();
    }
  }

  responseConfirmation(dataToSend: any) {
    this.http.post('http://localhost:3000', dataToSend).pipe(map(data => data)).subscribe(console.log)
    this.isFormSent$.next();
  }

}
