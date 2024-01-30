import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  Subject,
  map,
} from 'rxjs';
import { AboutModel } from '../interfaces/About.interface';
import { ProjectModel } from '../interfaces/Project.interface';
import { WorkModel } from '../interfaces/Work.interface';
import { PageName } from '../enums/pages.enum';
import { UserDetailsModel } from '../interfaces/Users.interface';
import { environment, fiebaseapp } from 'src/environments/environment';
import { HttpsCallableResult, getFunctions, httpsCallable } from 'firebase/functions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private isFormSent$: Subject<void> = new Subject();
  private aboutSource: BehaviorSubject<AboutModel> = new BehaviorSubject(<AboutModel>{});
  private portfolioSource: BehaviorSubject<ProjectModel[]> = new BehaviorSubject(<ProjectModel[]>[]);
  private workSource: BehaviorSubject<WorkModel[]> = new BehaviorSubject(<WorkModel[]>[]);

  private aboutCachedData!: AboutModel;
  private portfolioCahchedData: ProjectModel[] = [];
  private workCachedData: WorkModel[] = [];

  public readonly about$ = this.aboutSource.asObservable();
  public readonly portfolio$ = this.portfolioSource.asObservable();
  public readonly work$ = this.workSource.asObservable();

  constructor(private http: HttpClient, private fs: AngularFirestore) {
    this.fetchAboutData();
    this.fetchPortfolioData();
    this.fetchWorkExperienceData();
  }

  public cachedData(pageName: string): AboutModel | ProjectModel[] | WorkModel[] {
    if (pageName === PageName.About) {
      return this.aboutCachedData;
    } else if (pageName === PageName.Portfolio) {
      return this.portfolioCahchedData;
    }
    return this.workCachedData;
  }

  public async fetchAboutData() {
    if (!this.aboutSource.getValue().summary) {
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
        this.portfolioCahchedData.push(await doc.data());
        this.portfolioSource.next(this.portfolioCahchedData);
      })
    })
  }

  public async fetchWorkExperienceData() {
    await this.fs.collection(PageName.Work).get().forEach(async data => {
      const orderByDate = await data.query.orderBy('date', 'desc').get();
      orderByDate.docs.forEach(async (work: WorkModel | any) => {
        this.workCachedData.push(await work.data());
        this.workSource.next(this.workCachedData);
      });
    })
  }

  public async getChartsData(chosenExperience: WorkModel) {
    return (await this.fs.firestore.collection("charts").doc(chosenExperience.chart_ref).get()).data();
  }

  public responseConfirmation(userData: UserDetailsModel): void {
    const functions = getFunctions(fiebaseapp);
    const sendEmail = httpsCallable(functions, 'sendEmail');
    this.fs.collection('save_details').add(userData)
      .then(() => {
        sendEmail(userData)
          .catch((error) => {
            console.error("Cloud transfer error: ", error);
          });
      })
      .catch(err => console.error("An error occured while saving details:: ",err));
  }
}
