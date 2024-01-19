import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseGuard } from './shared/guards/base.guard';
import { AnonymousResolver } from './shared/resolvers/anonymous.resolver';
import { AuthenticateResolver } from './shared/resolvers/authenticate.resolver';
import { BaseResolver } from './shared/resolvers/base.resolver';
import { Routing } from './shared/constants/routing.constant';
import { RequiredTimeOptionsResolver } from './shared/resolvers/required-time-options.resolver';
import { SignInUpGuard } from './shared/guards/sign-in-up.guard';
import { CloudGuard } from './shared/guards/cloud.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: `/${Routing.SIGN_IN.path}`,
    pathMatch: 'full'
  },
  {
    path: Routing.NOT_FOUND.path,
    loadChildren: () => import('./shared/components/element/not-found/not-found.module').then(m => m.NotFoundModule),
    runGuardsAndResolvers: 'always',
  },
  // {
  //   path: Routing.ACCESS_DENIED.path,
  //   loadChildren: () => import('./shared/components/element/access-denied/access-denied.module').then(m => m.AccessDeniedModule),
  // },
  {
    path: Routing.NOT_CONNECTED.path,
    loadChildren: () => import('./shared/components/element/not-connected/not-connected.module').then(m => m.NotConnectedModule),
  },
  {
    path: Routing.UNSUPPORT_DEVICE.path,
    loadChildren: () => import('./shared/components/element/unsupport-device/unsupport-device.module').then(m => m.UnsupportDeviceModule),
  },
  {
    path: Routing.TOKEN_RECEIVER.path,
    loadChildren: () => import('./shared/components/element/token-receiver/token-receiver.module').then(m => m.TokenReceiverModule),
    resolve: {
      resolver: AuthenticateResolver,
    }
  },
  {
    path: Routing.SIGN_IN.path,
    loadChildren: () => import('./auth-components/sign-in/sign-in.module').then(m => m.SignInModule),
    canActivate: [
      SignInUpGuard
    ],
    resolve: {
      resolver: AnonymousResolver,
    }
  },
  {
    path: Routing.GITHUB_WEBHOOK.path,
    loadChildren: () => import('./auth-components/github-hook/github-hook.module').then(m => m.GithubHookModule),
    canActivate: [
      SignInUpGuard
    ],
    resolve: {
      resolver: AnonymousResolver,
    }
  },
  // {
  //   path: Routing.SIGN_UP.path,
  //   loadChildren: () => import('./auth-components/sign-up/sign-up.module').then(m => m.SignUpModule),
  // canActivate: [
  //   SignInUpGuard
  // ],
  //   data: {
  //     key: Routing.SIGN_UP.key,
  //   }
  // },
  {
    path: Routing.AUDIT_LOG.path,
    loadChildren: () => import('./components/audit-log/audit-log.module').then(m => m.AuditLogModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.SESSION_LOG.path,
    loadChildren: () => import('./components/session-trace-log/session-trace-log.module').then(m => m.SessionTraceLogModule),
    resolve: {
      resolver: AnonymousResolver,
    }
  },
  {
    path: Routing.IFRAME_ELK.path,
    loadChildren: () => import('./components/iframes/elk/elk.module').then(m => m.ElkModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.CUSTOMIZE_MODULE.path,
    loadChildren: () => import('./components/customize-module/customize-module.module').then(m => m.CustomizeModuleModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.DASHBOARD.path,
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: RequiredTimeOptionsResolver,
    }
  },
  {
    path: Routing.INCOME.path,
    loadChildren: () => import('./components/spending-tracker/income/income.module').then(m => m.IncomeModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.INCOME_CATEGORY.path,
    loadChildren: () => import('./components/spending-tracker/income-category/income-category.module').then(m => m.IncomeCategoryModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.SPENDING.path,
    loadChildren: () => import('./components/spending-tracker/spending/spending.module').then(m => m.SpendingModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: RequiredTimeOptionsResolver,
    }
  },
  {
    path: Routing.SPENDING_CATEGORY.path,
    loadChildren: () => import('./components/spending-tracker/spending-category/spending-category.module').then(m => m.SpendingCategoryModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.SPENDING_JARS_RULE.path,
    loadChildren: () => import('./components/spending-tracker/spending-jars-rule/spending-jars-rule.module').then(m => m.SpendingJarsRuleModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.ST_REPORT.path,
    loadChildren: () => import('./components/spending-tracker/st-report/st-report.module').then(m => m.StReportModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.LOAN.path,
    loadChildren: () => import('./components/spending-tracker/loan/loan.module').then(m => m.LoanModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.ST_SETTING.path,
    loadChildren: () => import('./components/spending-tracker/setting/setting.module').then(m => m.SettingModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.VPS.path,
    loadChildren: () => import('./components/server-control/vps/vps.module').then(m => m.VpsModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.DATABASE.path,
    loadChildren: () => import('./components/server-control/database/database.module').then(m => m.DatabaseModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.CHAT_GENERATOR_HISTORY.path,
    loadChildren: () => import('./components/chat-generator/chat-generator.module').then(m => m.GenChatModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.GENERATE_CHAT.path,
    loadChildren: () => import('./components/chat-generator/chat-generator.module').then(m => m.GenChatModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.CUSTOMER.path,
    loadChildren: () => import('./components/kyoyo/customer/customer.module').then(m => m.CustomerModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.PRODUCT.path,
    loadChildren: () => import('./components/kyoyo/product/product.module').then(m => m.ProductModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.PO.path,
    loadChildren: () => import('./components/kyoyo/po-v2/po-v2.module').then(m => m.PoV2Module),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.SUPPLIER.path,
    loadChildren: () => import('./components/kyoyo/supplier/supplier.module').then(m => m.SupplierModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.EXCHANGE_RATE.path,
    loadChildren: () => import('./components/kyoyo/exchange-rate/exchange-rate.module').then(m => m.ExchangeRateModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.FOLDER.path,
    loadChildren: () => import('./components/cloud/cloud-management.module').then(m => m.CloudManagementModule),
    canActivate: [CloudGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: 'icon',
    loadChildren: () => import('./components/icon/icon.module').then(m => m.IconModule),
    resolve: {
      resolver: AnonymousResolver
    }
  },
  {
    path: "**",
    redirectTo: `/${Routing.NOT_FOUND.path}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
