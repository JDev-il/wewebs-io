import { AboutComponent } from '../components/about/about.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { PortfolioComponent } from '../components/portfolio/portfolio.component';
import { ContactComponent } from '../components/contact/contact.component';
import { TabsMenuComponent } from './tabs-menu/tabs-menu.component';
//Charts
import { PieChartComponent } from '../../core/components/charts/pie/pie.component';
import { BarChartComponent } from '../../core/components/charts/bars/bars.component';


export const components = [
  TabsMenuComponent,
  AboutComponent,
  ExperienceComponent,
  PortfolioComponent,
  ContactComponent,

  //Charts
  PieChartComponent,
  BarChartComponent
]

